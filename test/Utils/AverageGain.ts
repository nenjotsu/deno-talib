/**
 * Created by AAravindan on 5/5/16.
 */
import { AverageGain } from "../../src/Utils/AverageGain.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
// import data from "../data.ts";

let input = {
  period: 14,
  values: [
    44.3389, 44.0902, 44.1497, 43.6124, 44.3278, 44.8264, 45.0955, 45.4245,
    45.8433, 46.0826, 45.8931, 46.0328, 45.614, 46.282, 46.282, 46.0028,
    46.0328, 46.4116, 46.2222, 45.6439, 46.2122, 46.2521, 45.7137, 46.4515,
    45.7835, 45.3548, 44.0288, 44.1783, 44.2181, 44.5672, 43.4205, 42.6628,
    43.1314
  ]
  //values : [44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45]
};

let expectedResults = [
  0.24, 0.22, 0.21, 0.22, 0.2, 0.19, 0.22, 0.2, 0.19, 0.23, 0.21, 0.2, 0.18,
  0.18, 0.17, 0.18, 0.17, 0.16, 0.18
];

Deno.test("Average Gain", function () {
  Deno.test("Should calculate average gain", function () {
    assertEquals(
      AverageGain.calculate(input).map(a => parseFloat(a.toFixed(2))),
      expectedResults
    );
  });
});
