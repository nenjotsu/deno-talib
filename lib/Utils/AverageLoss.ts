// deno-lint-ignore-file
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
export class AvgLossInput extends IndicatorInput {
}
export class AverageLoss extends Indicator {
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
            var lossSum = 0;
            var avgLoss;
            var loss;
            var lastValue = currentValue;
            // @ts-ignore
            currentValue = yield;
            while (true) {
                loss = lastValue - currentValue;
                loss = loss > 0 ? loss : 0;
                if (loss > 0) {
                    lossSum = lossSum + loss;
                }
                if (counter < period) {
                    counter++;
                }
                else if (avgLoss === undefined) {
                    avgLoss = lossSum / period;
                }
                else {
                    avgLoss = ((avgLoss * (period - 1)) + loss) / period;
                }
                lastValue = currentValue;
                avgLoss = (avgLoss !== undefined) ? format(avgLoss) : undefined;
                // @ts-ignore
                currentValue = yield avgLoss;
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
AverageLoss.calculate = averageloss;
export function averageloss(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new AverageLoss(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
