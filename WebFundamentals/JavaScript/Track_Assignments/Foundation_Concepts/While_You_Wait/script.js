function bDayCountdown(days_left){
  if (days_left > 30){
    console.log(days_left +  " days until my birthday. Such a long time... :(");
  } else if (days_left == 0){
    console.log("PARTY TIME!!");
  } else if (days_left < 5){
    if (days_left == 1){
      console.log("1 DAY UNTIL MY BIRTHDAY!!!");
    } else {
      console.log(days_left +  " DAYS UNTIL MY BIRTHDAY!!!");
    }
  } else if (days_left <= 30){
    console.log(days_left + " days until my birthday!");
  }
}


bDayCountdown(0);
