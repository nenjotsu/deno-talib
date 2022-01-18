let BullishHarami from '../../src/candlestick/BullishHarami').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [25.13, 23.45],
  high: [25.80,24.59],
  close: [22.14,24.1],
  low: [21.7,23.07],
}

Deno.test('BullishHarami : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BullishHarami.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BullishHarami pattern', function() {
   let bullishHarami = new BullishHarami ();
   let result = bullishHarami.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BullishHarami')
   
  });
})

