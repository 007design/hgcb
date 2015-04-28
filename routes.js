var User = require('./models.js').user;
var routes = {
  get: {},
  post: {}
};

routes.get['/'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile('src/index.html');
};

routes.get['/getUsers'] = function(req, res){
  console.log('getting users');
  User.find(function(err, users){
    if (err)
      console.log(err);
    res.json(users);
  });
};

routes.post['/newUser'] = function(req, res){
  console.log('creating new user');
  var newUser = new User(req.body);

  if (!newUser.email)
    res.json({
      result: 'error',
      msg: 'Email is required'
    })
  else
    newUser.save(function(err, u){
      if (!err)
        res.json(u);

      else if (err.code === 11000)
        User.findOne(req.body, function(err, u){
          if (err)
            console.log(err);

          res.json(u);
        });

      else
        console.log(err);
    });
};

module.exports = routes;