import { PrisMocks, PrisTypes } from 'pris-types'

export default function CallToAction({ slice }) {
  return (
    <Box>
      <RichText render={slice.primary.title} />
    </Box>
  )
}

export const Model = shape({
  __meta: {
    title: 'My Cool Slice',
    description: 'How are you?'
  },
  defaultVariation: variation({
    primary: {
      description: PrisTypes.Title({ placeholder: "sshort length text please, ok?" }),
    },
    items: {
      color: PrisTypes.Color
    }
  }),
  anotherVariation: variation({
    primary: {
      description: PrisTypes.RichText({ placeholder: "short length text please, ok?" }),
    },
    items: {
      color: PrisTypes.Color
    }
  })
})

export const Mocks = {
  __common: {
    primary: {
      description: PrisTypes.RichText.Heading(),
    },
    items: {
      color: PrisTypes.Color
    }
  }
}