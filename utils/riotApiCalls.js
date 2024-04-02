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
}

module.exports = { getAccount };
