
function playerGames(player, queueType) {
  
  const wins = player.entries[queueType].wins;
  const losses = player.entries[queueType].losses;

  const rawWr = (wins / (wins + losses)) * 10;
  let wr = Math.round(rawWr);

  const wrBase100 = Math.round((wins / (wins + losses)) * 100); 

  const rawLr = (losses / (wins + losses)) * 10;
  let lr = Math.round(rawLr); 

  if (wins > losses && wrBase100 != 50 && wrBase100 != 51 && wrBase100 != 49) {
    wr += 1;
    lr -= 1;
  } else if (wrBase100 != 50 && wrBase100 != 51 && wrBase100 != 49){
    wr -= 1;
    lr += 1;
  }

  const winLen = wins.toString().length;
  const lossLen = losses.toString().length;

  const redBg = '\u001b[1;37;41m';
  const blueBg = '\u001b[1;37;45m';
  const whiteBg = '\u001b[1;47m';
  const reset = '\u001b[0m';

  const fillBlue = `${blueBg}${' '.repeat(2)}${wins} ${' '.repeat(Math.max(0, wr - winLen))}${reset}`;
  const fillRed = `${redBg}${' '.repeat(Math.max(0, lr -lossLen))} ${losses}${' '.repeat(2)}${reset}`;
  // const fillRed = '';


  // console.log(`${fillBlue}${fillRed}`)

  return `${fillBlue}${fillRed}`;
}

module.exports = {
  playerGames
}
