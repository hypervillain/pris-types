export const Model = PrisTypes.shape({
  __meta: { title: 'My Slice', description: 'A simple slice' },
  __common: {
    primary: {
      title: PrisTypes.Title,
    },
    items: {
      color: PrisTypes.Color
    }
  },
  defaultVariation: PrisTypes.variation({
    primary: {
      description: PrisTypes.RichText({ multi: true }),
    },
  }),
  anotherVariation: PrisTypes.variation()
})