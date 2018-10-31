// Demo splice

var fruits = ["Banana", "Orange", "Apple", "Mango",NaN];

function mySplice2() {
  nuevo=  fruits.splice(2, 1);
}

function mySplice() {
var res1=fruits.indexOf("Banana");
var res2 = fruits.indexOf(NaN);

  nuevo=  fruits.splice(2, 1, "Lemon", "Kiwi");
}

mySplice();
console.log(fruits)
console.log(nuevo)
mySplice();
mySplice();
console.log(fruits)
console.log(nuevo)












//Demo slice
let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear'];
let todaysWeather = weatherConditions.slice(1, 3);

console.log("")
