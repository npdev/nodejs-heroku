'use strict';

const models = require('../models');

let regAdmin = function () {
  models.User.register(new models.User({username: 'admin'}), 'admin', (err) => {
    if (err) {
      console.log(err.message);
      throw err;
    }
    console.log('Admin has been created successfully');
  });
};

exports.addAdmin = () => {
  models.User.findOne({username: 'admin'}, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      console.log('Admin exists.');
      return true;
    }
    return regAdmin();
  });
};