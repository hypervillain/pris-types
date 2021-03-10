export const Model = {
  title: 'My Cool Slice',
  description: 'How are you?',
  variations: [PrisTypes.variation({
    id: 'my-variation',
    primary: {
      title: PrisTypes.RichText({ options: ['heading1'] }),
      description: PrisTypes.RichText({
        placeholder: "short length text please, ok?"
      }),
    },
  })]
}