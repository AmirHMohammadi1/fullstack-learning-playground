var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyparser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swagger/swagger-definition');
// try {
//   const swaggerDefinition = require('./swagger/swagger-definition');
//   console.log('✅ swaggerDefinition بارگذاری شد');
//   console.log('عنوان:', swaggerDefinition.info.title);
// } catch (error) {
//   console.error('❌ خطا در بارگذاری swaggerDefinition:', error.message);
// }


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todo = require('./routes/todo')
var todoApiDB = require('./routes/todoApiDB')

var app = express();

database().catch(err => console.log(err));
async function database() {
  await mongoose.connect('mongodb://localhost:27017/nodejsAPI')
  console.log('DB connect...')
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyparser.json())
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// تنظیمات Swagger
const options = {
  swaggerDefinition, // این باید به درستی تعریف شود
  apis: ['./routes/*.js'], // مسیر فایل‌های route
};
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/todo', todo);
app.use('/api', todoApiDB)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
