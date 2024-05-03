/** 
 * Check if the account name is in the right format
 * @param {string} name 
 * @returns {boolean}
 * */
function checkAccountName(gameName) {
    const regexPattern = /((.{3,16})(#)(.{3,5}))$/

    if (!regexPattern.test(gameName) || gameName.split('#').length - 1 != 1) {
      return false;
  } else {
    return true;
  }

}

module.exports = { checkAccountName };
