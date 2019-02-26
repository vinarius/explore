window.addEventListener('DOMContentLoaded', () => {

  // function doingStuffwithArgs(...args){
  //   // let arr = [...args];
  //   // let arr = Array.from(args);
  //   // let arr = Array.prototype.slice().call(arguments);
  //   // arr = [].slice().call(arguments);
  //   for(let i=0; i<args.length;i++){
  //     console.log(args[i]);
  //   }
  //   return args;
  // }

  // doingStuffwithArgs([1, 2, 3], [4, 5, 6], [7, 8], [9], [0]);


  //remove the duplicates

  function removeDuplicateValues(arr){
    let temp = arr.slice();

    let uniqueVals = [];
    let test = [];

    for(let i=0; i<temp.length; i++){
      if(uniqueVals.indexOf(temp[i])<0){
        uniqueVals.push(temp[i]);
      }
    }

    temp = uniqueVals;
    return temp;
  }

  function sym(...args) {

    let arr = args.slice();
    let result = [];

    for(let i=0; i<arr.length; i++){
      arr[i] = removeDuplicateValues(arr[i]);
    }

    let temp = arr.shift();
    let temp2 = arr.shift();

    for (let i = 0; i < temp.length; i++) {
      result.push(temp[i]);
      if (temp2.indexOf(temp[i]) >= 0) {
        result.splice(result.length - 1, 1);
      }
    }
    for (let i = 0; i < temp2.length; i++) {
      result.push(temp2[i]);
      if (temp.indexOf(temp2[i]) >= 0) {
        result.splice(result.length - 1, 1);
      }
    }



    if (arr.length >= 1) {
      // while loop, use shift
      while (arr.length) {
        let test = arr.shift();
        let soFar = result;

        for (let i = 0; i < test.length; i++) {
          if (soFar.indexOf(test[i]) >= 0) {
            soFar.splice(soFar.indexOf(test[i]), 1);
          } else {
            soFar.push(test[i]);
          }
        }
        result = soFar;
      }

    }

    result.sort((a, b) => {
      return a - b;
    });
    return result;
  }

  sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]);

  // calculate in succession, not altogether
  // perform calculation and create new array, then perform calculation with new array and next argument

  // sym([1, 2, 3], [5, 2, 1, 4]) should return [3, 4, 5].

}); //end of doc ready