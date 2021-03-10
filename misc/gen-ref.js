const fs = require('fs')
const path = require('path')
const table = require('markdown-table')
const { PrisTypes } = require('../dist')

const { shape, variation, ...fields } = PrisTypes

const CommonDescriptions = {
  label: 'Input Label (content editors)',
  placeholder: 'Input Placeholder (content editors)'
}

let txt = `
# API Reference

Some text here

`

// https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamicallys
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null)
    result = [];
  return result;
}

Object.entries(fields).forEach(([key, field]) => {
  txt += `
## ${key}

${
  table([
    ['Params', 'Description', 'Required', 'Default value'],
    ...getParamNames(field).filter(e => e.length > 1 && e !== 'null')
      .map(param => ([
        param,
        ...CommonDescriptions[param] ? [CommonDescriptions[param], 'No', 'field name'] : ['', 'No'],
      ]))
  ])
}

### Mocks

For mocking a ${key} field, you've got ${Object.keys(field).length} possibilities:
${Object.entries(field).map(([k]) => (
  `
* use \`${k}\` to
  `
))}
eg.
\`\`\`
const field = PrisTypes.${key}.${Object.keys(field)[0]}()

\`\`\`\`

`
})

fs.writeFileSync(path.join(__dirname, 'fields-ref.mdx'), txt)

