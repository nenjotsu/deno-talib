let Doji from '../../src/candlestick/Doji').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [30.10],
  high: [32.10],
  close: [30.13],
  low: [28.10],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

Deno.test('Doji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/doji.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has Doji pattern', function() {
   let doji = new Doji();
   let result = doji.hasPattern(input);
   assertEquals(result, true, 'Invalid result for Doji');
  });
  Deno.test('Check whether the supplied data has Doji pattern', function() {
   let doji = new Doji();
   let result = doji.hasPattern(inputDot);
   assertEquals(result, true, 'Invalid result for a single point Doji');
  });
})
