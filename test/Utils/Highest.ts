"use strict";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { Highest } from "../../src/Utils/Highest.ts";

let input = {
  values: [10, 20, 30, 40, 30, 20, 10, 20, 16, 29, 15],
  period: 3
};

let expectResult = [30, 40, 40, 40, 30, 20, 20, 29, 29];

Deno.test("Highest", function () {
  Deno.test("should calculate Highest using the calculate method", function () {
    let result = Highest.calculate(input);
    assertEquals(result, expectResult, "Wrong Results");
  });
});
