// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
/**
 * Created by AAravindan on 5/8/16.
 */
export class PDMInput extends IndicatorInput {
  low:number[]
  high:number[]
};

export class PDM extends Indicator {
  result : number[];
  generator:IterableIterator<number | undefined>;
  constructor(input:PDMInput) {
    super(input);
    let lows = input.low
    let highs = input.high;
    let format = this.format;

    if(lows.length != highs.length) {
      throw ('Inputs(low,high) not of equal size');
    }

    this.result = [];

    this.generator = (function* (){
      let plusDm;
      let current = yield;
      let last;
      while (true) {
        if(last) {
          let upMove = (current.high  - last.high)
          let downMove = (last.low - current.low)
          plusDm = format((upMove > downMove && upMove > 0) ? upMove : 0);
        }
        last = current;
        current = yield plusDm;
      }
    })();

    this.generator.next();

    lows.forEach((tick, index) => {
      let result = this.generator.next({
        high : highs[index],
        low  : lows[index]
      });
      if(result.value !== undefined)
        this.result.push(result.value);
    });
  };

  static calculate(input:PDMInput):number[] {
       Indicator.reverseInputs(input);
        let result = new PDM(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };

    nextValue(price:number):number | undefined {
        return this.generator.next(price).value;
    };

}