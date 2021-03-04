export const DefaultModel = {
  title: 'Simple Model',
  code: `export const Model = PrisTypes.shape({
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
  })
})`
}

export const WithVariations = {
  title: 'Multiple Variations',
  code: `export const Model = PrisTypes.shape({
  defaultVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.Title,
      description: PrisTypes.RichText({
        placeholder: "short length text please"
      }),
    },
  }),
  anotherVariation: PrisTypes.variation({
    items: {
      color: PrisTypes.Color
    }
  })
})
  `
}

export default [DefaultModel, WithVariations]