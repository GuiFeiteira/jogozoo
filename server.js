const express = require("express");
var bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "zoogame",
});

dbase.connect(function (err) {
  if (err) throw err;

  console.log("Database Connected!");
});

app.post("/registro", (req, res) => {
  console.log(req.body);
  let nome = req.body.nome;
  let senha = req.body.password;
  let email = req.body.email;

  // Verifique se o email já está em uso
  let verificar = "SELECT * from utilizadores WHERE Nome ='" + nome + "' ;";

  dbase.query(verificar, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.send({ ack: 0 });
    } else {
      // Insira o utilizador na tabela utilizadores
      let inserirUsuario =
        "INSERT INTO utilizadores(nome, password, email) VALUES('" +
        nome +
        "', '" +
        senha +
        "','" +
        email +
        "') ";
      dbase.query(inserirUsuario, (err, result) => {
        if (err) throw err;

        // Recupere o ID do utilizador recém-criado
        let userId = result.insertId;

        // Agora, insira um registo correspondente na tabela grid
        let initGrid = "INSERT INTO tiles(user_id) VALUES(" + userId + ")";
        dbase.query(initGrid, (err, result) => {
          if (err) throw err;

          // Após a inserção bem-sucedida, inicialize o dinheiro
          let initMoney =
            "UPDATE utilizadores SET dinheiro = 500 WHERE nome = '" +
            nome +
            "'";
          dbase.query(initMoney, (err, result) => {
            if (err) throw err;
            console.log(`Dinheiro inicializado para ${nome}`);

            let getUserDetails =
              "SELECT * FROM utilizadores WHERE id = " + userId;
            dbase.query(getUserDetails, (err, userDetails) => {
              if (err) throw err;

              res.send([userDetails[0]]);
            });
          });
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  let nome = req.body.nome;
  let senha = req.body.password;

  let sql =
    "SELECT * FROM utilizadores WHERE nome='" +
    nome +
    "' AND password = '" +
    senha +
    "';";

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {  
      let getMoney =
        "SELECT dinheiro FROM utilizadores WHERE nome = '" + nome + "'";
      dbase.query(getMoney, (err, moneyResult) => {
        if (err) throw err;

        result[0].dinheiro = moneyResult[0].dinheiro;
        res.send(result);
      });
    } else {
      res.send([]);
    }
  });
});

app.post("/updateMoney", (req, res) => {
  const userId = req.body.user_id;
  const novoDinheiro = req.body.novoDinheiro;

  let updateMoney =
    "UPDATE utilizadores SET dinheiro = " +
    novoDinheiro +
    " WHERE id = '" +
    userId +
    "'";
  dbase.query(updateMoney, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/insertTile", (req, res) => {
  console.log(req.body);

  let userId = req.body.user_id;
  let tileX = req.body.tile_x;
  let tileY = req.body.tile_y;
  let buildingType = req.body.building_type;

  let sql =
    "INSERT INTO tiles (`user_id`, `tile_x`, `tile_y`, `building_type`) VALUES ('" +
    userId +
    "','" +
    tileX +
    "','" +
    tileY +
    "','" +
    buildingType +
    "');";

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});



app.post("/insertAnimal", (req, res) => {
  console.log(req.body);

  let userId = req.body.user_id;
  let tileX = req.body.tile_x;
  let tileY = req.body.tile_y;
  let nome = req.body.nome;
  let url = './recursos/'+ nome + '.png';  // Incluindo a palavra "sopa" no URL

  let sql =
    "INSERT INTO animais (`user_id`, `tile_x`, `tile_y`, `nome`, `url`) VALUES ('" +
    userId +
    "','" +
    tileX +
    "','" +
    tileY +
    "','" +
    nome +
    "','" +
    url +
    "');";

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.post("/atualizarAtributosAnimal", (req, res) => {
  let animalId = req.body.animal_id;
  let fome = req.body.fome;
  let saude = req.body.saude;
  let limpeza = req.body.limpeza;

  let sql =
    "UPDATE animais SET fome = '" +
    fome +
    "', saude = '" +
    saude +
    "', limpeza = '" +
    limpeza +
    "' WHERE animal_id = '" +
    animald +
    "';";

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});



app.get("/getTiles/:id", (req, res) => {
  let userId = req.params.id;

  let sql = "SELECT * FROM tiles WHERE user_id='" + userId + "';";

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.get("/getAnimais/:id", (req, res) => {
  let userId = req.params.id;


  let sql = `
    SELECT animal_id, nome, url, tile_x, tile_y, fome, limpeza, saude
    FROM animais
    WHERE user_id = '${userId}';
  `;

  dbase.query(sql, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
