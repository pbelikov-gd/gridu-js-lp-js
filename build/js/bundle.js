(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":8}],2:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],3:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":6,"./_objectToString":7}],4:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    arrayMap = require('./_arrayMap'),
    isArray = require('./isArray'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;

},{"./_Symbol":1,"./_arrayMap":2,"./isArray":9,"./isSymbol":11}],5:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],7:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],8:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":5}],9:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],10:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],11:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":3,"./isObjectLike":10}],12:[function(require,module,exports){
var baseToString = require('./_baseToString');

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

},{"./_baseToString":4}],13:[function(require,module,exports){
var toString = require('./toString');

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;

},{"./toString":12}],14:[function(require,module,exports){
require('./modules/helpers.js');
require('./modules/zoom.js');

},{"./modules/helpers.js":15,"./modules/zoom.js":16}],15:[function(require,module,exports){
const Zoom = require('./zoom');

/**
 * @class
 * @desc Set of static methods, that are used to display all HTML and CSS (i.e. to make interactive mockup).
 * Once we have some framework here, then this class is likely to be removed.
 */
class Helpers {
  constructor() {}

  // Static methods

  static buy() {
    // IE 9+ solution, older ones not being supported (we'll have to make a workaround
    // with splitting className and joining it back)
    document.querySelector('.buy-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static edit() {
    document.querySelector('.edit-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static delete() {
    document.querySelector('.delete-modal').classList.toggle('not-displayed');
    Helpers.blur();
  }

  static closeModal() {
    document.querySelectorAll('.modal-container').forEach(item => {
      item.classList.add('not-displayed');
    });
    Helpers.blur();
  }

  static blur() {
    document.querySelector('body').classList.toggle('has-modal-active');
  }

  // Private methods

  static initSlider() {
    // Slider is made of jQuery UI slider, so binding is made this way
    if (document.querySelector('.filter-options .slider')) {
      document.querySelectorAll('.filter-options .slider').forEach(obj => {
        let minValue = +obj.dataset.minValue;
        let nextValue = minValue;
        let maxValue = +obj.dataset.maxValue;
        let step = +obj.dataset.step;
        let leftValue = +obj.dataset.leftValue;
        let rightValue = +obj.dataset.rightValue;
        let left = obj.querySelector('.slider-left > .value');
        let right = obj.querySelector('.slider-right .value');
        $(obj).slider({
          range: true,
          min: minValue,
          max: maxValue,
          step: step,
          values: [leftValue, rightValue],
          slide: function (event, ui) {
            left.innerText = ui.values[0];
            right.innerText = ui.values[1];
          }
        });
      });
    }
  }

  static initZoom() {
    document.querySelectorAll('.card-image > .card-image__image-content').forEach(img => {
      new Zoom(img);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Do nothing, if we are already done
  if (window.Helpers) {
    return;
  }

  // Pulling it to global scope for now, as soon as we'll remove it once framework is here
  window.Helpers = Helpers;

  // Now - init the slider
  Helpers.initSlider();

  // Now - lets make it zoom
  Helpers.initZoom();
});

module.exports = {
  Helpers
};

},{"./zoom":16}],16:[function(require,module,exports){
const uniqueId = require('lodash/uniqueId');

class Zoom {
    constructor(target, img, zoomRatio = 2) {
        // No need to make any zooming on non-image, so just throw and exit
        if (!(target instanceof HTMLImageElement)) {
            throw new Error('Zoom can be applied only to images.');
        }

        this.target = target;

        // We should zoom existing image if its not provided explicitly
        this.img = img ? img : this.target.getAttribute('src');
        this.zoom = null;

        // Set ratio
        this.zoomRatio = zoomRatio;

        // Once we are ready - populate the Zoom
        this._init();

        // Set boundaries on init
        this._setSize();
    }

    move(event) {
        // We dont want any default behavior here ...
        event.preventDefault();

        // Now - find out where cursor is ...
        const cursorPosition = this._getCursor(event);

        // Now - find the position of zoom (we need to have cursor in the middle of it)
        let x = cursorPosition.x - this.zoom.offsetWidth / 2;
        let y = cursorPosition.y - this.zoom.offsetHeight / 2;

        // Now - do not let zoom come out from image
        x = Math.min(Math.max(x, 0), this.target.width - this.zoom.offsetWidth);
        y = Math.min(Math.max(y, 0), this.target.height - this.zoom.offsetHeight);

        // Position the zoom
        this.zoom.style.left = `${x}px`;
        this.zoom.style.top = `${y}px`;

        // Position the background
        this.zoom.style.backgroundPosition = `${-x * this.cx}px ${-y * this.cy}px`;
    }

    resize() {
        this._setSize();
    }

    // Private methods

    _init() {
        // Double protect from re-initialization
        if (this.zoom) {
            return;
        }

        // Our zoom will have its own container, that should be uniquely identified
        this.zoom = document.createElement('div');
        this.zoom.id = uniqueId();
        this.zoom.classList.add('image-zoom');
        this.zoom.style.backgroundImage = `url(${this.img})`;

        // Populate it ...
        this.target.parentNode.insertBefore(this.zoom, this.target);

        // Zoom will be hidden by default (we'll have it managed by CSS)
        // Zoom will be invoked when we hover over target
        this.target.addEventListener('mousemove', this.move.bind(this));
        this.zoom.addEventListener('mousemove', this.move.bind(this));

        // We need to adjust when resize
        window.addEventListener('resize', this.resize.bind(this));

        // Future - zoom will be configurable
    }

    _setSize() {
        this.cx = this.zoomRatio;
        this.cy = this.zoomRatio;

        // Implement zooming of the actual image
        this.zoom.style.backgroundSize = `${this.target.width * this.cx}px ${this.target.height * this.cy}px`;
    }

    _getCursor(event) {
        // Get the rectangle (we do it here because of scrolling)
        const rect = this.target.getBoundingClientRect();
        // At this point we need to find X and Y coordinates of the contoller (mouse), relative to target image.
        return {
            x: event.pageX - rect.left - window.pageXOffset,
            y: event.pageY - rect.top - window.pageYOffset
        };
    }
}

module.exports = Zoom;

},{"lodash/uniqueId":13}]},{},[14]);
