// deno-lint-ignore-file
/**
 * Created by AAravindan on 5/5/16.
 */
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { AverageGain } from '../Utils/AverageGain.ts';
import { AverageLoss } from '../Utils/AverageLoss.ts';
export class RSIInput extends IndicatorInput {
}
export class RSI extends Indicator {
generator: Generator<number|undefined,never,any>;
static calculate: (input: { reversedInput: any; values?: any[]|undefined; open?: any[]|undefined; high?: any[]|undefined; low?: any[]|undefined; close?: any[]|undefined; volume?: any[]|undefined; timestamp?: any[]|undefined; }) => any;
    constructor(input: { period?: any; values?: any; format?: (v: any) => any; } | any) {
        super(input);
        var period = input.period;
        var values = input.values;
        var GainProvider = new AverageGain({ period: period, values: [] });
        var LossProvider = new AverageLoss({ period: period, values: [] });
        let count = 1;
        this.generator = (function* (period) {
            // @ts-ignore
            var current = yield;
            var lastAvgGain, lastAvgLoss, RS, currentRSI;
            while (true) {
                lastAvgGain = GainProvider.nextValue(current);
                lastAvgLoss = LossProvider.nextValue(current);
                if ((lastAvgGain !== undefined) && (lastAvgLoss !== undefined)) {
                    if (lastAvgLoss === 0) {
                        currentRSI = 100;
                    }
                    else if (lastAvgGain === 0) {
                        currentRSI = 0;
                    }
                    else {
                        RS = lastAvgGain / lastAvgLoss;
                        RS = isNaN(RS) ? 0 : RS;
                        currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
                    }
                }
                count++;
                // @ts-ignore
                current = yield currentRSI;
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
    ;
    nextValue(price: any) {
        return this.generator.next(price).value;
    }
    ;
}
RSI.calculate = rsi;
export function rsi(input: { reversedInput: any; values?: any[]; open?: any[]; high?: any[]; low?: any[]; close?: any[]; volume?: any[]; timestamp?: any[]; } | any) {
    Indicator.reverseInputs(input);
    var result = new RSI(input).result;
    if (input.reversedInput) {
        result.reverse();
    }
    Indicator.reverseInputs(input);
    return result;
}
;
