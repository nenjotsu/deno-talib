/**
 * Created by AAravindan on 5/3/16.
 */
let SMA from '../../src/moving_averages/SMA').SMA;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let data   from '../data')

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


Deno.test('SMA (Simple Moving Average)', function() {
  Deno.test('should calculate SMA using the calculate method', function() {
    assertEquals(SMA.calculate({period : period, values : prices}), expectResult, 'Wrong Results');
  });

  Deno.test('should be able to calculate EMA by using getResult', function() {
      let smaProducer = new SMA({period : period, values : prices});
      assertEquals(smaProducer.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  Deno.test('should be able to get EMA for the next bar using nextValue', function() {
    let smaProducer = new SMA({period : period, values : []});
    let results = [];
    prices.forEach(price => {
      let result = smaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assertEquals(results, expectResult, 'Wrong Results while getting results');
  })

  Deno.test('should be able to get SMA for low values(issue 1)', function() {
    let expectedResult = [ 0.002, 0.00275, 0.0025, 0.003, 0.003, 0.0025 ];
    assertEquals(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002]}), expectedResult, 'Wrong Results');
  })
  
  Deno.test('Passing format function should format the results appropriately', function() {
    let expectedResult = [ 0.002, 0.003, 0.003, 0.003, 0.003, 0.003 ];
    assertEquals(SMA.calculate({period : 4, values : [0.001, 0.003, 0.001, 0.003, 0.004, 0.002, 0.003, 0.003, 0.002], format : (val) => { return val.toPrecision(1) }}), expectedResult, 'Wrong Results');
  })
})