// @ts-nocheck
"use strict";
import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import { MAInput } from "./SMA.ts";
import { LinkedList } from "../Utils/LinkedList.ts";

export class WMA extends Indicator {
  period: number;
  price: number[];
  result: number[];
  generator: IterableIterator<number | undefined>;
  constructor(input: MAInput) {
    super(input);
    let period = input.period;
    let priceArray = input.values;
    this.result = [];
    this.generator = (function* () {
      let data = new LinkedList();
      let denominator = (period * (period + 1)) / 2;

      while (true) {
        if (data.length < period) {
          data.push(yield);
        } else {
          data.resetCursor();
          let result = 0;
          for (let i = 1; i <= period; i++) {
            result = result + (data.next() * i) / denominator;
          }
          let next = yield result;
          data.shift();
          data.push(next);
        }
      }
    })();

    this.generator.next();

    priceArray.forEach((tick, index) => {
      let result = this.generator.next(tick);
      if (result.value != undefined) {
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate = wma;

  //STEP 5. REMOVE GET RESULT FUNCTION
  nextValue(price: number): number | undefined {
    let result = this.generator.next(price).value;
    if (result != undefined) return this.format(result);
  }
}

export function wma(input: MAInput): number[] {
  Indicator.reverseInputs(input);
  let result = new WMA(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
