"use strict";
import { RSI } from "../../src/oscillators/RSI.ts";
import { AverageGain } from "../../src/Utils/AverageGain.ts";
import { AverageLoss } from "../../src/Utils/AverageLoss.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import data from "../data.ts";

let inputRSI = {
  values: [
    44.34, 44.09, 44.15, 43.61, 44.33, 44.83, 45.1, 45.42, 45.84, 46.08, 45.89,
    46.03, 45.61, 46.28, 46.28, 46.0, 46.03, 46.41, 46.22, 45.64, 46.21, 46.25,
    45.71, 46.45, 45.78, 45.35, 44.03, 44.18, 44.22, 44.57, 43.42, 42.66, 43.13
  ],
  period: 14
};
let expectedResult = [
  70.46, 66.25, 66.48, 69.35, 66.29, 57.92, 62.88, 63.21, 56.01, 62.34, 54.67,
  50.39, 40.02, 41.49, 41.9, 45.5, 37.32, 33.09, 37.79
];

//have issue with this input
let noGainsInput = {
  values: [
    294435, 294435, 294435, 294500, 294500, 294500, 294520, 294539, 294539,
    294600, 294600, 294600, 294600, 294600, 294700, 294600, 294600, 294600,
    294600, 294600, 294700
  ],
  period: 14
};
let noGainsExpectedResult = [100, 71.1, 71.1, 71.1, 71.1, 71.1, 79.63];

Deno.test("RSI (Relative Strength Index)", function () {
  Deno.test(
    "should calculate RSI when there is no gains or losses",
    function () {
      let result = RSI.calculate(noGainsInput);
      assertEquals(result, noGainsExpectedResult, "Wrong Results");
    }
  );

  Deno.test("should calculate RSI using the calculate method", function () {
    assertEquals(RSI.calculate(inputRSI), expectedResult, "Wrong Results");
  });

  Deno.test("should be able to get RSI for the next bar", function () {
    let rsi = new RSI(inputRSI);
    assertEquals(
      rsi.getResult(),
      expectedResult,
      "Wrong Results while getting results"
    );
  });

  Deno.test(
    "should be able to get RSI for the next bar using nextValue",
    function () {
      let rsi = new RSI({
        values: [],
        period: 14
      });
      let results: any = [];
      inputRSI.values.forEach(price => {
        let result = rsi.nextValue(price);
        if (result !== undefined) {
          results.push(result);
        }
      });
      assertEquals(
        results,
        expectedResult,
        "Wrong Results while getting results"
      );
    }
  );

  Deno.test(
    "should be able to calculate ROC for reversed input by using calculate method",
    function () {
      let myInput = Object.assign({ reversedInput: true }, inputRSI);
      myInput.values.reverse();
      assertEquals(
        RSI.calculate(myInput),
        expectedResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
