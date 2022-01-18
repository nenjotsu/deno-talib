// /**
//  * Created by AAravindan on 5/3/16.
//  */
// let WEMA from '../../src/moving_averages/WEMA').WEMA;
// import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
// let data   from '../data');

// let prices = [
// 0.959399999999999,
// 0.4847,
// 1.3553,
// 0.7911,
// 0.880499999999998,
// 0.7516,
// 1.3057,
// 1.1078,
// 1.0187,
// 1.2364,
// 0.583400000000001,
// 1.0484,
// 0.731900000000003,
// 1.0781,
// 0.900100000000002,
// 1.0882,
// 1.1671,
// 1.6322,
// 0.722000000000001
// ];
// let expectedResult = [
//   13.33,
//   13.28,
//   13.42,
//   13.63,
//   14.29,
//   13.99
// ];
// let period = 9;

// Deno.test('WEMA (Weighted Moving Average)', function() {
//   Deno.test('should calculate WEMA using the calculate method', function() {
//     assertEquals(WEMA.calculate({
//       period : period,
//       values : prices
//     }), expectedResult, 'Wrong Results');
//   });

//   Deno.test('should be able to get WEMA for the next bar', function() {
//     let WEMA = new WEMA({
//       period : period,
//       values : prices
//     });
//     assertEquals(WEMA.getResult(),  expectedResult, 'Wrong Results while getting results');
//   })

//   Deno.test('should be able to get WEMA for the next bar using nextValue', function() {
//     let WEMA = new WEMA({
//       period : period,
//       values : []
//     });
//     let results = [];
//     prices.forEach(price => {
//       let result = WEMA.nextValue(price);
//       if(result)
//         results.push(result)
//     });
//     assertEquals(results,  expectedResult, 'Wrong Results while getting results');
//   })
// })
