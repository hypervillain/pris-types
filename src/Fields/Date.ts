import { createMockContent } from '../utils'

import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const _Date = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'Date',
  config: {
    label: label || `${fieldName} Date`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

_Date.Now = createMockContent(() => new Date().toISOString().split('T')[0])
_Date.Future = createMockContent(() => {
  let d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
})
_Date.Past = createMockContent(() => {
  let d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString().split('T')[0]
})

export default _Date
