var express = require('express');
var session = require('cookie-session'); 
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();



app.use(session({secret: 'todoList'}))



.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.get('/todo', function(req, res) { 
    res.render('todolist.ejs', {todolist: req.session.todolist});
})


.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})


.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);