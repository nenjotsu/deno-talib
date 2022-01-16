// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import LinkedList from '../Utils/FixedSizeLinkedList.ts';


export class ROCInput extends IndicatorInput {
  period : number;
  values : number[];
} 

export class ROC extends Indicator {
  result : number[];
  generator:IterableIterator<number | undefined>;
  constructor(input:ROCInput) {
      super(input);
      let period = input.period
      let priceArray = input.values;
      this.result = [];
      this.generator = (function* (){
        let index = 1;
        let pastPeriods = new LinkedList(period);;
        let tick = yield;
        let roc;
        while (true) {
          pastPeriods.push(tick)
          if(index < period){
            index++;
          }else {
            roc = ((tick - pastPeriods.lastShift) / (pastPeriods.lastShift)) * 100
          }
          tick = yield roc;
        }
      })();

      this.generator.next();

      priceArray.forEach((tick) => {
        let result = this.generator.next(tick);
        if(result.value != undefined && (!isNaN(result.value))){
          this.result.push(this.format(result.value));
        }
      });
  }

   static calculate = roc;

    nextValue(price:number):number | undefined {
        let nextResult = this.generator.next(price);
        if(nextResult.value != undefined && (!isNaN(nextResult.value))) {
          return this.format(nextResult.value);
        }
    };

};


export function roc(input:ROCInput):number[] {
       Indicator.reverseInputs(input);
        let result = new ROC(input).result;
        if(input.reversedInput) {
            result.reverse();
        }
        Indicator.reverseInputs(input);
        return result;
    };