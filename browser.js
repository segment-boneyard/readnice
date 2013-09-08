
var Project = require('project');
var Router = require('router');


/**
 * Router.
 */

var router = new Router();


/**
 * User route.
 *
 * @param {String} user
 */

router.on('/:user', function (context, next) {
  // TODO
});


/**
 * Project route.
 *
 * @param {String} user
 * @param {String} project
 */

router.on('/:user/:project', function (context, next) {
  var user = context.params.user;
  var project = context.params.project;
  if (!user || !project) throw new Error('no user or project');

  var app = new Project(user + '/' + project);
  document.body.innerHTML = '';
  document.body.appendChild(app.el);
});


/**
 * Start the router.
 */

router.go();