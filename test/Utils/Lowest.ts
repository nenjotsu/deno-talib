
"use strict";
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let Lowest    from '../../src/Utils/Lowest').Lowest;

let input = {
  values : [10,20,30,40,30,20,10,20,16,29,15],
  period : 3
}

let expectResult = [ 10, 20, 30, 20, 10, 10, 10, 16, 15 ]

Deno.test('Lowest', function() {
  Deno.test('should calculate Lowest using the calculate method', function() {
    let result = Lowest.calculate(input);
    assertEquals(result, expectResult, 'Wrong Results');
  });
})
