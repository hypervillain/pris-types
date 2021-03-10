import Link from '../Link'
import { LinkFieldPayload } from '../Link'

interface LinkToMediaFieldProps {
  label?: string,
  placeholder?: string
}

const LinkToMedia = ({
  label = null,
  placeholder = null,
}: LinkToMediaFieldProps) => (fieldName: string): LinkFieldPayload => Link({
  label,
  placeholder,
  select: 'media'
})(fieldName)

LinkToMedia.Media = Link.Media

export default LinkToMedia
