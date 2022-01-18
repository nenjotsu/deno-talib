/**
 * Created by AAravindan on 5/3/16.
 */
let WMA from '../../src/moving_averages/WMA').WMA;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let data   from '../data');

let prices = data.close;
let expectedResult = [
  140.32866666666666,
      142.52022222222223,
      146.86288888888888,
      153.76266666666666,
      163.91577777777778,
      177.15777777777777,
      193.04533333333333,
      206.64177777777778,
      226.68177777777777,
      242.2168888888889,
];
let period = 9;

Deno.test('WMA (Weighted Moving Average)', function() {
  Deno.test('should calculate WMA using the calculate method', function() {
    assertEquals(WMA.calculate({
      period : period,
      values : prices
    }), expectedResult, 'Wrong Results');
  });

  Deno.test('should be able to get WMA for the next bar', function() {
    let wma = new WMA({
      period : period,
      values : prices
    });
    assertEquals(wma.getResult(),  expectedResult, 'Wrong Results while getting results');
  })

  Deno.test('should be able to get WMA for the next bar using nextValue', function() {
    let wma = new WMA({
      period : period,
      values : []
    });
    let results = [];
    prices.forEach(price => {
      let result = wma.nextValue(price);
      if(result)
        results.push(result)
    });
    assertEquals(results,  expectedResult, 'Wrong Results while getting results');
  })
})
