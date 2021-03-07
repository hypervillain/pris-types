const model = {
  "id": "example-slice",
  "title": "My Cool Slice",
  "description": "How are you?",
  "variations": [{
      "id": "defaultVariation",
      "primary": {
        "description": {
          "type": "StructuredText",
          "config": {
            "single": "heading1,heading2,heading3,paragraph",
            "placeholder": "short length text please, ok?"
          }
        }
      },
      "items": {
        "color": {
          "type": "Color",
          "config": {
            "label": "color Color",
            "placeholder": "color value"
          }
        }
      }
    },
    {
      "id": "anotherVariation",
      "primary": {
        "description": {
          "type": "StructuredText",
          "config": {
            "single": "heading1,heading2,heading3,paragraph",
            "placeholder": "short length text please, ok?"
          }
        }
      },
      "items": {
        "color": {
          "type": "Color",
          "config": {
            "label": "color Color",
            "placeholder": "color value"
          }
        }
      }
    }
  ]
}

module.exports = {
  model
}