/**
 * Created by AAravindan on 5/17/16.
 */
"use strict";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { ADL } from "../../src/volume/ADL.ts";

let input = {
  high: [
    62.34, 62.05, 62.27, 60.79, 59.93, 61.75, 60.0, 59.0, 59.07, 59.22, 58.75,
    58.65, 58.47, 58.25, 58.35, 59.86, 59.5299, 62.1, 62.16, 62.67, 62.38,
    63.73, 63.85, 66.15, 65.34, 66.48, 65.23, 63.4, 63.18, 62.7
  ],
  low: [
    61.37, 60.69, 60.1, 58.61, 58.712, 59.86, 57.97, 58.02, 57.48, 58.3,
    57.8276, 57.86, 57.91, 57.8333, 57.53, 58.58, 58.3, 58.53, 59.8, 60.93,
    60.15, 62.2618, 63.0, 63.58, 64.07, 65.2, 63.21, 61.88, 61.11, 61.25
  ],
  close: [
    62.15, 60.81, 60.45, 59.18, 59.24, 60.2, 58.48, 58.24, 58.69, 58.65, 58.47,
    58.02, 58.17, 58.07, 58.13, 58.94, 59.1, 61.92, 61.37, 61.68, 62.09, 62.89,
    63.53, 64.01, 64.77, 65.22, 63.28, 62.4, 61.55, 62.69
  ],
  volume: [
    7849.025, 11692.075, 10575.307, 13059.128, 20733.508, 29630.096, 17705.294,
    7259.203, 10474.629, 5203.714, 3422.865, 3962.15, 4095.905, 3766.006,
    4239.335, 8039.979, 6956.717, 18171.552, 22225.894, 14613.509, 12319.763,
    15007.69, 8879.667, 22693.812, 10191.814, 10074.152, 9411.62, 10391.69,
    8926.512, 7459.575
  ]
};

let expectResult = [
  4774, -4855, -12019, -18249, -21006, -39976, -48785, -52785, -47317, -48561,
  -47216, -49574, -49866, -49354, -47389, -50907, -48813, -32474, -25128,
  -27144, -18028, -20193, -18000, -33099, -32056, -41816, -50575, -53856,
  -58988, -51631
];

Deno.test("ADL (Accumulation Distribution line)", function () {
  Deno.test("should calculate ADL using the calculate method", function () {
    assertEquals(ADL.calculate(input), expectResult, "Wrong Results");
  });

  Deno.test("should be able to calculate ADL by using getResult", function () {
    let adl = new ADL(input);
    assertEquals(
      adl.getResult(),
      expectResult,
      "Wrong Results while calculating next bar"
    );
  });

  Deno.test(
    "should be able to get ADL for the next bar using nextValue",
    function () {
      let adl = new ADL({ high: [], low: [], close: [], volume: [] });
      let results:any = [];
      input.close.forEach(function (close, index) {
        let result = adl.nextValue({
          close: input.close[index],
          high: input.high[index],
          low: input.low[index],
          volume: input.volume[index]
        });
        if (result !== undefined) {
          results.push(parseFloat(result.toFixed(2)));
        }
      });
      assertEquals(
        results,
        expectResult,
        "Wrong Results while getting results"
      );
    }
  );

  Deno.test(
    "should be able to calculate ADL for reversed input by using calculate method",
    function () {
      let myInput = Object.assign({}, input, {reversedInput: true});
      myInput.high.reverse();
      myInput.low.reverse();
      myInput.close.reverse();
      myInput.volume.reverse();
      assertEquals(
        ADL.calculate(myInput),
        expectResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
