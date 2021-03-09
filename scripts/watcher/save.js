const fetch = require('node-fetch')

const save = (payload, port) => {
  return new Promise((resolve) => {
    fetch(`http://localhost:${port}/api/update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then(async res => {
      const json = await res.json()
      resolve({ json })
    }).catch(err => {
      resolve({ err })
    })
  })
}

module.exports = { save }