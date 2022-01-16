/**
 * Created by AAravindan on 5/3/16.
 */
let sma = require('../dist/index.js').sma;
let cci = require('../dist/index.js').cci;
let AvailableIndicators = require('../dist/index.js').getAvailableIndicators;
let assert = require('assert');
let data   = require('./data')

let prices = data.close;

let period = 10;

let expectResult =  [
    139.438,
    142.908,
    147.901,
    154.661,
    162.31099999999998,
    171.736,
    182.33599999999998,
    196.24,
    210.362,
]


describe('Test in node after build process', function() {
  it('should calculate sma', function() {
    assert.deepEqual(sma({period : period, values : prices}), expectResult, 'Wrong Results');
  });
  it('Available Indicators should be availabel in global object', function() {
    console.log(AvailableIndicators())
    assert.notDeepStrictEqual(AvailableIndicators(), undefined, 'Available indicators not available in global object');
  });
})