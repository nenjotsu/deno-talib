/**
* Created by AAravindan on 5/5/16.
*/
let AverageLoss from '../../src/Utils/AverageLoss').AverageLoss;
import {
  assertEquals
} from "https://deno.land/std@0.121.0/testing/asserts.ts";
let data from '../data');

let input = {
 period : 6,
 values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
}

Deno.test('Average Loss', function() {
 "use strict";
 Deno.test('Should calculate average loss', function(){
   assertEquals(AverageLoss.calculate(input), [0,0,0,0,0,0,0,0,0,0]);
 })
});


