
var domify = require('domify');
var each = require('each');
var Emitter = require('emitter');
var loading = require('loading');
var map = require('map-element');
var marked = require('marked');
var MarkdownMenu = ('markdown-menu');
var reactive = require('reactive');
var Repo = require('github-repo');
var rainbow = require('rainbow');
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
  model.readme = '';
  model.stars = '';
  model.html = document.createDocumentFragment();

  this.repo = new Repo(repo);
  this.el = domify(template);
  reactive(this.el, model, this);

  var loaded = loading(this.el);
  this.repo.readme(function (err, contents) {
    if (err) throw err;
    model.readme = contents;
    model.emit('change readme');
    model.emit('change menu');
    loaded();
  });

  this.repo.stars(function(err, res){
    if (err) throw err;
    model.stars = res.data.length;
    model.emit('change stars');
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
 * Markdown filter
 *
 * @return {String}
 */

Project.prototype.markdown = function (str) {
  return marked(str);
};


/**
 * Syntax highlighting filter
 *
 * @return {String}
 */

Project.prototype.highlight = function(str) {
  return str; // TODO: Add highlighting
};


/**
 * Return the menu's HTML.
 *
 * @return {String}
 */

Project.prototype.menu = function () {
  if (!this.model.readme) return '';
  var dom = domify(marked(this.model.readme));
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
  var type = heading.nodeName.toLowerCase();
  var li = document.createElement('li');
  var a = document.createElement('a');
  li.className = 'project-menu-item project-menu-item-' + type;
  a.className = 'project-menu-item-link';
  a.textContent = heading.textContent;
  a.href = '#' + heading.id;
  li.appendChild(a);
  return li;
}