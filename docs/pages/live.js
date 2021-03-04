import { useEffect, useState } from 'react'
import { LiveProvider, LiveEditor } from 'react-live'

import { Flex, Button } from '../components'

import Models from '../src/models'

const DisplayModels = ({ models, setModel }) => {
  return (
    <Flex>
      {
        models.map(({ title, code }) => (
          <Button onClick={() => setModel(code)}>
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
      if (json.model) {
        setResult(json.model)
      }

    })
  }

  const setNewModel = (code) => {
    setCode(code)
    setTimeout(() => setToggle(t => !t), 500)
  }

  return (
    <main>
      <h1>Live Editor</h1>
      <p>
        Get an idea on how it feels to write Prismic models using <code>pris-types</code>! Well, minor
        linting, TypeScript support and auto-save of your model...
      </p>
      <p>
        Make sure you  <code>export const Model</code> somewhere, use <code>PrisTypes.shape</code> and
        preview the result. Looks good? What you see here is what you would get in a real-world, Prismic project ✌️
      </p>
      <DisplayModels models={Models} setModel={setNewModel} />
      <LiveProvider
        code={code}
        scope={{
            // yeah, I know
            PrisTypes: {
              shape: (code) => code,
              variation: (code) => code,
              Title: (code) => code,
              RichText: (code) => code,
              Color: (code) => code,
              
            }
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
            minHeight: '200px',
            background: '#F7F7F7',
            padding: '16px',
            marginBottom: '32px'
          }}
        >
          {
            JSON.stringify(result, null, 2)
          }
        </pre>
      </LiveProvider>
    </main>
  )
}
