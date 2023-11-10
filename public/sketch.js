let nomeInput;
let emailInput;
let senhaInput;
let registarButton;

let scene = 0; // 0 for login scene, 1 for game scene


let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
 
}

function draw() {


  if (scene === 0) {
    loginScene();
  } else if (scene === 1) {
    gameScene();
  }

  noLoop()
}

function registar() {
  let nome = nomeInput.value();
  let email = emailInput.value();
  let senha = senhaInput.value();


  let user = {
    "nome": nome,
    "email": email,
    "password": senha
  };

  httpPost('/registro', user, 'json', (respostaServer)=>{
    console.log(respostaServer);

    if(respostaServer.ack == 0){
    
      alert("Utilizador Já Existe");
    }else{
      alert("Registo Efectuado Com Sucesso!");      
  }
  });
}

function login(){
  let nome = nomeInput.value();
  let senha = senhaInput.value();

  let user = {
    "nome": nome,
    "password": senha
  };
  

  httpPost('/login', user, 'json', (respostaServer)=>{
    if(respostaServer.ack == 1){
      userServ = respostaServer;

      scene=1;
   
      console.log(userServ);
      loop();
   
      }else{
      alert("Login sem sucesso")
   
     }
   
     });}


function loginScene(){

  push()
  background(fundo, 100);
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

  registarButton = createButton('registar');
  registarButton.position(canvasCenterX , canvasCenterY + 100);
  registarButton.mousePressed(registar);

  pop()
}


function gameScene(){
  background(0);
  
  
}
function preload(){
  fundo = loadImage("./recursos/fundo.jpg");
}