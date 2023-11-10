const express = require('express')
var bodyParser = require('body-parser')
const mysql = require('mysql');

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())


app.use(express.static('public'))

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
host:"localhost",
port:"3306",
user:"root",
password:"",
database:"zoogame",

});

dbase.connect(function(err){
if(err)throw err;

console.log("Database Connected!");

});

app.post('/registro', (req, res) => {
    console.log(req.body)
    let nome = req.body.nome;
    let senha = req.body.password;
    let email = req.body.email

    // Verifique se o email já está em uso
    let verificar = "SELECT * from utilizadores WHERE Nome ='" +nome+"' ;"

     dbase.query(verificar,(err, results) => {
      if (err) throw err; 

        if(results.length>0){
          res.send({"ack":0})

        }else{
          let verificar = "INSERT INTO utilizadores(nome, password, email ) VALUES('"+nome+"', '"+senha+"','"+email+"') ";
          dbase.query(verificar,(err,result)=>{
            if(err) throw err; 
            res.send({"ack":1});
        });

        }
     });
    });

    app.post('/login',(req,res)=>{

      let nome = req.body.nome;
      let senha = req.body.senha;
    
      let sql = "SELECT * FROM utilizadores WHERE nome='"+nome+"' AND password = '"+senha+"';"
    
      dbase.query(sql, (err,result)=>{
      if(err) throw err; 
    
        res.send(result);
    
      });
    
    });



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 })