let DarkCloudCover from '../../src/candlestick/DarkCloudCover').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [30.10,39.45],
  high: [37.40,41.45],
  close: [35.36,32.50],
  low: [28.30,31.25],
  
}

Deno.test('DarkCloudCover: ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/darkCloudCover.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has DarkCloudCover pattern', function() {
   let darkCloudCover = new DarkCloudCover ();
   let result        = darkCloudCover.hasPattern(input);
   assertEquals(result, true, 'Invalid result for DarkCloudCover');
  });
})

