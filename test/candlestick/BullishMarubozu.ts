let BullishMarubozu from '../../src/candlestick/BullishMarubozu').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  close: [31.23],
  open: [30.50],
  high: [31.23],
  low: [30.50],
}

Deno.test('BullishMarubozu : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishMarubozu.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BullishMarubozu pattern', function() {
   let bullishMarubozu = new BullishMarubozu();
   let result = bullishMarubozu.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BullishMarubozu');
  });
})
