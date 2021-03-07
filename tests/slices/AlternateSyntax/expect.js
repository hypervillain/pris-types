const model = {
  "id": "alternate-syntax",
  "title": "My Cool Slice",
  "description": "How are you?",
  "variations": [{
    "id": "my-variation",
    "primary": {
      "description": {
        "type": "StructuredText",
        "config": {
          "single": "heading1,heading2,heading3,paragraph",
          "placeholder": "short length text please, ok?"
        }
      }
    },
    "items": {}
  }]
}

module.exports = {
  model
}