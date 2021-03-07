

const RichText = ({ placeholder, multi = false, options = ALL_OPTIONS }) => (fieldName) => ({
  type: 'StructuredText',
  config: {
    [multi ? 'multi' : 'single']: options.join(','),
    placeholder: placeholder || `${fieldName} field`
  }
})

const _handleFields = (fields = {}) => {
  return Object.entries(fields).reduce((acc, [key, fn]) => {
    const depth = fn.toString().split('=>').length - 1
    return {
      ...acc,
      [key]: depth > 1 ? fn({})(key) : fn(key)
    }
  }, {})
}

const variation = (zones) => {
  const { primary, items } = zones

  return {
    primary: _handleFields(primary),
    items: _handleFields(items),
  } 
}

const shape = (obj) => {
  const { __common = {}, ...variations } = obj
  return {
    title: 'My Slice',
    description: 'Hi!',
    variations: Object.entries(variations).reduce((acc, [key, variation]) => {
      return [
        ...acc,
        {
          id: key,
          // ...variation,
          primary: {
            ...variation.primary,
            ..._handleFields(__common.primary)
          },
          items: {
            ...variation.items,
            ..._handleFields(__common.items)

          }
        }
      ]
    }, [])
  }
}

const ALL_OPTIONS = ['paragraph', '...']

const Title = (params) => (fieldName) => RichText({ ...params, options: ['heading1', 'heading2' ]})(fieldName)

const Color = ({ placeholder }) => (fieldName) => ({
  type: 'Color',
  config: {
    placeholder: placeholder || `${fieldName} field`
  }
})

const Types = {
  shape,
  variation,
  RichText,
  Title,
  Color
}

export {
  Types
}
