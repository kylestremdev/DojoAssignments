function numberOnly(arr){
  var returnArr = arr.filter(function (item) {
    if (typeof item === "number") {
      return item;
    }
  });
  return returnArr;
}

function numberOnlyDestructive(arr){
  for (var i = arr.length; i >= 0; i--) {
    if (typeof arr[i] !== "number"){
      arr.splice(i, 1)
    }
  }
}
