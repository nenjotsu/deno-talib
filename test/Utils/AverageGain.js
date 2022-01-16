/**
* Created by AAravindan on 5/5/16.
*/
var AverageGain = require('../../lib/Utils/AverageGain').AverageGain;
var assert = require("assert");
var data = require('../data');

var input = {
 period : 14,
 values : [44.3389,44.0902,44.1497,43.6124,44.3278,44.8264,45.0955,45.4245,45.8433,46.0826,45.8931,46.0328,45.6140,46.2820,46.2820,46.0028,46.0328,46.4116,46.2222,45.6439, 46.2122,46.2521,45.7137,46.4515,45.7835,45.3548,44.0288,44.1783,44.2181,44.5672,43.4205,42.6628,43.1314]
 //values : [44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45]
}

var expectedResults = [.24,.22,.21,.22,0.20,.19,.22,.20,.19,.23,.21,.20,.18,.18,.17,.18,.17,.16,.18]

describe('Average Gain', function() {
 "use strict";
 it('Should calculate average gain', function(){
   assert.deepEqual(AverageGain.calculate(input).map(a=>parseFloat(a.toFixed(2))), expectedResults);
 })
});


