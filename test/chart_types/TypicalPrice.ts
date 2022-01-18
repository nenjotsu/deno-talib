let TypicalPrice from '../../src/chart_types/TypicalPrice').TypicalPrice;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";

let data = {
    high : [1, 4, 1, 2, 1],
    low :  [2, 5, 2, 2, 1],
    close: [3, 6, 4, 2, 1]
}

let expectedOutput = [(1 + 2 + 3)/ 3, (4 + 5 +6)/ 3, (1 + 2 + 4)/ 3, 2, 1];

Deno.test('TypicalPrice ', function() {
    let input = {};
    beforeEach(function(){
      input = JSON.parse(JSON.stringify(data));
    });
    Deno.test('should calculate TypicalPrice using the calculate method', function() {
      assertEquals(TypicalPrice.calculate(input), expectedOutput,'Wrong Results');
    });
  
    Deno.test('should be able to get TypicalPrice for the next bar using nextValue', function() {
      input.values = [];
      let typicalPrice = new TypicalPrice(input);
      let result = typicalPrice.nextValue({
          high: 4,
          low : 4,
          close : 4 
      });
      assertEquals(result,  4, 'Wrong Results');
    });
  });