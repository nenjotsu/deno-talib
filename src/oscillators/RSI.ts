/**
 * Created by AAravindan on 5/5/16.
 */

import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import { AverageGain } from "../Utils/AverageGain.ts";
import { AverageLoss } from "../Utils/AverageLoss.ts";

export class RSIInput extends IndicatorInput {
  period!: number;
  values!: number[];
}

export class RSI extends Indicator {
  generator: IterableIterator<number | undefined>;
  constructor(input: RSIInput) {
    super(input);
    const period = input.period;
    const values = input.values;
    const GainProvider = new AverageGain({ period: period, values: [] });
    const LossProvider = new AverageLoss({ period: period, values: [] });
    let count = 1;
    this.generator = (function* (_) {
      // @ts-ignore
      let current = yield;
      let lastAvgGain, lastAvgLoss, RS, currentRSI;
      while (true) {
        lastAvgGain = GainProvider.nextValue(current);
        lastAvgLoss = LossProvider.nextValue(current);
        if (lastAvgGain !== undefined && lastAvgLoss !== undefined) {
          if (lastAvgLoss === 0) {
            currentRSI = 100;
          } else if (lastAvgGain === 0) {
            currentRSI = 0;
          } else {
            RS = lastAvgGain / lastAvgLoss;
            RS = isNaN(RS) ? 0 : RS;
            currentRSI = parseFloat((100 - 100 / (1 + RS)).toFixed(2));
          }
        }
        count++;
        // @ts-ignore
        current = yield currentRSI;
      }
    })(period);

    this.generator.next();

    this.result = [];

    values.forEach((tick: number) => {
      // @ts-ignore
      const result = this.generator.next(tick);
      if (result.value !== undefined) {
        this.result.push(result.value);
      }
    });
  }

  static calculate = rsi;

  nextValue(price: number): number | undefined {
    // @ts-ignore
    return this.generator.next(price).value;
  }
}

export function rsi(input: RSIInput): number[] {
  Indicator.reverseInputs(input);
  const result = new RSI(input).result;
  if (input.reversedInput) result.reverse();
  Indicator.reverseInputs(input);
  return result;
}
