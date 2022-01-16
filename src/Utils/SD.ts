import { IndicatorInput, Indicator } from "../indicator/indicator.ts";
import { SMA } from "../moving_averages/SMA.ts";
import LinkedList from "../Utils/FixedSizeLinkedList.ts";
/**
 * Created by AAravindan on 5/7/16.
 */
("use strict");

export class SDInput extends IndicatorInput {
  // @ts-ignore
  period: number;
  // @ts-ignore
  values: number[];
}

export class SD extends Indicator {
  generator: IterableIterator<number | undefined>;
  constructor(input: SDInput) {
    super(input);
    let period = input.period;
    let priceArray = input.values;

    let sma = new SMA({
      period: period,
      values: [],
      format: (v: number) => {
        return v;
      }
    });

    this.result = [];

    this.generator = (function* () {
      let tick;
      let mean;
      let currentSet = new LinkedList(period);
      // @ts-ignore
      tick = yield;
      let sd;
      while (true) {
        currentSet.push(tick);
        mean = sma.nextValue(tick);
        if (mean) {
          let sum = 0;
          for (let x of currentSet.iterator()) {
            sum = sum + Math.pow(x - mean, 2);
          }
          sd = Math.sqrt(sum / period);
        }
        // @ts-ignore
        tick = yield sd;
      }
    })();

    this.generator.next();

    priceArray.forEach(tick => {
      // @ts-ignore
      let result = this.generator.next(tick);
      if (result.value != undefined) {
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate = sd;

  nextValue(price: number): number | undefined {
    // @ts-ignore
    let nextResult = this.generator.next(price);
    if (nextResult.value != undefined) return this.format(nextResult.value);
  }
}

export function sd(input: SDInput): number[] {
  Indicator.reverseInputs(input);
  let result = new SD(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
