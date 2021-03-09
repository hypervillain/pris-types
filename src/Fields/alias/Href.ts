import Link from '../Link'
import { LinkFieldPayload } from '../Link'

interface HrefFieldProps {
  label: string
  placeholder: string
  allowTargetBlank?: boolean
}

const Href = ({
  label = null,
  placeholder = null,
  allowTargetBlank = true
}: HrefFieldProps) => (fieldName: string): LinkFieldPayload => Link({
  label,
  placeholder,
  allowTargetBlank,
})(fieldName)

Href.Href = Link.Href

export default Href
