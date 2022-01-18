/**
 * Created by AAravindan on 5/7/16.
 */
"use strict"
const assert from 'assert');
const ROC     from '../../src/momentum/ROC').ROC

//let data = [4,2,5,8,6];
let data = [11045.27,11167.32,11008.61,11151.83,10926.77,10868.12,10520.32,10380.43,10785.14,10748.26,10896.91,10782.95,10620.16,10625.83,10510.95,10444.37,10068.01,10193.39,10066.57,10043.75];
let period = 12;
let expectResult = [
      -3.848796815288359,
      -4.848880483410521,
      -4.520643387312293,
      -6.343891540670896,
      -7.859230129306283,
      -6.2083414610806775,
      -4.313081731354179,
      -3.243410918430164,
    ]
Deno.test('Rate of change', function() {
  "use strict";
  Deno.test('should be able to calculate ROC by using getResult', function() {
    let roc = new ROC({period : period, values : data});
    assertEquals(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  Deno.test('should be able to calculate ROC for reversed input by using getResult', function() {
    let roc = new ROC({period : period, values : data, reversedInput : true});
    assertEquals(roc.getResult(),  expectResult, 'Wrong Results while calculating next bar');
  });

  Deno.test('should be able to get ROC for the next bar using nextValue', function() {
    let roc = new ROC({period : period, values : []});
    let results = [];
    data.forEach(price => {
      let result = roc.nextValue(price);
      if(result)
        results.push(result)
    });
    assertEquals(results, expectResult, 'Wrong Results while getting results');
  })

  Deno.test('should calculate ROC using the calculate method', function() {
    assertEquals(ROC.calculate({period : period, values : data}), expectResult, 'Wrong Results');
  });

  Deno.test('should be able to calculate ROC for reversed input by using calculate method', function() {
    let myInput = Object.assign({}, {
      period : period,
      values : data
    });
    myInput.reversedInput = true;
    myInput.values.reverse();
    assertEquals(ROC.calculate(myInput),  expectResult.slice().reverse(), 'Wrong Results while calculating next bar');
  });
})
