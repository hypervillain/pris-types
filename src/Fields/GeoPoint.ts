import { DefaultFieldProps, DefaultPayload } from '../utils/types'

const GeoPoint = ({ label = null, placeholder = null }: DefaultFieldProps) =>
(fieldName: String): DefaultPayload => ({
  type: 'GeoPoint',
  config: {
    label: label || `${fieldName} GeoPoint`,
    placeholder: placeholder || `${fieldName} value`,
  }
})

export default GeoPoint
