import Link from '../Link'
import { LinkFieldPayload } from '../Link'

interface DocumentFieldProps {
  customtypes?: string[],
  label?: string,
  placeholder?: string
}

const Document = ({
  label = null,
  placeholder = null,
  customtypes = []
}: DocumentFieldProps) => (fieldName: string): LinkFieldPayload => Link({
  label,
  placeholder,
  customtypes,
  select: 'document'
})(fieldName)

Document.Document = Link.Document

export default Document
