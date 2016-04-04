"use strict";

var User = require('./models.js').user;
var Character = require('./models.js').character;
var routes = {
  get: {},
  post: {},
  ajax: {}
};

routes.get['/'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.sendfile('src/index.html');
};

routes.get['/logout'] = function(req, res) {
  req.session.user = null;
  res.redirect('/');
};

routes.get['/characters'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (req.session.user)
    res.sendfile('src/characters.html');
  else
    res.redirect('/');
};

routes.get['/characterSheet'] = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (req.session.user)
    res.sendfile('src/characterSheet.html');
  else
    res.redirect('/');
};

// routes.get['/getUsers'] = function(req, res) {
//   console.log('getting users');
//   User.find(function(err, users){
//     if (err)
//       console.log(err);
//     res.json(users);
//   });
// };

routes.get['/getCharacters'] = function(req, res) {
  console.log('getting characters');
  Character.find({user: req.session.user._id}, function(err, characters){
    if (err)
      console.log(err);
    res.json(characters);
  });
};

routes.get['/getCharacter'] = function(req, res) {
  console.log('getting character', req.query.c);
  Character.findOne({'_id': req.query.c}, function(err, c) {
    if (err) {
      console.log(err);
      res.json({
        'status': 'error'
      })
    } else
      res.json({
        'status': 'success',
        'character': c
      });
  });
};

routes.ajax['/saveCharacter'] = function(req, res) {
  if (!req.session.user) {
    res.json({
      'status': 'error',
      'redirect': '/'
    });

  } else {
    console.log('saving character');
    var character = new Character(req.body);
    character.user = req.session.user._id;
    if (req.body._id) {
      var id = req.body._id;
      delete req.body._id;
      Character.findByIdAndUpdate(id, req.body, function(err, c) {
        if (err) {
          console.log(err);
          res.json(err)
        } else {
          console.log(c);
          res.json({
            'status': 'success',
            'redirect': '/characterSheet?c='+c._id
          })
        }
      });
    } else
      character.save(function(err, c) {
        if (err) {
          console.log(err);
          res.json(err)
        } else {
          res.json({
            'status': 'success',
            'redirect': '/characterSheet?c='+c._id
          })
        }
      });
  }
};

routes.get['/deleteCharacter'] = function(req, res) {
  if (!req.session.user)
    return res.json({
      'status': 'error',
      'redirect': '/'
    });

  Character.findOne({'_id': req.query.c}, function(err, c) {
    if (err) {
      console.log(err);
      res.json({
        'status': 'error'
      })
    }
  }).remove(function(err, c) {
    if (err) {
      console.log(err);
      res.json({
        'status': 'error'
      })
    } else {
      res.json({
        'status': 'success'
      })
    }
  })
};

routes.post['/login'] = function(req, res) {
  console.log('logging in');
  User.findOne(req.body, function(err, u) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      req.session.user = u;
      res.redirect('/characterSheet');
    }
  });
};

routes.post['/newUser'] = function(req, res) {
  console.log('creating new user');
  var newUser = new User(req.body);

  if (!newUser.email)
    res.json({
      result: 'error',
      msg: 'Email is required'
    })
  else
    newUser.save(function(err, u){
      if (err) {
        console.log(err);
        res.redirect('/');
      }

      // else if (err.code === 11000)
      //   User.findOne(req.body, function(err, u) {
      //     if (err)
      //       console.log(err);

      //     res.json(u);
      //   });

      else {
        req.session.user = u;
        res.redirect('/characterSheet');
      }
    });
};

module.exports = routes;