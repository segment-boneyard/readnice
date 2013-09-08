
var domify = require('domify');
var each = require('each');
var Emitter = require('emitter');
var loading = require('loading');
var map = require('map-element');
var marked = require('marked');
var reactive = require('reactive');
var Repo = require('github-repo');
var template = require('./index.html');


/**
 * Expose `Project`.
 */

module.exports = Project;


/**
 * Initialize a `Project` app.
 *
 * @param {Object} model
 */

function Project (repo) {
  var model = this.model = new Emitter();
  model.repo = repo;
  model.markdown = '';
  model.html = document.createDocumentFragment();

  this.repo = new Repo(repo);
  this.el = domify(template);
  reactive(this.el, model, this);

  var loaded = loading(this.el);
  this.repo.readme(function (err, contents) {
    if (err) throw err;
    model.markdown = contents;
    model.emit('change markdown');
    model.emit('change readme');
    model.emit('change menu');
    loaded();
  });
}


/**
 * Return the project's github URL.
 *
 * @return {String}
 */

Project.prototype.href = function () {
  return 'https://github.com/' + this.model.repo;
};


/**
 * Return the readme's HTML.
 *
 * @return {String}
 */

Project.prototype.readme = function () {
  if (!this.model.markdown) return '';
  return marked(this.model.markdown);
};


/**
 * Return the menu's HTML.
 *
 * @return {String}
 */

Project.prototype.menu = function () {
  if (!this.model.markdown) return '';
  var dom = domify(marked(this.model.markdown));
  var headings = dom.querySelectorAll('h2, h3');
  var ul = map('ul', headings, headingToLi);
  return ul.innerHTML;
};


/**
 * Create a menu item from a heading.
 *
 * @param {Element} heading
 * @return {Element}
 */

function headingToLi (heading) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.textContent = heading.textContent;
  a.href = '#' + heading.id;
  li.appendChild(a);
  return li;
}