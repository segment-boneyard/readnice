var jsonp = require('jsonp');
var decode = require('base64-decode');

function GithubRepo(name) {
  if( !(this instanceof GithubRepo) ) return new GithubRepo(name);
  var split = name.split('/');
  this.name = name;
  this.user = split[0];
  this.project = split[1];
}

GithubRepo.prototype.api = function(url) {
  return 'https://api.github.com/repos/'+ [this.user, this.project, url].join('/');
};

GithubRepo.prototype.readme = function(fn) {
  jsonp(this.api('readme'), function(err, res){
    if(err) return fn(err);
    fn(null, decode(res.data.content));
  });
};

GithubRepo.prototype.stars = function(fn) {
  jsonp(this.api('stargazers'), function(err, res){
    if(err) return fn(err);
    fn(null, res.data);
  });
};

GithubRepo.prototype.contents = function(path, fn) {
  var url = this.api('contents') + '/' + path;
  jsonp(url, function(err, res){
    if(err) return fn(err);
    fn(null, url);
  });
};

module.exports = GithubRepo;