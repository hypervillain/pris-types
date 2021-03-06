export const DefaultModel = {
  title: 'Simple Model',
  code: `export const Model = PrisTypes.shape({
  __meta: { title: 'My Slice', description: 'A simple slice' },
  defaultVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.RichText({ options: ['heading1'] }),
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
  __meta: { title: 'My Slice', description: 'A simple slice' },
  defaultVariation: PrisTypes.variation({
    primary: {
      title: PrisTypes.RichText({ options: ['heading1'] }),
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

export const AlterSyntax = {
  title: 'Alternative Syntax',
  code: `export const Model = {
  title: 'My Cool Slice',
  description: 'How are you?',
  variations: [PrisTypes.variation({
    id: 'my-variation',
    primary: {
      description: PrisTypes.RichText({
        placeholder: "short length text please"
      }),
    },
  })]
}`
}

export default [DefaultModel, WithVariations, AlterSyntax]