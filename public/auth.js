function registar() {
  let nome = nomeInput.value();
  let email = emailInput.value();
  let senha = senhaInput.value();
  let genero = generoSelecionado;

  let user = {
    nome: nome,
    email: email,
    password: senha,
    dinheiro: dinheiro,
    genero: genero,

    //"popularidade": popularidade,
  };

  httpPost("/registro", user, "json", (respostaServer) => {
    console.log(respostaServer);

    if (respostaServer.ack == 0) {
      alert("Utilizador Já Existe");
    } else {
      nomeInput.remove();
      senhaInput.remove();
      loginBtn.remove();
      emailInput.remove();
      registarButton.remove();
      scene = 1;
      draw();
    }
  });
}

function login() {
  let nome = nomeInput.value();
  let senha = senhaInput.value();

  let user = {
    nome: nome,
    password: senha,
  };

  httpPost("/login", user, "json", (respostaServer) => {
    if (respostaServer.length > 0) {
      userServ = respostaServer;

      loadJSON("/getTiles/" + userServ[0].id, (resposta) => {
        buildingsPlayer = resposta;
        console.log(buildingsPlayer);
        if (buildingsPlayer.length > 0) {
          for (let i = 0; i < buildingsPlayer.length; i++) {
            let cativeiro = buildingsPlayer[i];
            if (
              board[cativeiro.tile_x] &&
              board[cativeiro.tile_x][cativeiro.tile_y]
            ) {
              console.log("A meter alto cativeiro", cativeiro);
              board[cativeiro.tile_x][cativeiro.tile_y].cativeiro =
                new Cativeiro();
              loop();
            }
          }
        }
      });
      atualizarDinheiro(userServ[0].dinheiro);

      nomeInput.remove();
      senhaInput.remove();
      loginBtn.remove();
      emailInput.remove();
      registarButton.remove();
      scene = 2;

      console.log(userServ);
      loop();
    } else {
      alert("Login sem sucesso");
    }
  });
}

function loginScene() {
  let canvasCenterX = width / 2;
  let canvasCenterY = height / 2;

  push();
  background(fundo, 200);

  noStroke();
  fill(255, 190);
  rect(windowWidth / 2 - 150, windowHeight / 2 - 150, 400, 400);

  // Campos de entrada (Input fields)
  fill(0);
  text("Nome", canvasCenterX -25, canvasCenterY - 45);
  nomeInput = createInput();
  nomeInput.position(canvasCenterX -25, canvasCenterY - 42);
  nomeInput.style("text-align", "center");

  fill(0);
  text("Email", canvasCenterX -25 , canvasCenterY - 2);
  emailInput = createInput();
  emailInput.position(canvasCenterX -25 , canvasCenterY);
  emailInput.style("text-align", "center");

  fill(0);
  text("Password", canvasCenterX -25, canvasCenterY + 48);
  senhaInput = createInput();
  senhaInput.position(canvasCenterX -25, canvasCenterY + 50);
  senhaInput.style("text-align", "center");

  loginBtn = createButton("  Login   ");
  loginBtn.position(canvasCenterX -25 + 100, canvasCenterY + 100);
  loginBtn.mousePressed(login);

  registarButton = createButton("Registar");
  registarButton.position(canvasCenterX -25, canvasCenterY + 100);
  registarButton.mousePressed(registar);

  pop();
}
