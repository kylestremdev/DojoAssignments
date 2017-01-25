function rangePrint(l, h, s=1){
  if (h === undefined){
    h = l;
    l = 0;
  }
  for (var i = l; i < h; i+=s) {
    console.log(i);
  }
}

rangePrint(4);
