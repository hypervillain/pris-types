export const createMockContent = (fn: Function) => () => ({
  content: fn()
})

const camelizeRE = /-(\w)/g;
const hyphenateRE = /\B([A-Z])/g;

export const camelize = (str: String) => {
  return str.replace(/_/g, "-").replace(camelizeRE, (_, c) => {
    return c ? c.toUpperCase() : "";
  })
}

export const hyphenate = (str: String) => str.replace(hyphenateRE, "-$1").toLowerCase()
