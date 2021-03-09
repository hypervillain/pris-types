import { handlers, PrisTypes } from 'pris-types'

export default async function handler(req, res) {
  const sliceName = 'DemoSlice'
  const { code } = JSON.parse(req.body)
  const { Model, err } = await handlers.extractModel(code, sliceName)
  if (err) {
    return res.status(200).send({
      error: err
    })
  }

  const { model, error } = handlers.generate(Model, null, sliceName)
  return res.status(200).send({
    model,
    error: error ? error.toString() : null
  })
}
