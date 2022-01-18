let GraveStoneDoji from '../../src/candlestick/GraveStoneDoji').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [30.10],
  high: [36.13],
  close: [30.13],
  low: [30.12],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

Deno.test('GraveStoneDoji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/graveStoneDoji.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has GraveStoneDoji pattern', function() {
   let graveStoneDoji = new GraveStoneDoji();
   let result = graveStoneDoji.hasPattern(input);
   assertEquals(result, true, 'Invalid result for GraveStoneDoji');
  });
  Deno.test('Check whether the supplied data has GraveStoneDoji pattern', function() {
   let graveStoneDoji = new GraveStoneDoji();
   let result = graveStoneDoji.hasPattern(inputDot);
   assertEquals(result, false, 'Invalid result for a single point Doji');
  });
})
