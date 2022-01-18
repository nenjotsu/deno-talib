let DownsideTasukiGap from '../../src/candlestick/DownsideTasukiGap').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [45.00, 33.45, 30.20],
  high: [46.20,34.70,36.63],
  close:[41.20,29.31,36.28],
  low: [38.56,28,29.80],
  
}

Deno.test('DownsideTasukiGap : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/downsideTasukiGap.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has DownsideTasukiGap pattern', function() {
   let downsideTasukiGap = new DownsideTasukiGap ();
   let result        = downsideTasukiGap.hasPattern(input);
   assertEquals(result, true, 'Invalid result for DownsideTasukiGap');
  });
})

