// deno-lint-ignore-file
// @ts-nocheck
import { Indicator, IndicatorInput } from '../indicator/indicator.ts';
import { getConfig } from '../config.ts';
// import * as tf from '@tensorflow/tfjs';

let isNodeEnvironment = false;

let model;
let oneHotMap = ['IHS', 'TU', 'DB', 'HS', 'TD', 'DT'];

declare let module;
declare let __dirname;
declare let global;
declare let require;
let tf; 

try {
    isNodeEnvironment = Object.prototype.toString.call(global.process) === '[object process]' ;
 } catch(e) {}

export class PatternDetectorInput extends IndicatorInput {
    constructor(public values:number[]) {
        super();
    }
}

export enum AvailablePatterns {
    'IHS',
    'TU',
    'DB',
    'HS',
    'TD', 
    'DT'
}

function interpolateArray(data:any, fitCount:any):number[] {
    let linearInterpolate = function (before:any, after:any, atPoint:any) {
        return before + (after - before) * atPoint;
    };

    let newData = new Array();
    let springFactor:any = new Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for ( let i = 1; i < fitCount - 1; i++) {
        let tmp = i * springFactor;
        let before:any = new Number(Math.floor(tmp)).toFixed();
        let after:any = new Number(Math.ceil(tmp)).toFixed();
        let atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
};

function l2Normalize(arr:any):number[] {
    let sum = arr.reduce((cum:any, value:any)=> { return cum + (value * value) }, 0);
    let norm = Math.sqrt(sum);
    return arr.map((v:any)=>v/norm);
}

export class PatternDetectorOutput {
    patternId: AvailablePatterns
    pattern : string
    probability : number
}

let modelLoaded = false;
let laodingModel = false;
let loadingPromise;

async function loadModel() {
    if(modelLoaded) return Promise.resolve(true);
    if(laodingModel) return loadingPromise;
    laodingModel = true;
    loadingPromise = new Promise(async function(resolve, reject) {
        if(isNodeEnvironment) {
            tf = require('@tensorflow/tfjs')
            console.log('Nodejs Environment detected ');
            let tfnode = require('@tensorflow/tfjs-node');
            let modelPath = require('path').resolve(__dirname, '../tf_model/model.json');
            model = await tf.loadModel(tfnode.io.fileSystem(modelPath));
        } else {
            if(typeof (window as any).tf == "undefined") {
                modelLoaded = false;
                laodingModel = false;
                console.log('Tensorflow js not imported, pattern detection may not work');
                resolve();
                return;
            }
            tf = (window as any).tf;
            console.log('Browser Environment detected ', tf);
            console.log('Loading model ....')
            model = await tf.loadModel('/tf_model/model.json');
            modelLoaded = true;
            laodingModel = false;
            setTimeout(resolve, 1000);
            console.log('Loaded model');
            return;
        }
        modelLoaded = true;
        laodingModel = false;
        resolve();
        return;
    });
    await loadingPromise;
    return;
 }

loadModel();

export async function predictPattern(input:PatternDetectorInput):Promise<PatternDetectorOutput> {
    await loadModel()
    if(input.values.length < 300) {
        console.warn('Pattern detector requires atleast 300 data points for a reliable prediction, received just ', input.values.length)
    }
    Indicator.reverseInputs(input);
    let values = input.values;
    let output = await model.predict(tf.tensor2d([l2Normalize(interpolateArray(values, 400))]));
    let index = tf.argMax(output, 1).get(0);
    Indicator.reverseInputs(input);
    return { patternId : index, pattern : oneHotMap[index], probability : output.get(0,4) * 100}
}

export async function hasDoubleBottom(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DB)
}

export async function hasDoubleTop(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.DT)
}

export async function hasHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.HS)
}

export async function hasInverseHeadAndShoulder(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.IHS)
}

export async function isTrendingUp(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TU)
}

export async function isTrendingDown(input:PatternDetectorInput):Promise<Boolean> {
    let result = await predictPattern(input)
    return (result.patternId === AvailablePatterns.TD)
}

export class PatternDetector extends Indicator {
    static predictPattern = predictPattern;
    static hasDoubleBottom = hasDoubleBottom;
    static hasDoubleTop = hasDoubleTop;
    static hasHeadAndShoulder = hasHeadAndShoulder;
    static hasInverseHeadAndShoulder = hasInverseHeadAndShoulder;
    static isTrendingUp = isTrendingUp;
    static isTrendingDown = isTrendingDown;
}