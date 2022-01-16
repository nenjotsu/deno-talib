// deno-lint-ignore-file
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
export class AvgGainInput extends IndicatorInput {
}
export class AverageGain extends Indicator {
generator: Generator<any,never,any>;
static calculate: (input: { reversedInput: any; values?: any[]|undefined; open?: any[]|undefined; high?: any[]|undefined; low?: any[]|undefined; close?: any[]|undefined; volume?: any[]|undefined; timestamp?: any[]|undefined; }) => any;
    constructor(input: { period?: any; values?: any; format?: (v: any) => any; } | any) {
        super(input);
        let values = input.values;
        let period = input.period;
        let format = this.format;
        this.generator = (function* (period) {
            // @ts-ignore
            var currentValue = yield;
            var counter = 1;
            var gainSum = 0;
            var avgGain;
            var gain;
            var lastValue = currentValue;
            // @ts-ignore
            currentValue = yield;
            while (true) {
                gain = currentValue - lastValue;
                gain = gain > 0 ? gain : 0;
                if (gain > 0) {
                    gainSum = gainSum + gain;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgGain === undefined) {
                    avgGain = gainSum / period;
                }
                else {
                    avgGain = ((avgGain * (period - 1)) + gain) / period;
                }
                lastValue = currentValue;
                avgGain = (avgGain !== undefined) ? format(avgGain) : undefined;
                // @ts-ignore
                currentValue = yield avgGain;
            }
        })(period);
        this.generator.next();
        this.result = [];
        values.forEach((tick: any) => {
            var result = this.generator.next(tick);
            if (result.value !== undefined) {
                this.result.push(result.value);
            }
        });
    }
    nextValue(price: any) {
        return this.generator.next(price).value;
    }
    ;
}
AverageGain.calculate = averagegain;
export function averagegain(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new AverageGain(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
