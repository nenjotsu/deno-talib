let BearishHarami from '../../src/candlestick/BearishHarami').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [20.12, 22,13],
  high: [23.82,22.76],
  close: [23.50,21.70],
  low: [19.88,21.31],
}

Deno.test('BearishHarami : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishHarami.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BearishHarami pattern', function() {
   let bearishHarami = new BearishHarami ();
   let result = bearishHarami.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BearishHarami')
   
  });
})

