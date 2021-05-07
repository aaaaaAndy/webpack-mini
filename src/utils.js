const { getTime } = require('./date.js');

exports.getYear = function() {
  return getTime().getFullYear();
}