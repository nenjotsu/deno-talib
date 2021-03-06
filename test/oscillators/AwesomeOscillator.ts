"use strict";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { AwesomeOscillator } from "../../src/oscillators/AwesomeOscillator.ts";

let input = {
  high: [
    24.63, 24.69, 24.99, 25.36, 25.19, 25.17, 25.01, 24.96, 25.08, 25.25, 25.21,
    25.37, 25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13, 24.63,
    24.69, 24.99, 25.36, 25.19, 25.17, 25.01, 24.96, 25.08, 25.25, 25.21, 25.37,
    25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13
  ],
  low: [
    24.63, 24.69, 24.99, 25.36, 25.19, 25.17, 25.01, 24.96, 25.08, 25.25, 25.21,
    25.37, 25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13, 24.63,
    24.69, 24.99, 25.36, 25.19, 25.17, 25.01, 24.96, 25.08, 25.25, 25.21, 25.37,
    25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13
  ],
  fastPeriod: 5,
  slowPeriod: 34,
  format: (a: any) => parseFloat(a.toFixed(2))
};

let expectResult = [0.17, 0.24, 0.26, 0.28, 0.23, 0.12, -0.01, -0.12, -0.16];

Deno.test("AwesomeOscillator", function () {
  Deno.test(
    "should calculate AwesomeOscillator using the calculate method",
    function () {
      assertEquals(
        AwesomeOscillator.calculate(input),
        expectResult,
        "Wrong Results"
      );
    }
  );

  Deno.test(
    "should be able to calculate AwesomeOscillator by using getResult",
    function () {
      let awesomeoscillator = new AwesomeOscillator(input);
      assertEquals(
        awesomeoscillator.getResult(),
        expectResult,
        "Wrong Results while calculating next bar"
      );
    }
  );

  Deno.test(
    "should be able to get AwesomeOscillator for the next bar using nextValue",
    function () {
      let awesomeoscillator = new AwesomeOscillator({
        high: [],
        low: [],
        close: [],
        volume: [],
        fastPeriod: 5,
        slowPeriod: 34
      });
      let results: any = [];
      input.high.forEach(function (_close, index) {
        let result = awesomeoscillator.nextValue({
          high: input.high[index],
          low: input.low[index]
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
    "should be able to calculate AwesomeOscillator for reversed input by using calculate method",
    function () {
      let myInput = Object.assign({ reversedInput: true }, input);
      myInput.high.reverse();
      myInput.low.reverse();
      assertEquals(
        AwesomeOscillator.calculate(myInput),
        expectResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
