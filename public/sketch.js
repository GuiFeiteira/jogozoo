let nomeInput;
let emailInput;
let senhaInput;
let registrarButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  let canvasCenterX = width / 2;
  let canvasCenterY = height / 2;

  noStroke();
  fill(255, 100); // Cor branca com 50% de transparência
  rect(canvasCenterX - 100, canvasCenterY - 100, 200, 250);

  // Rótulos
  createP('Nome:').position(canvasCenterX - 60, canvasCenterY - 65);
  createP('Email:').position(canvasCenterX - 60, canvasCenterY-15);
  createP('Senha:').position(canvasCenterX - 60, canvasCenterY + 35);

  // Campos de entrada
  nomeInput = createInput();
  nomeInput.position(canvasCenterX, canvasCenterY - 50);
  nomeInput.style('text-align', 'center');

  emailInput = createInput();
  emailInput.position(canvasCenterX, canvasCenterY);
  emailInput.style('text-align', 'center');

  senhaInput = createInput();
  senhaInput.position(canvasCenterX, canvasCenterY + 50);
  senhaInput.style('text-align', 'center');

  registrarButton = createButton('Registrar');
  registrarButton.position(canvasCenterX , canvasCenterY + 100);
  registrarButton.mousePressed(registrar);
}

function draw() {
  
  background(fundo, 100);
  let canvasCenterX = width / 2;
  let canvasCenterY = height / 2;

  noStroke();
  fill(190,200); 
  rect(canvasCenterX - 125, canvasCenterY - 200, 400, 450, 10);
}

function registrar() {
  let nome = nomeInput.value();
  let email = emailInput.value();
  let senha = senhaInput.value();


  console.log(nome, email, senha)
  fetch('http://localhost:3000/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, email, senha }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.mensagem);
      // Atualize a interface do usuário com feedback
    })
    .catch((error) => {
      console.error('Erro no registro:', error);
      // Exiba uma mensagem de erro na interface do usuário
    });
}



function preload(){
  fundo = loadImage("./recursos/fundo.jpg");
}