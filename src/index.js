// import fs from 'fs'
import generate from '@babel/generator'
import extract from 'babel-extract-named-export'

import { Types } from './types'

// const file = fs.readFileSync('./ExampleSlice/index.js', 'utf-8')

function validate(Model) {
  if (!Model || !Model.type || Model.type !== 'CallExpression') {
    return false
  }
  return true
}

function createEval(node, build) {
  const { code } = generate(node)
  const req = `pris-types/dist/index.${build ? `${build}.` : ''}js`
  const str = `
    var dir = "${__dirname}"
    const PrisTypes = require("${req}").PrisTypes;
    return ${code}
  `;
  return str
}

const extractor = async (code) => {
  const { Model } = await extract(code, { search: ['Model'], fallback: true })
  if (!validate(Model)) {
    return { err: true }
  }
  return { Model }
}

const evaluator = (Model, { build = '' } = { build: '' }) => {
  const code = createEval(Model, build)
  const slice = eval('(function() {' + code + '}())')
  return slice
}

async function main() {
  const { Model, err } = extractor(file)
  return evaluator(Model)
}

export {
  evaluator,
  extractor,
  Types as PrisTypes
}
