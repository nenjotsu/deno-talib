/**
 * Created by AAravindan on 5/3/16.
 */
let SMA = require('../../lib/moving_averages/SMA').SMA;
let assert = require('assert');
let data   = require('../data')

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


describe('SMA (Simple Moving Average)', function() {
  it('should calculate SMA using the calculate method', function() {
    assert.deepEqual(SMA.calculate({period : period, values : prices}), expectResult, 'Wrong Results');
  });

  it('should be able to calculate EMA by using getResult', function() {
      let smaProducer = new SMA({period : period, values : prices});
      assert.deepEqual(smaProducer.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  it('should be able to get EMA for the next bar using nextValue', function() {
    let smaProducer = new SMA({period : period, values : []});
    let results = [];
    prices.forEach(price => {
      let result = smaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
  })

  it('should be able to get SMA for low values(issue 1)', function() {
    let expectedResult = [ 0.002, 0.00275, 0.0025, 0.003, 0.003, 0.0025 ];
    assert.deepEqual(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002]}), expectedResult, 'Wrong Results');
  })
  
  it('Passing format function should format the results appropriately', function() {
    let expectedResult = [ 0.002, 0.003, 0.003, 0.003, 0.003, 0.003 ];
    assert.deepEqual(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002], format : (val) => { return val.toPrecision(1) }}), expectedResult, 'Wrong Results');
  })
})