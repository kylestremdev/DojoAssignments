function fancyArray(arr, sym="->", reversed=false){
  if (reversed === true){
    arr.reverse();
  }

  for (var i = 0; i < arr.length; i++) {
    console.log(i.toString(), sym, arr[i]);
  }
}
