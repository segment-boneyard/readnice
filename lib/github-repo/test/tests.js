var repo = require('github-repo');
var assert = require('assert');

describe('github-repo', function(){
  var project;

  beforeEach(function(){
    project = repo('component/component');
  })

  it('should get the readme', function(done){
    project.readme(function(err, content){
      assert( err == null );
      assert( content.length !== 0 );
      done();
    });
  })

});