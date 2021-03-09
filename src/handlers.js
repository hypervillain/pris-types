import generate from '@babel/generator'
import extract from 'babel-extract-named-export'
import { config as defaultReactConfiguration } from 'babel-extract-named-export/babel/react'

import removeImports from 'babel-plugin-transform-remove-imports'

import * as Types from './Fields'

import { hyphenate } from './utils'

function validate(Model) {
  if (!Model || !Model.type || ['CallExpression', 'ObjectExpression'].indexOf(Model.type) === -1){
    return false
  }
  return true
}

/** Extract Expression from file and validate it */
const extractModel = async (code, filename, { plugins = [], presets = [] } = defaultReactConfiguration) => {
  const { Model, Mocks } = await extract(code, {
    filename,
    search: ['Model', 'Mocks'],
    useToJs: false,
    plugins: [[removeImports, { test: 'pris-types' }], ...plugins],
    presets,
  })
  if (!validate(Model)) {
    return { err: true }
  }
  return { Model, Mocks }
}

const prisGenerate = (Model, Mock, sliceName, { requirePath, build } = { build: '' }) => {
  const code = {
    model: generate(Model).code,
    mock: generate(Mock).code,
  }

  const req = requirePath || `pris-types/dist/index.${build ? `${build}.` : ''}js`
  const str = `
    const { PrisTypes, PrisMocks } = require("${req}")
    const { ${Object.keys(Types).join(', ')} } = PrisTypes
    const __prisTypesModel = ${code.model}

    const __prisTypesModelWithId = {
      id: "${hyphenate(sliceName)}",
      ...__prisTypesModel
    }

    ${!code.mock ? 'return { model: __prisTypesModelWithId}' : `
      const __prisMocksMock = PrisMocks.handle(${code.mock}, __prisTypesModel)
      return {
        model: __prisTypesModelWithId,
        mockConfig: __prisMocksMock
      }
    `}
  `
  try {
    return eval('(function() {' + str + '}())')
  } catch(e) {
    return { error: e }
  }
}

export {
  extractModel,
  prisGenerate as generate
}
