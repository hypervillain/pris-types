// const {
//   PrisTypes,
//   toProptypes } = require('./pris-types')

// export const Model = PrisTypes.shape({
//   __common: {
//     primary: {
//       commonColor: PrisTypes.Color({ placeholder: "custom placeholder" })
//     }
//   },
//   defaultVariation: PrisTypes.variation({
//     primary: {
//       title: PrisTypes.Title,
//       description: PrisTypes.RichText({ placeholder: "right!" }),
//     },
//     items: {
//       color: PrisTypes.Color
//     }
//   }),
//   secondVariations: PrisTypes.variation({
//     primary: {
//       uniqueField: PrisTypes.Title,
//     }
//   })
// })

export default function CallToAction({ slice }) {
  return (
    <Box>
      <RichText render={slice.primary.title} />
    </Box>
  )
}

export const Model = PrisTypes.shape({
  defaultVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.Title,
      description: PrisTypes.RichText({ placeholder: "short length text please" }),
    },
    items: {
      color: PrisTypes.Color
    }
  }),
  anotherVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.Title,
      description: PrisTypes.RichText({ placeholder: "short length text please" }),
    },
    items: {
      color: PrisTypes.Color
    }
  })
})

// export const Proptypes = toProptypes(Model)
