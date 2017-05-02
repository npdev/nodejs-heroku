'use strict';
const models = require("../models");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login first");
    res.redirect("/login");
};

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.username === 'admin'){
        return next();
    }
    req.flash("error", "Access denied!");
    res.redirect("/");
};

module.exports = middlewareObj;
