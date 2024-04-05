
function tierColor(tier) {
  let color;
  const reset = '\u001b[0m';

  switch (tier) {
    case 'CHALLENGER':
    case 'GOLD':
    case 'BRONZE':
      color = '\u001b[1;33m';
      break;
    case 'GRANDMASTER':
      color = '\u001b[1;31m';
      break;
    case 'MASTER': 
      color = '\u001b[1;30m';
      break;
    case 'DIAMOND':
      color = '\u001b[1;34m';
      break;
    case 'EMERALD':
      color = '\u001b[1;32m';
      break;
    case 'PLATINUM':
      color = '\u001b[1;36m';
      break;
    case 'SILVER':
    case 'IRON':
      color = '\u001b[1m';
      break;
    default:
      break;
  }

  return `${color}${tier}${reset}`;
}

module.exports = {
  tierColor,
}
