var assert = require('chai').assert;
var server = require('../server.js');

describe('Server Tests', function(){
  before(function(done){
    done();
  });

  it('should run a test', function(){
    assert.equal(1, 1, 'one equals one');
  });

  after(function(done){
    done();
  });
});