function isStringInvalid(str) {
  if (str.length > 0) {
    return false;
  } else if (str === undefined || str === null || str.length === 0) {
    return true;
  }
}

module.exports = isStringInvalid;
