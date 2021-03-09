import { useEffect, useState } from 'react'
import { LiveProvider, LiveEditor } from 'react-live'

import { Flex, Button } from '../components'

import Models from '../src/models'

import { PrisTypes } from 'pris-types'

const DisplayModels = ({ models, setModel }) => {
  return (
    <Flex>
      {
        models.map(({ title, code }) => (
          <Button key={title} onClick={() => setModel(code)}>
            Use { title }
          </Button>
        ))
      }
    </Flex>
  )
}


export default function Live2() {
  const [result, setResult] = useState({})
  const [toggle, setToggle] = useState(false)
  const [error, setError] = useState(null)
  const [code, setCode] = useState(Models[0].code)

  useEffect(() => {
    parse()
  }, [toggle])

  const parse = () => {
    fetch('/api/parse', {
      method: 'POST',
      body: JSON.stringify({
        code
      })
    }).then(async res => {
      const json = await res.json()
      if (json.error) {
        setError(json.error)
        return setResult(null)
      }
      if (json.model) {
        setResult(json.model)
      }

    })
  }

  const setNewModel = (code) => {
    setCode(code)
    setError(null)
    setTimeout(() => setToggle(t => !t), 500)
  }

  return (
    <main>
      <h1>Live Editor (wip)</h1>
      <p>
        Get an idea on how it feels to write Prismic models using <code>pris-types</code>! Well, minor
        linting, TypeScript support and auto-save of your model...
      </p>
      <p>
        Make sure you  <code>export const Model</code> somewhere, use <code>PrisTypes.shape</code> or the aternate syntax and
        preview the result. Looks good? What you see here is what you would get in a real-world, Prismic project ✌️
      </p>
      <DisplayModels models={Models} setModel={setNewModel} />
      <LiveProvider
        code={code}
        scope={{
            // yeah, I know
            PrisTypes: Object.keys(PrisTypes).reduce((acc, key) => ({
              ...acc,
              [key]: (c) => c
            }), {})
          }}
        transformCode={code => {
          setCode(code)
          return code
        }}
      >
        <LiveEditor />
        <Button onClick={parse}>Parse Model to JSON 👇</Button>
        <pre
          style={{
            minHeight: '100px',
            background: '#F7F7F7',
            padding: '16px',
            margin: '24px 0 36px'
          }}
        >
          {
            error ? error : null
          }
          {
            result ? JSON.stringify(result, null, 2) : null
          }
          
        </pre>
      </LiveProvider>
    </main>
  )
}
