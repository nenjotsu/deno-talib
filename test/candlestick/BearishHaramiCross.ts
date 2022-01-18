let BearishHaramiCross from '../../src/candlestick/BearishHaramiCross').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [20.12, 22.13],
  high: [23.82,22.76],
  close: [23.50,22.13],
  low: [19.88,21.31],
  
}

Deno.test('BearishHaramiCross: ', function() {
  before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/BearishHaramiCross.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has BearishHaramiCross pattern', function() {
   let bearishHaramiCross = new BearishHaramiCross ();
   let result = bearishHaramiCross.hasPattern(input);
   assertEquals(result, true, 'Invalid result for BearishHaramiCross')
   
  });
})

