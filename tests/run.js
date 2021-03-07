const fs = require('fs')
const path = require('path')
const { PrisTypes, handlers } = require('../dist/index')

const file = fs.readFileSync(path.join(__dirname, 'slices', 'AlternateSyntax/index.js'));

(async() => {
  const { Model, Mocks, err } = await handlers.extractModel(file);
  if (err) {
    console.log('Could not extract Model from file.')
  }

  const { model, mockConfig } = handlers.generate(Model, Mocks, {
    requirePath: '../dist/index.js'
  })
  
  console.log(JSON.stringify(model, null, 2))

  console.log(JSON.stringify(mockConfig, null, 2))

})();