const fs = require('fs')
const path = require('path')
const { handlers } = require('../../dist')
const { vue: defaultVueConfiguration } = require('babel-extract-named-export/babel')

const generate = async ({ sliceName, from, isVueFile, p }) => {
  const file = fs.readFileSync(p, 'utf-8')
  if (sliceName === 'VueSlice') {
    console.log(sliceName, isVueFile, p.split(path.sep).pop())
  }
  const { Model, Mocks, err } = await handlers.extractModel(
    file,
    p.split(path.sep).pop(),
    isVueFile ? defaultVueConfiguration : undefined
  )

  // if (err) {
  //   console.log('Could not extract Model from file.')
  // }
  const { model, mockConfig } = handlers.generate(Model, Mocks, sliceName, {
    requirePath: '../dist/index.js'
  })
  
  return {
    model,
    mockConfig,
    sliceName,
    from
  }
}

module.exports = {
  generate
}