import { createMockContent } from '../utils'

interface BooleanProps {
  label?: String
  placeholderFalse?: String
  placeholderTrue?: String
  defaultValue?: Boolean
}

interface BooleanPayload {
  type: String,
  config: {
    label: String
    placeholder_false: String
    placeholder_true: String
    default_value: Boolean
  }
}

const Boolean = ({
  label,
  placeholderFalse,
  placeholderTrue,
  defaultValue
}: BooleanProps) => (fieldName: String): BooleanPayload => ({
  type: 'Boolean',
  config: {
    label: label || `${fieldName} value`,
    placeholder_true: placeholderTrue || 'true',
    placeholder_false: placeholderFalse || 'false',
    default_value: defaultValue != undefined ? defaultValue : true
  }
})

Boolean.Rand = createMockContent(() => Math.random() > .5 ? true : false)
Boolean.True = createMockContent(() => true)
Boolean.False = createMockContent(() => false)

export default Boolean
