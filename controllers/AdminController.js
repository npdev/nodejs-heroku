'use strict';

const models = require('../models');
let async = require('async');

exports.index = function (req, res) {
  async.parallel({
    users: function (callback) {
      models.User.find(callback);
    }
  }, function (err, results) {
    res.render('index_admin', {title: 'Node.js Blog', error: err, data: results.users});
  });
};

exports.allPostsGet = function (req, res) {
  async.parallel({
    postsList: function (callback) {
      models.Post.find(callback);
    }
  }, function (err, results) {
    res.render('post_list_admin', {error: err, postsList: results.postsList});
  });
};

exports.postDetail = function (req, res, next) {
  async.parallel({
    post: function (callback) {
      models.Post.findById(req.params.id).exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    res.render('post_detail_admin', {post: results.post, error: req.flash('error')});
  });
};

exports.createPostGet = function (req, res, next) {
  res.render('post_form', {title: 'Create post'});
};

exports.createPostPost = function (req, res, next) {
  req.checkBody('title', 'Title must not be empty.').notEmpty();
  req.checkBody('content', 'Content must not be empty').notEmpty();
  req.sanitize('title').escape();
  req.sanitize('content').escape();
  req.sanitize('title').trim();
  req.sanitize('content').trim();

  var post = new models.Post(
          {title: req.body.title,
            content: req.body.content,
            author: req.user._id
          });

  console.log('post: ' + post);

  var errors = req.validationErrors();
  if (errors) {
    console.log('ERRORS: ' + errors);
    res.render('post_form', {title: 'Create Post', post: post, errors: errors});
  } else {
    post.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/admin/posts');
    });
  }
};

exports.deletePostGet = function (req, res, next) {

  async.parallel({
    post: function (callback) {
      models.Post.findById(req.params.id).exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    res.render('post_delete', {title: 'Delete post', post: results.post});
  });

};

exports.deletePostPost = function (req, res, next) {

  async.parallel({
    post: function (callback) {
      models.Post.findById(req.params.id).exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }

    models.Post.findByIdAndRemove(req.body.id, function deletePost(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/admin/posts');
    });
  });

};

exports.updatePostGet = function (req, res, next) {

  req.sanitize('id').escape();
  req.sanitize('id').trim();

  async.parallel({
    post: function (callback) {
      models.Post.findById(req.params.id).exec(callback);
    }
  }, function (err, results) {
    if (err) {
      return next(err);
    }
    res.render('post_form', {title: 'Update post', post: results.post});
  });

};

exports.updatePostPost = function (req, res, next) {

  req.sanitize('id').escape();
  req.sanitize('id').trim();

  req.checkBody('title', 'Title must not be empty.').notEmpty();
  req.checkBody('content', 'Summary must not be empty').notEmpty();

  req.sanitize('title').escape();
  req.sanitize('content').escape();
  req.sanitize('title').trim();
  req.sanitize('content').trim();

  var post = new models.Post(
          {title: req.body.title,
            content: req.body.content,
            _id: req.params.id
          });

  var errors = req.validationErrors();
  if (errors) {
    res.render('post_form', {title: 'Update post', categories: results.categories, post: post, errors: errors});

  } else {
    models.Post.findByIdAndUpdate(req.params.id, post, {}, function (err, thepost) {
      if (err) {
        return next(err);
      }
      res.redirect('/admin' + thepost.url);
    });
  }

};
