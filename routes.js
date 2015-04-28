var User = require('./models.js').user;
var routes = { };

routes['/'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile('src/index.html');
};

routes['/getUsers'] = function(req, resp){
  console.log('getting users');
  User.find(function(err, users){
    if (err)
      console.log(err);
    resp.json(users);
  });
};

module.exports = routes;