"use strict";
import { ForceIndex } from "../../src/volume/ForceIndex.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";

let inputForceIndex = {
  open: [],
  high: [],
  low: [],
  close: [
    14.33, 14.23, 13.98, 13.96, 13.93, 13.84, 13.99, 14.31, 14.51, 14.46, 14.61,
    14.48, 14.53, 14.56, 14.25, 14.42
  ],
  volume: [
    0, 45579, 66285, 51761, 69341, 41631, 73499, 55427, 61082, 33325, 39191,
    51128, 46505, 44562, 48815, 33411
  ],
  period: 1
};
let expectedResult = [
  -4558, -16571, -1035, -2080, -3747, 11025, 17737, 12216, -1666, 5879, -6647,
  2325, 1337, -15133, 5680
];

Deno.test("ForceIndex (Force Index", function () {
  Deno.test(
    "should calculate ForceIndex using the calculate method",
    function () {
      assertEquals(
        ForceIndex.calculate(inputForceIndex).map(Math.round),
        expectedResult,
        "Wrong Results"
      );
    }
  );

  Deno.test("should be able to get ForceIndex for the next bar", function () {
    let forceIndex = new ForceIndex(inputForceIndex);
    assertEquals(
      forceIndex.getResult().map(Math.round),
      expectedResult,
      "Wrong Results while getting results"
    );
  });

  Deno.test(
    "should be able to get ForceIndex for the next bar using nextValue",
    function () {
      let forceIndex = new ForceIndex({
        open: [],
        high: [],
        low: [],
        close: [],
        volume: []
      });

      let results:any = [];

      inputForceIndex.close.forEach((_price, index) => {
        let result = forceIndex.nextValue({
          open: inputForceIndex.open[index],
          high: inputForceIndex.high[index],
          low: inputForceIndex.low[index],
          close: inputForceIndex.close[index],
          volume: inputForceIndex.volume[index]
        });
        if (result != undefined) {
          results.push(result);
        }
      });
      assertEquals(
        results.map(Math.round),
        expectedResult,
        "Wrong Results while getting results"
      );
    }
  );
});
