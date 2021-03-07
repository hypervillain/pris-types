import RichText from '../RichText'
import { RichTextProps, RichTextPayload } from '../RichText'

enum TitleOptionsEnum {
  h1 = 'heading1',
  h2 = 'heading2',
  h3 = 'heading3',
  h4 = 'heading4',
  h5 = 'heading5',
  b = 'bold',
  em = 'em'
}

const TitleOptions: TitleOptionsEnum[] = Object.values(TitleOptionsEnum)

const Title = ({ placeholder = null, multi = false, options = TitleOptions }: RichTextProps) =>
(fieldName: String): RichTextPayload => RichText({ placeholder, multi, options })(fieldName)

Object.entries(RichText).forEach(([key, fn]) => {
  Title[key] = fn
})

export default Title
