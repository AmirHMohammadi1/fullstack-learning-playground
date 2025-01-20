var express = require('express');
var router = express.Router();

const ToDo = [
    {id:1,todoTitle:'آموزش برنامه نویسی',todoStart:'9:00',todoTime:'60',todoPr:'برای شروع'},
    {id:2,todoTitle:'کتاب و مظالعه',todoStart:'10:00',todoTime:'30',todoPr:'برای شروع'},
    {id:3,todoTitle:'آموزش زبان',todoStart:'10:30',todoTime:'120',todoPr:'برای شروع'},
    {id:4,todoTitle:'کار عمیق',todoStart:'12:30',todoTime:'120',todoPr:'برای شروع'},
];

/* GET ToDo listing. */
router.get('/', function(req, res, next) {
  res.send(ToDo);
  console.log(ToDo)
});

/* GET ToDo by ID. */
router.get('/:id', function(req, res, next) {
  // console.log(req.params.id)
  const todo = ToDo.find(c => c.id === parseInt(req.params.id));
  res.send(todo);
  // console.log(todo)
});

/* POST ToDo Add. */
router.post('/addtodo', function(req, res, next) {
  console.log(req.body);
  const todo = {
    id : ToDo.length + 1,
    todoTitle : req.body.Title,
    todoStart : req.body.Start,
    todoTime : req.body.Time,
    todoPr : req.body.Pr,
  };
  ToDo.push(todo);
  res.send(todo)
});

/* PUT ToDo Update. */
router.put('/update/:id', function(req, res, next) {
  const todo = ToDo.find(c => c.id === parseInt(req.params.id));
  todo.todoTitle = req.body.Title;
  todo.todoStart = req.body.Start;
  todo.todoTime = req.body.Time;
  todo.todoPr = req.body.Pr
  res.send(addtodo)
});

/* DELETE ToDo. */
router.delete('/delete/:id', function(req, res, next) {
  const todo = ToDo.find(c => c.id === parseInt(req.params.id));
  const index = ToDo.indexOf(todo);
  ToDo.splice(index,1);
  res.send(index);
});

module.exports = router;



// const ToDo = [
//   {id:1,todoTitle:'آموزش برنامه نویسی',todoStart:'9:00',todoTime:'60',todoPr:'برای شروع'},
//   {id:2,todoTitle:'کتاب و مظالعه',todoStart:'10:00',todoTime:'30',todoPr:'برای شروع'},
//   {id:3,todoTitle:'آموزش زبان',todoStart:'10:30',todoTime:'120',todoPr:'برای شروع'},
//   {id:4,todoTitle:'کار عمیق',todoStart:'12:30',todoTime:'120',todoPr:'برای شروع'},
// ];