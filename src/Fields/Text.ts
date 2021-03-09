import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const Text = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Text',
  config: {
    label: label || `${fieldName} Text`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

export default Text
