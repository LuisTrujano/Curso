'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://127.0.0.1:27017/curso_mean2',{useNewUrlParser: true})
.then(()=> console.log('La base de datos esta funcionando'),app.listen(port, function(){
    console.log("servidor escuchando en http://localhost:"+port)
}))

.catch((error) => console.log(error.message));