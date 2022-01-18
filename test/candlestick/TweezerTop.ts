let TweezerTop      from '../../src/candlestick/TweezerTop').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let testData = {
  open: [29.50, 33.10, 36.00, 40.90, 42.80],
  high: [35.90, 37.60, 41.80, 43.10, 43.10],
  close: [33.10, 36.00, 40.90, 42.80, 38.05],
  low: [26.90, 27.70, 28.00, 39.10, 37.50],
};

Deno.test('Tweezer Top : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(testData);
    fs.writeFileSync(`${__dirname}/images/TweezerTop.png`,imageBuffer);
  });
  Deno.test(`Check whether the supplied data has Tweezer Top`, function() {
    let tweezerTop = new TweezerTop();
    let result     = tweezerTop.hasPattern(testData);
    assertEquals(result, true, `Invalid result for Tweezer Top`);
  });
})
