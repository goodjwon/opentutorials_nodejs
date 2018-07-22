


var Xmas95 = new Date('December 25, 1995 23:15:30');
var day = Xmas95.getDate();

console.log(day); // 25
console.log(Xmas95); //2018-07-14T00:31:26.523Z


var todayDate = new Date().toISOString().slice(0,10);
console.log(todayDate);  //2018-07-14

var todayDate = new Date().toISOString()
console.log(todayDate); //2018-07-14T00:31:26.523Z

var datetime = require('node-datetime');
var past = '2015-01-01 00:00:00';
var pastDateTime = datetime.create(past);
// get the current timestamp of the past

console.log(pastDateTime);

setTimeout(function () {
    var pastNow = pastDateTime.now();
    // this would be 1420038010000
    console.log(pastNow);
    // this would be 2015-01-01 00:00:10
    console.log(new Date(1420038010000));
}, 1000);