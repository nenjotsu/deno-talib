// deno-lint-ignore-file
//STEP 1. Import Necessary indicator or rather last step
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { LinkedList } from '../Utils/LinkedList.ts';
//STEP 2. Create the input for the indicator, mandatory should be in the constructor
export class MAInput extends IndicatorInput {
period: any;
values: any;
    constructor(period: any, values: any) {
        super();
        this.period = period;
        this.values = values;
    }
}
//STEP3. Add class based syntax with export
interface Input { period?: any; values?: any; format?: (v: any) => any; }

export class SMA extends Indicator {
period: any;
price: any;
generator: Generator<number|undefined,never,any>;
static calculate: (input: { reversedInput: any; values?: any[]|undefined; open?: any[]|undefined; high?: any[]|undefined; low?: any[]|undefined; close?: any[]|undefined; volume?: any[]|undefined; timestamp?: any[]|undefined; }) => any;
    
    constructor(input: Input| any) {
        super(input);
        this.period = input.period;
        this.price = input.values;
        var genFn = (function* (period: number) {
            var list = new LinkedList();
            var sum = 0;
            var counter = 1;
            // @ts-ignore
            var current = yield;
            var result;
            list.push(0);
            while (true) {
                if (counter < period) {
                    counter++;
                    list.push(current);
                    sum = sum + current;
                }
                else {
                    sum = sum - list.shift() + current;
                    result = ((sum) / period);
                    list.push(current);
                }
                // @ts-ignore
                current = yield result;
            }
        });
        this.generator = genFn(this.period);
        this.generator.next();
        this.result = [];
        this.price.forEach((tick: any) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(this.format(result.value));
            }
        });
    }
    nextValue(price: any) {
        var result = this.generator.next(price).value;
        if (result != undefined)
            return this.format(result);
    }
    ;
}
SMA.calculate = sma;
export function sma(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new SMA(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
};
//STEP 6. Run the tests
