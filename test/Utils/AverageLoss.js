/**
* Created by AAravindan on 5/5/16.
*/
let AverageLoss = require('../../lib/Utils/AverageLoss').AverageLoss;
let assert = require("assert");
let data = require('../data');

let input = {
 period : 6,
 values : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
}

describe('Average Loss', function() {
 "use strict";
 it('Should calculate average loss', function(){
   assert.deepEqual(AverageLoss.calculate(input), [0,0,0,0,0,0,0,0,0,0]);
 })
});


