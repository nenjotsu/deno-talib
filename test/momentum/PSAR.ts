"use strict"

const assert from 'assert');
const PSAR from '../../src/momentum/PSAR').PSAR;

let high = [82.15,81.89,83.03,83.30,83.85,83.90,83.33,84.30,84.84,85.00,75.90,76.58,76.98,78.00,70.87];
let low = [81.29,80.64,81.31,82.65,83.07,83.11,82.49,82.30,84.15,84.11,74.03,75.39,75.76,77.17,70.01];

let expectResult = [
  81.29,
  82.15,
  80.64,
  80.64,
  80.7464,
  80.932616,
  81.17000672,
  81.3884061824,
  81.67956556416,
  82.0588176964608,
  85,
  85,
  84.7806,
  84.565588,
  84.35487624000001
];

let step = 0.02;
let max = 0.2;

let input = { high, low, step, max };

Deno.test('Parabolic Stop and Reverse', function() {

  Deno.test('should be able to calculate PSAR by using getResult', function() {
    let psar = new PSAR(input);
    assertEquals(psar.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  Deno.test('should be able to calculate PSAR for reversed input by using getResult', function() {
    let psar = new PSAR(Object.assign({}, input, { reversedInput: true }));
    assertEquals(psar.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  Deno.test('should be able to get PSAR for the next bar using nextValue', function() {
    let psar = new PSAR({ step, max });
    let results = [];
    low.forEach((v, index) => {
      let result = psar.nextValue({ low: low[index], high: high[index] });
      if(result) results.push(result)
    });
    assertEquals(results, expectResult, 'Wrong Results while getting results');
  })

  Deno.test('should calculate PSAR using the calculate method', function() {
    assertEquals(PSAR.calculate(input), expectResult, 'Wrong Results');
  });

  Deno.test('should be able to calculate PSAR for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, input);
    myInput.reversedInput = true;
    myInput.high.reverse();
    myInput.low.reverse();
    assertEquals(PSAR.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
});
