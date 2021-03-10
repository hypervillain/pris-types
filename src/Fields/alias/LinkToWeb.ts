import Link from '../Link'
import { LinkFieldPayload } from '../Link'

interface LinkToWebFieldProps {
  label: string
  placeholder: string
  allowTargetBlank?: boolean
}

const LinkToWeb = ({
  label = null,
  placeholder = null,
  allowTargetBlank = true
}: LinkToWebFieldProps) => (fieldName: string): LinkFieldPayload => Link({
  label,
  placeholder,
  allowTargetBlank,
})(fieldName)

LinkToWeb.Web = Link.Web

export default LinkToWeb
