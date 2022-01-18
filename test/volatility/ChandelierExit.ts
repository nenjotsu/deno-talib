
// "use strict";
// let assert = require('assert');
// let ChandelierExit    = require('../../lib/volume/ChandelierExit').ChandelierExit;

// let input = {
//   high :   [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
//   low  :   [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
//   close :  [24.63,24.69,24.99,25.36,25.19,25.17,25.01,24.96,25.08,25.25,25.21,25.37,25.61,25.58,25.46,25.33,25.09,25.03,24.91,24.89,25.13],
//   volume : [18730,12272,24691,18358,22964,15919,16067,16568,16019,9774,22573,12987,10907,5799,7395,5818,7165,5673,5625,5023,7457],
//   period : 14
// }

// let expectResult = [49.46,45.11,36.27,28.40,31.53,33.87,41.30]

// describe('ChandelierExit', function() {
//   it('should calculate ChandelierExit using the calculate method', function() {
//     assert.deepEqual(ChandelierExit.calculate(input), expectResult, 'Wrong Results');
//   });

//   it('should be able to calculate ChandelierExit by using getResult', function() {
//     let chandelierexit = new ChandelierExit(input);
//     assert.deepEqual(chandelierexit.getResult(),  expectResult, 'Wrong Results while calculating next bar');
//   });

//   it('should be able to get ChandelierExit for the next bar using nextValue', function() {
//     let chandelierexit = new ChandelierExit({ high : [], low:[], close:[], volume : [], period:14});
//     let results = [];
//     input.close.forEach(function(close,index) {
//       let result = chandelierexit.nextValue({
//         close: input.close[index],
//         high: input.high[index],
//         low: input.low[index],
//         volume: input.volume[index]
//       });
//       if(result !== undefined){
//         results.push(parseFloat(result.toFixed(2)));
//       }
//     });
//     assert.deepEqual(results, expectResult, 'Wrong Results while getting results');
//   })

//   it('should be able to calculate ChandelierExit for reversed input by using calculate method', function() {
//     let myInput = Object.assign({}, input);
//     myInput.reversedInput = true;
//     myInput.high.reverse();
//     myInput.low.reverse();
//     myInput.close.reverse();
//     myInput.volume.reverse();
//     assert.deepEqual(ChandelierExit.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
//   });
// })
