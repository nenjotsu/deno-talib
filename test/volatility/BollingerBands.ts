/**
 * Created by AAravindan on 5/3/16.
 */
"use strict";
import { BollingerBands as BB } from "../../src/volatility/BollingerBands.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import data from "../data.ts";

let prices = data.close;

let period = 10;

let stdDev = 2;
let expectResult = [
  {
    lower: 124.13430685095913,
    middle: 139.438,
    pb: 0.8222098059584437,
    upper: 154.74169314904083
  },
  {
    lower: 124.38189560646923,
    middle: 142.908,
    pb: 1.0274179499610292,
    upper: 161.43410439353073
  },
  {
    lower: 121.7102375826896,
    middle: 147.901,
    pb: 1.092747158430917,
    upper: 174.0917624173104
  },
  {
    lower: 115.78036785493323,
    middle: 154.661,
    pb: 1.0875547474322258,
    upper: 193.54163214506679
  },
  {
    lower: 107.06844071822883,
    middle: 162.31099999999998,
    pb: 1.0393396031496236,
    upper: 217.55355928177113
  },
  {
    lower: 99.31718023607398,
    middle: 171.736,
    pb: 0.9936147829601419,
    upper: 244.154819763926
  },
  {
    lower: 102.41148150911386,
    middle: 182.33599999999998,
    pb: 0.882761142358192,
    upper: 262.2605184908861
  },
  {
    lower: 98.98123874940623,
    middle: 196.24,
    pb: 0.9636086191127045,
    upper: 293.4987612505938
  },
  {
    lower: 109.47750652354941,
    middle: 210.362,
    pb: 0.8464754472713815,
    upper: 311.2464934764506
  }
];

Deno.test("BB (Bollinger Bands)", function () {
  Deno.test("should calculate BB using the calculate method", function () {
    assertEquals(
      BB.calculate({ period: period, values: prices, stdDev: stdDev }),
      expectResult,
      "Wrong Results"
    );
  });

  Deno.test("should be able to calculate BB by using getResult", function () {
    let bb = new BB({ period: period, values: prices, stdDev: stdDev });
    assertEquals(
      bb.getResult(),
      expectResult,
      "Wrong Results while calculating next bar"
    );
  });

  Deno.test(
    "should be able to get BB for the next bar using nextValue",
    function () {
      let bb = new BB({ period: period, values: [], stdDev: stdDev });
      let results: any = [];
      prices.forEach(price => {
        let result = bb.nextValue(price);
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
    "should be able to calculate BB for reversed input by using calculate method",
    function () {
      let myInput = Object.assign(
        { reversedInput: true },
        {
          period: period,
          values: prices,
          stdDev: stdDev
        }
      );
      myInput.values.reverse();
      assertEquals(
        BB.calculate(myInput),
        expectResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
