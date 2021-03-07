import randomColor from 'randomcolor';
import generate from '@babel/generator';
import extract from 'babel-extract-named-export';
import { react } from 'babel-extract-named-export/babel';
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
    label: label || `${fieldName} value`,
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

var RichTextOptionsEnum;

(function (RichTextOptionsEnum) {
  RichTextOptionsEnum["h1"] = "heading1";
  RichTextOptionsEnum["h2"] = "heading2";
  RichTextOptionsEnum["h3"] = "heading3";
  RichTextOptionsEnum["paragraph"] = "paragraph";
})(RichTextOptionsEnum || (RichTextOptionsEnum = {}));

const RichTextOptions = Object.values(RichTextOptionsEnum);

const RichText = ({
  placeholder = null,
  multi = false,
  options = RichTextOptions
}) => fieldName => ({
  type: 'StructuredText',
  config: {
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
  placeholder = null,
  multi = false,
  options = TitleOptions
}) => fieldName => RichText({
  placeholder,
  multi,
  options
})(fieldName);

Object.entries(RichText).forEach(([key, fn]) => {
  Title[key] = fn;
});

const _handleFields = (fields = {}) => {
  return Object.entries(fields).reduce((acc, [key, fn]) => {
    const depth = fn.toString().split('=>').length - 1;
    return _extends({}, acc, {
      // @ts-ignore halp!
      [key]: depth > 1 ? fn({})(key) : fn(key)
    });
  }, {});
};

const variation = zones => {
  const {
    primary,
    items,
    id
  } = zones;
  return _extends({}, id ? {
    id
  } : null, {
    primary: _handleFields(primary),
    items: _handleFields(items)
  });
};
const shape = obj => {
  const {
    __common = {},
    __meta
  } = obj,
        variations = _objectWithoutPropertiesLoose(obj, ["__common", "__meta"]);

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
        primary: _extends({}, variation.primary, _handleFields(__common.primary)),
        items: _extends({}, variation.items, _handleFields(__common.items))
      }];
    }, [])
  };
};

var Types = {
  __proto__: null,
  Boolean: Boolean,
  Color: Color,
  RichText: RichText,
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
} = react) => {
  const {
    Model,
    Mocks
  } = await extract(code, {
    filename,
    search: ['Model', 'Mocks'],
    useToJs: false,
    plugins: [[removeImports, {
      test: 'pris-types'
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
    console.error(e);
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
