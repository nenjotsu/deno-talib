import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import FixedSizedLinkedList from "./FixedSizeLinkedList.ts";

export class LowestInput extends IndicatorInput {
  values!: number[];
  period!: number;
}

export class Lowest extends Indicator {
  generator: IterableIterator<number | undefined>;
  constructor(input: LowestInput) {
    super(input);
    const values = input.values;
    const period = input.period;

    this.result = [];

    const periodList = new FixedSizedLinkedList(period, false, true, false);
    // @ts-ignore
    this.generator = (function* () {
      let tick:number;
      let high;
      // @ts-ignore
      tick = yield;
      while (true) {
        periodList.push(tick);
        if (periodList.totalPushed >= period) {
          high = periodList.periodLow;
        }
        // @ts-ignore
        tick = yield high;
      }
    })();

    this.generator.next();

    values.forEach((value) => {
      // @ts-ignore
      const result = this.generator.next(value);
      if (result.value != undefined) {
        this.result.push(result.value);
      }
    });
  }

  static calculate = lowest;

  nextValue(price: number): number | undefined {
    // @ts-ignore
    const result = this.generator.next(price);
    if (result.value != undefined) return result.value;
  }
}

export function lowest(input: LowestInput): number[] {
  Indicator.reverseInputs(input);
  const result = new Lowest(input).result;
  if (input.reversedInput) result.reverse();
  Indicator.reverseInputs(input);
  return result;
}
