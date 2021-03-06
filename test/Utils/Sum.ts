import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { Sum } from "../../src/Utils/Sum.ts";

let input = {
  values: [10, 20, 30, 40, 30, 20, 10, 20, 16, 29, 15],
  period: 3
};

let expectResult = [60, 90, 100, 90, 60, 50, 46, 65, 60];

Deno.test("Sum", function () {
  Deno.test("should calculate Sum using the calculate method", function () {
    let result = Sum.calculate(input);
    assertEquals(result, expectResult, "Wrong Results");
  });
});
