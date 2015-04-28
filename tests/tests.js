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
    }, function(res){
      assert(res.statusCode, 200);
      done();
    })
    .on('error', function(error){
      console.log('error', error);
      done();
    })
    .end();
  });

  it('creates a new user', function(done){
    var req = http.request({
      'host': '127.0.0.1',
      'path': '/newUser',
      'port': '8080',
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json'
      }
    }, function(res){
      var body = '';

      res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
        body = body + chunk;
      }).on('end', function(){
        assert.equal(JSON.parse(body).email, '007@007design.com');  
        done();
      });
      
    })
    .on('error', function(error){
      console.log('error', error);
      done();
    });

    var newUser = JSON.stringify({
      email: "007@007design.com"
    })
    req.write(newUser);
    req.end();
  });

  after(function(done){
    done();
  });
});