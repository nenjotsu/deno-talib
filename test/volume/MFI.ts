// deno-lint-ignore-file no-explicit-any
/**
 * Created by AAravindan on 5/17/16.
 */
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { MFI } from "../../index.ts";

const input = {
  high: [
    24.61, 24.69, 24.99, 25.36, 25.19, 25.17, 25.0, 24.97, 25.08, 25.26, 25.21,
    25.37, 25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13
  ],
  low: [
    24.64, 24.69, 24.99, 25.36, 25.19, 25.17, 25.01, 24.96, 25.08, 25.25, 25.21,
    25.37, 25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13
  ],
  close: [
    24.63, 24.69, 24.99, 25.36, 25.19, 25.17, 25.02, 24.95, 25.08, 25.24, 25.21,
    25.37, 25.61, 25.58, 25.46, 25.33, 25.09, 25.03, 24.91, 24.89, 25.13
  ],
  volume: [
    18730, 12272, 24691, 18358, 22964, 15919, 16067, 16568, 16019, 9774, 22573,
    12987, 10907, 5799, 7395, 5818, 7165, 5673, 5625, 5023, 7457
  ],
  period: 14
};

const expectResult = [45.11, 36.27, 28.4, 31.53, 33.87, 41.3];

Deno.test("MFI (Accumulation Distribution line)", () => {
  Deno.test("should calculate MFI using the calculate method", function () {
    assertEquals(MFI.calculate(input), expectResult, "Wrong Results");
  });

  Deno.test("should be able to calculate MFI by using getResult", function () {
    const mfi = new MFI(input);
    assertEquals(
      mfi.getResult(),
      expectResult,
      "Wrong Results while calculating next bar"
    );
  });

  Deno.test(
    "should be able to get MFI for the next bar using nextValue",
    function () {
      const mfi = new MFI({
        high: [],
        low: [],
        close: [],
        volume: [],
        period: 14
      });
      const results: any = [];
      input.close.forEach(function (_close, index) {
        const result = mfi.nextValue({
          close: input.close[index],
          high: input.high[index],
          low: input.low[index],
          volume: input.volume[index]
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
    "should be able to calculate MFI for reversed input by using calculate method",
    function () {
      const myInput = Object.assign({}, input, { reversedInput: true });
      myInput.high.reverse();
      myInput.low.reverse();
      myInput.close.reverse();
      myInput.volume.reverse();
      assertEquals(
        MFI.calculate(myInput),
        expectResult.slice().reverse(),
        "Wrong Results while calculating next bar"
      );
    }
  );
});
