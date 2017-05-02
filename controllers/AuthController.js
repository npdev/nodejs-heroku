'use strict';

const models = require("../models");
const passport = require('passport');

exports.logout = (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

exports.loginGet = (req, res) => {
  if(req.user){
    return res.redirect('/');
  }
  res.render('login', {user: req.user, error: req.flash('error')});
};

exports.loginPost = (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      req.flash('error', 'Login error!');
      return next(err);
    }
    if(req.user.username === 'admin'){
      return res.redirect('/admin');
    }
    return res.redirect('/');
  });
};


exports.registerGet = (req, res, next) => {
  res.render('register', {title: 'Sign Up'});
};

exports.registerPost = (req, res, next) => {

  models.User.register(new models.User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.render('register', {error: err.message});
    }
    console.log(req.body.username);
    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if (err) {
          console.log(err.message);
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};
