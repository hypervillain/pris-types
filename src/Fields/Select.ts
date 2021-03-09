import { createMockContent } from '../utils'

interface SelectFieldProps {
  label: string
  placeholder: string
  options: string[]
  defaultValue?: string
}

interface SelectFieldPayload {
  type: string
  config: {
    label: string
    placeholder: string
    options: string[]
    default_value?: string
  }
}

const Select = ({
  label = null,
  placeholder = null,
  options = null,
  defaultValue = null

}: SelectFieldProps = {
  label: null,
  placeholder: null,
  options: ['Option 1', 'Option 2'],
  defaultValue: null
}) =>
(fieldName: String): SelectFieldPayload => ({
  type: 'Select',
  config: {
    label: label || `${fieldName} Select`,
    placeholder: placeholder || `${fieldName} value`,
    options,
    default_value: defaultValue != undefined ? defaultValue : options[0]
  }
})

Select.Option = createMockContent((o: string) => o)

export default Select
