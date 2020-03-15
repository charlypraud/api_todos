const mysql = require("mysql2");
const con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'rtlry',
    database: 'bdd_web'
  });

const express = require('express');

const app = express();


app.get('/todos', function(req, res) {
    con.query('SELECT * FROM `todos`', function(err, rows, fields) {
        if (err) throw err;
          for (var i = 0; i < rows.length; i++) {
            result = rows;
          };
          res.json(result);
        });
});

app.post('/todos', function(req, res) {
  let sql = 'INSERT INTO todos(label, isDone) VALUES (?,?)';
  let datas = [
    req.body.label,
    req.body.isDone
  ];
    con.query(sql, datas, function(err, row, fields) {
        if (err) throw err;
        res.json("Insertion réussie");
        });
});

app.put('/todos/:id', function(req, res) {
  let sql = 'UPDATE todos SET label = ?, isDone = ? WHERE id = ? ';
  let datas = [
    req.body.label,
    req.body.isDone,
    req.params.id
  ];
  con.query(sql, datas, function(err, row, fields) {
      if (err) throw err;
      res.json("Mise à jour réussie");
      });
});

app.delete('/todos/:id', function(req, res) {
  let id = req.params.id;
  con.query('DELETE FROM todos WHERE id = ?',[id], function(err, rows, fields) {
      if (err) throw err;
      res.json("Suppression réussie");  
      });
});

app.listen(3000, function() {
console.log('Express app - listening on port 3000!');
});


  
  