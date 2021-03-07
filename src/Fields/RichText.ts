export enum RichTextOptionsEnum {
  h1 = 'heading1',
  h2 = 'heading2',
  h3 = 'heading3',
  paragraph = "paragraph"
}

export const RichTextOptions:RichTextOptionsEnum[] = Object.values(RichTextOptionsEnum)

export interface RichTextProps {
  placeholder?: String
  multi?: Boolean
  options?: String[]
}

export interface RichTextPayload {
  type: String,
  config: {
    multi?: String[],
    single?: String[],
    placeholder: String
  }
}

const RichText = ({ placeholder = null, multi = false, options = RichTextOptions }: RichTextProps) =>
(fieldName: String): RichTextPayload => ({
  type: 'StructuredText',
  config: {
    [multi ? 'multi' : 'single']: options.join(','),
    placeholder: placeholder || `${fieldName} field`
  }
})

const createConfig = (patternType) => (blocks = 1) => ({
  config: {
    patternType,
    blocks
  }
})

RichText.Paragraph = createConfig('PARAGRAPH')
RichText.Heading = createConfig('HEADING')
RichText.Story = createConfig('STORY')

export default RichText