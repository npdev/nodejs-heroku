'use strict';

let express = require('express');
let router = express.Router();
const controllers = require("../controllers");
const middleware = require("../middleware");
router.get('/*', middleware.isAdmin);
router.get('/', controllers.AdminController.index);
router.get('/posts', controllers.AdminController.allPostsGet);
router.get('/post/create', controllers.AdminController.createPostGet);
router.post('/post/create', controllers.AdminController.createPostPost);
router.get('/post/:id/delete', controllers.AdminController.deletePostGet);
router.post('/post/:id/delete', controllers.AdminController.deletePostPost);
router.get('/post/:id/update', controllers.AdminController.updatePostGet);
router.post('/post/:id/update', controllers.AdminController.updatePostPost);
router.get('/post/:id', controllers.AdminController.postDetail);
module.exports = router;
