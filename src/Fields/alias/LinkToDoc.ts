import Link from '../Link'
import { LinkFieldPayload } from '../Link'

interface LinkToDocFieldProps {
  customTypes: string[],
  label?: string,
  placeholder?: string
}

const LinkToDoc = ({
  label = null,
  placeholder = null,
  customTypes = []
}: LinkToDocFieldProps) => (fieldName: string): LinkFieldPayload => Link({
  label,
  placeholder,
  customTypes,
  select: 'document'
})(fieldName)

LinkToDoc.Document = Link.Document

export default LinkToDoc
