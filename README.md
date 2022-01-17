---
description: Technical Analysis written in Typescript for Deno
cover: .gitbook/assets/dylan-calluy-JpflvzEl5cg-unsplash.jpeg
coverY: 0
---

# 🦕 deno-talib

![https://deno.land/x/talib](<.gitbook/assets/deno-talib-logo (1).jpg>)

## Installation

```bash
deno install https://deno.land/x/talib/index.ts

# or force to upgrade
deno install -f https://deno.land/x/talib/index.ts

# or specific version
deno install -f https://deno.land/x/talib@0.0.9/index.ts
```

## Basic Usage

```typescript
import { RSI } from 'https://deno.land/x/talib/index.ts';
# or specific version 
# import { RSI } from 'https://deno.land/x/talib@0.0.5/index.ts';

const inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};
const expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
];

console.log(RSI.calculate(inputRSI))
```

There are three ways you can use to get the indicator results.

### calculate

Every indicator has a static method `calculate` which can be used to calculate the indicator without creating an object.

```typescript
import { SMA } from 'https://deno.land/x/talib/index.ts';
let prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
let period = 10;
sma({period : period, values : prices})
```

## Available Indicators



* [x] Accumulation Distribution Line (ADL)
* [x] Average Directional Index (ADX)
* [x] Average True Range (ATR)
* [x] Awesome Oscillator (AO)
* [x] Bollinger Bands (BB)
* [x] Commodity Channel Index (CCI)
* [x] Force Index (FI)
* [x] Know Sure Thing (KST)
* [x] Moneyflow Index (MFI)
* [x] Moving Average Convergence Divergence (MACD)
* [x] On Balance Volume (OBV)
* [x] Parabolic Stop and Reverse (PSAR)
* [x] Rate of Change (ROC)
* [x] Relative Strength Index (RSI)
* [x] Simple Moving Average (SMA)
* [x] Stochastic Oscillator (KD)
* [x] Stochastic RSI (StochRSI)
* [x] Triple Exponentially Smoothed Average (TRIX)
* [x] Typical Price
* [x] Volume Weighted Average Price (VWAP)
* [x] Volume Profile (VP)
* [x] Exponential Moving Average (EMA)
* [x] Weighted Moving Average (WMA)
* [x] Wilder’s Smoothing (Smoothed Moving Average, WEMA)
* [x] WilliamsR (W%R)
* [x] Ichimoku Cloud

### Other Utils

* [x] Average Gain
* [x] Average Loss
* [x] Cross Up
* [x] Cross Down
* [x] Cross Over
* [x] Highest
* [x] Lowest
* [x] Standard Deviation
* [x] Sum

### Chart Types

* [x] Renko
* [x] Heikin-Ashi (HA)

### CandleStick Pattern

* [x] Abandoned Baby
* [x] Bearish Engulfing Pattern
* [x] Bullish Engulfing Pattern
* [x] Dark Cloud Cover
* [x] Downside Tasuki Gap
* [x] Doji
* [x] DragonFly Doji
* [x] GraveStone Doji
* [x] Bullish Harami
* [x] Bearish Harami
* [x] Bearish Harami Cross
* [x] Bullish Marubozu
* [x] Bearish Marubozu
* [x] Evening Doji Star
* [x] Evening Star
* [x] Piercing Line
* [x] Bullish Spinning Top
* [x] Bearish Spinning Top
* [x] Morning Doji Star
* [x] Morning Star
* [x] Three Black Crows
* [x] Three White Soldiers
* [x] Bullish Hammer
* [x] Bearish Hammer
* [x] Bullish Inverted Hammer
* [x] Bearish Inverted Hammer
* [x] Hammer Pattern
* [ ] Hammer Pattern (Unconfirmed)
* [x] Hanging Man
* [ ] Hanging Man (Unconfirmed)
* [x] Shooting Star
* [ ] Shooting Star (Unconfirmed)
* [x] Tweezer Top
* [x] Tweezer Bottom

## Reference

### Deno Url

{% embed url="https://deno.land/x/talib" %}
[https://deno.land/x/talib](https://deno.land/x/talib)
{% endembed %}

### Documentation

{% embed url="https://nenjo-tsu.gitbook.io/deno-talib" %}
API Documentation
{% endembed %}

Original node package is from [anandanand84](https://github.com/anandanand84). Thanks to [https://github.com/anandanand84/technicalindicators](https://github.com/anandanand84/technicalindicators)
