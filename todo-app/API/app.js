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
const fs = require('fs');


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
app.use(express.urlencoded({ extended: true }));
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
app.use('/upload', require('./routes/uploadRoutes'))
const uploadsDir = path.join(__dirname, 'uploads/anonymous');
app.use('/uploads', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            return res.render('uploads', { 
                title: 'فایل‌های آپلود شده',
                files: [],
                error: 'خطا در خواندن فایل‌ها'
            });
        }

        const fileList = files.map(file => {
            const filePath = path.join(uploadsDir, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                size: (stats.size / 1024).toFixed(2) + ' KB',
                uploaded: stats.mtime.toLocaleString('fa-IR')
            };
        });

        res.render('uploads', { 
            title: 'فایل‌های آپلود شده',
            files: fileList,
            error: null
        });
    });
})

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
