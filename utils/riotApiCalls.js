const routes = require('./riot_endpoints.json');

const header = {
  headers: {
    'X-Riot-Token': process.env.RIOT_TOKEN
  }
}

/** 
 * @param {string} gameName 
 * @param {string} tagLine 
 * @param
 * return 
 * */
async function getAccount(gameName, tagLine) {
  const accountEndpoint = `${routes['endpoint']['puuid']}${gameName}/${tagLine}`;
  const req = new URL(`https://${routes['region']['AMERICAS']}${accountEndpoint}`);

  const res = await fetch(req, header)
    .then(res => {
      switch (res.status) {
        case 401:
          throw new Error('Riot api unauthorized');
        case 404:
          throw new Error('Player not found');
        case 200:
          return res.json();
        default:
          throw new Error(`Riot api error ${res.status}`);
      } 
    });
  return res;
}


/** 
 * @param {string} playerId 
 * @param {string} server 
 * @returns {Object}
 * */
async function getSummoner(playerId, server) {
  const req = new URL(`https://${routes['server'][server]}${routes['endpoint']['summoner']}${playerId}`);

  const res = await fetch(req, header)
    .then(res => {
      if (!res.ok) { throw new Error(`Riot api error ${res.status}`); } 
      return res.json();
    });
  return res;
}

module.exports = { getAccount, getSummoner };
