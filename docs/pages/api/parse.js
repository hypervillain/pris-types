import { evaluator, extractor } from 'pris-types/dist/index.umd'

const code2 = `
  export const Model = PrisTypes.shape({
    defaultVariation: PrisTypes.variation({
      primary: {
        title: PrisTypes.Title,
        description: PrisTypes.RichText({
          placeholder: "short length text please"
        }),
      },
      items: {
        color: PrisTypes.Color
      }
    }),
    anotherVariation: PrisTypes.variation({
      primary: {
        title: PrisTypes.Title,
        description: PrisTypes.RichText({
          placeholder: "short length text please"
        }),
      },
      items: {
        color: PrisTypes.Color
      }
    })
  })
  `

export default async function handler(req, res) {
  const { code } = JSON.parse(req.body)
  const { Model } = await extractor(code)
  const jsonModel = evaluator(Model, { build: 'umd' })
  console.log({ jsonModel })
  return res.status(200).send({
    model: jsonModel
  })
}