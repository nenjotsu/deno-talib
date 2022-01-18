/**
 * Created by AAravindan on 5/5/16.
 */
import { AverageLoss } from "../../src/Utils/AverageLoss.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
// import data from "../data.ts";

let input = {
  period: 6,
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
};

Deno.test("Average Loss", function () {
  Deno.test("Should calculate average loss", function () {
    assertEquals(AverageLoss.calculate(input), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});
