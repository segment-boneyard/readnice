
var map = require('map');


/**
 * Expose `mapElement`.
 */

module.exports = mapElement;


/**
 * Map to a dom element.
 *
 * @param {String} element
 * @param {Array} arr
 * @param {Function} iterator
 */

function mapElement (element, arr, iterator) {
  var el = document.createElement(element);
  map(arr, function (val) {
    el.appendChild(iterator(val));
  });
  return el;
}