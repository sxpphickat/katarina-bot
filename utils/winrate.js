
function winrate(player, queueType) {
  const wr = Math.round((player.entries[queueType].wins / (player.entries[queueType].wins + player.entries[queueType].losses)) * 100);

  const red = '\u001b[1;31m';
  const blue = '\u001b[1;34m';
  const reset = '\u001b[0m';

  return `${wr > 50 ? blue : red}${wr}%${reset}`;
};

module.exports = { winrate };
