// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';

export class AvgGainInput extends IndicatorInput {
  period:number
  values:number[]
}

export class AverageGain extends Indicator {
  generator:IterableIterator<number | undefined>;
  constructor(input:AvgGainInput) {
    super(input);
    let values = input.values;
    let period = input.period;
    let format = this.format;

    this.generator = (function* (period){
      let currentValue = yield;
      let counter = 1;
      let gainSum = 0;
      let avgGain;
      let gain;
      let lastValue = currentValue;
      currentValue = yield
      while(true){
        gain = currentValue - lastValue;
        gain = gain > 0 ? gain : 0;
        if(gain > 0){
          gainSum = gainSum + gain;
        }
        if(counter < period){
          counter++;
        }
        else if(avgGain === undefined){
          avgGain = gainSum / period;
        }else {
          avgGain = ((avgGain * (period-1)) + gain)/period;
        }
        lastValue = currentValue;
        avgGain = (avgGain!==undefined) ? format(avgGain) : undefined;
        currentValue = yield avgGain;
      }
    })(period);

    this.generator.next();

    this.result = [];

    values.forEach((tick:number) => {
      let result = this.generator.next(tick);
      if(result.value !== undefined){
        this.result.push(result.value);
      }
    });
  }

  static calculate = averagegain;

    nextValue(price:number):number | undefined {
        return this.generator.next(price).value;
    };
}

export function averagegain(input:AvgGainInput):number[] {
       Indicator.reverseInputs(input);
        let result = new AverageGain(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };