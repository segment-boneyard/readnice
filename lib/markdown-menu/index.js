
var each = require('each');
var marked = require('marked');
var Menu = require('menu');


/**
 * Expose `MarkdownMenu`.
 */

module.exports = MarkdownMenu;


/**
 * Initialize a new `MarkdownMenu`.
 *
 * @param {String|Element} html
 */

function MarkdownMenu (html) {
  var menu = this.menu = new Menu();
  this.el = menu.el;

  if (!html) return;
  if ('string' == typeof html) html = marked(html);
  var headings = html.querySelectorAll('h2, h3');
  each(headings, function (heading) {
    menu.add({
      id: heading.id,
      text: heading.textContent,
      href: '#' + heading.id
    });
  });
}