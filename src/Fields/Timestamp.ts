import { createMockContent } from '../utils'

import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const Timestamp = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Timestamp',
  config: {
    label: label || `${fieldName} Timestamp`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

Timestamp.Now = createMockContent(() => new Date().toISOString())
Timestamp.Future = createMockContent(() => {
  let d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString()
})
Timestamp.Past = createMockContent(() => {
  let d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString()
})

export default Timestamp
