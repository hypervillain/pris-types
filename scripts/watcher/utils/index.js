const fs = require('fs')
const path = require('path')
const slash = require('slash')

const sliceNameFromPath = (p) => path.dirname(p).split(path.sep).pop()

const getSlices = (lib) => {
  const pathToSlices = path.join(process.cwd(), lib)
  const pathsToComponentsFolders = fs.readdirSync(slash(pathToSlices))
    .map(curr => path.join(pathToSlices, curr))
    .filter(e => e.split(path.sep).pop() !== 'index.js')

  const slices = pathsToComponentsFolders.reduce((acc, folder) => {
    const sliceName = folder.split(path.sep).pop()
    const files = fs.readdirSync(slash(folder))
    const index = files.find(e => e.match(/^index\.(js|ts|vue|jsx)$/))
    if (!index) {
      return acc
    }
    return {
      ...acc,
      [sliceName]: {
        path: `${folder}/${index}`,
        isVueFile: index.indexOf('.vue') !== -1
      }
    }
  }, {})

  if (Object.keys(slices).length === 0) {
    throw new Error(`Could not find slices in lib "${lib}"`)
  }
  return slices
}

const validateArgs = (argv) => {
  if (!argv.lib) {
    throw new Error('Argument "lib" should be passed')
  }
}

module.exports = {
  getSlices,
  validateArgs,
  sliceNameFromPath,
}