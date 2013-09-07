
var Project = require('project');
var Router = require('router');


/**
 * Router.
 */

var router = new Router();


/**
 * Project route.
 */

router.on('/:user/:project', function (context, next) {
  var user = context.params.user;
  var project = context.params.project;
  if (!user || !project) throw new Error('no user & project');

  var app = new Project({
    user: user,
    project: project
  });

  document.body.innerHTML = '';
  document.body.appendChild(app.el);
});