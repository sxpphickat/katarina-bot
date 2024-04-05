// @ts-check
const tier = {
  IRON: 1,
  BRONZE: 2,
  SILVER: 3,
  GOLD: 4,
  PLATINUM: 5,
  EMERALD: 6,
  DIAMOND: 7,
  MASTER: 8,
  GRANDMASTER: 9,
  CHALLENGER: 10,
}

const rank = {
  I: 4,
  II: 3,
  III: 2,
  IV: 1,
}


/**
 * compare two player, return positive if the first one is higher, negative if lower, 0 if equal. 
 *
 * @param {Object} player1 
 * @param {Object} player2 
 * @returns {number}
 *
 * */
function comparePlayers(player1, player2) {
  const hasRankPlayer1 = Object.hasOwn(player1, '0');
  const hasRankPlayer2 = Object.hasOwn(player2, '0');

  if (!hasRankPlayer1 && !hasRankPlayer2) {
    return 0;
  } else if (!hasRankPlayer1) {
    return 1;
  } else if (!hasRankPlayer2) {
    return -1;
  }

  const tier1 = tier[player1['0'].tier];  
  const tier2 = tier[player2['0'].tier];  

  if (tier1 !== tier2) {
    return tier2 - tier1;
  }

  const rank1 = rank[player1['0'].rank];
  const rank2 = rank[player2['0'].rank];

  if (rank1 !== rank2) {
    return rank2 - rank1;
  }
  
  const lp1 = player1['0'].leaguePoints;
  const lp2 = player2['0'].leaguePoints;
  
  return lp2 - lp1;
};

module.exports = { comparePlayers };
