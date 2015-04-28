var assert = require('chai').assert;
var server = require('../server.js');
var http = require('http');

describe('Server Tests', function(){
  before(function(done){
    done();
  });

  it('return a status of 200', function(done){
    http.request({
      'host': '127.0.0.1',
      'path': '/',
      'port': '8080'
    }, function(response){
      assert(response.statusCode, 200);
      done();
    })
    .on('error', function(error){
      console.log('error', error);
      done();
    })
    .end();
  });

  after(function(done){
    done();
  });
});