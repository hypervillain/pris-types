const fs = require('fs')
const path = require('path')
const { handlers } = require('../../dist')
const { vue: defaultVueConfiguration } = require('babel-extract-named-export/babel')

const generate = async ({ sliceName, from, isVueFile, p }) => {
  const file = fs.readFileSync(p, 'utf-8')
  const { Model, Mocks, err } = await handlers.extractModel(
    file,
    p.split(path.sep).pop(),
    isVueFile ? defaultVueConfiguration : undefined
  )

  if (err) {
    return { err }
  }

  try {
    const { model, mockConfig, error } = handlers.generate(Model, Mocks, sliceName, {
      requirePath: '../dist/index.js'
    })

    if (error) {
      throw error
    }
    
    return {
      model,
      mockConfig,
      sliceName,
      from
    }
  } catch(e) {
    console.error(`[pris-types] Error in "${sliceName}": ${e}`)
  }
}

module.exports = {
  generate
}