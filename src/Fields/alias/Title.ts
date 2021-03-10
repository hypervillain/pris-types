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

const Title = ({ label = null, placeholder = null, multi = false, options = TitleOptions }: RichTextProps) =>
(fieldName: string): RichTextPayload => RichText({ label, placeholder, multi, options })(fieldName)

Title.Heading = RichText.Heading

export default Title
