let DragonFlyDoji from '../../src/candlestick/DragonFlyDoji').default;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let drawCandleStick         from 'draw-candlestick');
let fs                      from 'fs');

let input = {
  open: [30.10],
  high: [30.10],
  close: [30.13],
  low: [28.10],
  
}

let inputDot = {
  open: [30.10],
  high: [30.11],
  close: [30.10],
  low: [30.09],

}

Deno.test('DragonFlyDoji : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(input);
    fs.writeFileSync(__dirname+'/images/dragonFlyDoji.png',imageBuffer);
  });
  Deno.test('Check whether the supplied data has DragonFlyDoji pattern', function() {
   let dragonFlyDoji = new DragonFlyDoji();
   let result = dragonFlyDoji.hasPattern(input);
   assertEquals(result, true, 'Invalid result for DragonFlyDoji');
  });
  Deno.test('Check whether the supplied data has DragonFlyDoji pattern', function() {
   let dragonFlyDoji = new DragonFlyDoji();
   let result = dragonFlyDoji.hasPattern(inputDot);
   assertEquals(result, false, 'Invalid result for a single point Doji');
  });
})
