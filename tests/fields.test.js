const { PrisTypes } = require('../dist')

test('Field mocks are defined', async () => {
  expect(Object.keys(PrisTypes.RichText).length).toBe(3)
})

test('Alias mocks are copied corrrectly', async () => {
  expect(Object.keys(PrisTypes.Title).length).toBe(3)
})