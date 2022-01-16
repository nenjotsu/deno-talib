import { format as nf } from '../Utils/NumberFormatter.ts';
export class IndicatorInput {
}
export class AllInputs {
}
export class Indicator {
    format: any;
    result: any;
    constructor(input: { format: (v: any) => any; }) {
        this.format = input.format || nf;
    }
    static reverseInputs(input: { reversedInput: any; values: any[]; open: any[]; high: any[]; low: any[]; close: any[]; volume: any[]; timestamp: any[]; }) {
        if (input.reversedInput) {
            input.values ? input.values.reverse() : undefined;
            input.open ? input.open.reverse() : undefined;
            input.high ? input.high.reverse() : undefined;
            input.low ? input.low.reverse() : undefined;
            input.close ? input.close.reverse() : undefined;
            input.volume ? input.volume.reverse() : undefined;
            input.timestamp ? input.timestamp.reverse() : undefined;
        }
    }
    getResult() {
        return this.result;
    }
}
