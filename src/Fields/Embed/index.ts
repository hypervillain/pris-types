import { createMockContent } from '../../utils'

import { DefaultFieldProps, DefaultPayload } from '../../utils/types'

import Providers from './dataset'

const Embed = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Embed',
  config: {
    label: label || `${fieldName} Embed`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

Embed.Youtube = createMockContent(() => Providers.Youtube)
Embed.Twitter = createMockContent(() => Providers.Twitter)

export default Embed
