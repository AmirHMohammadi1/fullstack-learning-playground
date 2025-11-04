var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TODO APP API' });
});

const emailRoutes = require('./email');

router.use('/email', emailRoutes);

module.exports = router;
