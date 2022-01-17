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

RSI.calculate(inputRSI)
```

There are three ways you can use to get the indicator results.

### 1. calculate

Every indicator has a static method `calculate` which can be used to calculate the indicator without creating an object.

```typescript
import { SMA } from 'https://deno.land/x/talib/index.ts';

let prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
let period = 10;

sma({period : period, values : prices})
```

```typescript
import { SMA } from 'https://deno.land/x/talib/index.ts';

let prices = [1,2,3,4,5,6,7,8,9,10,12,13,15];
let period = 10;

SMA.calculate({period : period, values : prices})
```

### 2. nextValue

`nextValue` method is used to get the next indicator value.

```typescript
let sma = new SMA({period : period, values : []});
let results = [];

prices.forEach(price => {
  let result = sma.nextValue(price);
  if(result)
    results.push(result)
});
```

### 3. getResult

This a merge of calculate and nextValue. The usual use case would be

* Initialize indicator with available price value
* Get results for initialized values
* Use nextValue to get next indicator values for further tick.

```typescript
let sma = new SMA({period : period, values : prices});

sma.getResult(); // [5.5, 6.6, 7.7, 8.9]
sma.nextValue(16); // 10.1
```

> **Note**: Calling nextValue will not update `getResult()` value.&#x20;

### Precision

This uses regular javascript numbers, so there can be rounding errors which are negligible for a technical indicators, you can set precision by using the below config. By default there is no precision set.

```typescript
import talib from 'https://deno.land/x/talib/index.ts';

talib.setConfig('precision', 10);
```

### Bullish or Bearish Indicator

Search for all bullish or bearish using

```typescript
import { bullish } from 'https://deno.land/x/talib/index.ts';

const twoDayBullishInput = {
  open: [23.25,15.36],
  high: [25.10,30.87],
  close: [21.44,27.89],
  low: [20.82,14.93],
}

bullish(twoDayBullishInput) // true
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
* [x] Money Flow Index (MFI)
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

## Contribute

Create [issues](https://github.com/nenjotsu/deno-talib/issues) about anything you want to report, change of API's, or request for adding new indicators. You can also create pull request with new indicators.

#### Thanks

Original node package is from [anandanand84](https://github.com/anandanand84). Thanks to [https://github.com/anandanand84/technicalindicators](https://github.com/anandanand84/technicalindicators)
