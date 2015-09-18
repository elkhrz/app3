conn = require('mongodb').MongoClient;

var url = 'mongodb://127.0.0.1:27017/test';
var db;

conn.connect(url, function(err, db) {
  if (err) return;

      this.db = db;
      console.dir('conectado a db test');
      //db.close();     */   <--para cerrar mongodb
    
});

module.exports = db