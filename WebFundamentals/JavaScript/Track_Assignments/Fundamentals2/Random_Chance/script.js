function slotMachine(numCoins){
  var winningNum = Math.floor(Math.random() * 100);
  var won = false;
  var coinsWon = 0;
  while(numCoins > 0 && won === false){
    var randomNum = Math.floor(Math.random() * 100);
    if (randomNum === winningNum){
      coinsWon = 100 - Math.floor(Math.random() * 50);
      won = true;
      return numCoins + coinsWon;
    }
    numCoins--;
  }
  if (numCoins == 0){
    return 0;
  }
}

function bonusSlotMachine(numCoins, stopCoins){
  var winningNum = Math.floor(Math.random() * 100);
  var totalCoins = numCoins;
  while(numCoins > 0 && totalCoins < stopCoins){
    var randomNum = Math.floor(Math.random() * 100);
    var coinsWon = 0;
    if (randomNum === winningNum){
      coinsWon = 100 - Math.floor(Math.random() * 50);
    }
    numCoins--;
    totalCoins = numCoins + coinsWon;
  }
  if (numCoins == 0 || totalCoins >= stopCoins){
    return totalCoins || 0;
  }
}
