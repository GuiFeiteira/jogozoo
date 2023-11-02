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
    const { nome, email, senha } = req.body;
    // Verifique se o email já está em uso
    const verificaEmail = 'SELECT * FROM utilizadores WHERE email = ?';
     dbase.query(verificaEmail, [email], (err, results) => {
      if (err) {
        console.error('Erro na verificação de email:', err);
        res.status(500).json({ mensagem: 'Erro no registro' });
        return;
      }

      if (results.length > 0) {
        res.status(409).json({ mensagem: 'Email já está em uso' });
        return;
      }

      // Insira os dados do usuário no banco de dados
      const meterBacane = 'INSERT INTO utilizadores (nome, email, password) VALUES (?, ?, ?)';
      dbase.query(meterBacane, [nome, email, senha], (err, result) => {
        if (err) {
          console.error('Erro no registro:', err);
          res.status(500).json({ mensagem: 'Erro no registro' });
          return;
        }
        res.status(200).json({ mensagem: 'Registro bem-sucedido' });
      });
    });
  });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })