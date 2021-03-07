interface CommonProps {
  primary?: any
  items?: any
}

interface MetaProps {
  title: String
  description: String
}

interface FieldsProps {
  [x: string]: Function
}

const _handleFields = (fields = {}): FieldsProps => {
  return Object.entries(fields).reduce((acc, [key, fn]) => {
    const depth = fn.toString().split('=>').length - 1
    return {
      ...acc,
      // @ts-ignore halp!
      [key]: depth > 1 ? fn({})(key) : fn(key)
    }
  }, {})
}

export const variation = (zones) => {
  const { primary, items, id } = zones

  return {
    ...id ? { id } : null,
    primary: _handleFields(primary),
    items: _handleFields(items),
  } 
}

export const shape = (obj: { [x: string]: any; __common?: CommonProps, __meta: MetaProps }) => {
  const { __common = {}, __meta, ...variations } = obj
  const { title, description } = __meta
  return {
    title,
    description,
    variations: Object.entries(variations).reduce((acc, [key, variation]) => {
      return [
        ...acc,
        {
          id: key,
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