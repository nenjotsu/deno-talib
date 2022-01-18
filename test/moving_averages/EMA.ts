/**
 * Created by AAravindan on 5/3/16.
 */
let EMA from '../../src/moving_averages/EMA').EMA;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let data   from '../data');

let prices = data.close;
let period = 9;
let expectedOutput = [
   138.3422222222222,
      140.53377777777777,
      144.91702222222222,
      151.72361777777778,
      161.4488942222222,
      173.53911537777776,
      187.4772923022222,
      198.68583384177776,
      216.23266707342222,
      229.04013365873777,
]


Deno.test('EMA (Exponential Moving Average)', function() {
  Deno.test('should calculate EMA using the calculate method', function() {
    assertEquals(EMA.calculate({period : period, values : prices}), expectedOutput, 'Wrong Results');
  });

  Deno.test('should be able to get EMA from the get results', function() {
    let emaProducer = new EMA({period : period, values : prices});
    assertEquals(emaProducer.getResult(),  expectedOutput, 'Wrong Results while getting results');
  });

  Deno.test('should be able to get EMA for the next bar using nextValue', function() {
    let emaProducer = new EMA({period : period, values : []});
    let results = [];
    prices.forEach(price => {
      let result = emaProducer.nextValue(price);
      if(result)
        results.push(result)
    });
    assertEquals(results,  expectedOutput, 'Wrong Results while getting results');
  })
})
