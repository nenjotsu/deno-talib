let BearishMarubozu from '../../src/candlestick/BearishMarubozu').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  close: [30.50],
  open: [31.23],
  high: [31.23],
  low: [30.50],
}

Deno.test('BearishMarubozu : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishMarubozu.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BearishMarubozu pattern', function() {
   let bearishMarubozu = new BearishMarubozu();
   let result = bearishMarubozu.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BearishMarubozu');
  });
})
