let TweezerBottom   from '../../src/candlestick/TweezerBottom').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let testData = {
  open: [40.90, 36.00, 33.10, 30.10, 26.13],
  high: [41.80, 37.60, 35.90, 31.60, 33.60],
  close: [36.00, 33.10, 29.50, 26.13, 31.00],
  low: [28.00, 27.70, 26.90, 25.90, 25.90],
};

Deno.test('Tweezer Bottom : ', function() {
   before(function() {
    let imageBuffer = drawCandleStick(testData);
    fs.writeFileSync(`${__dirname}/images/TweezerBottom.png`,imageBuffer);
  });
  Deno.test(`Check whether the supplied data has Tweezer Bottom`, function() {
    let tweezerBottom = new TweezerBottom();
    let result        = tweezerBottom.hasPattern(testData);
    assertEquals(result, true, `Invalid result for Tweezer Bottom`);
  });
})
