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
    if (!fn) {
      throw new Error(`Unknown helper at key "${key}". Exiting.`)
    }
    const depth = fn.toString().split('=>').length - 1
    return {
      ...acc,
      // @ts-ignore halp!
      [key]: depth > 1 ? fn({})(key) : fn(key)
    }
  }, {})
}

export const variation = (zones = { primary: {}, items: {}}) => {
  const { primary, items } = zones

  return {
    primary: _handleFields(primary),
    items: _handleFields(items),
  } 
}

export const shape = (obj: { [x: string]: any; __common?: CommonProps, __meta: MetaProps }) => {
  const { __common = {}, __meta, ...variations } = obj
  if (!__meta) {
    throw new Error('Field "__meta" is undefined. It expects properties "title" and "description".')
  }
  if (!__meta.title || !__meta.description) {
    throw new Error('Field "__meta" expects properties "title" and "description".')
  }
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
            ..._handleFields(__common.primary),
            ...variation.primary,
          },
          items: {
            ..._handleFields(__common.items),
            ...variation.items,

          }
        }
      ]
    }, [])
  }
}
