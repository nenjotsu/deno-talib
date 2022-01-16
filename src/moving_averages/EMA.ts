import { Indicator } from "../indicator/indicator.ts";
import { MAInput, SMA } from "./SMA.ts";

export class EMA extends Indicator {
  period!: number;
  price!: number[];
  result: number[];
  generator: IterableIterator<number | undefined>;
  constructor(input: MAInput) {
    super(input);
    const period = input.period;
    const priceArray = input.values;
    const exponent = 2 / (period + 1);

    this.result = [];
    const sma = new SMA({ period: period, values: [] });

    const genFn = function* (): IterableIterator<number | undefined> {
      let tick:number|undefined = yield;
      let prevEma;
      while (true) {
        if (prevEma !== undefined && tick !== undefined) {
          prevEma = (tick - prevEma) * exponent + prevEma;
          tick = yield prevEma;
        } else {
          tick = yield;
          // @ts-ignore
          prevEma = sma.nextValue(tick);
          if (prevEma) tick = yield prevEma;
        }
      }
    };

    this.generator = genFn();

    this.generator.next();
    this.generator.next();

    priceArray.forEach(tick => {
      // @ts-ignore
      const result = this.generator.next(tick);
      if (result.value != undefined) {
        this.result.push(this.format(result.value));
      }
    });
  }

  static calculate = ema;

  nextValue(price: number) {
    // @ts-ignore
    const result = this.generator.next(price).value;
    if (result != undefined) return this.format(result);
  }
}

export function ema(input: MAInput): number[] {
  Indicator.reverseInputs(input);
  const result = new EMA(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
