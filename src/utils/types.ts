export interface DefaultFieldProps {
  label?: String
  placeholder?: String
}

export interface DefaultFieldConfig {
  label: String
  placeholder: String
}

export interface DefaultPayload {
  type: String,
  config: DefaultFieldConfig
}