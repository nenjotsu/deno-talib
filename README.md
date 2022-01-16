# Deno TALib (Technical Analysis)

Technical analysis (TALib) written in typescript for deno.

![alt text](deno-talib-logo.jpg "deno-talib logo")

# Installation

## Deno

``` bash
deno install https://deno.land/x/talib/index.ts

# or force to upgrade
deno install -f https://deno.land/x/talib/index.ts
```

``` javascript
import { RSI } from 'https://deno.land/x/talib/index.ts';

# or specific version 

import { RSI } from 'https://deno.land/x/talib@0.0.5/index.ts';
```

### Pattern detection

All indicators will be available in window object. So you can just use

``` javascript
// sma({ period: 5, values: [1,2,3,4,5,6,7,8,9], reversedInput: true});

import { RSI } from 'https://deno.land/x/talib/index.ts'

const inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};
const expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
];

console.log(RSI.calculate(inputRSI))
```

or

``` javascript
import { SMA } from 'https://deno.land/x/talib@0.0.5/index.ts';
SMA.calculate({ period: 5, values: [1,2,3,4,5,6,7,8,9] });
```

# Available Indicators
## NOTE: Only those with checked marks are currently added. You can submit issues for a feature request, or submit a PR.

1. [ ] [Accumulation Distribution Line (ADL)](https://tonicdev.com/anandaravindan/adl "ADL").
1. [ ] [Average Directional Index (ADX)](https://github.com/anandanand84/technicalindicators/blob/master/test/directionalmovement/ADX.js "ADX").
1. [ ] [Average True Range (ATR)](https://tonicdev.com/anandaravindan/atr "ATR").
1. [ ] [Awesome Oscillator (AO)](https://github.com/anandanand84/technicalindicators/blob/master/test/oscillators/AwesomeOscillator.js "AO").
1. [x] [Bollinger Bands (BB)](https://replit.com/@nenjotsu/talib-BB#mod.ts "BB").
1. [ ] [Commodity Channel Index (CCI)](https://github.com/anandanand84/technicalindicators/blob/master/test/oscillators/CCI.js "CCI").
1. [ ] [Force Index (FI)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/ForceIndex.js "FI").
1. [ ] [Know Sure Thing (KST)](https://tonicdev.com/anandaravindan/kst "KST").
1. [x] [Moneyflow Index (MFI)](https://replit.com/@nenjotsu/talib-MFI#mod.ts "MFI").
1. [ ] [Moving Average Convergence Divergence (MACD)](https://tonicdev.com/anandaravindan/macd "MACD").
1. [ ] [On Balance Volume (OBV)](https://tonicdev.com/anandaravindan/obv "OBV").
1. [ ] [Parabolic Stop and Reverse (PSAR)](https://github.com/anandanand84/technicalindicators/blob/master/test/momentum/PSAR.js "PSAR").
1. [ ] [Rate of Change (ROC)](https://tonicdev.com/anandaravindan/roc "ROC").
1. [x] [Relative Strength Index (RSI)](https://tonicdev.com/anandaravindan/rsi "RSI").
1. [ ] [Simple Moving Average (SMA)](https://tonicdev.com/anandaravindan/sma "SMA").
1. [ ] [Stochastic Oscillator (KD)](https://tonicdev.com/anandaravindan/stochastic "KD").
1. [ ] [Stochastic RSI (StochRSI)](https://tonicdev.com/anandaravindan/stochasticrsi "StochRSI").
1. [ ] [Triple Exponentially Smoothed Average (TRIX)](https://tonicdev.com/anandaravindan/trix "TRIX").
1. [ ] [Typical Price](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/TypicalPrice.js "Typical Price").
1. [ ] [Volume Weighted Average Price (VWAP)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/VWAP.js "VWAP").
1. [ ] [Volume Profile (VP)](https://github.com/anandanand84/technicalindicators/blob/master/test/volume/VolumeProfile.js "VP").
1. [ ] [Exponential Moving Average (EMA)](https://tonicdev.com/anandaravindan/ema "EMA").
1. [ ] [Weighted Moving Average (WMA)](https://tonicdev.com/anandaravindan/wma "WMA").
1. [ ] [Wilder’s Smoothing (Smoothed Moving Average, WEMA)](https://tonicdev.com/anandaravindan/wema "WEMA").
1. [ ] [WilliamsR (W%R)](https://tonicdev.com/anandaravindan/williamsr "W%R").
1. [ ] [Ichimoku Cloud](https://github.com/anandanand84/technicalindicators/blob/master/test/ichimoku/IchimokuCloud.js "Ichimoku Cloud").

# Other Utils

1. [ ] [Average Gain](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/AverageGain.js "")
1. [ ] [Average Loss](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/AverageLoss.js "")
1. [ ] [Cross Up](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossUp.js "")
1. [ ] [Cross Down](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossDown.js "")
1. [ ] [Cross Over](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/CrossOver.js "")
1. [ ] [Highest](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Highest.js "")
1. [ ] [Lowest](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Lowest.js "")
1. [ ] [Standard Deviation](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/SD.js "")
1. [ ] [Sum](https://github.com/anandanand84/technicalindicators/blob/master/test/Utils/Sum.js "")


# Chart Types

1. [ ] [Renko (renko)](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/Renko.js)
1. [ ] [Heikin-Ashi (HA)](https://github.com/anandanand84/technicalindicators/blob/master/test/chart_types/HeikinAshi.js)


# CandleStick Pattern

1. [ ] [Abandoned Baby](https://runkit.com/anandaravindan/abandoned-baby).
1. [ ] [Bearish Engulfing Pattern](https://runkit.com/aarthiaradhana/bearishengulfingpattern).
1. [ ] [Bullish Engulfiing Pattern](https://runkit.com/aarthiaradhana/bullishengulfingpattern).
1. [ ] [Dark Cloud Cover](https://runkit.com/aarthiaradhana/darkcloudcover).
1. [ ] [Downside Tasuki Gap](https://runkit.com/aarthiaradhana/downsidetasukigap).
1. [ ] [Doji](https://runkit.com/aarthiaradhana/doji).
1. [ ] [DragonFly Doji](https://runkit.com/aarthiaradhana/dragonflydoji).
1. [ ] [GraveStone Doji](https://runkit.com/aarthiaradhana/gravestonedoji).
1. [ ] [BullishHarami](https://runkit.com/aarthiaradhana/bullishharami).
1. [ ] [Bearish Harami Cross](https://runkit.com/aarthiaradhana/bearishharamicross).
1. [ ] [Bullish Harami Cross](https://runkit.com/aarthiaradhana/bullishharamicross).
1. [ ] [Bullish Marubozu](https://runkit.com/aarthiaradhana/bullishmarubozu).
1. [ ] [Bearish Marubozu](https://runkit.com/aarthiaradhana/bearishmarubozu).
1. [ ] [Evening Doji Star](https://runkit.com/aarthiaradhana/eveningdojistar).
1. [ ] [Evening Star](https://runkit.com/aarthiaradhana/eveningstar).
1. [ ] [Bearish Harami](https://runkit.com/aarthiaradhana/bearishharami).
1. [ ] [Piercing Line](https://runkit.com/aarthiaradhana/piercingline).
1. [ ] [Bullish Spinning Top](https://runkit.com/aarthiaradhana/bullishspinningtop).
1. [ ] [Bearish Spinning Top](https://runkit.com/aarthiaradhana/bearishspinningtop).
1. [ ] [Morning Doji Star](https://runkit.com/aarthiaradhana/morningdojistar).
1. [ ] [Morning Star](https://runkit.com/aarthiaradhana/morningstar).
1. [ ] [Three Black Crows](https://runkit.com/aarthiaradhana/threeblackcrows).
1. [ ] [Three White Soldiers](https://runkit.com/aarthiaradhana/threewhitesoldiers).
1. [ ] [Bullish Hammer](https://runkit.com/nerdacus/technicalindicator-bullishhammer).
1. [ ] [Bearish Hammer](https://runkit.com/nerdacus/technicalindicator-bearishhammer).
1. [ ] [Bullish Inverted Hammer](https://runkit.com/nerdacus/technicalindicator-bullishinvertedhammer).
1. [ ] [Bearish Inverted Hammer](https://runkit.com/nerdacus/technicalindicator-bearishinvertedhammer).
1. [ ] [Hammer Pattern](https://runkit.com/nerdacus/technicalindicator-hammerpattern).
1. [ ] [Hammer Pattern (Unconfirmed)](https://runkit.com/nerdacus/technicalindicator-hammerpatternunconfirmed).
1. [ ] [Hanging Man](https://runkit.com/nerdacus/technicalindicator-hangingman).
1. [ ] [Hanging Man (Unconfirmed)](https://runkit.com/nerdacus/technicalindicator-hangingmanunconfirmed).
1. [ ] [Shooting Star](https://runkit.com/nerdacus/technicalindicator-shootingstar).
1. [ ] [Shooting Star (Unconfirmed)](https://runkit.com/nerdacus/technicalindicator-shootingstarunconfirmed).
1. [ ] [Tweezer Top](https://runkit.com/nerdacus/technicalindicator-tweezertop).
1. [ ] [Tweezer Bottom](https://runkit.com/nerdacus/technicalindicator-tweezerbottom).

or

Search for all bullish or bearish using


``` javascript
import { bullish } from 'https://deno.land/x/talib/index.ts';

const twoDayBullishInput = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

bullish(twoDayBullishInput) //true
```


# API

There are three ways you can use to get the indicator results.

## calculate

Every indicator has a static method `calculate` which can be used to calculate the indicator without creating an object.

``` javascript
import { SMA } from 'https://deno.land/x/talib/index.ts';
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
sma({period : period, values : prices})
```

or

``` javascript
import { SMA } from 'https://deno.land/x/talib/index.ts';
var prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var period = 10;
SMA.calculate({period : period, values : prices})
```

## nextValue

`nextValue` method is used to get the next indicator value.

``` javascript
var sma = new SMA({period : period, values : []});
var results = [];
prices.forEach(price => {
  var result = sma.nextValue(price);
  if(result)
    results.push(result)
});
```

## getResult

This a merge of calculate and nextValue. The usual use case would be

1. Initialize indicator with available price value

1. Get results for initialized values

1. Use nextValue to get next indicator values for further tick.

    ``` javascript
    var sma = new SMA({period : period, values : prices});
    sma.getResult(); // [5.5, 6.6, 7.7, 8.9]
    sma.nextValue(16); // 10.1
    ```

    Note: Calling nextValue will not update getResult() value.

### Precision

This uses regular javascript numbers, so there can be rounding errors which are negligible for a technical indicators, you can set precision by using the below config. By default there is no precision set.

  ``` javascript
  import talib from 'https://deno.land/x/talib/index.ts';
  talib.setConfig('precision', 10);
  ```


# Contribute

Create [issues](https://github.com/nenjotsu/deno-talib/issues) about anything you want to report, change of API's, or request for adding new indicators. You can also create pull request with new indicators.


<!-- ## Running tests and getting coverage

``` bash
npm test
npm run cover
``` -->


<!-- ## Verify Documentation

``` bash
node testdocs.js
open "http://localhost:5444/testdocs.html"
``` -->


### Thanks
Original node package is from [anandanand84](https://github.com/anandanand84). Thanks to [https://github.com/anandanand84/technicalindicators](https://github.com/anandanand84/technicalindicators) 
