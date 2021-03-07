<template>
  <p>hi!</p>
</template>

<script>
export default {
  name: 'VueSlice'
}

export const Model = {
  title: 'My Cool Slice',
  description: 'How are you?',
  variations: [PrisTypes.variation({
    id: 'my-variation',
    primary: {
      description: PrisTypes.RichText({
        placeholder: "short length text please"
      }),
    },
  })]
}

</script>
