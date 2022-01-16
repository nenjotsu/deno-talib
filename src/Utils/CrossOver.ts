import { Indicator, IndicatorInput } from "../indicator/indicator.ts";
import { CrossUp } from "./CrossUp.ts";
import { CrossDown } from "./CrossDown.ts";

export class CrossInput extends IndicatorInput {
  constructor(public lineA: number[], public lineB: number[]) {
    super();
  }
}

export class CrossOver extends Indicator {
  generator: IterableIterator<true | false>;
  result: boolean[];

  constructor(input: CrossInput) {
    super(input);

    let crossUp = new CrossUp({ lineA: input.lineA, lineB: input.lineB });
    let crossDown = new CrossDown({ lineA: input.lineA, lineB: input.lineB });

    const genFn = function* (): IterableIterator<true | false> {
      // @ts-ignore
      let current = yield;
      let result = false;
      let first = true;
      while (true) {
        // @ts-ignore
        let nextUp = crossUp.nextValue(current.valueA, current.valueB);
        // @ts-ignore
        let nextDown = crossDown.nextValue(current.valueA, current.valueB);

        result = nextUp || nextDown;

        if (first) result = false;
        first = false;
        current = yield result;
      }
    };

    this.generator = genFn();
    this.generator.next();

    let resultA = crossUp.getResult();
    // @ts-ignore
    let resultB = crossDown.getResult();
    // @ts-ignore
    this.result = resultA.map((a, index) => {
      if (index === 0) return false;
      return !!(a || resultB[index]);
    });
  }

  static calculate = crossOver;

  static reverseInputs(input: CrossInput): void {
    if (input.reversedInput) {
      input.lineA ? input.lineA.reverse() : undefined;
      input.lineB ? input.lineB.reverse() : undefined;
    }
  }

  nextValue(valueA: number, valueB: number): true | false {
    // @ts-ignore
    return this.generator.next({
      valueA: valueA,
      valueB: valueB
    }).value;
  }
}

export function crossOver(input: CrossInput): boolean[] {
  Indicator.reverseInputs(input);
  let result = new CrossOver(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
