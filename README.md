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

## Available Indicators

* [ ] Accumulation Distribution Line (ADL)
* [ ] Average Directional Index (ADX)

## Reference

### Deno Url

{% embed url="https://deno.land/x/talib" %}
[https://deno.land/x/talib](https://deno.land/x/talib)
{% endembed %}

### Documentation

{% embed url="https://nenjo-tsu.gitbook.io/deno-talib" %}
API Documentation
{% endembed %}
