import { createMockContent } from '../utils'

import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const Number = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Date',
  config: {
    label: label || `${fieldName} Date`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

Number.Small = createMockContent(() => rand(1, 9))
Number.Long = createMockContent(() => rand(1000, 100_000))
Number.Negative = createMockContent(() => rand(-1000, -1))

export default Number
