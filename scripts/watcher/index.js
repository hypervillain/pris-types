#!/usr/bin/env node
const chokidar = require('chokidar')

const { argv } = require('yargs')

const { generate } = require('./generate');
const { save } = require('./save');

const {
  getSlices,
  validateArgs,
  sliceNameFromPath,
} = require('./utils')

const processSlice = async (slices, p, port) => {
  const [sliceName, { isVueFile, path: slicePath }] = Object.entries(slices).find(([, e]) => e.path === p)
  const from = p.split(process.cwd())[1].split(sliceName)[0] // huh
  try {
    const payload = await generate({ sliceName, from, isVueFile, p: slicePath })
    if (!payload || payload.model) {
      console.log(`[pris-types] ${sliceName}: Could not generate Model.`)
    }
    const response = await save(payload, port)
    if (response.err) {
      throw response.err
    }
    const { json } = response
    if (json.warning) {
      console.log(`[pris-types] Warning on ${sliceName}: ${json.warning}`)
    }
    if (json.err) {
      console.log(`[pris-types] Error on ${sliceName}: ${json.err}`)
    }
  } catch(e) {
    console.error(`[pris-types] ${e}`)
  }
}

(() => {
  const doLog = argv.v || argv.verbose
  const port = argv.p || argv.port || '9999'
  validateArgs(argv)

  const slices = getSlices(argv.lib)
  if (doLog) {
    console.log(`[pris-types/watcher] Loaded with slices: [${Object.keys(slices)}]`)
  }

  const watcher = chokidar.watch(Object.entries(slices).map(([,e]) => e.path))

  watcher
  .on('add', p => {
    processSlice(slices, p, port)
  })
  .on('change', async p => {
    console.log(`[pris-types/watcher] slice "${sliceNameFromPath(p)}" changed`)
    processSlice(slices, p, port)
  })

})();