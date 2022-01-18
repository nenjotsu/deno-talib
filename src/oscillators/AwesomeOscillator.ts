import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import { SMA } from "../moving_averages/SMA.ts";
import { CandleData } from "../StockData.ts";

export class AwesomeOscillatorInput extends IndicatorInput {
  high: number[] = [];
  low: number[] = [];
  close?: number[] = [];
  volume?: number[] = [];
  // @ts-ignore
  fastPeriod: number;
  // @ts-ignore
  slowPeriod: number;
}

export class AwesomeOscillator extends Indicator {
  generator: IterableIterator<number | undefined>;
  constructor(input: AwesomeOscillatorInput) {
    super(input);
    let highs = input.high;
    let lows = input.low;
    let close = input.close;
    let fastPeriod = input.fastPeriod;
    let slowPeriod = input.slowPeriod;

    let slowSMA = new SMA({ values: [], period: slowPeriod });
    let fastSMA = new SMA({ values: [], period: fastPeriod });

    this.result = [];

    this.generator = (function* () {
      let result;
      let tick:any;
      let medianPrice;
      let slowSmaValue;
      let fastSmaValue;
      // @ts-ignore
      tick = yield;
      while (true) {
        medianPrice = (tick.high + tick.low) / 2;
        slowSmaValue = slowSMA.nextValue(medianPrice);
        fastSmaValue = fastSMA.nextValue(medianPrice);
        if (slowSmaValue !== undefined && fastSmaValue !== undefined) {
          result = fastSmaValue - slowSmaValue;
        }
        // @ts-ignore
        tick = yield result;
      }
    })();

    this.generator.next();

    highs.forEach((tickHigh, index) => {
      let tickInput:any = {
        high: tickHigh,
        low: lows[index]
      };
      let result = this.generator.next(tickInput);
      if (result.value != undefined) {
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate = awesomeoscillator;

  nextValue(price: CandleData): number | undefined {
    // @ts-ignore
    let result = this.generator.next(price);
    if (result.value != undefined) {
      return this.format(result.value);
    }
  }
}

export function awesomeoscillator(input: AwesomeOscillatorInput): number[] {
  Indicator.reverseInputs(input);
  let result = new AwesomeOscillator(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
