'use strict';

var expect = require('chai').expect;
var Large = require('../src/Large');

describe('Large', function () {
  it('should return a Large object', function () {
    var n = new Large();
    expect(n).to.be.an('object');
    expect(n.constructor.name).to.equal('Large');
  });
  describe('.val', function () {
    it('should return an array', function () {
      var n = new Large(42);
      expect(n.val).to.be.an('array');
    });
    it('should default to [0]', function () {
      var n = new Large();
      expect(n.val).to.eql([0]);
    });
  });
  // it('should return what was passed to it', function () {
  //   var bar = 'bar';
  //   var baz = { baz: 'qux' };
  //   expect(foo(bar)).to.equal(bar);
  //   expect(foo(baz)).to.deep.equal(baz);
  // });
});
