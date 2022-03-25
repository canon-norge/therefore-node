(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream'), require('http'), require('url'), require('https'), require('zlib'), require('fs')) :
	typeof define === 'function' && define.amd ? define(['exports', 'stream', 'http', 'url', 'https', 'zlib', 'fs'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["therefore-node"] = {}, global.Stream, global.http, global.Url, global.https, global.zlib, global.fs));
})(this, (function (exports, Stream, http, Url, https, zlib, fs) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
	var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
	var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
	var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
	var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
	var fs__namespace = /*#__PURE__*/_interopNamespace(fs);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var conversions = {};
	var lib$1 = conversions;

	function sign(x) {
	    return x < 0 ? -1 : 1;
	}

	function evenRound(x) {
	    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.
	    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)
	        return Math.floor(x);
	    } else {
	        return Math.round(x);
	    }
	}

	function createNumberConversion(bitLength, typeOpts) {
	    if (!typeOpts.unsigned) {
	        --bitLength;
	    }
	    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);
	    const upperBound = Math.pow(2, bitLength) - 1;

	    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);
	    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

	    return function(V, opts) {
	        if (!opts) opts = {};

	        let x = +V;

	        if (opts.enforceRange) {
	            if (!Number.isFinite(x)) {
	                throw new TypeError("Argument is not a finite number");
	            }

	            x = sign(x) * Math.floor(Math.abs(x));
	            if (x < lowerBound || x > upperBound) {
	                throw new TypeError("Argument is not in byte range");
	            }

	            return x;
	        }

	        if (!isNaN(x) && opts.clamp) {
	            x = evenRound(x);

	            if (x < lowerBound) x = lowerBound;
	            if (x > upperBound) x = upperBound;
	            return x;
	        }

	        if (!Number.isFinite(x) || x === 0) {
	            return 0;
	        }

	        x = sign(x) * Math.floor(Math.abs(x));
	        x = x % moduloVal;

	        if (!typeOpts.unsigned && x >= moduloBound) {
	            return x - moduloVal;
	        } else if (typeOpts.unsigned) {
	            if (x < 0) {
	              x += moduloVal;
	            } else if (x === -0) { // don't return negative zero
	              return 0;
	            }
	        }

	        return x;
	    }
	}

	conversions["void"] = function () {
	    return undefined;
	};

	conversions["boolean"] = function (val) {
	    return !!val;
	};

	conversions["byte"] = createNumberConversion(8, { unsigned: false });
	conversions["octet"] = createNumberConversion(8, { unsigned: true });

	conversions["short"] = createNumberConversion(16, { unsigned: false });
	conversions["unsigned short"] = createNumberConversion(16, { unsigned: true });

	conversions["long"] = createNumberConversion(32, { unsigned: false });
	conversions["unsigned long"] = createNumberConversion(32, { unsigned: true });

	conversions["long long"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });
	conversions["unsigned long long"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });

	conversions["double"] = function (V) {
	    const x = +V;

	    if (!Number.isFinite(x)) {
	        throw new TypeError("Argument is not a finite floating-point value");
	    }

	    return x;
	};

	conversions["unrestricted double"] = function (V) {
	    const x = +V;

	    if (isNaN(x)) {
	        throw new TypeError("Argument is NaN");
	    }

	    return x;
	};

	// not quite valid, but good enough for JS
	conversions["float"] = conversions["double"];
	conversions["unrestricted float"] = conversions["unrestricted double"];

	conversions["DOMString"] = function (V, opts) {
	    if (!opts) opts = {};

	    if (opts.treatNullAsEmptyString && V === null) {
	        return "";
	    }

	    return String(V);
	};

	conversions["ByteString"] = function (V, opts) {
	    const x = String(V);
	    let c = undefined;
	    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
	        if (c > 255) {
	            throw new TypeError("Argument is not a valid bytestring");
	        }
	    }

	    return x;
	};

	conversions["USVString"] = function (V) {
	    const S = String(V);
	    const n = S.length;
	    const U = [];
	    for (let i = 0; i < n; ++i) {
	        const c = S.charCodeAt(i);
	        if (c < 0xD800 || c > 0xDFFF) {
	            U.push(String.fromCodePoint(c));
	        } else if (0xDC00 <= c && c <= 0xDFFF) {
	            U.push(String.fromCodePoint(0xFFFD));
	        } else {
	            if (i === n - 1) {
	                U.push(String.fromCodePoint(0xFFFD));
	            } else {
	                const d = S.charCodeAt(i + 1);
	                if (0xDC00 <= d && d <= 0xDFFF) {
	                    const a = c & 0x3FF;
	                    const b = d & 0x3FF;
	                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
	                    ++i;
	                } else {
	                    U.push(String.fromCodePoint(0xFFFD));
	                }
	            }
	        }
	    }

	    return U.join('');
	};

	conversions["Date"] = function (V, opts) {
	    if (!(V instanceof Date)) {
	        throw new TypeError("Argument is not a Date object");
	    }
	    if (isNaN(V)) {
	        return undefined;
	    }

	    return V;
	};

	conversions["RegExp"] = function (V, opts) {
	    if (!(V instanceof RegExp)) {
	        V = new RegExp(V);
	    }

	    return V;
	};

	var utils = createCommonjsModule(function (module) {

	module.exports.mixin = function mixin(target, source) {
	  const keys = Object.getOwnPropertyNames(source);
	  for (let i = 0; i < keys.length; ++i) {
	    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
	  }
	};

	module.exports.wrapperSymbol = Symbol("wrapper");
	module.exports.implSymbol = Symbol("impl");

	module.exports.wrapperForImpl = function (impl) {
	  return impl[module.exports.wrapperSymbol];
	};

	module.exports.implForWrapper = function (wrapper) {
	  return wrapper[module.exports.implSymbol];
	};
	});
	utils.mixin;
	utils.wrapperSymbol;
	utils.implSymbol;
	utils.wrapperForImpl;
	utils.implForWrapper;

	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'

	/** Regular expressions */
	const regexPunycode = /^xn--/;
	const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	const errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	const floor = Math.floor;
	const stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		const result = [];
		let length = array.length;
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		const parts = string.split('@');
		let result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		const labels = string.split('.');
		const encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		const output = [];
		let counter = 0;
		const length = string.length;
		while (counter < length) {
			const value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// It's a high surrogate, and there is a next character.
				const extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// It's an unmatched surrogate; only append this code unit, in case the
					// next code unit is the high surrogate of a surrogate pair.
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	const ucs2encode = array => String.fromCodePoint(...array);

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	const basicToDigit = function(codePoint) {
		if (codePoint - 0x30 < 0x0A) {
			return codePoint - 0x16;
		}
		if (codePoint - 0x41 < 0x1A) {
			return codePoint - 0x41;
		}
		if (codePoint - 0x61 < 0x1A) {
			return codePoint - 0x61;
		}
		return base;
	};

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	const digitToBasic = function(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	};

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	const adapt = function(delta, numPoints, firstTime) {
		let k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	};

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	const decode = function(input) {
		// Don't use UCS-2.
		const output = [];
		const inputLength = input.length;
		let i = 0;
		let n = initialN;
		let bias = initialBias;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		let basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (let j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			let oldi = i;
			for (let w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				const digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				const baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			const out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output.
			output.splice(i++, 0, n);

		}

		return String.fromCodePoint(...output);
	};

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	const encode = function(input) {
		const output = [];

		// Convert the input in UCS-2 to an array of Unicode code points.
		input = ucs2decode(input);

		// Cache the length.
		let inputLength = input.length;

		// Initialize the state.
		let n = initialN;
		let delta = 0;
		let bias = initialBias;

		// Handle the basic code points.
		for (const currentValue of input) {
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		let basicLength = output.length;
		let handledCPCount = basicLength;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string with a delimiter unless it's empty.
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			let m = maxInt;
			for (const currentValue of input) {
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow.
			const handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (const currentValue of input) {
				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}
				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer.
					let q = delta;
					for (let k = base; /* no condition */; k += base) {
						const t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						const qMinusT = q - t;
						const baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	};

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	const toUnicode$1 = function(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	};

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	const toASCII$1 = function(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	};

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	const punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '2.1.0',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII$1,
		'toUnicode': toUnicode$1
	};

	var punycode_1 = punycode;

	var mappingTable$1 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var mappingTable = getCjsExportFromNamespace(mappingTable$1);

	var PROCESSING_OPTIONS = {
	  TRANSITIONAL: 0,
	  NONTRANSITIONAL: 1
	};

	function normalize(str) { // fix bug in v8
	  return str.split('\u0000').map(function (s) { return s.normalize('NFC'); }).join('\u0000');
	}

	function findStatus(val) {
	  var start = 0;
	  var end = mappingTable.length - 1;

	  while (start <= end) {
	    var mid = Math.floor((start + end) / 2);

	    var target = mappingTable[mid];
	    if (target[0][0] <= val && target[0][1] >= val) {
	      return target;
	    } else if (target[0][0] > val) {
	      end = mid - 1;
	    } else {
	      start = mid + 1;
	    }
	  }

	  return null;
	}

	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

	function countSymbols(string) {
	  return string
	    // replace every surrogate pair with a BMP symbol
	    .replace(regexAstralSymbols, '_')
	    // then get the length
	    .length;
	}

	function mapChars(domain_name, useSTD3, processing_option) {
	  var hasError = false;
	  var processed = "";

	  var len = countSymbols(domain_name);
	  for (var i = 0; i < len; ++i) {
	    var codePoint = domain_name.codePointAt(i);
	    var status = findStatus(codePoint);

	    switch (status[1]) {
	      case "disallowed":
	        hasError = true;
	        processed += String.fromCodePoint(codePoint);
	        break;
	      case "ignored":
	        break;
	      case "mapped":
	        processed += String.fromCodePoint.apply(String, status[2]);
	        break;
	      case "deviation":
	        if (processing_option === PROCESSING_OPTIONS.TRANSITIONAL) {
	          processed += String.fromCodePoint.apply(String, status[2]);
	        } else {
	          processed += String.fromCodePoint(codePoint);
	        }
	        break;
	      case "valid":
	        processed += String.fromCodePoint(codePoint);
	        break;
	      case "disallowed_STD3_mapped":
	        if (useSTD3) {
	          hasError = true;
	          processed += String.fromCodePoint(codePoint);
	        } else {
	          processed += String.fromCodePoint.apply(String, status[2]);
	        }
	        break;
	      case "disallowed_STD3_valid":
	        if (useSTD3) {
	          hasError = true;
	        }

	        processed += String.fromCodePoint(codePoint);
	        break;
	    }
	  }

	  return {
	    string: processed,
	    error: hasError
	  };
	}

	var combiningMarksRegex = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;

	function validateLabel(label, processing_option) {
	  if (label.substr(0, 4) === "xn--") {
	    label = punycode_1.toUnicode(label);
	  }

	  var error = false;

	  if (normalize(label) !== label ||
	      (label[3] === "-" && label[4] === "-") ||
	      label[0] === "-" || label[label.length - 1] === "-" ||
	      label.indexOf(".") !== -1 ||
	      label.search(combiningMarksRegex) === 0) {
	    error = true;
	  }

	  var len = countSymbols(label);
	  for (var i = 0; i < len; ++i) {
	    var status = findStatus(label.codePointAt(i));
	    if ((processing === PROCESSING_OPTIONS.TRANSITIONAL && status[1] !== "valid") ||
	        (processing === PROCESSING_OPTIONS.NONTRANSITIONAL &&
	         status[1] !== "valid" && status[1] !== "deviation")) {
	      error = true;
	      break;
	    }
	  }

	  return {
	    label: label,
	    error: error
	  };
	}

	function processing(domain_name, useSTD3, processing_option) {
	  var result = mapChars(domain_name, useSTD3, processing_option);
	  result.string = normalize(result.string);

	  var labels = result.string.split(".");
	  for (var i = 0; i < labels.length; ++i) {
	    try {
	      var validation = validateLabel(labels[i]);
	      labels[i] = validation.label;
	      result.error = result.error || validation.error;
	    } catch(e) {
	      result.error = true;
	    }
	  }

	  return {
	    string: labels.join("."),
	    error: result.error
	  };
	}

	var toASCII = function(domain_name, useSTD3, processing_option, verifyDnsLength) {
	  var result = processing(domain_name, useSTD3, processing_option);
	  var labels = result.string.split(".");
	  labels = labels.map(function(l) {
	    try {
	      return punycode_1.toASCII(l);
	    } catch(e) {
	      result.error = true;
	      return l;
	    }
	  });

	  if (verifyDnsLength) {
	    var total = labels.slice(0, labels.length - 1).join(".").length;
	    if (total.length > 253 || total.length === 0) {
	      result.error = true;
	    }

	    for (var i=0; i < labels.length; ++i) {
	      if (labels.length > 63 || labels.length === 0) {
	        result.error = true;
	        break;
	      }
	    }
	  }

	  if (result.error) return null;
	  return labels.join(".");
	};

	var toUnicode = function(domain_name, useSTD3) {
	  var result = processing(domain_name, useSTD3, PROCESSING_OPTIONS.NONTRANSITIONAL);

	  return {
	    domain: result.string,
	    error: result.error
	  };
	};

	var PROCESSING_OPTIONS_1 = PROCESSING_OPTIONS;

	var tr46 = {
		toASCII: toASCII,
		toUnicode: toUnicode,
		PROCESSING_OPTIONS: PROCESSING_OPTIONS_1
	};

	var urlStateMachine = createCommonjsModule(function (module) {



	const specialSchemes = {
	  ftp: 21,
	  file: null,
	  gopher: 70,
	  http: 80,
	  https: 443,
	  ws: 80,
	  wss: 443
	};

	const failure = Symbol("failure");

	function countSymbols(str) {
	  return punycode_1.ucs2.decode(str).length;
	}

	function at(input, idx) {
	  const c = input[idx];
	  return isNaN(c) ? undefined : String.fromCodePoint(c);
	}

	function isASCIIDigit(c) {
	  return c >= 0x30 && c <= 0x39;
	}

	function isASCIIAlpha(c) {
	  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
	}

	function isASCIIAlphanumeric(c) {
	  return isASCIIAlpha(c) || isASCIIDigit(c);
	}

	function isASCIIHex(c) {
	  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
	}

	function isSingleDot(buffer) {
	  return buffer === "." || buffer.toLowerCase() === "%2e";
	}

	function isDoubleDot(buffer) {
	  buffer = buffer.toLowerCase();
	  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
	}

	function isWindowsDriveLetterCodePoints(cp1, cp2) {
	  return isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
	}

	function isWindowsDriveLetterString(string) {
	  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
	}

	function isNormalizedWindowsDriveLetterString(string) {
	  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
	}

	function containsForbiddenHostCodePoint(string) {
	  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1;
	}

	function containsForbiddenHostCodePointExcludingPercent(string) {
	  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1;
	}

	function isSpecialScheme(scheme) {
	  return specialSchemes[scheme] !== undefined;
	}

	function isSpecial(url) {
	  return isSpecialScheme(url.scheme);
	}

	function defaultPort(scheme) {
	  return specialSchemes[scheme];
	}

	function percentEncode(c) {
	  let hex = c.toString(16).toUpperCase();
	  if (hex.length === 1) {
	    hex = "0" + hex;
	  }

	  return "%" + hex;
	}

	function utf8PercentEncode(c) {
	  const buf = new Buffer(c);

	  let str = "";

	  for (let i = 0; i < buf.length; ++i) {
	    str += percentEncode(buf[i]);
	  }

	  return str;
	}

	function utf8PercentDecode(str) {
	  const input = new Buffer(str);
	  const output = [];
	  for (let i = 0; i < input.length; ++i) {
	    if (input[i] !== 37) {
	      output.push(input[i]);
	    } else if (input[i] === 37 && isASCIIHex(input[i + 1]) && isASCIIHex(input[i + 2])) {
	      output.push(parseInt(input.slice(i + 1, i + 3).toString(), 16));
	      i += 2;
	    } else {
	      output.push(input[i]);
	    }
	  }
	  return new Buffer(output).toString();
	}

	function isC0ControlPercentEncode(c) {
	  return c <= 0x1F || c > 0x7E;
	}

	const extraPathPercentEncodeSet = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);
	function isPathPercentEncode(c) {
	  return isC0ControlPercentEncode(c) || extraPathPercentEncodeSet.has(c);
	}

	const extraUserinfoPercentEncodeSet =
	  new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
	function isUserinfoPercentEncode(c) {
	  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
	}

	function percentEncodeChar(c, encodeSetPredicate) {
	  const cStr = String.fromCodePoint(c);

	  if (encodeSetPredicate(c)) {
	    return utf8PercentEncode(cStr);
	  }

	  return cStr;
	}

	function parseIPv4Number(input) {
	  let R = 10;

	  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
	    input = input.substring(2);
	    R = 16;
	  } else if (input.length >= 2 && input.charAt(0) === "0") {
	    input = input.substring(1);
	    R = 8;
	  }

	  if (input === "") {
	    return 0;
	  }

	  const regex = R === 10 ? /[^0-9]/ : (R === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/);
	  if (regex.test(input)) {
	    return failure;
	  }

	  return parseInt(input, R);
	}

	function parseIPv4(input) {
	  const parts = input.split(".");
	  if (parts[parts.length - 1] === "") {
	    if (parts.length > 1) {
	      parts.pop();
	    }
	  }

	  if (parts.length > 4) {
	    return input;
	  }

	  const numbers = [];
	  for (const part of parts) {
	    if (part === "") {
	      return input;
	    }
	    const n = parseIPv4Number(part);
	    if (n === failure) {
	      return input;
	    }

	    numbers.push(n);
	  }

	  for (let i = 0; i < numbers.length - 1; ++i) {
	    if (numbers[i] > 255) {
	      return failure;
	    }
	  }
	  if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
	    return failure;
	  }

	  let ipv4 = numbers.pop();
	  let counter = 0;

	  for (const n of numbers) {
	    ipv4 += n * Math.pow(256, 3 - counter);
	    ++counter;
	  }

	  return ipv4;
	}

	function serializeIPv4(address) {
	  let output = "";
	  let n = address;

	  for (let i = 1; i <= 4; ++i) {
	    output = String(n % 256) + output;
	    if (i !== 4) {
	      output = "." + output;
	    }
	    n = Math.floor(n / 256);
	  }

	  return output;
	}

	function parseIPv6(input) {
	  const address = [0, 0, 0, 0, 0, 0, 0, 0];
	  let pieceIndex = 0;
	  let compress = null;
	  let pointer = 0;

	  input = punycode_1.ucs2.decode(input);

	  if (input[pointer] === 58) {
	    if (input[pointer + 1] !== 58) {
	      return failure;
	    }

	    pointer += 2;
	    ++pieceIndex;
	    compress = pieceIndex;
	  }

	  while (pointer < input.length) {
	    if (pieceIndex === 8) {
	      return failure;
	    }

	    if (input[pointer] === 58) {
	      if (compress !== null) {
	        return failure;
	      }
	      ++pointer;
	      ++pieceIndex;
	      compress = pieceIndex;
	      continue;
	    }

	    let value = 0;
	    let length = 0;

	    while (length < 4 && isASCIIHex(input[pointer])) {
	      value = value * 0x10 + parseInt(at(input, pointer), 16);
	      ++pointer;
	      ++length;
	    }

	    if (input[pointer] === 46) {
	      if (length === 0) {
	        return failure;
	      }

	      pointer -= length;

	      if (pieceIndex > 6) {
	        return failure;
	      }

	      let numbersSeen = 0;

	      while (input[pointer] !== undefined) {
	        let ipv4Piece = null;

	        if (numbersSeen > 0) {
	          if (input[pointer] === 46 && numbersSeen < 4) {
	            ++pointer;
	          } else {
	            return failure;
	          }
	        }

	        if (!isASCIIDigit(input[pointer])) {
	          return failure;
	        }

	        while (isASCIIDigit(input[pointer])) {
	          const number = parseInt(at(input, pointer));
	          if (ipv4Piece === null) {
	            ipv4Piece = number;
	          } else if (ipv4Piece === 0) {
	            return failure;
	          } else {
	            ipv4Piece = ipv4Piece * 10 + number;
	          }
	          if (ipv4Piece > 255) {
	            return failure;
	          }
	          ++pointer;
	        }

	        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

	        ++numbersSeen;

	        if (numbersSeen === 2 || numbersSeen === 4) {
	          ++pieceIndex;
	        }
	      }

	      if (numbersSeen !== 4) {
	        return failure;
	      }

	      break;
	    } else if (input[pointer] === 58) {
	      ++pointer;
	      if (input[pointer] === undefined) {
	        return failure;
	      }
	    } else if (input[pointer] !== undefined) {
	      return failure;
	    }

	    address[pieceIndex] = value;
	    ++pieceIndex;
	  }

	  if (compress !== null) {
	    let swaps = pieceIndex - compress;
	    pieceIndex = 7;
	    while (pieceIndex !== 0 && swaps > 0) {
	      const temp = address[compress + swaps - 1];
	      address[compress + swaps - 1] = address[pieceIndex];
	      address[pieceIndex] = temp;
	      --pieceIndex;
	      --swaps;
	    }
	  } else if (compress === null && pieceIndex !== 8) {
	    return failure;
	  }

	  return address;
	}

	function serializeIPv6(address) {
	  let output = "";
	  const seqResult = findLongestZeroSequence(address);
	  const compress = seqResult.idx;
	  let ignore0 = false;

	  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
	    if (ignore0 && address[pieceIndex] === 0) {
	      continue;
	    } else if (ignore0) {
	      ignore0 = false;
	    }

	    if (compress === pieceIndex) {
	      const separator = pieceIndex === 0 ? "::" : ":";
	      output += separator;
	      ignore0 = true;
	      continue;
	    }

	    output += address[pieceIndex].toString(16);

	    if (pieceIndex !== 7) {
	      output += ":";
	    }
	  }

	  return output;
	}

	function parseHost(input, isSpecialArg) {
	  if (input[0] === "[") {
	    if (input[input.length - 1] !== "]") {
	      return failure;
	    }

	    return parseIPv6(input.substring(1, input.length - 1));
	  }

	  if (!isSpecialArg) {
	    return parseOpaqueHost(input);
	  }

	  const domain = utf8PercentDecode(input);
	  const asciiDomain = tr46.toASCII(domain, false, tr46.PROCESSING_OPTIONS.NONTRANSITIONAL, false);
	  if (asciiDomain === null) {
	    return failure;
	  }

	  if (containsForbiddenHostCodePoint(asciiDomain)) {
	    return failure;
	  }

	  const ipv4Host = parseIPv4(asciiDomain);
	  if (typeof ipv4Host === "number" || ipv4Host === failure) {
	    return ipv4Host;
	  }

	  return asciiDomain;
	}

	function parseOpaqueHost(input) {
	  if (containsForbiddenHostCodePointExcludingPercent(input)) {
	    return failure;
	  }

	  let output = "";
	  const decoded = punycode_1.ucs2.decode(input);
	  for (let i = 0; i < decoded.length; ++i) {
	    output += percentEncodeChar(decoded[i], isC0ControlPercentEncode);
	  }
	  return output;
	}

	function findLongestZeroSequence(arr) {
	  let maxIdx = null;
	  let maxLen = 1; // only find elements > 1
	  let currStart = null;
	  let currLen = 0;

	  for (let i = 0; i < arr.length; ++i) {
	    if (arr[i] !== 0) {
	      if (currLen > maxLen) {
	        maxIdx = currStart;
	        maxLen = currLen;
	      }

	      currStart = null;
	      currLen = 0;
	    } else {
	      if (currStart === null) {
	        currStart = i;
	      }
	      ++currLen;
	    }
	  }

	  // if trailing zeros
	  if (currLen > maxLen) {
	    maxIdx = currStart;
	    maxLen = currLen;
	  }

	  return {
	    idx: maxIdx,
	    len: maxLen
	  };
	}

	function serializeHost(host) {
	  if (typeof host === "number") {
	    return serializeIPv4(host);
	  }

	  // IPv6 serializer
	  if (host instanceof Array) {
	    return "[" + serializeIPv6(host) + "]";
	  }

	  return host;
	}

	function trimControlChars(url) {
	  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
	}

	function trimTabAndNewline(url) {
	  return url.replace(/\u0009|\u000A|\u000D/g, "");
	}

	function shortenPath(url) {
	  const path = url.path;
	  if (path.length === 0) {
	    return;
	  }
	  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
	    return;
	  }

	  path.pop();
	}

	function includesCredentials(url) {
	  return url.username !== "" || url.password !== "";
	}

	function cannotHaveAUsernamePasswordPort(url) {
	  return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
	}

	function isNormalizedWindowsDriveLetter(string) {
	  return /^[A-Za-z]:$/.test(string);
	}

	function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
	  this.pointer = 0;
	  this.input = input;
	  this.base = base || null;
	  this.encodingOverride = encodingOverride || "utf-8";
	  this.stateOverride = stateOverride;
	  this.url = url;
	  this.failure = false;
	  this.parseError = false;

	  if (!this.url) {
	    this.url = {
	      scheme: "",
	      username: "",
	      password: "",
	      host: null,
	      port: null,
	      path: [],
	      query: null,
	      fragment: null,

	      cannotBeABaseURL: false
	    };

	    const res = trimControlChars(this.input);
	    if (res !== this.input) {
	      this.parseError = true;
	    }
	    this.input = res;
	  }

	  const res = trimTabAndNewline(this.input);
	  if (res !== this.input) {
	    this.parseError = true;
	  }
	  this.input = res;

	  this.state = stateOverride || "scheme start";

	  this.buffer = "";
	  this.atFlag = false;
	  this.arrFlag = false;
	  this.passwordTokenSeenFlag = false;

	  this.input = punycode_1.ucs2.decode(this.input);

	  for (; this.pointer <= this.input.length; ++this.pointer) {
	    const c = this.input[this.pointer];
	    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

	    // exec state machine
	    const ret = this["parse " + this.state](c, cStr);
	    if (!ret) {
	      break; // terminate algorithm
	    } else if (ret === failure) {
	      this.failure = true;
	      break;
	    }
	  }
	}

	URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
	  if (isASCIIAlpha(c)) {
	    this.buffer += cStr.toLowerCase();
	    this.state = "scheme";
	  } else if (!this.stateOverride) {
	    this.state = "no scheme";
	    --this.pointer;
	  } else {
	    this.parseError = true;
	    return failure;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
	  if (isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
	    this.buffer += cStr.toLowerCase();
	  } else if (c === 58) {
	    if (this.stateOverride) {
	      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
	        return false;
	      }

	      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
	        return false;
	      }

	      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
	        return false;
	      }

	      if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) {
	        return false;
	      }
	    }
	    this.url.scheme = this.buffer;
	    this.buffer = "";
	    if (this.stateOverride) {
	      return false;
	    }
	    if (this.url.scheme === "file") {
	      if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
	        this.parseError = true;
	      }
	      this.state = "file";
	    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
	      this.state = "special relative or authority";
	    } else if (isSpecial(this.url)) {
	      this.state = "special authority slashes";
	    } else if (this.input[this.pointer + 1] === 47) {
	      this.state = "path or authority";
	      ++this.pointer;
	    } else {
	      this.url.cannotBeABaseURL = true;
	      this.url.path.push("");
	      this.state = "cannot-be-a-base-URL path";
	    }
	  } else if (!this.stateOverride) {
	    this.buffer = "";
	    this.state = "no scheme";
	    this.pointer = -1;
	  } else {
	    this.parseError = true;
	    return failure;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
	  if (this.base === null || (this.base.cannotBeABaseURL && c !== 35)) {
	    return failure;
	  } else if (this.base.cannotBeABaseURL && c === 35) {
	    this.url.scheme = this.base.scheme;
	    this.url.path = this.base.path.slice();
	    this.url.query = this.base.query;
	    this.url.fragment = "";
	    this.url.cannotBeABaseURL = true;
	    this.state = "fragment";
	  } else if (this.base.scheme === "file") {
	    this.state = "file";
	    --this.pointer;
	  } else {
	    this.state = "relative";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
	  if (c === 47 && this.input[this.pointer + 1] === 47) {
	    this.state = "special authority ignore slashes";
	    ++this.pointer;
	  } else {
	    this.parseError = true;
	    this.state = "relative";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
	  if (c === 47) {
	    this.state = "authority";
	  } else {
	    this.state = "path";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
	  this.url.scheme = this.base.scheme;
	  if (isNaN(c)) {
	    this.url.username = this.base.username;
	    this.url.password = this.base.password;
	    this.url.host = this.base.host;
	    this.url.port = this.base.port;
	    this.url.path = this.base.path.slice();
	    this.url.query = this.base.query;
	  } else if (c === 47) {
	    this.state = "relative slash";
	  } else if (c === 63) {
	    this.url.username = this.base.username;
	    this.url.password = this.base.password;
	    this.url.host = this.base.host;
	    this.url.port = this.base.port;
	    this.url.path = this.base.path.slice();
	    this.url.query = "";
	    this.state = "query";
	  } else if (c === 35) {
	    this.url.username = this.base.username;
	    this.url.password = this.base.password;
	    this.url.host = this.base.host;
	    this.url.port = this.base.port;
	    this.url.path = this.base.path.slice();
	    this.url.query = this.base.query;
	    this.url.fragment = "";
	    this.state = "fragment";
	  } else if (isSpecial(this.url) && c === 92) {
	    this.parseError = true;
	    this.state = "relative slash";
	  } else {
	    this.url.username = this.base.username;
	    this.url.password = this.base.password;
	    this.url.host = this.base.host;
	    this.url.port = this.base.port;
	    this.url.path = this.base.path.slice(0, this.base.path.length - 1);

	    this.state = "path";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
	  if (isSpecial(this.url) && (c === 47 || c === 92)) {
	    if (c === 92) {
	      this.parseError = true;
	    }
	    this.state = "special authority ignore slashes";
	  } else if (c === 47) {
	    this.state = "authority";
	  } else {
	    this.url.username = this.base.username;
	    this.url.password = this.base.password;
	    this.url.host = this.base.host;
	    this.url.port = this.base.port;
	    this.state = "path";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
	  if (c === 47 && this.input[this.pointer + 1] === 47) {
	    this.state = "special authority ignore slashes";
	    ++this.pointer;
	  } else {
	    this.parseError = true;
	    this.state = "special authority ignore slashes";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
	  if (c !== 47 && c !== 92) {
	    this.state = "authority";
	    --this.pointer;
	  } else {
	    this.parseError = true;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
	  if (c === 64) {
	    this.parseError = true;
	    if (this.atFlag) {
	      this.buffer = "%40" + this.buffer;
	    }
	    this.atFlag = true;

	    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
	    const len = countSymbols(this.buffer);
	    for (let pointer = 0; pointer < len; ++pointer) {
	      const codePoint = this.buffer.codePointAt(pointer);

	      if (codePoint === 58 && !this.passwordTokenSeenFlag) {
	        this.passwordTokenSeenFlag = true;
	        continue;
	      }
	      const encodedCodePoints = percentEncodeChar(codePoint, isUserinfoPercentEncode);
	      if (this.passwordTokenSeenFlag) {
	        this.url.password += encodedCodePoints;
	      } else {
	        this.url.username += encodedCodePoints;
	      }
	    }
	    this.buffer = "";
	  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
	             (isSpecial(this.url) && c === 92)) {
	    if (this.atFlag && this.buffer === "") {
	      this.parseError = true;
	      return failure;
	    }
	    this.pointer -= countSymbols(this.buffer) + 1;
	    this.buffer = "";
	    this.state = "host";
	  } else {
	    this.buffer += cStr;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse hostname"] =
	URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
	  if (this.stateOverride && this.url.scheme === "file") {
	    --this.pointer;
	    this.state = "file host";
	  } else if (c === 58 && !this.arrFlag) {
	    if (this.buffer === "") {
	      this.parseError = true;
	      return failure;
	    }

	    const host = parseHost(this.buffer, isSpecial(this.url));
	    if (host === failure) {
	      return failure;
	    }

	    this.url.host = host;
	    this.buffer = "";
	    this.state = "port";
	    if (this.stateOverride === "hostname") {
	      return false;
	    }
	  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
	             (isSpecial(this.url) && c === 92)) {
	    --this.pointer;
	    if (isSpecial(this.url) && this.buffer === "") {
	      this.parseError = true;
	      return failure;
	    } else if (this.stateOverride && this.buffer === "" &&
	               (includesCredentials(this.url) || this.url.port !== null)) {
	      this.parseError = true;
	      return false;
	    }

	    const host = parseHost(this.buffer, isSpecial(this.url));
	    if (host === failure) {
	      return failure;
	    }

	    this.url.host = host;
	    this.buffer = "";
	    this.state = "path start";
	    if (this.stateOverride) {
	      return false;
	    }
	  } else {
	    if (c === 91) {
	      this.arrFlag = true;
	    } else if (c === 93) {
	      this.arrFlag = false;
	    }
	    this.buffer += cStr;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
	  if (isASCIIDigit(c)) {
	    this.buffer += cStr;
	  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
	             (isSpecial(this.url) && c === 92) ||
	             this.stateOverride) {
	    if (this.buffer !== "") {
	      const port = parseInt(this.buffer);
	      if (port > Math.pow(2, 16) - 1) {
	        this.parseError = true;
	        return failure;
	      }
	      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
	      this.buffer = "";
	    }
	    if (this.stateOverride) {
	      return false;
	    }
	    this.state = "path start";
	    --this.pointer;
	  } else {
	    this.parseError = true;
	    return failure;
	  }

	  return true;
	};

	const fileOtherwiseCodePoints = new Set([47, 92, 63, 35]);

	URLStateMachine.prototype["parse file"] = function parseFile(c) {
	  this.url.scheme = "file";

	  if (c === 47 || c === 92) {
	    if (c === 92) {
	      this.parseError = true;
	    }
	    this.state = "file slash";
	  } else if (this.base !== null && this.base.scheme === "file") {
	    if (isNaN(c)) {
	      this.url.host = this.base.host;
	      this.url.path = this.base.path.slice();
	      this.url.query = this.base.query;
	    } else if (c === 63) {
	      this.url.host = this.base.host;
	      this.url.path = this.base.path.slice();
	      this.url.query = "";
	      this.state = "query";
	    } else if (c === 35) {
	      this.url.host = this.base.host;
	      this.url.path = this.base.path.slice();
	      this.url.query = this.base.query;
	      this.url.fragment = "";
	      this.state = "fragment";
	    } else {
	      if (this.input.length - this.pointer - 1 === 0 || // remaining consists of 0 code points
	          !isWindowsDriveLetterCodePoints(c, this.input[this.pointer + 1]) ||
	          (this.input.length - this.pointer - 1 >= 2 && // remaining has at least 2 code points
	           !fileOtherwiseCodePoints.has(this.input[this.pointer + 2]))) {
	        this.url.host = this.base.host;
	        this.url.path = this.base.path.slice();
	        shortenPath(this.url);
	      } else {
	        this.parseError = true;
	      }

	      this.state = "path";
	      --this.pointer;
	    }
	  } else {
	    this.state = "path";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
	  if (c === 47 || c === 92) {
	    if (c === 92) {
	      this.parseError = true;
	    }
	    this.state = "file host";
	  } else {
	    if (this.base !== null && this.base.scheme === "file") {
	      if (isNormalizedWindowsDriveLetterString(this.base.path[0])) {
	        this.url.path.push(this.base.path[0]);
	      } else {
	        this.url.host = this.base.host;
	      }
	    }
	    this.state = "path";
	    --this.pointer;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
	  if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
	    --this.pointer;
	    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
	      this.parseError = true;
	      this.state = "path";
	    } else if (this.buffer === "") {
	      this.url.host = "";
	      if (this.stateOverride) {
	        return false;
	      }
	      this.state = "path start";
	    } else {
	      let host = parseHost(this.buffer, isSpecial(this.url));
	      if (host === failure) {
	        return failure;
	      }
	      if (host === "localhost") {
	        host = "";
	      }
	      this.url.host = host;

	      if (this.stateOverride) {
	        return false;
	      }

	      this.buffer = "";
	      this.state = "path start";
	    }
	  } else {
	    this.buffer += cStr;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
	  if (isSpecial(this.url)) {
	    if (c === 92) {
	      this.parseError = true;
	    }
	    this.state = "path";

	    if (c !== 47 && c !== 92) {
	      --this.pointer;
	    }
	  } else if (!this.stateOverride && c === 63) {
	    this.url.query = "";
	    this.state = "query";
	  } else if (!this.stateOverride && c === 35) {
	    this.url.fragment = "";
	    this.state = "fragment";
	  } else if (c !== undefined) {
	    this.state = "path";
	    if (c !== 47) {
	      --this.pointer;
	    }
	  }

	  return true;
	};

	URLStateMachine.prototype["parse path"] = function parsePath(c) {
	  if (isNaN(c) || c === 47 || (isSpecial(this.url) && c === 92) ||
	      (!this.stateOverride && (c === 63 || c === 35))) {
	    if (isSpecial(this.url) && c === 92) {
	      this.parseError = true;
	    }

	    if (isDoubleDot(this.buffer)) {
	      shortenPath(this.url);
	      if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
	        this.url.path.push("");
	      }
	    } else if (isSingleDot(this.buffer) && c !== 47 &&
	               !(isSpecial(this.url) && c === 92)) {
	      this.url.path.push("");
	    } else if (!isSingleDot(this.buffer)) {
	      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
	        if (this.url.host !== "" && this.url.host !== null) {
	          this.parseError = true;
	          this.url.host = "";
	        }
	        this.buffer = this.buffer[0] + ":";
	      }
	      this.url.path.push(this.buffer);
	    }
	    this.buffer = "";
	    if (this.url.scheme === "file" && (c === undefined || c === 63 || c === 35)) {
	      while (this.url.path.length > 1 && this.url.path[0] === "") {
	        this.parseError = true;
	        this.url.path.shift();
	      }
	    }
	    if (c === 63) {
	      this.url.query = "";
	      this.state = "query";
	    }
	    if (c === 35) {
	      this.url.fragment = "";
	      this.state = "fragment";
	    }
	  } else {
	    // TODO: If c is not a URL code point and not "%", parse error.

	    if (c === 37 &&
	      (!isASCIIHex(this.input[this.pointer + 1]) ||
	        !isASCIIHex(this.input[this.pointer + 2]))) {
	      this.parseError = true;
	    }

	    this.buffer += percentEncodeChar(c, isPathPercentEncode);
	  }

	  return true;
	};

	URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
	  if (c === 63) {
	    this.url.query = "";
	    this.state = "query";
	  } else if (c === 35) {
	    this.url.fragment = "";
	    this.state = "fragment";
	  } else {
	    // TODO: Add: not a URL code point
	    if (!isNaN(c) && c !== 37) {
	      this.parseError = true;
	    }

	    if (c === 37 &&
	        (!isASCIIHex(this.input[this.pointer + 1]) ||
	         !isASCIIHex(this.input[this.pointer + 2]))) {
	      this.parseError = true;
	    }

	    if (!isNaN(c)) {
	      this.url.path[0] = this.url.path[0] + percentEncodeChar(c, isC0ControlPercentEncode);
	    }
	  }

	  return true;
	};

	URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
	  if (isNaN(c) || (!this.stateOverride && c === 35)) {
	    if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
	      this.encodingOverride = "utf-8";
	    }

	    const buffer = new Buffer(this.buffer); // TODO: Use encoding override instead
	    for (let i = 0; i < buffer.length; ++i) {
	      if (buffer[i] < 0x21 || buffer[i] > 0x7E || buffer[i] === 0x22 || buffer[i] === 0x23 ||
	          buffer[i] === 0x3C || buffer[i] === 0x3E) {
	        this.url.query += percentEncode(buffer[i]);
	      } else {
	        this.url.query += String.fromCodePoint(buffer[i]);
	      }
	    }

	    this.buffer = "";
	    if (c === 35) {
	      this.url.fragment = "";
	      this.state = "fragment";
	    }
	  } else {
	    // TODO: If c is not a URL code point and not "%", parse error.
	    if (c === 37 &&
	      (!isASCIIHex(this.input[this.pointer + 1]) ||
	        !isASCIIHex(this.input[this.pointer + 2]))) {
	      this.parseError = true;
	    }

	    this.buffer += cStr;
	  }

	  return true;
	};

	URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
	  if (isNaN(c)) ; else if (c === 0x0) {
	    this.parseError = true;
	  } else {
	    // TODO: If c is not a URL code point and not "%", parse error.
	    if (c === 37 &&
	      (!isASCIIHex(this.input[this.pointer + 1]) ||
	        !isASCIIHex(this.input[this.pointer + 2]))) {
	      this.parseError = true;
	    }

	    this.url.fragment += percentEncodeChar(c, isC0ControlPercentEncode);
	  }

	  return true;
	};

	function serializeURL(url, excludeFragment) {
	  let output = url.scheme + ":";
	  if (url.host !== null) {
	    output += "//";

	    if (url.username !== "" || url.password !== "") {
	      output += url.username;
	      if (url.password !== "") {
	        output += ":" + url.password;
	      }
	      output += "@";
	    }

	    output += serializeHost(url.host);

	    if (url.port !== null) {
	      output += ":" + url.port;
	    }
	  } else if (url.host === null && url.scheme === "file") {
	    output += "//";
	  }

	  if (url.cannotBeABaseURL) {
	    output += url.path[0];
	  } else {
	    for (const string of url.path) {
	      output += "/" + string;
	    }
	  }

	  if (url.query !== null) {
	    output += "?" + url.query;
	  }

	  if (!excludeFragment && url.fragment !== null) {
	    output += "#" + url.fragment;
	  }

	  return output;
	}

	function serializeOrigin(tuple) {
	  let result = tuple.scheme + "://";
	  result += serializeHost(tuple.host);

	  if (tuple.port !== null) {
	    result += ":" + tuple.port;
	  }

	  return result;
	}

	module.exports.serializeURL = serializeURL;

	module.exports.serializeURLOrigin = function (url) {
	  // https://url.spec.whatwg.org/#concept-url-origin
	  switch (url.scheme) {
	    case "blob":
	      try {
	        return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
	      } catch (e) {
	        // serializing an opaque origin returns "null"
	        return "null";
	      }
	    case "ftp":
	    case "gopher":
	    case "http":
	    case "https":
	    case "ws":
	    case "wss":
	      return serializeOrigin({
	        scheme: url.scheme,
	        host: url.host,
	        port: url.port
	      });
	    case "file":
	      // spec says "exercise to the reader", chrome says "file://"
	      return "file://";
	    default:
	      // serializing an opaque origin returns "null"
	      return "null";
	  }
	};

	module.exports.basicURLParse = function (input, options) {
	  if (options === undefined) {
	    options = {};
	  }

	  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
	  if (usm.failure) {
	    return "failure";
	  }

	  return usm.url;
	};

	module.exports.setTheUsername = function (url, username) {
	  url.username = "";
	  const decoded = punycode_1.ucs2.decode(username);
	  for (let i = 0; i < decoded.length; ++i) {
	    url.username += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
	  }
	};

	module.exports.setThePassword = function (url, password) {
	  url.password = "";
	  const decoded = punycode_1.ucs2.decode(password);
	  for (let i = 0; i < decoded.length; ++i) {
	    url.password += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
	  }
	};

	module.exports.serializeHost = serializeHost;

	module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

	module.exports.serializeInteger = function (integer) {
	  return String(integer);
	};

	module.exports.parseURL = function (input, options) {
	  if (options === undefined) {
	    options = {};
	  }

	  // We don't handle blobs, so this just delegates:
	  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
	};
	});
	urlStateMachine.serializeURL;
	urlStateMachine.serializeURLOrigin;
	urlStateMachine.basicURLParse;
	urlStateMachine.setTheUsername;
	urlStateMachine.setThePassword;
	urlStateMachine.serializeHost;
	urlStateMachine.cannotHaveAUsernamePasswordPort;
	urlStateMachine.serializeInteger;
	urlStateMachine.parseURL;

	var implementation = class URLImpl {
	  constructor(constructorArgs) {
	    const url = constructorArgs[0];
	    const base = constructorArgs[1];

	    let parsedBase = null;
	    if (base !== undefined) {
	      parsedBase = urlStateMachine.basicURLParse(base);
	      if (parsedBase === "failure") {
	        throw new TypeError("Invalid base URL");
	      }
	    }

	    const parsedURL = urlStateMachine.basicURLParse(url, { baseURL: parsedBase });
	    if (parsedURL === "failure") {
	      throw new TypeError("Invalid URL");
	    }

	    this._url = parsedURL;

	    // TODO: query stuff
	  }

	  get href() {
	    return urlStateMachine.serializeURL(this._url);
	  }

	  set href(v) {
	    const parsedURL = urlStateMachine.basicURLParse(v);
	    if (parsedURL === "failure") {
	      throw new TypeError("Invalid URL");
	    }

	    this._url = parsedURL;
	  }

	  get origin() {
	    return urlStateMachine.serializeURLOrigin(this._url);
	  }

	  get protocol() {
	    return this._url.scheme + ":";
	  }

	  set protocol(v) {
	    urlStateMachine.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
	  }

	  get username() {
	    return this._url.username;
	  }

	  set username(v) {
	    if (urlStateMachine.cannotHaveAUsernamePasswordPort(this._url)) {
	      return;
	    }

	    urlStateMachine.setTheUsername(this._url, v);
	  }

	  get password() {
	    return this._url.password;
	  }

	  set password(v) {
	    if (urlStateMachine.cannotHaveAUsernamePasswordPort(this._url)) {
	      return;
	    }

	    urlStateMachine.setThePassword(this._url, v);
	  }

	  get host() {
	    const url = this._url;

	    if (url.host === null) {
	      return "";
	    }

	    if (url.port === null) {
	      return urlStateMachine.serializeHost(url.host);
	    }

	    return urlStateMachine.serializeHost(url.host) + ":" + urlStateMachine.serializeInteger(url.port);
	  }

	  set host(v) {
	    if (this._url.cannotBeABaseURL) {
	      return;
	    }

	    urlStateMachine.basicURLParse(v, { url: this._url, stateOverride: "host" });
	  }

	  get hostname() {
	    if (this._url.host === null) {
	      return "";
	    }

	    return urlStateMachine.serializeHost(this._url.host);
	  }

	  set hostname(v) {
	    if (this._url.cannotBeABaseURL) {
	      return;
	    }

	    urlStateMachine.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
	  }

	  get port() {
	    if (this._url.port === null) {
	      return "";
	    }

	    return urlStateMachine.serializeInteger(this._url.port);
	  }

	  set port(v) {
	    if (urlStateMachine.cannotHaveAUsernamePasswordPort(this._url)) {
	      return;
	    }

	    if (v === "") {
	      this._url.port = null;
	    } else {
	      urlStateMachine.basicURLParse(v, { url: this._url, stateOverride: "port" });
	    }
	  }

	  get pathname() {
	    if (this._url.cannotBeABaseURL) {
	      return this._url.path[0];
	    }

	    if (this._url.path.length === 0) {
	      return "";
	    }

	    return "/" + this._url.path.join("/");
	  }

	  set pathname(v) {
	    if (this._url.cannotBeABaseURL) {
	      return;
	    }

	    this._url.path = [];
	    urlStateMachine.basicURLParse(v, { url: this._url, stateOverride: "path start" });
	  }

	  get search() {
	    if (this._url.query === null || this._url.query === "") {
	      return "";
	    }

	    return "?" + this._url.query;
	  }

	  set search(v) {
	    // TODO: query stuff

	    const url = this._url;

	    if (v === "") {
	      url.query = null;
	      return;
	    }

	    const input = v[0] === "?" ? v.substring(1) : v;
	    url.query = "";
	    urlStateMachine.basicURLParse(input, { url, stateOverride: "query" });
	  }

	  get hash() {
	    if (this._url.fragment === null || this._url.fragment === "") {
	      return "";
	    }

	    return "#" + this._url.fragment;
	  }

	  set hash(v) {
	    if (v === "") {
	      this._url.fragment = null;
	      return;
	    }

	    const input = v[0] === "#" ? v.substring(1) : v;
	    this._url.fragment = "";
	    urlStateMachine.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
	  }

	  toJSON() {
	    return this.href;
	  }
	};

	var URLImpl_1 = {
		implementation: implementation
	};

	var URL_1 = createCommonjsModule(function (module) {





	const impl = utils.implSymbol;

	function URL(url) {
	  if (!this || this[impl] || !(this instanceof URL)) {
	    throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
	  }
	  if (arguments.length < 1) {
	    throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
	  }
	  const args = [];
	  for (let i = 0; i < arguments.length && i < 2; ++i) {
	    args[i] = arguments[i];
	  }
	  args[0] = lib$1["USVString"](args[0]);
	  if (args[1] !== undefined) {
	  args[1] = lib$1["USVString"](args[1]);
	  }

	  module.exports.setup(this, args);
	}

	URL.prototype.toJSON = function toJSON() {
	  if (!this || !module.exports.is(this)) {
	    throw new TypeError("Illegal invocation");
	  }
	  const args = [];
	  for (let i = 0; i < arguments.length && i < 0; ++i) {
	    args[i] = arguments[i];
	  }
	  return this[impl].toJSON.apply(this[impl], args);
	};
	Object.defineProperty(URL.prototype, "href", {
	  get() {
	    return this[impl].href;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].href = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	URL.prototype.toString = function () {
	  if (!this || !module.exports.is(this)) {
	    throw new TypeError("Illegal invocation");
	  }
	  return this.href;
	};

	Object.defineProperty(URL.prototype, "origin", {
	  get() {
	    return this[impl].origin;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "protocol", {
	  get() {
	    return this[impl].protocol;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].protocol = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "username", {
	  get() {
	    return this[impl].username;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].username = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "password", {
	  get() {
	    return this[impl].password;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].password = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "host", {
	  get() {
	    return this[impl].host;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].host = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "hostname", {
	  get() {
	    return this[impl].hostname;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].hostname = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "port", {
	  get() {
	    return this[impl].port;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].port = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "pathname", {
	  get() {
	    return this[impl].pathname;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].pathname = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "search", {
	  get() {
	    return this[impl].search;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].search = V;
	  },
	  enumerable: true,
	  configurable: true
	});

	Object.defineProperty(URL.prototype, "hash", {
	  get() {
	    return this[impl].hash;
	  },
	  set(V) {
	    V = lib$1["USVString"](V);
	    this[impl].hash = V;
	  },
	  enumerable: true,
	  configurable: true
	});


	module.exports = {
	  is(obj) {
	    return !!obj && obj[impl] instanceof URLImpl_1.implementation;
	  },
	  create(constructorArgs, privateData) {
	    let obj = Object.create(URL.prototype);
	    this.setup(obj, constructorArgs, privateData);
	    return obj;
	  },
	  setup(obj, constructorArgs, privateData) {
	    if (!privateData) privateData = {};
	    privateData.wrapper = obj;

	    obj[impl] = new URLImpl_1.implementation(constructorArgs, privateData);
	    obj[impl][utils.wrapperSymbol] = obj;
	  },
	  interface: URL,
	  expose: {
	    Window: { URL: URL },
	    Worker: { URL: URL }
	  }
	};
	});
	URL_1.is;
	URL_1.create;
	URL_1.setup;
	URL_1.expose;

	var URL$1 = URL_1.interface;
	var serializeURL = urlStateMachine.serializeURL;
	var serializeURLOrigin = urlStateMachine.serializeURLOrigin;
	var basicURLParse = urlStateMachine.basicURLParse;
	var setTheUsername = urlStateMachine.setTheUsername;
	var setThePassword = urlStateMachine.setThePassword;
	var serializeHost = urlStateMachine.serializeHost;
	var serializeInteger = urlStateMachine.serializeInteger;
	var parseURL$1 = urlStateMachine.parseURL;

	var publicApi = {
		URL: URL$1,
		serializeURL: serializeURL,
		serializeURLOrigin: serializeURLOrigin,
		basicURLParse: basicURLParse,
		setTheUsername: setTheUsername,
		setThePassword: setThePassword,
		serializeHost: serializeHost,
		serializeInteger: serializeInteger,
		parseURL: parseURL$1
	};

	// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

	// fix for "Readable" isn't a named export issue
	const Readable = Stream__default["default"].Readable;

	const BUFFER = Symbol('buffer');
	const TYPE = Symbol('type');

	class Blob {
		constructor() {
			this[TYPE] = '';

			const blobParts = arguments[0];
			const options = arguments[1];

			const buffers = [];
			let size = 0;

			if (blobParts) {
				const a = blobParts;
				const length = Number(a.length);
				for (let i = 0; i < length; i++) {
					const element = a[i];
					let buffer;
					if (element instanceof Buffer) {
						buffer = element;
					} else if (ArrayBuffer.isView(element)) {
						buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
					} else if (element instanceof ArrayBuffer) {
						buffer = Buffer.from(element);
					} else if (element instanceof Blob) {
						buffer = element[BUFFER];
					} else {
						buffer = Buffer.from(typeof element === 'string' ? element : String(element));
					}
					size += buffer.length;
					buffers.push(buffer);
				}
			}

			this[BUFFER] = Buffer.concat(buffers);

			let type = options && options.type !== undefined && String(options.type).toLowerCase();
			if (type && !/[^\u0020-\u007E]/.test(type)) {
				this[TYPE] = type;
			}
		}
		get size() {
			return this[BUFFER].length;
		}
		get type() {
			return this[TYPE];
		}
		text() {
			return Promise.resolve(this[BUFFER].toString());
		}
		arrayBuffer() {
			const buf = this[BUFFER];
			const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
			return Promise.resolve(ab);
		}
		stream() {
			const readable = new Readable();
			readable._read = function () {};
			readable.push(this[BUFFER]);
			readable.push(null);
			return readable;
		}
		toString() {
			return '[object Blob]';
		}
		slice() {
			const size = this.size;

			const start = arguments[0];
			const end = arguments[1];
			let relativeStart, relativeEnd;
			if (start === undefined) {
				relativeStart = 0;
			} else if (start < 0) {
				relativeStart = Math.max(size + start, 0);
			} else {
				relativeStart = Math.min(start, size);
			}
			if (end === undefined) {
				relativeEnd = size;
			} else if (end < 0) {
				relativeEnd = Math.max(size + end, 0);
			} else {
				relativeEnd = Math.min(end, size);
			}
			const span = Math.max(relativeEnd - relativeStart, 0);

			const buffer = this[BUFFER];
			const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
			const blob = new Blob([], { type: arguments[2] });
			blob[BUFFER] = slicedBuffer;
			return blob;
		}
	}

	Object.defineProperties(Blob.prototype, {
		size: { enumerable: true },
		type: { enumerable: true },
		slice: { enumerable: true }
	});

	Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
		value: 'Blob',
		writable: false,
		enumerable: false,
		configurable: true
	});

	/**
	 * fetch-error.js
	 *
	 * FetchError interface for operational errors
	 */

	/**
	 * Create FetchError instance
	 *
	 * @param   String      message      Error message for human
	 * @param   String      type         Error type for machine
	 * @param   String      systemError  For Node.js system error
	 * @return  FetchError
	 */
	function FetchError(message, type, systemError) {
	  Error.call(this, message);

	  this.message = message;
	  this.type = type;

	  // when err.type is `system`, err.code contains system error code
	  if (systemError) {
	    this.code = this.errno = systemError.code;
	  }

	  // hide custom error implementation details from end-users
	  Error.captureStackTrace(this, this.constructor);
	}

	FetchError.prototype = Object.create(Error.prototype);
	FetchError.prototype.constructor = FetchError;
	FetchError.prototype.name = 'FetchError';

	let convert;
	try {
		convert = require('encoding').convert;
	} catch (e) {}

	const INTERNALS = Symbol('Body internals');

	// fix an issue where "PassThrough" isn't a named export for node <10
	const PassThrough = Stream__default["default"].PassThrough;

	/**
	 * Body mixin
	 *
	 * Ref: https://fetch.spec.whatwg.org/#body
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	function Body(body) {
		var _this = this;

		var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
		    _ref$size = _ref.size;

		let size = _ref$size === undefined ? 0 : _ref$size;
		var _ref$timeout = _ref.timeout;
		let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

		if (body == null) {
			// body is undefined or null
			body = null;
		} else if (isURLSearchParams(body)) {
			// body is a URLSearchParams
			body = Buffer.from(body.toString());
		} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
			// body is ArrayBuffer
			body = Buffer.from(body);
		} else if (ArrayBuffer.isView(body)) {
			// body is ArrayBufferView
			body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
		} else if (body instanceof Stream__default["default"]) ; else {
			// none of the above
			// coerce to string then buffer
			body = Buffer.from(String(body));
		}
		this[INTERNALS] = {
			body,
			disturbed: false,
			error: null
		};
		this.size = size;
		this.timeout = timeout;

		if (body instanceof Stream__default["default"]) {
			body.on('error', function (err) {
				const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
				_this[INTERNALS].error = error;
			});
		}
	}

	Body.prototype = {
		get body() {
			return this[INTERNALS].body;
		},

		get bodyUsed() {
			return this[INTERNALS].disturbed;
		},

		/**
	  * Decode response as ArrayBuffer
	  *
	  * @return  Promise
	  */
		arrayBuffer() {
			return consumeBody.call(this).then(function (buf) {
				return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
			});
		},

		/**
	  * Return raw response as Blob
	  *
	  * @return Promise
	  */
		blob() {
			let ct = this.headers && this.headers.get('content-type') || '';
			return consumeBody.call(this).then(function (buf) {
				return Object.assign(
				// Prevent copying
				new Blob([], {
					type: ct.toLowerCase()
				}), {
					[BUFFER]: buf
				});
			});
		},

		/**
	  * Decode response as json
	  *
	  * @return  Promise
	  */
		json() {
			var _this2 = this;

			return consumeBody.call(this).then(function (buffer) {
				try {
					return JSON.parse(buffer.toString());
				} catch (err) {
					return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
				}
			});
		},

		/**
	  * Decode response as text
	  *
	  * @return  Promise
	  */
		text() {
			return consumeBody.call(this).then(function (buffer) {
				return buffer.toString();
			});
		},

		/**
	  * Decode response as buffer (non-spec api)
	  *
	  * @return  Promise
	  */
		buffer() {
			return consumeBody.call(this);
		},

		/**
	  * Decode response as text, while automatically detecting the encoding and
	  * trying to decode to UTF-8 (non-spec api)
	  *
	  * @return  Promise
	  */
		textConverted() {
			var _this3 = this;

			return consumeBody.call(this).then(function (buffer) {
				return convertBody(buffer, _this3.headers);
			});
		}
	};

	// In browsers, all properties are enumerable.
	Object.defineProperties(Body.prototype, {
		body: { enumerable: true },
		bodyUsed: { enumerable: true },
		arrayBuffer: { enumerable: true },
		blob: { enumerable: true },
		json: { enumerable: true },
		text: { enumerable: true }
	});

	Body.mixIn = function (proto) {
		for (const name of Object.getOwnPropertyNames(Body.prototype)) {
			// istanbul ignore else: future proof
			if (!(name in proto)) {
				const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
				Object.defineProperty(proto, name, desc);
			}
		}
	};

	/**
	 * Consume and convert an entire Body to a Buffer.
	 *
	 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
	 *
	 * @return  Promise
	 */
	function consumeBody() {
		var _this4 = this;

		if (this[INTERNALS].disturbed) {
			return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
		}

		this[INTERNALS].disturbed = true;

		if (this[INTERNALS].error) {
			return Body.Promise.reject(this[INTERNALS].error);
		}

		let body = this.body;

		// body is null
		if (body === null) {
			return Body.Promise.resolve(Buffer.alloc(0));
		}

		// body is blob
		if (isBlob(body)) {
			body = body.stream();
		}

		// body is buffer
		if (Buffer.isBuffer(body)) {
			return Body.Promise.resolve(body);
		}

		// istanbul ignore if: should never happen
		if (!(body instanceof Stream__default["default"])) {
			return Body.Promise.resolve(Buffer.alloc(0));
		}

		// body is stream
		// get ready to actually consume the body
		let accum = [];
		let accumBytes = 0;
		let abort = false;

		return new Body.Promise(function (resolve, reject) {
			let resTimeout;

			// allow timeout on slow response body
			if (_this4.timeout) {
				resTimeout = setTimeout(function () {
					abort = true;
					reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
				}, _this4.timeout);
			}

			// handle stream errors
			body.on('error', function (err) {
				if (err.name === 'AbortError') {
					// if the request was aborted, reject with this Error
					abort = true;
					reject(err);
				} else {
					// other errors, such as incorrect content-encoding
					reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
				}
			});

			body.on('data', function (chunk) {
				if (abort || chunk === null) {
					return;
				}

				if (_this4.size && accumBytes + chunk.length > _this4.size) {
					abort = true;
					reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
					return;
				}

				accumBytes += chunk.length;
				accum.push(chunk);
			});

			body.on('end', function () {
				if (abort) {
					return;
				}

				clearTimeout(resTimeout);

				try {
					resolve(Buffer.concat(accum, accumBytes));
				} catch (err) {
					// handle streams that have accumulated too much data (issue #414)
					reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
				}
			});
		});
	}

	/**
	 * Detect buffer encoding and convert to target encoding
	 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
	 *
	 * @param   Buffer  buffer    Incoming buffer
	 * @param   String  encoding  Target encoding
	 * @return  String
	 */
	function convertBody(buffer, headers) {
		if (typeof convert !== 'function') {
			throw new Error('The package `encoding` must be installed to use the textConverted() function');
		}

		const ct = headers.get('content-type');
		let charset = 'utf-8';
		let res, str;

		// header
		if (ct) {
			res = /charset=([^;]*)/i.exec(ct);
		}

		// no charset in content type, peek at response body for at most 1024 bytes
		str = buffer.slice(0, 1024).toString();

		// html5
		if (!res && str) {
			res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
		}

		// html4
		if (!res && str) {
			res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
			if (!res) {
				res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
				if (res) {
					res.pop(); // drop last quote
				}
			}

			if (res) {
				res = /charset=(.*)/i.exec(res.pop());
			}
		}

		// xml
		if (!res && str) {
			res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
		}

		// found charset
		if (res) {
			charset = res.pop();

			// prevent decode issues when sites use incorrect encoding
			// ref: https://hsivonen.fi/encoding-menu/
			if (charset === 'gb2312' || charset === 'gbk') {
				charset = 'gb18030';
			}
		}

		// turn raw buffers into a single utf-8 buffer
		return convert(buffer, 'UTF-8', charset).toString();
	}

	/**
	 * Detect a URLSearchParams object
	 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
	 *
	 * @param   Object  obj     Object to detect by type or brand
	 * @return  String
	 */
	function isURLSearchParams(obj) {
		// Duck-typing as a necessary condition.
		if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
			return false;
		}

		// Brand-checking and more duck-typing as optional condition.
		return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
	}

	/**
	 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
	 * @param  {*} obj
	 * @return {boolean}
	 */
	function isBlob(obj) {
		return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
	}

	/**
	 * Clone body given Res/Req instance
	 *
	 * @param   Mixed  instance  Response or Request instance
	 * @return  Mixed
	 */
	function clone(instance) {
		let p1, p2;
		let body = instance.body;

		// don't allow cloning a used body
		if (instance.bodyUsed) {
			throw new Error('cannot clone body after it is used');
		}

		// check that body is a stream and not form-data object
		// note: we can't clone the form-data object without having it as a dependency
		if (body instanceof Stream__default["default"] && typeof body.getBoundary !== 'function') {
			// tee instance body
			p1 = new PassThrough();
			p2 = new PassThrough();
			body.pipe(p1);
			body.pipe(p2);
			// set instance body to teed body and return the other teed body
			instance[INTERNALS].body = p1;
			body = p2;
		}

		return body;
	}

	/**
	 * Performs the operation "extract a `Content-Type` value from |object|" as
	 * specified in the specification:
	 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
	 *
	 * This function assumes that instance.body is present.
	 *
	 * @param   Mixed  instance  Any options.body input
	 */
	function extractContentType(body) {
		if (body === null) {
			// body is null
			return null;
		} else if (typeof body === 'string') {
			// body is string
			return 'text/plain;charset=UTF-8';
		} else if (isURLSearchParams(body)) {
			// body is a URLSearchParams
			return 'application/x-www-form-urlencoded;charset=UTF-8';
		} else if (isBlob(body)) {
			// body is blob
			return body.type || null;
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			return null;
		} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
			// body is ArrayBuffer
			return null;
		} else if (ArrayBuffer.isView(body)) {
			// body is ArrayBufferView
			return null;
		} else if (typeof body.getBoundary === 'function') {
			// detect form data input from form-data module
			return `multipart/form-data;boundary=${body.getBoundary()}`;
		} else if (body instanceof Stream__default["default"]) {
			// body is stream
			// can't really do much about this
			return null;
		} else {
			// Body constructor defaults other things to string
			return 'text/plain;charset=UTF-8';
		}
	}

	/**
	 * The Fetch Standard treats this as if "total bytes" is a property on the body.
	 * For us, we have to explicitly get it with a function.
	 *
	 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
	 *
	 * @param   Body    instance   Instance of Body
	 * @return  Number?            Number of bytes, or null if not possible
	 */
	function getTotalBytes(instance) {
		const body = instance.body;


		if (body === null) {
			// body is null
			return 0;
		} else if (isBlob(body)) {
			return body.size;
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			return body.length;
		} else if (body && typeof body.getLengthSync === 'function') {
			// detect form data input from form-data module
			if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
			body.hasKnownLength && body.hasKnownLength()) {
				// 2.x
				return body.getLengthSync();
			}
			return null;
		} else {
			// body is stream
			return null;
		}
	}

	/**
	 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
	 *
	 * @param   Body    instance   Instance of Body
	 * @return  Void
	 */
	function writeToStream(dest, instance) {
		const body = instance.body;


		if (body === null) {
			// body is null
			dest.end();
		} else if (isBlob(body)) {
			body.stream().pipe(dest);
		} else if (Buffer.isBuffer(body)) {
			// body is buffer
			dest.write(body);
			dest.end();
		} else {
			// body is stream
			body.pipe(dest);
		}
	}

	// expose Promise
	Body.Promise = global.Promise;

	/**
	 * headers.js
	 *
	 * Headers class offers convenient helpers
	 */

	const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
	const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

	function validateName(name) {
		name = `${name}`;
		if (invalidTokenRegex.test(name) || name === '') {
			throw new TypeError(`${name} is not a legal HTTP header name`);
		}
	}

	function validateValue(value) {
		value = `${value}`;
		if (invalidHeaderCharRegex.test(value)) {
			throw new TypeError(`${value} is not a legal HTTP header value`);
		}
	}

	/**
	 * Find the key in the map object given a header name.
	 *
	 * Returns undefined if not found.
	 *
	 * @param   String  name  Header name
	 * @return  String|Undefined
	 */
	function find(map, name) {
		name = name.toLowerCase();
		for (const key in map) {
			if (key.toLowerCase() === name) {
				return key;
			}
		}
		return undefined;
	}

	const MAP = Symbol('map');
	class Headers {
		/**
	  * Headers class
	  *
	  * @param   Object  headers  Response headers
	  * @return  Void
	  */
		constructor() {
			let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

			this[MAP] = Object.create(null);

			if (init instanceof Headers) {
				const rawHeaders = init.raw();
				const headerNames = Object.keys(rawHeaders);

				for (const headerName of headerNames) {
					for (const value of rawHeaders[headerName]) {
						this.append(headerName, value);
					}
				}

				return;
			}

			// We don't worry about converting prop to ByteString here as append()
			// will handle it.
			if (init == null) ; else if (typeof init === 'object') {
				const method = init[Symbol.iterator];
				if (method != null) {
					if (typeof method !== 'function') {
						throw new TypeError('Header pairs must be iterable');
					}

					// sequence<sequence<ByteString>>
					// Note: per spec we have to first exhaust the lists then process them
					const pairs = [];
					for (const pair of init) {
						if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
							throw new TypeError('Each header pair must be iterable');
						}
						pairs.push(Array.from(pair));
					}

					for (const pair of pairs) {
						if (pair.length !== 2) {
							throw new TypeError('Each header pair must be a name/value tuple');
						}
						this.append(pair[0], pair[1]);
					}
				} else {
					// record<ByteString, ByteString>
					for (const key of Object.keys(init)) {
						const value = init[key];
						this.append(key, value);
					}
				}
			} else {
				throw new TypeError('Provided initializer must be an object');
			}
		}

		/**
	  * Return combined header value given name
	  *
	  * @param   String  name  Header name
	  * @return  Mixed
	  */
		get(name) {
			name = `${name}`;
			validateName(name);
			const key = find(this[MAP], name);
			if (key === undefined) {
				return null;
			}

			return this[MAP][key].join(', ');
		}

		/**
	  * Iterate over all headers
	  *
	  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
	  * @param   Boolean   thisArg   `this` context for callback function
	  * @return  Void
	  */
		forEach(callback) {
			let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

			let pairs = getHeaders(this);
			let i = 0;
			while (i < pairs.length) {
				var _pairs$i = pairs[i];
				const name = _pairs$i[0],
				      value = _pairs$i[1];

				callback.call(thisArg, value, name, this);
				pairs = getHeaders(this);
				i++;
			}
		}

		/**
	  * Overwrite header values given name
	  *
	  * @param   String  name   Header name
	  * @param   String  value  Header value
	  * @return  Void
	  */
		set(name, value) {
			name = `${name}`;
			value = `${value}`;
			validateName(name);
			validateValue(value);
			const key = find(this[MAP], name);
			this[MAP][key !== undefined ? key : name] = [value];
		}

		/**
	  * Append a value onto existing header
	  *
	  * @param   String  name   Header name
	  * @param   String  value  Header value
	  * @return  Void
	  */
		append(name, value) {
			name = `${name}`;
			value = `${value}`;
			validateName(name);
			validateValue(value);
			const key = find(this[MAP], name);
			if (key !== undefined) {
				this[MAP][key].push(value);
			} else {
				this[MAP][name] = [value];
			}
		}

		/**
	  * Check for header name existence
	  *
	  * @param   String   name  Header name
	  * @return  Boolean
	  */
		has(name) {
			name = `${name}`;
			validateName(name);
			return find(this[MAP], name) !== undefined;
		}

		/**
	  * Delete all header values given name
	  *
	  * @param   String  name  Header name
	  * @return  Void
	  */
		delete(name) {
			name = `${name}`;
			validateName(name);
			const key = find(this[MAP], name);
			if (key !== undefined) {
				delete this[MAP][key];
			}
		}

		/**
	  * Return raw headers (non-spec api)
	  *
	  * @return  Object
	  */
		raw() {
			return this[MAP];
		}

		/**
	  * Get an iterator on keys.
	  *
	  * @return  Iterator
	  */
		keys() {
			return createHeadersIterator(this, 'key');
		}

		/**
	  * Get an iterator on values.
	  *
	  * @return  Iterator
	  */
		values() {
			return createHeadersIterator(this, 'value');
		}

		/**
	  * Get an iterator on entries.
	  *
	  * This is the default iterator of the Headers object.
	  *
	  * @return  Iterator
	  */
		[Symbol.iterator]() {
			return createHeadersIterator(this, 'key+value');
		}
	}
	Headers.prototype.entries = Headers.prototype[Symbol.iterator];

	Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
		value: 'Headers',
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperties(Headers.prototype, {
		get: { enumerable: true },
		forEach: { enumerable: true },
		set: { enumerable: true },
		append: { enumerable: true },
		has: { enumerable: true },
		delete: { enumerable: true },
		keys: { enumerable: true },
		values: { enumerable: true },
		entries: { enumerable: true }
	});

	function getHeaders(headers) {
		let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

		const keys = Object.keys(headers[MAP]).sort();
		return keys.map(kind === 'key' ? function (k) {
			return k.toLowerCase();
		} : kind === 'value' ? function (k) {
			return headers[MAP][k].join(', ');
		} : function (k) {
			return [k.toLowerCase(), headers[MAP][k].join(', ')];
		});
	}

	const INTERNAL = Symbol('internal');

	function createHeadersIterator(target, kind) {
		const iterator = Object.create(HeadersIteratorPrototype);
		iterator[INTERNAL] = {
			target,
			kind,
			index: 0
		};
		return iterator;
	}

	const HeadersIteratorPrototype = Object.setPrototypeOf({
		next() {
			// istanbul ignore if
			if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
				throw new TypeError('Value of `this` is not a HeadersIterator');
			}

			var _INTERNAL = this[INTERNAL];
			const target = _INTERNAL.target,
			      kind = _INTERNAL.kind,
			      index = _INTERNAL.index;

			const values = getHeaders(target, kind);
			const len = values.length;
			if (index >= len) {
				return {
					value: undefined,
					done: true
				};
			}

			this[INTERNAL].index = index + 1;

			return {
				value: values[index],
				done: false
			};
		}
	}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

	Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
		value: 'HeadersIterator',
		writable: false,
		enumerable: false,
		configurable: true
	});

	/**
	 * Export the Headers object in a form that Node.js can consume.
	 *
	 * @param   Headers  headers
	 * @return  Object
	 */
	function exportNodeCompatibleHeaders(headers) {
		const obj = Object.assign({ __proto__: null }, headers[MAP]);

		// http.request() only supports string as Host header. This hack makes
		// specifying custom Host header possible.
		const hostHeaderKey = find(headers[MAP], 'Host');
		if (hostHeaderKey !== undefined) {
			obj[hostHeaderKey] = obj[hostHeaderKey][0];
		}

		return obj;
	}

	/**
	 * Create a Headers object from an object of headers, ignoring those that do
	 * not conform to HTTP grammar productions.
	 *
	 * @param   Object  obj  Object of headers
	 * @return  Headers
	 */
	function createHeadersLenient(obj) {
		const headers = new Headers();
		for (const name of Object.keys(obj)) {
			if (invalidTokenRegex.test(name)) {
				continue;
			}
			if (Array.isArray(obj[name])) {
				for (const val of obj[name]) {
					if (invalidHeaderCharRegex.test(val)) {
						continue;
					}
					if (headers[MAP][name] === undefined) {
						headers[MAP][name] = [val];
					} else {
						headers[MAP][name].push(val);
					}
				}
			} else if (!invalidHeaderCharRegex.test(obj[name])) {
				headers[MAP][name] = [obj[name]];
			}
		}
		return headers;
	}

	const INTERNALS$1 = Symbol('Response internals');

	// fix an issue where "STATUS_CODES" aren't a named export for node <10
	const STATUS_CODES = http__default["default"].STATUS_CODES;

	/**
	 * Response class
	 *
	 * @param   Stream  body  Readable stream
	 * @param   Object  opts  Response options
	 * @return  Void
	 */
	class Response {
		constructor() {
			let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			Body.call(this, body, opts);

			const status = opts.status || 200;
			const headers = new Headers(opts.headers);

			if (body != null && !headers.has('Content-Type')) {
				const contentType = extractContentType(body);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			this[INTERNALS$1] = {
				url: opts.url,
				status,
				statusText: opts.statusText || STATUS_CODES[status],
				headers,
				counter: opts.counter
			};
		}

		get url() {
			return this[INTERNALS$1].url || '';
		}

		get status() {
			return this[INTERNALS$1].status;
		}

		/**
	  * Convenience property representing if the request ended normally
	  */
		get ok() {
			return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
		}

		get redirected() {
			return this[INTERNALS$1].counter > 0;
		}

		get statusText() {
			return this[INTERNALS$1].statusText;
		}

		get headers() {
			return this[INTERNALS$1].headers;
		}

		/**
	  * Clone this response
	  *
	  * @return  Response
	  */
		clone() {
			return new Response(clone(this), {
				url: this.url,
				status: this.status,
				statusText: this.statusText,
				headers: this.headers,
				ok: this.ok,
				redirected: this.redirected
			});
		}
	}

	Body.mixIn(Response.prototype);

	Object.defineProperties(Response.prototype, {
		url: { enumerable: true },
		status: { enumerable: true },
		ok: { enumerable: true },
		redirected: { enumerable: true },
		statusText: { enumerable: true },
		headers: { enumerable: true },
		clone: { enumerable: true }
	});

	Object.defineProperty(Response.prototype, Symbol.toStringTag, {
		value: 'Response',
		writable: false,
		enumerable: false,
		configurable: true
	});

	const INTERNALS$2 = Symbol('Request internals');
	const URL = Url__default["default"].URL || publicApi.URL;

	// fix an issue where "format", "parse" aren't a named export for node <10
	const parse_url = Url__default["default"].parse;
	const format_url = Url__default["default"].format;

	/**
	 * Wrapper around `new URL` to handle arbitrary URLs
	 *
	 * @param  {string} urlStr
	 * @return {void}
	 */
	function parseURL(urlStr) {
		/*
	 	Check whether the URL is absolute or not
	 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
	 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
	 */
		if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
			urlStr = new URL(urlStr).toString();
		}

		// Fallback to old implementation for arbitrary URLs
		return parse_url(urlStr);
	}

	const streamDestructionSupported = 'destroy' in Stream__default["default"].Readable.prototype;

	/**
	 * Check if a value is an instance of Request.
	 *
	 * @param   Mixed   input
	 * @return  Boolean
	 */
	function isRequest(input) {
		return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
	}

	function isAbortSignal(signal) {
		const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
		return !!(proto && proto.constructor.name === 'AbortSignal');
	}

	/**
	 * Request class
	 *
	 * @param   Mixed   input  Url or Request instance
	 * @param   Object  init   Custom options
	 * @return  Void
	 */
	class Request {
		constructor(input) {
			let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			let parsedURL;

			// normalize input
			if (!isRequest(input)) {
				if (input && input.href) {
					// in order to support Node.js' Url objects; though WHATWG's URL objects
					// will fall into this branch also (since their `toString()` will return
					// `href` property anyway)
					parsedURL = parseURL(input.href);
				} else {
					// coerce input to a string before attempting to parse
					parsedURL = parseURL(`${input}`);
				}
				input = {};
			} else {
				parsedURL = parseURL(input.url);
			}

			let method = init.method || input.method || 'GET';
			method = method.toUpperCase();

			if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
				throw new TypeError('Request with GET/HEAD method cannot have body');
			}

			let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

			Body.call(this, inputBody, {
				timeout: init.timeout || input.timeout || 0,
				size: init.size || input.size || 0
			});

			const headers = new Headers(init.headers || input.headers || {});

			if (inputBody != null && !headers.has('Content-Type')) {
				const contentType = extractContentType(inputBody);
				if (contentType) {
					headers.append('Content-Type', contentType);
				}
			}

			let signal = isRequest(input) ? input.signal : null;
			if ('signal' in init) signal = init.signal;

			if (signal != null && !isAbortSignal(signal)) {
				throw new TypeError('Expected signal to be an instanceof AbortSignal');
			}

			this[INTERNALS$2] = {
				method,
				redirect: init.redirect || input.redirect || 'follow',
				headers,
				parsedURL,
				signal
			};

			// node-fetch-only options
			this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
			this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
			this.counter = init.counter || input.counter || 0;
			this.agent = init.agent || input.agent;
		}

		get method() {
			return this[INTERNALS$2].method;
		}

		get url() {
			return format_url(this[INTERNALS$2].parsedURL);
		}

		get headers() {
			return this[INTERNALS$2].headers;
		}

		get redirect() {
			return this[INTERNALS$2].redirect;
		}

		get signal() {
			return this[INTERNALS$2].signal;
		}

		/**
	  * Clone this request
	  *
	  * @return  Request
	  */
		clone() {
			return new Request(this);
		}
	}

	Body.mixIn(Request.prototype);

	Object.defineProperty(Request.prototype, Symbol.toStringTag, {
		value: 'Request',
		writable: false,
		enumerable: false,
		configurable: true
	});

	Object.defineProperties(Request.prototype, {
		method: { enumerable: true },
		url: { enumerable: true },
		headers: { enumerable: true },
		redirect: { enumerable: true },
		clone: { enumerable: true },
		signal: { enumerable: true }
	});

	/**
	 * Convert a Request to Node.js http request options.
	 *
	 * @param   Request  A Request instance
	 * @return  Object   The options object to be passed to http.request
	 */
	function getNodeRequestOptions(request) {
		const parsedURL = request[INTERNALS$2].parsedURL;
		const headers = new Headers(request[INTERNALS$2].headers);

		// fetch step 1.3
		if (!headers.has('Accept')) {
			headers.set('Accept', '*/*');
		}

		// Basic fetch
		if (!parsedURL.protocol || !parsedURL.hostname) {
			throw new TypeError('Only absolute URLs are supported');
		}

		if (!/^https?:$/.test(parsedURL.protocol)) {
			throw new TypeError('Only HTTP(S) protocols are supported');
		}

		if (request.signal && request.body instanceof Stream__default["default"].Readable && !streamDestructionSupported) {
			throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
		}

		// HTTP-network-or-cache fetch steps 2.4-2.7
		let contentLengthValue = null;
		if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
			contentLengthValue = '0';
		}
		if (request.body != null) {
			const totalBytes = getTotalBytes(request);
			if (typeof totalBytes === 'number') {
				contentLengthValue = String(totalBytes);
			}
		}
		if (contentLengthValue) {
			headers.set('Content-Length', contentLengthValue);
		}

		// HTTP-network-or-cache fetch step 2.11
		if (!headers.has('User-Agent')) {
			headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
		}

		// HTTP-network-or-cache fetch step 2.15
		if (request.compress && !headers.has('Accept-Encoding')) {
			headers.set('Accept-Encoding', 'gzip,deflate');
		}

		let agent = request.agent;
		if (typeof agent === 'function') {
			agent = agent(parsedURL);
		}

		if (!headers.has('Connection') && !agent) {
			headers.set('Connection', 'close');
		}

		// HTTP-network fetch step 4.2
		// chunked encoding is handled by Node.js

		return Object.assign({}, parsedURL, {
			method: request.method,
			headers: exportNodeCompatibleHeaders(headers),
			agent
		});
	}

	/**
	 * abort-error.js
	 *
	 * AbortError interface for cancelled requests
	 */

	/**
	 * Create AbortError instance
	 *
	 * @param   String      message      Error message for human
	 * @return  AbortError
	 */
	function AbortError(message) {
	  Error.call(this, message);

	  this.type = 'aborted';
	  this.message = message;

	  // hide custom error implementation details from end-users
	  Error.captureStackTrace(this, this.constructor);
	}

	AbortError.prototype = Object.create(Error.prototype);
	AbortError.prototype.constructor = AbortError;
	AbortError.prototype.name = 'AbortError';

	// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
	const PassThrough$1 = Stream__default["default"].PassThrough;
	const resolve_url = Url__default["default"].resolve;

	/**
	 * Fetch function
	 *
	 * @param   Mixed    url   Absolute url or Request instance
	 * @param   Object   opts  Fetch options
	 * @return  Promise
	 */
	function fetch$1(url, opts) {

		// allow custom promise
		if (!fetch$1.Promise) {
			throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
		}

		Body.Promise = fetch$1.Promise;

		// wrap http.request into fetch
		return new fetch$1.Promise(function (resolve, reject) {
			// build request object
			const request = new Request(url, opts);
			const options = getNodeRequestOptions(request);

			const send = (options.protocol === 'https:' ? https__default["default"] : http__default["default"]).request;
			const signal = request.signal;

			let response = null;

			const abort = function abort() {
				let error = new AbortError('The user aborted a request.');
				reject(error);
				if (request.body && request.body instanceof Stream__default["default"].Readable) {
					request.body.destroy(error);
				}
				if (!response || !response.body) return;
				response.body.emit('error', error);
			};

			if (signal && signal.aborted) {
				abort();
				return;
			}

			const abortAndFinalize = function abortAndFinalize() {
				abort();
				finalize();
			};

			// send request
			const req = send(options);
			let reqTimeout;

			if (signal) {
				signal.addEventListener('abort', abortAndFinalize);
			}

			function finalize() {
				req.abort();
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
				clearTimeout(reqTimeout);
			}

			if (request.timeout) {
				req.once('socket', function (socket) {
					reqTimeout = setTimeout(function () {
						reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
						finalize();
					}, request.timeout);
				});
			}

			req.on('error', function (err) {
				reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
				finalize();
			});

			req.on('response', function (res) {
				clearTimeout(reqTimeout);

				const headers = createHeadersLenient(res.headers);

				// HTTP fetch step 5
				if (fetch$1.isRedirect(res.statusCode)) {
					// HTTP fetch step 5.2
					const location = headers.get('Location');

					// HTTP fetch step 5.3
					const locationURL = location === null ? null : resolve_url(request.url, location);

					// HTTP fetch step 5.5
					switch (request.redirect) {
						case 'error':
							reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
							finalize();
							return;
						case 'manual':
							// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
							if (locationURL !== null) {
								// handle corrupted header
								try {
									headers.set('Location', locationURL);
								} catch (err) {
									// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
									reject(err);
								}
							}
							break;
						case 'follow':
							// HTTP-redirect fetch step 2
							if (locationURL === null) {
								break;
							}

							// HTTP-redirect fetch step 5
							if (request.counter >= request.follow) {
								reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 6 (counter increment)
							// Create a new Request object.
							const requestOpts = {
								headers: new Headers(request.headers),
								follow: request.follow,
								counter: request.counter + 1,
								agent: request.agent,
								compress: request.compress,
								method: request.method,
								body: request.body,
								signal: request.signal,
								timeout: request.timeout,
								size: request.size
							};

							// HTTP-redirect fetch step 9
							if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
								reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
								finalize();
								return;
							}

							// HTTP-redirect fetch step 11
							if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
								requestOpts.method = 'GET';
								requestOpts.body = undefined;
								requestOpts.headers.delete('content-length');
							}

							// HTTP-redirect fetch step 15
							resolve(fetch$1(new Request(locationURL, requestOpts)));
							finalize();
							return;
					}
				}

				// prepare response
				res.once('end', function () {
					if (signal) signal.removeEventListener('abort', abortAndFinalize);
				});
				let body = res.pipe(new PassThrough$1());

				const response_options = {
					url: request.url,
					status: res.statusCode,
					statusText: res.statusMessage,
					headers: headers,
					size: request.size,
					timeout: request.timeout,
					counter: request.counter
				};

				// HTTP-network fetch step 12.1.1.3
				const codings = headers.get('Content-Encoding');

				// HTTP-network fetch step 12.1.1.4: handle content codings

				// in following scenarios we ignore compression support
				// 1. compression support is disabled
				// 2. HEAD request
				// 3. no Content-Encoding header
				// 4. no content response (204)
				// 5. content not modified response (304)
				if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// For Node v6+
				// Be less strict when decoding compressed responses, since sometimes
				// servers send slightly invalid responses that are still accepted
				// by common browsers.
				// Always using Z_SYNC_FLUSH is what cURL does.
				const zlibOptions = {
					flush: zlib__default["default"].Z_SYNC_FLUSH,
					finishFlush: zlib__default["default"].Z_SYNC_FLUSH
				};

				// for gzip
				if (codings == 'gzip' || codings == 'x-gzip') {
					body = body.pipe(zlib__default["default"].createGunzip(zlibOptions));
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// for deflate
				if (codings == 'deflate' || codings == 'x-deflate') {
					// handle the infamous raw deflate response from old servers
					// a hack for old IIS and Apache servers
					const raw = res.pipe(new PassThrough$1());
					raw.once('data', function (chunk) {
						// see http://stackoverflow.com/questions/37519828
						if ((chunk[0] & 0x0F) === 0x08) {
							body = body.pipe(zlib__default["default"].createInflate());
						} else {
							body = body.pipe(zlib__default["default"].createInflateRaw());
						}
						response = new Response(body, response_options);
						resolve(response);
					});
					return;
				}

				// for br
				if (codings == 'br' && typeof zlib__default["default"].createBrotliDecompress === 'function') {
					body = body.pipe(zlib__default["default"].createBrotliDecompress());
					response = new Response(body, response_options);
					resolve(response);
					return;
				}

				// otherwise, use response as-is
				response = new Response(body, response_options);
				resolve(response);
			});

			writeToStream(req, request);
		});
	}
	/**
	 * Redirect code matching
	 *
	 * @param   Number   code  Status code
	 * @return  Boolean
	 */
	fetch$1.isRedirect = function (code) {
		return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
	};

	// expose Promise
	fetch$1.Promise = global.Promise;

	var lib = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': fetch$1,
		Headers: Headers,
		Request: Request,
		Response: Response,
		FetchError: FetchError
	});

	var realFetch = getCjsExportFromNamespace(lib);

	createCommonjsModule(function (module) {


	module.exports = function(url, options) {
		if (/^\/\//.test(url)) {
			url = 'https:' + url;
		}
		return realFetch.call(this, url, options);
	};

	if (!commonjsGlobal.fetch) {
		commonjsGlobal.fetch = module.exports;
		commonjsGlobal.Response = realFetch.Response;
		commonjsGlobal.Headers = realFetch.Headers;
		commonjsGlobal.Request = realFetch.Request;
	}
	});

	class CategoriesTree {
	    TreeItems;
	    constructor(treeItems) {
	        this.TreeItems = treeItems;
	    }
	}

	exports.CounterMode = void 0;
	(function (CounterMode) {
	    CounterMode[CounterMode["Undefined"] = 0] = "Undefined";
	    CounterMode[CounterMode["ClientCounter"] = 1] = "ClientCounter";
	    CounterMode[CounterMode["ServerCounter"] = 2] = "ServerCounter";
	})(exports.CounterMode || (exports.CounterMode = {}));

	class TreeItem {
	    ChildItems;
	    FolderType;
	    Guid;
	    ItemNo;
	    ItemType;
	    Name;
	    ParentCaseDefNo;
	    ParentFolderNo;
	    constructor(childItems, folderType, guid, itemNo, itemType, name, parentCaseDefNo, parentFolderNo) {
	        this.ChildItems = childItems;
	        this.FolderType = folderType;
	        this.Guid = guid;
	        this.ItemNo = itemNo;
	        this.ItemType = itemType;
	        this.Name = name;
	        this.ParentCaseDefNo = parentCaseDefNo;
	        this.ParentFolderNo = parentFolderNo;
	    }
	}

	class TheDocument {
	    CategoryNo;
	    IndexDataItems;
	    Streams;
	    DoFillDependentFields;
	    WithAutoAppendMode;
	    ConversionOptions;
	    LastChangeTime;
	    DontResetCategoryDefaults;
	    FileUploadSessions;
	    /**
	     * @param categoryNo
	     * The number of the category the document belongs to.
	     * @param indexDataItems
	     * Index data items of the document.
	     * @param streams
	     * Represents list of files to store within the document.
	     * @param doFillDependentFields
	     * Set to true or false to explicitly execute or skip FillDependentFields step while writing index data.
	     * If not set or null the old behavior will be used.
	     * That means the FillDependentFields step will be executed.
	     * Note: In order to update primary and dependent fields you can: 1. specify both values (for primary and dependent) or just for primary.
	     * In this case primary field will be used to lookup related value(s) for dependent field(s).
	     * Value of dependent field(s) from the request will be ignored. 2. specify value of dependent field(s) only.
	     * In this case if a unique primary field (related to given dependent field(s)) can be found it will be used.
	     * Otherwise, if there are many values found for primary field an error will be returned.
	     * @param withAutoAppendMode
	     * Sets auto append mode for the document.
	     * Null or omitted value means that auto append mode is Disabled.
	     * With Enabled auto append mode use IndexDataItems to specify unique identifier of the document.
	     * @param conversionOptions
	     * Specifies options to convert the files.
	     * @param fileUploadSessions
	     * Represents list of file upload sessions to be used to store files within the document.
	     * See the UploadSessionStart and UploadSessionAppendChunk methods for more details.
	     */
	    constructor(categoryNo, indexDataItems, streams = null, doFillDependentFields = null, withAutoAppendMode = null, conversionOptions = null, fileUploadSessions) {
	        this.CategoryNo = categoryNo;
	        this.IndexDataItems = indexDataItems;
	        this.Streams = streams;
	        this.DoFillDependentFields = doFillDependentFields;
	        this.WithAutoAppendMode = withAutoAppendMode;
	        this.ConversionOptions = conversionOptions;
	        this.FileUploadSessions = fileUploadSessions;
	    }
	}

	exports.ItemType = void 0;
	(function (ItemType) {
	    ItemType[ItemType["Root"] = 0] = "Root";
	    ItemType[ItemType["Folder"] = 1] = "Folder";
	    ItemType[ItemType["Category"] = 2] = "Category";
	    ItemType[ItemType["CaseDefinition"] = 3] = "CaseDefinition";
	})(exports.ItemType || (exports.ItemType = {}));

	exports.FieldType = void 0;
	(function (FieldType) {
	    FieldType[FieldType["StringField"] = 1] = "StringField";
	    FieldType[FieldType["IntField "] = 2] = "IntField ";
	    FieldType[FieldType["DateField"] = 3] = "DateField";
	    FieldType[FieldType["LabelField"] = 4] = "LabelField";
	    FieldType[FieldType["MoneyField"] = 5] = "MoneyField";
	    FieldType[FieldType["LogicalField"] = 6] = "LogicalField";
	    FieldType[FieldType["NumericCounter"] = 8] = "NumericCounter";
	    FieldType[FieldType["TextCounter"] = 9] = "TextCounter";
	    FieldType[FieldType["TableField"] = 10] = "TableField";
	    FieldType[FieldType["CustomField"] = 99] = "CustomField";
	})(exports.FieldType || (exports.FieldType = {}));

	class WSIndexDataItem {
	    DateIndexData;
	    IntIndexData;
	    LogicalIndexData;
	    MoneyIndexData;
	    MultipleKeywordData;
	    SingleKeywordData;
	    StringIndexData;
	    TableIndexData; // ITableIndexData |
	    AccessMask; // IAccessMask |
	    DateTimeIndexData; // IDateTimeIndexData |
	    /**
	     *
	     * @param dateIndexData
	     * @param intIndexData
	     * @param logicalIndexData
	     * @param moneyIndexData
	     * @param multipleKeywordData
	     * @param singleKeywordData
	     * @param stringIndexData
	     * @param tableIndexData
	     * @param accessMask Gets access mask for index data field (column) for connected user.
	     * @param dateTimeIndexData
	     */
	    constructor(dateIndexData, intIndexData, logicalIndexData, moneyIndexData, multipleKeywordData, singleKeywordData, stringIndexData, tableIndexData, accessMask, dateTimeIndexData) {
	        this.DateIndexData = dateIndexData;
	        this.IntIndexData = intIndexData;
	        this.LogicalIndexData = logicalIndexData;
	        this.MoneyIndexData = moneyIndexData,
	            this.MultipleKeywordData = multipleKeywordData,
	            this.SingleKeywordData = singleKeywordData;
	        this.StringIndexData = stringIndexData,
	            this.TableIndexData = tableIndexData,
	            this.AccessMask = accessMask,
	            this.DateTimeIndexData = dateTimeIndexData;
	    }
	}

	class StringIndexData {
	    FieldNo;
	    DataValue;
	    FieldName;
	    /**
	     *
	     * @param fieldNo
	     * Gets or sets the number of the field.
	     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
	     * @param dataValue
	     * Gets or sets the string value of the field.
	     * @param fieldName
	     * Gets or sets the name (actually column name) of the field.
	     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
	     */
	    constructor(fieldNo, dataValue, fieldName) {
	        this.FieldNo = fieldNo;
	        this.DataValue = dataValue;
	        this.FieldName = fieldName;
	    }
	}

	class WSStreamInfoWithData {
	    FileData;
	    FileName;
	    StreamNo;
	    constructor(fileData, fileName) {
	        this.FileData = fileData;
	        this.FileName = fileName;
	        this.StreamNo = null;
	    }
	}

	class WebApi {
	    async post(endPoint, body, rawBody, headers) {
	        let request = {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	                Authorization: this.authHeader,
	            },
	        };
	        if (body) {
	            request = { ...request, ...{ body: JSON.stringify(body) } };
	        }
	        if (rawBody) {
	            request = { ...request, ...{ body: rawBody } };
	        }
	        if (this.tenant) {
	            request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
	        }
	        if (this.client_type) {
	            request.headers = { ...request.headers, ...{ "The-Client-Type": this.client_type } };
	        }
	        if (headers) {
	            request.headers = { ...request.headers, ...headers };
	        }
	        console.log(request);
	        const response = await fetch(this.url + this.apiVersion + endPoint, request);
	        if (response.status === 500) {
	            let body = await response.text();
	            console.error(body);
	            throw new Error(`POST ${endPoint} failed`);
	        }
	        return response.json();
	    }
	}

	class DocumentOperations {
	    async createDocument(document) {
	        const body = document;
	        const data = await WebApi.prototype.post.call(this, 'CreateDocument', body);
	        return data;
	    }
	    /**
	     * Retrieves document by DocNo from Therefore
	     * @param this ThereforeClient
	     * @param docNo Document Number for document to be retrieved
	     * @param isCheckOutStatusNeeded
	     * @param isIndexDataValuesNeeded Get Category IndexData
	     * @param isStreamsInfoAndDataNeeded Get Streams info and files
	     * @param isStreamsInfoNeeded Get Streams info only
	     * @param versionNo Specify which document version to get
	     * @param isAccessMaskNeeded
	     * @param titleHideCategory
	     * @returns TheDocument
	     */
	    async getDocument(docNo, isCheckOutStatusNeeded, isIndexDataValuesNeeded, isStreamsInfoAndDataNeeded, isStreamsInfoNeeded, versionNo, isAccessMaskNeeded, titleHideCategory) {
	        console.log(`Getting Document...`);
	        const body = {
	            "DocNo": docNo,
	            "IsCheckOutStatusNeeded": isCheckOutStatusNeeded,
	            "IsIndexDataValuesNeeded": isIndexDataValuesNeeded,
	            "IsStreamsInfoAndDataNeeded": isStreamsInfoAndDataNeeded,
	            "IsStreamsInfoNeeded": isStreamsInfoNeeded,
	            "VersionNo": versionNo,
	            "IsAccessMaskNeeded": isAccessMaskNeeded,
	            "TitleHideCategory": titleHideCategory,
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetDocument', body);
	        return data;
	    }
	    async getDocumentStream(docNo, streamNo, versionNo) {
	        console.log(`Getting Document Stream...`);
	        const body = {
	            "DocNo": docNo,
	            "StreamNo": streamNo,
	            "VersionNo": versionNo
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetDocumentStream', body);
	        return data;
	    }
	}

	const recursiveCategoriesTreeFindCategory = (categoriesTree, categoryName) => {
	    let result;
	    const setResult = (treeItem) => (result = treeItem);
	    categoriesTree.TreeItems.forEach((treeItem) => recursiveTreeItemPrintFindCategory(treeItem, categoryName, setResult));
	    return result;
	};
	const recursiveTreeItemPrintFindCategory = (treeItem, categoryName, callback) => {
	    let categoryFound = false;
	    if (treeItem.Name === categoryName && treeItem.ItemType === exports.ItemType.Category) {
	        callback(treeItem);
	        categoryFound = true;
	    }
	    if (!categoryFound && treeItem.ChildItems.length > 0)
	        treeItem.ChildItems.forEach((childItem) => recursiveTreeItemPrintFindCategory(childItem, categoryName, callback));
	};

	class CategoryOperations {
	    async getCategoriesTree() {
	        console.log('Getting Categories Tree');
	        const data = await WebApi.prototype.post.call(this, 'GetCategoriesTree', {});
	        return data;
	    }
	    async getCategoryNo(CategoryName) {
	        console.log('Getting Category No');
	        let categoriesTree = await CategoryOperations.prototype.getCategoriesTree.call(this);
	        let resultTreeItem = recursiveCategoriesTreeFindCategory(categoriesTree, CategoryName);
	        if (resultTreeItem) {
	            return resultTreeItem.ItemNo;
	        }
	        else {
	            return undefined;
	        }
	    }
	    async getCategoryInfo(CategoryNo) {
	        console.log('Getting Category Info');
	        const body = {
	            CategoryNo: CategoryNo,
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetCategoryInfo', body);
	        return data;
	    }
	}

	class CaseOperations {
	    async closeCase(caseNo) {
	        const body = {
	            CaseNo: caseNo,
	        };
	        const request = {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json',
	                Authorization: this.authHeader,
	            },
	            body: JSON.stringify(body),
	        };
	        if (this.tenant != null) {
	            request.headers = { ...request.headers, ...{ TenantName: this.tenant } };
	        }
	        const response = await fetch(this.url + this.apiVersion + 'CloseCase', request);
	        if (response.status === 500) {
	            let body = await response.text();
	            console.error(body);
	            throw new Error('Getting Categories tree failed');
	        }
	        return;
	    }
	    async createCase(theCase) {
	        console.log('Creating Case...');
	        const data = await WebApi.prototype.post.call(this, 'CreateCase', theCase);
	        return data;
	    }
	    async updateCase(theCase) {
	        console.log('Updating Case...');
	        const data = await WebApi.prototype.post.call(this, 'SaveCaseIndexData', theCase);
	        return data;
	    }
	    async getCaseDefinition(caseDefinitionNo) {
	        console.log('Getting CaseDefinition...');
	        const body = {
	            CaseDefinitionNo: caseDefinitionNo
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetCaseDefinition', body);
	        return data;
	    }
	    async deleteCase(caseNo) {
	        console.log('Deleting Case...');
	        const body = {
	            CaseNo: caseNo,
	        };
	        await WebApi.prototype.post.call(this, 'DeleteCase', body);
	        return;
	    }
	    async getCase(caseNo) {
	        console.log('Getting Case...');
	        const body = {
	            CaseNo: caseNo,
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetCase', body);
	        return data;
	    }
	    async getCaseDocuments(CaseNo, CategoryNo) {
	        console.log('Getting Case Documents');
	        const body = {
	            CaseNo: CaseNo,
	            CategoryNo: CategoryNo
	        };
	        const data = await WebApi.prototype.post.call(this, 'GetCaseDocuments', body);
	        return data;
	    }
	    async saveCaseIndexDataQuick(caseNo, updatedCase) {
	        await WebApi.prototype.post.call(this, 'SaveCaseIndexDataQuick', {
	            CaseNo: caseNo,
	            IndexData: {
	                IndexDataItems: updatedCase.IndexDataItems
	            }
	        });
	    }
	}

	class TheCase {
	    CaseDefNo;
	    IndexDataItems;
	    DoFillDependentFields;
	    constructor(caseDefNo, indexDataItems, doFillDependentFields) {
	        this.CaseDefNo = caseDefNo,
	            this.IndexDataItems = indexDataItems,
	            this.DoFillDependentFields = doFillDependentFields;
	    }
	}

	class QueryOperations {
	    async executeMultiQuery(queries, fullText) {
	        console.log('Executing MultiQuery...');
	        let body = {
	            FullText: fullText,
	            Queries: queries
	        };
	        const data = await WebApi.prototype.post.call(this, 'ExecuteMultiQuery', body);
	        return data;
	    }
	    async executeSingleQuery(query, fullText) {
	        console.log('Executing SingleQuery...');
	        const data = await WebApi.prototype.post.call(this, 'ExecuteSingleQUery', { Query: query, FullText: fullText });
	        return data;
	    }
	}

	class DateIndexData {
	    FieldNo;
	    DataValue;
	    DataISO8601Value;
	    FieldName;
	    /**
	     *
	     * @param fieldNo
	     * Gets or sets the number of the field.
	     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
	     * @param dataValue
	     * Gets or sets the string value of the field.
	     * @param dataISO8601Value
	     * Gets or sets date value of the field in ISO 8601 format (YYYY-MM-DD, example 2017-07-23).
	     * See also the *DataValue* property.
	     * The DataValue property is ignored if the DataISO8601Value property has a value.
	     * @param fieldName
	     * Gets or sets the name (actually column name) of the field.
	     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
	     */
	    constructor(fieldNo, dataValue, dataISO8601Value, fieldName) {
	        this.FieldNo = fieldNo;
	        this.DataValue = dataValue;
	        this.DataISO8601Value = dataISO8601Value;
	        this.FieldName = fieldName;
	    }
	}

	class IntIndexData {
	    FieldNo;
	    DataValue;
	    FieldName;
	    /**
	     *
	     * @param fieldNo
	     * Gets or sets the number of the field.
	     * Doing request set it to proper field number or to 0 (zero) in order to use the FieldName property instead.
	     * @param dataValue
	     * Gets or sets the integer value of the field.
	     * @param fieldName
	     * Gets or sets the name (actually column name) of the field.
	     * Doing request set the FieldNo property to 0 (zero) in order to use specified FieldName.
	     */
	    constructor(fieldNo, dataValue, fieldName) {
	        this.FieldNo = fieldNo;
	        this.DataValue = dataValue;
	        this.FieldName = fieldName;
	    }
	}

	exports.QueryMode = void 0;
	(function (QueryMode) {
	    QueryMode[QueryMode["NormalQuery"] = 0] = "NormalQuery";
	    QueryMode[QueryMode["FileQuery"] = 1] = "FileQuery";
	    QueryMode[QueryMode["WorkflowQuery"] = 4] = "WorkflowQuery";
	    QueryMode[QueryMode["CaseQuery"] = 5] = "CaseQuery";
	})(exports.QueryMode || (exports.QueryMode = {}));

	class OtherOperations {
	    async uploadSessionStart(fileSize, fileExtension) {
	        const body = {
	            "FileSize": fileSize,
	            "FileExstension": fileExtension
	        };
	        const data = await WebApi.prototype.post.call(this, 'UploadSessionSTart', body);
	        return data;
	    }
	    async uploadSessionAppendChunkRaw(sessionId, chunkPosition = 0, filePath) {
	        const body = fs__namespace.readFileSync(filePath);
	        const headers = {
	            "Content-Type": "application/octet-stream",
	            "X-The-UploadSession-ChunkPosition": chunkPosition,
	            "X-The-UploadSession-Id": sessionId
	        };
	        const data = await WebApi.prototype.post.call(this, 'UploadSessionAppendChunkRaw', undefined, body, headers);
	        return data;
	    }
	}

	class Therefore {
	    url;
	    username;
	    password;
	    authHeader;
	    apiVersion;
	    tenant;
	    client_type;
	    constructor(url, username, password, tenant, client_type) {
	        url.slice(-1) == '/' ? (this.url = url) : (this.url = url + '/');
	        this.username = username;
	        this.password = password;
	        this.authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
	        this.apiVersion = 'theservice/v0001/restun/';
	        this.tenant = tenant,
	            this.client_type = client_type;
	    }
	    //Document operations
	    createDocument = DocumentOperations.prototype.createDocument;
	    getDocument = DocumentOperations.prototype.getDocument;
	    getDocumentStream = DocumentOperations.prototype.getDocumentStream;
	    //Case Operations
	    getCaseDefinition = CaseOperations.prototype.getCaseDefinition;
	    createCase = CaseOperations.prototype.createCase;
	    closeCase = CaseOperations.prototype.closeCase;
	    updateCase = CaseOperations.prototype.updateCase;
	    deleteCase = CaseOperations.prototype.deleteCase;
	    getCase = CaseOperations.prototype.getCase;
	    getCaseDocuments = CaseOperations.prototype.getCaseDocuments;
	    saveCaseIndexDataQuick = CaseOperations.prototype.saveCaseIndexDataQuick;
	    //Category Operations
	    getCategoriesTree = CategoryOperations.prototype.getCategoriesTree;
	    getCategoryNo = CategoryOperations.prototype.getCategoryNo;
	    getCategoryInfo = CategoryOperations.prototype.getCategoryInfo;
	    //Query Operations
	    executeMultiQuery = QueryOperations.prototype.executeMultiQuery;
	    executeSingleQuery = QueryOperations.prototype.executeSingleQuery;
	    //Other Operations
	    uploadSessionStart = OtherOperations.prototype.uploadSessionStart;
	    uploadSessionAppendChunkRaw = OtherOperations.prototype.uploadSessionAppendChunkRaw;
	}

	exports.CategoriesTree = CategoriesTree;
	exports.DateIndexData = DateIndexData;
	exports.IntIndexData = IntIndexData;
	exports.StringIndexData = StringIndexData;
	exports.TheCase = TheCase;
	exports.TheDocument = TheDocument;
	exports.Therefore = Therefore;
	exports.TreeItem = TreeItem;
	exports.WSIndexDataItem = WSIndexDataItem;
	exports.WSStreamInfoWithData = WSStreamInfoWithData;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=therefore-node.umd.js.map
