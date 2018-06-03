
var _ = require('underscore');
var arr = [5,3,2,3,,5,3,2,1];

console.log(arr[0]);

console.log(_.first(arr));

console.log(_.last(arr));

console.log(arr[arr.length-1]);


arr.sort(function(){console.log('Hello Callback');});
console.log(arr);
