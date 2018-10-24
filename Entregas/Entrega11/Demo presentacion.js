// function sumAll(arr) {
//     let i = 0;
//     let j = 0;
//     let resultado = 0;
//     if (arr[0] > arr[1]) {
//         j = arr[0];
//         i = arr[1];
//     } else {
//         j = arr[1];
//         i = arr[0];
//     }
//     for (; i <= j; i++) {
//         resultado += i;
//     }
//     return resultado;
// }

// function sumAll(arr) {
//     let resultado = arr.reduce((previous, current) => previous + current);
//     return resultado;
// }

// console.log(sumAll([1, 2, 3, 4, 5]));
// console.log(sumAll([4, 1]));
// console.log(sumAll([10, 5]));
// console.log(sumAll([5, 10]));


// let foods = {
//     apples: 25,
//     oranges: 32,
//     plums: 28,
//     bananas: 13,
//     grapes: 35,
//     strawberries: 27
//   };

//   // change code below this line

//   // change code above this line

//   console.log(foods);
//   delete foods.oranges
//   delete foods.plums
//   delete foods.strawberries
//   console.log(foods);

let users = {
    Alan: {
        age: 27,
        online: false
    },
    Jeff: {
        age: 32,
        online: true
    },
    Sarah: {
        age: 48,
        online: false
    },
    Ryan: {
        age: 19,
        online: true
    }
};

function countOnline(obj) {
    // change code below this line
    let resultado = 0;
    for (let user in users) {
       if (users[user].online) {
           resultado+=1;
       }
    };
    return resultado;
    // change code above this line
}

console.log(countOnline(users));


function getArrayOfUsers(obj) {
    // change code below this line
  return Object.keys(obj);
    // change code above this line
  }
  
  console.log(getArrayOfUsers(users));


  function colorChange(arr, index, newColor) {
    arr.splice(index, 1, newColor);
    return arr;
  }
  
  let colorScheme = ['#878787', '#a08794', '#bb7e8c', '#c9b6be', '#d1becf'];
  
  colorScheme = colorChange(colorScheme, 2, '#332327');
  // we have removed '#bb7e8c' and added '#332327' in its place
  // colorScheme now equals ['#878787', '#a08794', '#332327', '#c9b6be', '#d1becf']


  let weatherConditions = ['rain', 'snow', 'sleet', 'hail', 'clear','pepe','pepa'];

let todaysWeather = weatherConditions.slice(1, 4);
// todaysWeather equals ['snow', 'sleet'];
// weatherConditions still equals ['rain', 'snow', 'sleet', 'hail', 'clear']