const fs = require('fs')
const path = require('path')
const equal = require('deep-equal')
const { vue: defaultVueConfiguration } = require('babel-extract-named-export/babel')
const { handlers } = require('../dist')

const reactPreset = require('@babel/preset-react')

test('Transforms Model & Mocks', async () => {
  const file = fs.readFileSync(path.join(__dirname, 'slices', 'ExampleSlice', 'index.js'), 'utf-8')
  const { model: expectedModel } = require('./slices/ExampleSlice/expect')
  const { Model, Mocks } = await handlers.extractModel(file, 'index.js')
  const { model, mockConfig } = handlers.generate(Model, Mocks, 'ExampleSlice', {
    requirePath: '../dist/index.js',
  })
  expect(model).toBeDefined()
  expect(mockConfig).toBeDefined()
  console.log(JSON.stringify(model))
  console.log(JSON.stringify(expectedModel))
  expect(equal(model, expectedModel)).toBe(true)
})

test('Mocks is not required', async () => {
  const file = fs.readFileSync(path.join(__dirname, 'slices', 'NoMocks', 'index.js'), 'utf-8')
  const { Model, Mocks } = await handlers.extractModel(file)
  const { model, mockConfig } = handlers.generate(Model, Mocks, 'NoMocks', {
    requirePath: '../dist/index.js'
  })
  expect(model).toBeDefined()
  expect(mockConfig).toBeUndefined()
})

test('Alternate Syntax', async () => {
  const file = fs.readFileSync(path.join(__dirname, 'slices', 'AlternateSyntax', 'index.js'), 'utf-8')
  const { model: expectedModel } = require('./slices/AlternateSyntax/expect')
  const { Model } = await handlers.extractModel(file)
  const { model } = handlers.generate(Model, null, 'AlternateSyntax', {
    requirePath: '../dist/index.js'
  })
  expect(model).toBeDefined()
  expect(equal(model, expectedModel)).toBe(true)
})

test('Works with Vue files', async () => {
  const file = fs.readFileSync(path.join(__dirname, 'slices', 'VueSlice', 'index.vue'), 'utf-8')
  const { Model } = await handlers.extractModel(file, 'index.vue', defaultVueConfiguration)
  console.log({ Model })
  const { model } = handlers.generate(Model, null, 'VueSlice', {
    requirePath: '../dist/index.js'
  })
  expect(model).toBeDefined()
})