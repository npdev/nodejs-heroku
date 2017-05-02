'use strict';

const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
let userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);