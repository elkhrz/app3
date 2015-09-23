var express = require('express'),
    bodyParser = require('body-parser'),
    home = require('./routes/index'),
    usuario = require('./models/usuario'),
    router = express.Router(),
    stylus = require('stylus'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient;
    
var app = express();
var url = 'mongodb://localhost:27017/test';
var personas = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'jade');

app.use('/', home);
MongoClient.connect(url, function(err, db) {
  if (err) return;

  var collection = db.collection('personas');
   collection.find().toArray(function(err, personas) {
      console.log('conectado a personas'+personas[0]);
      this.personas = personas;
      console.dir(personas);
      db.close();//     */   <--para cerrar mongodb
    });
});

//stylus
 
 function compile(str, path) {
  return stylus(str)
    .set('filename', path)
}

app.use(stylus.middleware({
  src:__dirname + '/public',
}));
app.use(express.static(path.join(__dirname, 'public')));
app.post('/',function(req,res){
    var nombre = req.body.nombre,
        edad   = req.body.edad,
        apellido = req.body.apellido,
        email = req.body.email;
    
    if (edad !=='' && nombre !== '' && email !== ''){
      var usuario1 = new usuario(nombre,apellido,edad,email);
      MongoClient.connect(url, function(err, db) {
      if(err) throw err;
      db.collection('personas').insert(usuario1);
      db.close();
      console.log('guardando a '+usuario1.nombre+' '+usuario1.apellido);
      app.locals.validacion ='guardando a '+usuario1.nombre+' '+usuario1.apellido;
      })
    
    }
    else
    app.locals.validacion = '';
    res.redirect('/')
    
    
})

app.listen(process.env.PORT);
console.log('Example app listening at '+process.env.PORT);