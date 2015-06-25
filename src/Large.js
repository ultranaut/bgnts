'use strict';

var reload = require('mod-reload');

(function () {

  var root = this;

  // ES6 polyfills
  Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  };
  Number.isNaN = Number.isNaN || function(value) {
    return typeof value === 'number' && value !== value;
  };
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
  };

  // http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Large
   */
  function Large(input) {
    input = typeof input === 'undefined' ? 0 : input;
    var val;

    if (input instanceof Large) {
      this.val = input.val;
    }

    if (Number.isInteger(input)) {
      val = input.toString();
    }

    if (typeof input === 'string' || input instanceof String) {
      if (isNumber(input) && parseInt(input) === parseFloat(input)) {
        val = input;
      }
    }

    if (val !== undefined) {
      val = val.split('')
                    .reverse()
                    .map(function (digit) {
                      return parseInt(digit);
                    });
      this.val = val;
    }

  }

  Large.prototype.size = function () {
    return this.val.length;
  };

  Object.defineProperty(Large.prototype, 'size', {
    get: function () { return this.val.length; }
  });

  Large.prototype.times = function (multiplier) {
    if (!(multiplier instanceof Large)) {
      multiplier = new Large(multiplier);
    }

    var result = Array.apply(null, Array(this.size + multiplier.size))
                      .map(function () { return 0; });

    for (var i = 0; i < multiplier.size; i++) {
      var d = multiplier.val[i];
      var carry = 0;
      for (var j = 0; j < this.size; j++) {
        var product = d * this.val[j] + carry + result[i + j];
        var lsd = product % 10;
        carry = (product - lsd) / 10;
        result[j + i] = lsd;
      }
      if (carry !== 0) {
        result[i + j] = carry;
      }
    }
    while (result[result.length - 1] === 0) {
      result.pop();
    }
    this.val = result;
    return this;
  };


  Large.reload = reload;


  // export as a Node module if we're in that environment
  // otherwise set it as a global object (function, whatever)
  if (typeof module !== 'undefined' &&
      typeof module.exports !== 'undefined') {
    module.exports = Large;
  }
  else {
    root.foo = Large;
  }

}).call(this);








/*
              23
            x 42
           -----
             126
             84
*/
