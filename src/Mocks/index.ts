interface Variation {
  id: string
  primary: {
    [x: string]: any;
  },
  items: {
    [x: string]: any;
  }
}

interface Model {
  id: string
  name: string
  description: string
  variations: Variation[]
}

export const handleField = ({
  zone,
  mocks,
  fieldKey,
  variation,
}) => {
  const { id: variationId } = variation
  const { __common = {}, ...mockVariations } = mocks

  if (mockVariations?.[variationId]?.[zone]?.[fieldKey]) {
    return mockVariations[variationId][zone][fieldKey]
  }
  if (__common[zone]?.[fieldKey]) {
    return __common[zone][fieldKey]
  }
}

export const handleVariation = (variation: Variation, zone: string, mocks: { [x: string]: any }) => {
  const mockedFields = Object.entries(variation.primary).reduce((acc, [key]) => {
    const maybeField = handleField({
      zone,
      mocks,
      variation,
      fieldKey: key,
    })
    if (maybeField) {
      return {
        ...acc,
        [key]: maybeField
      }
    }
    return acc
  }, {})
  return Object.keys(mockedFields).length ? mockedFields : null
}

export const handle = (mocks: { [x: string]: any; }, model: Model) => {
  return model.variations.reduce((acc: { [x: string]: any; }, variation: Variation) => {
    const maybePrimary = handleVariation(variation, 'primary', mocks)
    const maybeItems = handleVariation(variation, 'items', mocks)
    return {
      ...acc,
      [variation.id]: {
        primary: maybePrimary || {},
        items: maybeItems || {}
      }
    }
  }, {})
}
