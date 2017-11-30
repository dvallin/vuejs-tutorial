const beautify = require('js-beautify').html;

module.exports = {
  test(object) {
    return typeof object === 'string' && object[0] === '<';
  }
};
