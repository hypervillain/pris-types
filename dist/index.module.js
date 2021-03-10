import randomColor from 'randomcolor';
import generate from '@babel/generator';
import extract from 'babel-extract-named-export';
import { config } from 'babel-extract-named-export/babel/react';
import removeImports from 'babel-plugin-transform-remove-imports';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const handleField = ({
  zone,
  mocks,
  fieldKey,
  variation
}) => {
  var _mockVariations$varia, _mockVariations$varia2, _common$zone;

  const {
    id: variationId
  } = variation;

  const {
    __common = {}
  } = mocks,
        mockVariations = _objectWithoutPropertiesLoose(mocks, ["__common"]);

  if (mockVariations != null && (_mockVariations$varia = mockVariations[variationId]) != null && (_mockVariations$varia2 = _mockVariations$varia[zone]) != null && _mockVariations$varia2[fieldKey]) {
    return mockVariations[variationId][zone][fieldKey];
  }

  if ((_common$zone = __common[zone]) != null && _common$zone[fieldKey]) {
    return __common[zone][fieldKey];
  }
};
const handleVariation = (variation, zone, mocks) => {
  const mockedFields = Object.entries(variation.primary).reduce((acc, [key]) => {
    const maybeField = handleField({
      zone,
      mocks,
      variation,
      fieldKey: key
    });

    if (maybeField) {
      return _extends({}, acc, {
        [key]: maybeField
      });
    }

    return acc;
  }, {});
  return Object.keys(mockedFields).length ? mockedFields : null;
};
const handle = (mocks, model) => {
  return model.variations.reduce((acc, variation) => {
    const maybePrimary = handleVariation(variation, 'primary', mocks);
    const maybeItems = handleVariation(variation, 'items', mocks);
    return _extends({}, acc, {
      [variation.id]: {
        primary: maybePrimary || {},
        items: maybeItems || {}
      }
    });
  }, {});
};

var index = {
  __proto__: null,
  handleField: handleField,
  handleVariation: handleVariation,
  handle: handle
};

const createMockContent = fn => () => ({
  content: fn()
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = str => str.replace(hyphenateRE, "-$1").toLowerCase();

const Boolean = ({
  label,
  placeholderFalse,
  placeholderTrue,
  defaultValue
}) => fieldName => ({
  type: 'Boolean',
  config: {
    label: label || `${fieldName} Boolean`,
    placeholder_true: placeholderTrue || 'true',
    placeholder_false: placeholderFalse || 'false',
    default_value: defaultValue != undefined ? defaultValue : true
  }
});

Boolean.Rand = createMockContent(() => Math.random() > .5 ? true : false);
Boolean.True = createMockContent(() => true);
Boolean.False = createMockContent(() => false);

const Color = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'Color',
  config: {
    label: label || `${fieldName} Color`,
    placeholder: placeholder || `${fieldName} value`
  }
});

Color.Rand = createMockContent(() => randomColor());
Color.Dark = createMockContent(() => randomColor({
  luminosity: 'dark'
}));
Color.Light = createMockContent(() => randomColor({
  luminosity: 'light'
}));

const _Date = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'Date',
  config: {
    label: label || `${fieldName} Date`,
    placeholder: placeholder || `${fieldName} value`
  }
});

_Date.Now = createMockContent(() => new Date().toISOString().split('T')[0]);
_Date.Future = createMockContent(() => {
  let d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split('T')[0];
});
_Date.Past = createMockContent(() => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().split('T')[0];
});

const GeoPoint = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'GeoPoint',
  config: {
    label: label || `${fieldName} GeoPoint`,
    placeholder: placeholder || `${fieldName} value`
  }
});

const parseString = (str, name = null) => {
  const [width, height] = str.split('x');
  return _extends({}, name ? {
    name
  } : null, {
    height,
    width
  });
};

const Image = (_ref) => {
  let {
    label = null,
    constraint = "500x500"
  } = _ref,
      thumbnails = _objectWithoutPropertiesLoose(_ref, ["label", "constraint"]);

  return () => ({
    type: 'Image',
    config: {
      constraint: parseString(constraint),
      thumbnails: Object.entries(thumbnails || {}).reduce((acc, [key, str]) => [...acc, parseString(str, key)], [])
    }
  });
};

const Link = ({
  label,
  placeholder,
  allowTargetBlank = null,
  customTypes = null,
  select = null
} = {
  label: null,
  placeholder: null
}) => fieldName => ({
  type: 'Link',
  config: _extends({
    label: label || `${fieldName} Link`,
    placeholder: placeholder || `${fieldName} value`
  }, allowTargetBlank ? {
    allowTargetBlank
  } : null, customTypes ? {
    customtypes: customTypes
  } : null, select ? {
    select
  } : null)
});

Link.Web = createMockContent(() => ({
  link_type: 'Web',
  url: 'https://github.com/hypervillain/pris-types'
}));
Link.Document = createMockContent((ct = 'fake-document', params = {}) => _extends({
  id: "fake-pris-types-id",
  type: ct,
  tags: [],
  slug: ct,
  lang: "en-us",
  link_type: "Document",
  isBroken: false
}, params));
Link.Media = createMockContent(() => {
  console.warn('Link.Media is not implemented. Proceeding with Href link.');
  return {
    link_type: 'Web',
    url: 'https://github.com/hypervillain/pris-types'
  };
});

const Number = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'Date',
  config: {
    label: label || `${fieldName} Date`,
    placeholder: placeholder || `${fieldName} value`
  }
});

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

Number.Small = createMockContent(() => rand(1, 9));
Number.Long = createMockContent(() => rand(1000, 100000));
Number.Negative = createMockContent(() => rand(-1000, -1));

var RichTextOptionsEnum;

(function (RichTextOptionsEnum) {
  RichTextOptionsEnum["p"] = "paragraph";
  RichTextOptionsEnum["pre"] = "preformatted";
  RichTextOptionsEnum["h1"] = "heading1";
  RichTextOptionsEnum["h2"] = "heading2";
  RichTextOptionsEnum["h3"] = "heading3";
  RichTextOptionsEnum["h4"] = "heading4";
  RichTextOptionsEnum["h5"] = "heading5";
  RichTextOptionsEnum["h6"] = "heading6";
  RichTextOptionsEnum["strong"] = "strong";
  RichTextOptionsEnum["em"] = "em";
  RichTextOptionsEnum["link"] = "hyperlink";
  RichTextOptionsEnum["image"] = "image";
  RichTextOptionsEnum["embed"] = "embed";
  RichTextOptionsEnum["list"] = "list-item";
  RichTextOptionsEnum["oList"] = "o-list-item";
  RichTextOptionsEnum["rtl"] = "rtl";
})(RichTextOptionsEnum || (RichTextOptionsEnum = {}));

const RichTextOptions = Object.values(RichTextOptionsEnum);

const RichText = ({
  label = null,
  placeholder = null,
  multi = false,
  options = RichTextOptions
}) => fieldName => ({
  type: 'StructuredText',
  config: {
    label: label || `${fieldName} Richtext`,
    [multi ? 'multi' : 'single']: options.join(','),
    placeholder: placeholder || `${fieldName} field`
  }
});

const createConfig = patternType => (blocks = 1) => ({
  config: {
    patternType,
    blocks
  }
});

RichText.Paragraph = createConfig('PARAGRAPH');
RichText.Heading = createConfig('HEADING');
RichText.Story = createConfig('STORY');

const Select = ({
  label = null,
  placeholder = null,
  options = null,
  defaultValue = null
} = {
  label: null,
  placeholder: null,
  options: ['Option 1', 'Option 2'],
  defaultValue: null
}) => fieldName => ({
  type: 'Select',
  config: {
    label: label || `${fieldName} Select`,
    placeholder: placeholder || `${fieldName} value`,
    options,
    default_value: defaultValue != undefined ? defaultValue : options[0]
  }
});

Select.Option = createMockContent(o => o);

const Text = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'Text',
  config: {
    label: label || `${fieldName} Text`,
    placeholder: placeholder || `${fieldName} value`
  }
});

const Timestamp = ({
  label = null,
  placeholder = null
}) => fieldName => ({
  type: 'Timestamp',
  config: {
    label: label || `${fieldName} Timestamp`,
    placeholder: placeholder || `${fieldName} value`
  }
});

Timestamp.Now = createMockContent(() => new Date().toISOString());
Timestamp.Future = createMockContent(() => {
  let d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString();
});
Timestamp.Past = createMockContent(() => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString();
});

const LinkToWeb = ({
  label = null,
  placeholder = null,
  allowTargetBlank = true
}) => fieldName => Link({
  label,
  placeholder,
  allowTargetBlank
})(fieldName);

LinkToWeb.Web = Link.Web;

const LinkToDoc = ({
  label = null,
  placeholder = null,
  customTypes = []
}) => fieldName => Link({
  label,
  placeholder,
  customTypes,
  select: 'document'
})(fieldName);

LinkToDoc.Document = Link.Document;

const LinkToMedia = ({
  label = null,
  placeholder = null
}) => fieldName => Link({
  label,
  placeholder,
  select: 'media'
})(fieldName);

LinkToMedia.Media = Link.Media;

var TitleOptionsEnum;

(function (TitleOptionsEnum) {
  TitleOptionsEnum["h1"] = "heading1";
  TitleOptionsEnum["h2"] = "heading2";
  TitleOptionsEnum["h3"] = "heading3";
  TitleOptionsEnum["h4"] = "heading4";
  TitleOptionsEnum["h5"] = "heading5";
  TitleOptionsEnum["b"] = "bold";
  TitleOptionsEnum["em"] = "em";
})(TitleOptionsEnum || (TitleOptionsEnum = {}));

const TitleOptions = Object.values(TitleOptionsEnum);

const Title = ({
  label = null,
  placeholder = null,
  multi = false,
  options = TitleOptions
}) => fieldName => RichText({
  label,
  placeholder,
  multi,
  options
})(fieldName);

Title.Heading = RichText.Heading;

const _handleFields = (fields = {}) => {
  return Object.entries(fields).reduce((acc, [key, fn]) => {
    if (!fn) {
      throw new Error(`Unknown helper at key "${key}". Exiting.`);
    }

    const depth = fn.toString().split('=>').length - 1;
    return _extends({}, acc, {
      // @ts-ignore halp!
      [key]: depth > 1 ? fn({})(key) : fn(key)
    });
  }, {});
};

const variation = (zones = {
  primary: {},
  items: {}
}) => {
  const {
    primary,
    items
  } = zones;
  return {
    primary: _handleFields(primary),
    items: _handleFields(items)
  };
};
const shape = obj => {
  const {
    __common = {},
    __meta
  } = obj,
        variations = _objectWithoutPropertiesLoose(obj, ["__common", "__meta"]);

  if (!__meta) {
    throw new Error('Field "__meta" is undefined. It expects properties "title" and "description".');
  }

  if (!__meta.title || !__meta.description) {
    throw new Error('Field "__meta" expects properties "title" and "description".');
  }

  const {
    title,
    description
  } = __meta;
  return {
    title,
    description,
    variations: Object.entries(variations).reduce((acc, [key, variation]) => {
      return [...acc, {
        id: key,
        primary: _extends({}, _handleFields(__common.primary), variation.primary),
        items: _extends({}, _handleFields(__common.items), variation.items)
      }];
    }, [])
  };
};

var Types = {
  __proto__: null,
  Boolean: Boolean,
  Color: Color,
  Date: _Date,
  GeoPoint: GeoPoint,
  Image: Image,
  Link: Link,
  Number: Number,
  RichText: RichText,
  Select: Select,
  Text: Text,
  Timestamp: Timestamp,
  LinkToWeb: LinkToWeb,
  LinkToDoc: LinkToDoc,
  LinkToMedia: LinkToMedia,
  Title: Title,
  shape: shape,
  variation: variation
};

function validate(Model) {
  if (!Model || !Model.type || ['CallExpression', 'ObjectExpression'].indexOf(Model.type) === -1) {
    return false;
  }

  return true;
}
/** Extract Expression from file and validate it */


const extractModel = async (code, filename, {
  plugins = [],
  presets = []
} = config) => {
  const {
    Model,
    Mocks
  } = await extract(code, {
    filename,
    search: ['Model', 'Mocks'],
    useToJs: false,
    plugins: [[removeImports, {
      test: '.*'
    }], ...plugins],
    presets
  });

  if (!validate(Model)) {
    return {
      err: true
    };
  }

  return {
    Model,
    Mocks
  };
};

const prisGenerate = (Model, Mock, sliceName, {
  requirePath,
  build
} = {
  build: ''
}) => {
  const code = {
    model: generate(Model).code,
    mock: generate(Mock).code
  };
  const req = requirePath || `pris-types/dist/index.${build ? `${build}.` : ''}js`;
  const str = `
    const { PrisTypes, PrisMocks } = require("${req}")
    const { ${Object.keys(Types).join(', ')} } = PrisTypes
    const __prisTypesModel = ${code.model}

    const __prisTypesModelWithId = {
      id: "${hyphenate(sliceName)}",
      ...__prisTypesModel
    }

    ${!code.mock ? 'return { model: __prisTypesModelWithId}' : `
      const __prisMocksMock = PrisMocks.handle(${code.mock}, __prisTypesModel)
      return {
        model: __prisTypesModelWithId,
        mockConfig: __prisMocksMock
      }
    `}
  `;

  try {
    return eval('(function() {' + str + '}())');
  } catch (e) {
    return {
      error: e
    };
  }
};

var handlers = {
  __proto__: null,
  extractModel: extractModel,
  generate: prisGenerate
};

export { index as PrisMocks, Types as PrisTypes, handlers };
//# sourceMappingURL=index.module.js.map
