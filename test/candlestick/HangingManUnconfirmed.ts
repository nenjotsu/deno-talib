let HangingMan      from '../../src/candlestick/HangingManUnconfirmed').default;
let assert          from 'assert');
let drawCandleStick from 'draw-candlestick');
let fs              from 'fs');

let hangingManData = [
  {
    name: 'Bearish',
    data: {
      open: [28.90, 29.50, 33.10, 36.00, 42.80],
      high: [36.10, 35.90, 37.60, 41.80, 42.80],
      close: [29.50, 33.10, 36.00, 40.90, 40.90],
      low: [27.00, 26.90, 27.70, 28.00, 33.10],
    },
  },
  {
    name: 'Bullish',
    data: {
      open: [28.90, 29.50, 33.10, 36.00, 40.90],
      high: [36.10, 35.90, 37.60, 41.80, 42.80],
      close: [29.50, 33.10, 36.00, 40.90, 42.80],
      low: [27.00, 26.90, 27.70, 28.00, 33.10],
    },
  },
];

Deno.test('Hanging Man (Unconfirmed) : ', function() {
   before(function() {
    hangingManData.forEach((patternSet) => {
      let imageBuffer = drawCandleStick(patternSet.data);
      fs.writeFileSync(`${__dirname}/images/${patternSet.name.replace(' ', '')}HangingManUnconfirmed.png`,imageBuffer);
    });
  });
  hangingManData.forEach((patternSet) => {
    Deno.test(`Check whether the supplied data has Hanging Man (Unconfirmed): ${patternSet.name}`, function() {
      let hangingMan = new HangingMan();
      let result = hangingMan.hasPattern(patternSet.data);
      assertEquals(result, true, `Invalid result for Hanging Man (Unconfirmed): ${patternSet.name}`);
     });
  });
})
