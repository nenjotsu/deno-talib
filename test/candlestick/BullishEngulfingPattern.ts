let BullishEngulfingPattern from '../../src/candlestick/BullishEngulfingPattern').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

Deno.test('BullishEngulfingPattern : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/bullishEngulfingPattern.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BullishEngulfingPattern pattern', function() {
   let bullishEngulfingPattern = new BullishEngulfingPattern ();
   let result        = bullishEngulfingPattern.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BullishEngulfingPattern');
   
  });
})

