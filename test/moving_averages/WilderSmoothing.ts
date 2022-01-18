/**
 * Created by AAravindan on 5/3/16.
 */
let WilderSmoothing from '../../src/moving_averages/WilderSmoothing').WilderSmoothing;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let data   from '../data');

let prices = [
0.959399999999999,
0.4847,
1.3553,
0.7911,
0.880499999999998,
0.7516,
1.3057,
1.1078,
1.0187,
1.2364,
0.583400000000001,
1.0484,
0.731900000000003,
1.0781,
0.900100000000002,
1.0882,
1.1671,
1.6322,
0.722000000000001
];
let expectedResult = [
  13.333000000000002,
      13.280742857142862,
      13.420318367346944,
      13.628824198250733,
      14.287536755518538,
      13.988998415838644,
];
let period = 14;

Deno.test('WilderSmoothing (Wilder smoothing)', function() {
  Deno.test('should calculate WilderSmoothing using the calculate method', function() {
    assertEquals(WilderSmoothing.calculate({
      period : period,
      values : prices
    }), expectedResult, 'Wrong Results');
  });

  Deno.test('should be able to get WilderSmoothing for the next bar', function() {
    let wilderSmoothing = new WilderSmoothing({
      period : period,
      values : prices
    });
    assertEquals(wilderSmoothing.getResult(),  expectedResult, 'Wrong Results while getting results');
  })

  Deno.test('should be able to get WilderSmoothing for the next bar using nextValue', function() {
    let wilderSmoothing = new WilderSmoothing({
      period : period,
      values : []
    });
    let results = [];
    prices.forEach(price => {
      let result = wilderSmoothing.nextValue(price);
      if(result)
        results.push(result)
    });
    assertEquals(results,  expectedResult, 'Wrong Results while getting results');
  })
})
