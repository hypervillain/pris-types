import randomColor from 'randomcolor'
import { createMockContent } from '../utils'

import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const Color = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Color',
  config: {
    label: label || `${fieldName} Color`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

Color.Rand = createMockContent(() => randomColor())
Color.Dark = createMockContent(() => randomColor({ luminosity: 'dark' }))
Color.Light = createMockContent(() => randomColor({ luminosity: 'light' }))

export default Color
