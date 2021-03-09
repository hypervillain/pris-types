export const Model = PrisTypes.shape({
  __meta: {
    title: 'My Awesome Slice',
    description: 'A really cool slice'
  },
  defaultVariation: PrisTypes.variation({
    primary: {
      bool: PrisTypes.Boolean,
      color: PrisTypes.Color,
      date: PrisTypes.Date,
      geo: PrisTypes.GeoPoint,
      img: PrisTypes.Image,
      doc: PrisTypes.Document({ customtypes: ["another-one"] }),
      link: PrisTypes.Link({ select: "document", customtypes: ["homepage"] }),
      num: PrisTypes.Number,
      multi: PrisTypes.RichText({ multi: true, options: ['heading1', 'heading2'] }),
      select: PrisTypes.Select({ options: ['11', '22'], default_value: '11' }),
      txt: PrisTypes.Text({ label: 'My Cool Label' }),
      tmstmp: PrisTypes.Timestamp({ placeholder: 'My cool tmpspt' })
    }
  })
})

export const Mocks = {
  defaultVariation: {
    primary: {
      bool: PrisTypes.Boolean.Rand(),
      color: PrisTypes.Color.Light(),
      date: PrisTypes.Date.Now(),
      doc: PrisTypes.Document.Document(),
      link: PrisTypes.Link.Document(),
      num: PrisTypes.Number.Small(),
      multi: PrisTypes.RichText.Heading(),
      select: PrisTypes.Select.Option('22'),
      tmstmp: PrisTypes.Timestamp.Past()
    }
  }
}
