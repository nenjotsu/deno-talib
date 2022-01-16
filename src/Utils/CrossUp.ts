import { Indicator, IndicatorInput } from "../indicator/indicator.ts";

export class CrossInput extends IndicatorInput {
  constructor(public lineA: number[], public lineB: number[]) {
    super();
  }
}

export class CrossUp extends Indicator {
  lineA: number[];
  lineB: number[];
  result: boolean[];
  generator: IterableIterator<true | false>;

  constructor(input: CrossInput) {
    super(input);

    this.lineA = input.lineA;
    this.lineB = input.lineB;
    // @ts-ignore
    var currentLineA = [];
    // @ts-ignore
    var currentLineB = [];

    const genFn = function* (): IterableIterator<true | false> {
      // @ts-ignore
      var current = yield;
      var result = false;

      while (true) {
        // @ts-ignore
        currentLineA.unshift(current.valueA);
        // @ts-ignore
        currentLineB.unshift(current.valueB);
        // @ts-ignore
        result = current.valueA > current.valueB;

        var pointer = 1;
        // @ts-ignore
        while (
          result === true &&
          // @ts-ignore
          currentLineA[pointer] >= currentLineB[pointer]
        ) {
          // @ts-ignore
          if (currentLineA[pointer] > currentLineB[pointer]) {
            result = false;
          // @ts-ignore
          } else if (currentLineA[pointer] < currentLineB[pointer]) {
            result = true;
          // @ts-ignore
          } else if (currentLineA[pointer] === currentLineB[pointer]) {
            pointer += 1;
          }
        }

        if (result === true) {
          // @ts-ignore
          currentLineA = [current.valueA];
          // @ts-ignore
          currentLineB = [current.valueB];
        }

        current = yield result;
      }
    };

    this.generator = genFn();
    this.generator.next();

    this.result = [];
    this.lineA.forEach((value, index) => {
      // @ts-ignore
      var result = this.generator.next({
        valueA: this.lineA[index],
        valueB: this.lineB[index]
      });

      if (result.value !== undefined) {
        this.result.push(result.value);
      }
    });
  }

  static calculate = crossUp;

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

export function crossUp(input: CrossInput): boolean[] {
  Indicator.reverseInputs(input);
  var result = new CrossUp(input).result;
  if (input.reversedInput) {
    result.reverse();
  }
  Indicator.reverseInputs(input);
  return result;
}
