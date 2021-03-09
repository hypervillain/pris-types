import { createMockContent } from '../utils'

export interface LinkFieldProps {
  label: string
  placeholder: string
  allowTargetBlank?: boolean
  customTypes?: string[]
  select?: "media" | "document"
}

export interface LinkFieldPayload {
  type: string
  config: {
    label: string
    placeholder: string
    allowTargetBlank?: boolean
    customtypes?: string[]
    select?: "media" | "document"
  }
}

const Link = ({
  label,
  placeholder,
  allowTargetBlank = null,
  customTypes = null,
  select = null,
}: LinkFieldProps = {
  label: null,
  placeholder: null,
}) => (fieldName: string): LinkFieldPayload => ({
  type: 'Link',
  config: {
    label: label || `${fieldName} Link`,
    placeholder: placeholder || `${fieldName} value`,
    ...allowTargetBlank ? {
      allowTargetBlank
    } : null,
    ...customTypes ? {
      customtypes: customTypes
    } : null,
    ...select ? {
      select
    } : null,
  }
})

Link.Href = createMockContent(() => ({
  link_type: 'Web',
  url: 'https://github.com/hypervillain/pris-types'
}))

Link.Document = createMockContent((ct: string = 'fake-document', params = {}) => ({
  id: "fake-pris-types-id",
  type: ct,
  tags: [],
  slug: ct,
  lang: "en-us",
  link_type: "Document",
  isBroken: false,
  ...params,
}))

Link.Media = createMockContent(() => {
  console.warn('Link.Media is not implemented. Proceeding with Href link.')
  return {
    link_type: 'Web',
    url: 'https://github.com/hypervillain/pris-types'
  }
})

export default Link
