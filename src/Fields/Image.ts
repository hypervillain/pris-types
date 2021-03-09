interface ImageFieldProps {
  constraint: string
  [x: string]: string
}

interface Thumbnail {
  name: string
  width: string
  height: string
}

interface ImageFieldPayload {
  type: string
  config: {
    constraint: {
      width: string
      height: string
    }
    thumbnails: Thumbnail[]
  }
}

const parseString = (str: string, name = null) => {
  const [width, height] = str.split('x')
  return {
    ...name ? {
      name
    } : null,
    height,
    width,
  }
}

const Image = ({
  label = null,
  constraint = "500x500",
  ...thumbnails
}: ImageFieldProps) =>
(): ImageFieldPayload => ({
  type: 'Image',
  config: {
    constraint: parseString(constraint),
    thumbnails: Object.entries(thumbnails || {}).reduce((acc, [key, str]) => ([
      ...acc,
      parseString(str, key)
    ]), [])
  }
})

export default Image
