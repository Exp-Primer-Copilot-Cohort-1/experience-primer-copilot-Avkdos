// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;
var router = express.Router();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/comments';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var Comment = require('./models/comment');

// Middleware
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// Test route
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// Create a comment
router.route('/comments').post(function(req, res) {
  var comment = new Comment();
  comment.title = req.body.title;
  comment.author = req.body.author;
  comment.body = req.body.body;

  comment.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Comment created!' });
  });
});

// Read all comments
router.route('/comments').get(function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

// Read a specific comment
router.route('/comments/:comment_id').get(function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json(comment);
  });
});

// Update a specific comment
router.route('/comments/:comment_id').put(function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) {
      res.send(err);
    }

    comment.title = req.body.title;
    comment.author = req.body.author;
    comment.body = req.body.body;

    comment.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Comment updated!' });
    });
  });
});

// Delete a specific comment
router.route('/comments/:comment_id').delete(function(req, res) {
  Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
    if (err) {
      res.send(err);
    }
    res.json

