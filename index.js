const conn= require('./connection');
const express= require('express');
const bodyParser=require('body-parser');
//const cors = require('cors')

const app=express();

//var corsOptions={
//    origin:"http://localhost:5000/",
//};
//app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.get('/users', (req,res)=>{
    conn.query('SELECT * FROM users', (err, rows)=>{
        if(err){
            console.log(err)
        } else {

            res.send(rows)
        }
    })
})

app.post("/login",  (req, res) => {

  var username = req.body.username;
  var password = req.body.password;

  console.log(username)
  var sql = 'SELECT * FROM users WHERE username = ? and password = ?';
  conn.query(sql, [username, password], function (err, row) {
    if (err) return res.status(500).json(err);
    if (row.length === 0) return res.status(404).json("User not found!");
    
    res.send(row)
    
    });
});

app.post('/add', (req, res) => {
    let user = req.body.username;
    let pass = req.body.password;

    var sql = 'insert into users(username,password) values(?,?)';
    conn.query(sql, [user,pass], function (err, row) {
      if(err){
          console.log(err)
      } else {
        res.end(row);
      }
      });
})

app.get('/devices', (req,res)=>{
    conn.query('SELECT * FROM devices2', (err, rows)=>{
        if(err){
            console.log(err)
        } else {

            res.send(rows)
        }
    })
})


app.listen(5000, ()=>console.log('Server is running on port 5000'))
