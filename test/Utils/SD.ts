/**
 * Created by AAravindan on 5/7/16.
 */
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { SD } from "../../src/Utils/SD.ts";

//let data = [4,2,5,8,6];
let data = [11, 12, 13, 14, 15, 16, 18, 19, 22, 23, 23];
let period = 5;
//let expectResult = [2.24]
let expectResult = [
  1.4142135623730951, 1.4142135623730951, 1.7204650534085253, 1.854723699099141,
  2.449489742783178, 2.576819745345025, 2.0976176963403033
];
Deno.test("Standard Deviation", function () {
  "use strict";
  Deno.test("should calculate SD using the calculate method", function () {
    assertEquals(
      SD.calculate({ period: period, values: data }),
      expectResult,
      "Wrong Results"
    );
  });

  Deno.test("should be able to calculate EMA by using getResult", function () {
    let sd = new SD({ period: period, values: data });
    assertEquals(
      sd.getResult(),
      expectResult,
      "Wrong Results while calculating next bar"
    );
  });

  Deno.test(
    "should be able to get EMA for the next bar using nextValue",
    function () {
      let sd = new SD({ period: period, values: [] });
      let results: any = [];
      data.forEach(price => {
        let result = sd.nextValue(price);
        if (result) results.push(result);
      });
      assertEquals(
        results,
        expectResult,
        "Wrong Results while getting results"
      );
    }
  );

  Deno.test(
    "should be able to calculate ROC for reversed input by using calculate method",
    function () {
      let myInput = Object.assign(
        { reversedInput: true },
        {
          period: period,
          values: data
        }
      );
      myInput.values.reverse();
      assertEquals(
        SD.calculate(myInput),
        expectResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
