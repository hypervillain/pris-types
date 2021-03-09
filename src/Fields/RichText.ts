export enum RichTextOptionsEnum {
  p = 'paragraph',
  pre = 'preformatted',
  h1 = 'heading1',
  h2 = 'heading2',
  h3 = 'heading3',
  h4 = 'heading4',
  h5 = 'heading5',
  h6 = 'heading6',
  strong = 'strong',
  em = 'em',
  link = 'hyperlink',
  image = 'image',
  embed = 'embed',
  list = 'list-item',
  oList = 'o-list-item',
  rtl = 'rtl',
}

export const RichTextOptions:RichTextOptionsEnum[] = Object.values(RichTextOptionsEnum)

export interface RichTextProps {
  label?: string
  placeholder?: string
  multi?: Boolean
  options?: String[]
}

export interface RichTextPayload {
  type: string,
  config: {
    label: string
    multi?: string[],
    single?: string[],
    placeholder: string
  }
}

const RichText = ({ label = null, placeholder = null, multi = false, options = RichTextOptions }: RichTextProps) =>
(fieldName: string): RichTextPayload => ({
  type: 'StructuredText',
  config: {
    label: label || `${fieldName} Richtext`,
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