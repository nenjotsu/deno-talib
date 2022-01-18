// deno-lint-ignore-file no-explicit-any
/**
 * Created by AAravindan on 5/3/16.
 */
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { sma } from "../index.ts";
import { getAvailableIndicators } from "../index.ts";
import data from './data.ts'

const prices = data.close;

const period = 10;

const expectResult =  [
    139.438,
    142.908,
    147.901,
    154.661,
    162.31099999999998,
    171.736,
    182.33599999999998,
    196.24,
    210.362,
]

Deno.test("Test in deno after build process", async () => {
  await Deno.test("should calculate sma", () => {
    assertEquals(sma({period : period, values : prices}), expectResult);
  });

  await Deno.test("Available Indicators should be availabel in global object", () => {
    assertNotEquals(getAvailableIndicators(), undefined)
  });
});
