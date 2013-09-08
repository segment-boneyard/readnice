
var domify = require('domify');
var Emitter = require('emitter');
var loading = require('loading');
var marked = require('marked');
var MarkdownMenu = require('markdown-menu');
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
  this.repo = new Repo(repo);
  this.el = domify(template);
  reactive(this.el, this);

  var loaded = loading(this.el);
  this.repo.readme(function (err, contents) {
    if (err) throw err;
    model.markdown = contents;
    model.emit('change markdown', contents);
    model.emit('change html'); // TODO: make this computed?
    model.emit('change menu'); // TODO: does this even work?
    loaded();
  });
}


/**
 * Return the readme's HTML.
 *
 * @return {String}
 */

Project.prototype.html = function () {
  return marked(this.markdown);
};


/**
 * Replace the reactive menu.
 *
 * @return {Element}
 */

Project.prototype.menu = function () {
  var menu = new MarkdownMenu(this.markdown);
  return menu.el;
};