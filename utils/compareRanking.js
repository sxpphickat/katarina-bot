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
  player1 = player1.entries;
  player2 = player2.entries;

  const queueType = 'RANKED_SOLO_5x5';
  const hasRankPlayer1 = Object.keys(player1[queueType]).length ;
  const hasRankPlayer2 = Object.keys(player2[queueType]).length ;

  if (!hasRankPlayer1 && !hasRankPlayer2) {
    return 0;
  } else if (!hasRankPlayer1) {
    return 1;
  } else if (!hasRankPlayer2) {
    return -1;
  }

  const tier1 = tier[player1[queueType].tier];  
  const tier2 = tier[player2[queueType].tier];  

  if (tier1 !== tier2) {
    return tier2 - tier1;
  }

  const rank1 = rank[player1[queueType].rank];
  const rank2 = rank[player2[queueType].rank];

  if (rank1 !== rank2) {
    return rank2 - rank1;
  }
  
  const lp1 = player1[queueType].leaguePoints;
  const lp2 = player2[queueType].leaguePoints;
  
  return lp2 - lp1;
};

module.exports = { comparePlayers };
