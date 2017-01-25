function clock(h, m, p){
  var morning = "in the morning";
  var evening = "in the evening";
  if (m < 30){
    if (p == "AM"){
      console.log("It's just after", h, morning);
    } else {
      console.log("It's just after", h, evening);
    }
  } else if (m == 30) {
    if(p == "AM"){
      console.log("It's", h+":30", morning);
    } else {
      console.log("It's", h+":30", evening);
    }
  } else{
    if(h == 12) {
      h = 0;
    }
    if(p == "AM"){
      console.log("It's almost", h+1, morning);
    } else {
      console.log("It's almost", h+1, evening);
    }
  }
}
