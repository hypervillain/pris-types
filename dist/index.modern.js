import generate from '@babel/generator';
import extract from 'babel-extract-named-export';

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

const _handleFields = (fields = {}) => {
  return Object.entries(fields).reduce((acc, [key, fn]) => {
    const depth = fn.toString().split('=>').length - 1;
    return _extends({}, acc, {
      [key]: depth > 1 ? fn({})(key) : fn(key)
    });
  }, {});
};

const variation = zones => {
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
    __common = {}
  } = obj,
        variations = _objectWithoutPropertiesLoose(obj, ["__common"]);

  return {
    title: 'My Slice',
    description: 'Hi!',
    variations: Object.entries(variations).reduce((acc, [key, variation]) => {
      return [...acc, _extends({
        id: key
      }, variation, {
        primary: _extends({}, variation.primary, _handleFields(__common.primary)),
        items: _extends({}, variation.items, _handleFields(__common.items))
      })];
    }, [])
  };
};

const ALL_OPTIONS = ['paragraph', '...'];

const RichText = ({
  placeholder,
  multi: _multi = false,
  options: _options = ALL_OPTIONS
}) => fieldName => ({
  type: 'StructuredText',
  config: {
    [_multi ? 'multi' : 'single']: _options.join(','),
    placeholder: placeholder || `${fieldName} field`
  }
});

const Title = params => fieldName => RichText(_extends({}, params, {
  options: ['heading1', 'heading2']
}))(fieldName);

const Color = ({
  placeholder
}) => fieldName => ({
  type: 'Color',
  config: {
    placeholder: placeholder || `${fieldName} field`
  }
});

const Types = {
  shape,
  variation,
  RichText,
  Title,
  Color
};

// import fs from 'fs'

function validate(Model) {
  if (!Model || !Model.type || Model.type !== 'CallExpression') {
    return false;
  }

  return true;
}

function createEval(node, build) {
  const {
    code
  } = generate(node);
  const req = `pris-types/dist/index.${build ? `${build}.` : ''}js`;
  const str = `
    var dir = "${__dirname}"
    const PrisTypes = require("${req}").PrisTypes;
    return ${code}
  `;
  return str;
}

const extractor = async code => {
  const {
    Model
  } = await extract(code, {
    search: ['Model'],
    fallback: true
  });

  if (!validate(Model)) {
    return {
      err: true
    };
  }

  return {
    Model
  };
};

const evaluator = (Model, {
  build: _build = ''
} = {
  build: ''
}) => {
  const code = createEval(Model, _build);
  const slice = eval('(function() {' + code + '}())');
  return slice;
};

export { Types as PrisTypes, evaluator, extractor };
//# sourceMappingURL=index.modern.js.map
