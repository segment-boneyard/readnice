
# github-repo

  Fetch files from Github repos

## Installation

  Install with [component(1)](http://component.io):

    $ component install segmentio/github-repo

## API

    var GithubRepo = require('github-repo');
    var project = new GithubRepo('segmentio/view');

    project.readme(function(err, content){
      console.log(content);
    });

Or quicker:

  var repo = require('github-repo');
  repo('segmentio/view').readme(function(err, content){

  });

## License

  MIT
