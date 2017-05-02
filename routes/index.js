'use strict';

const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const passport = require('passport');

router.get('/', controllers.IndexController.index);
router.get('/about', controllers.IndexController.about);
router.get('/post/:id', controllers.IndexController.postDetail);

router.get('/login', controllers.AuthController.loginGet);
router.post('/login', passport.authenticate('local'), controllers.AuthController.loginPost);
router.get('/register', controllers.AuthController.registerGet);
router.post('/register', controllers.AuthController.registerPost);
router.get('/logout', controllers.AuthController.logout);


module.exports = router;
