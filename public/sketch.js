let nomeInput;
let emailInput;
let senhaInput;
let loginBtn;
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
      scene =1;
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
    if(respostaServer.length >0){
      userServ = respostaServer;
      nomeInput.remove();
      senhaInput.remove();
      loginBtn.remove();
      emailInput.remove();
      registarButton.remove();
      scene=1;
   
      console.log(userServ);
      loop();
   
      }else{
      alert("Login sem sucesso")
      
   
     }
   
     });}


     function loginScene() {

      
      let canvasCenterX = width / 2;
      let canvasCenterY = height / 2;
    
      push();
      background(fundo, 200);

      noStroke();
      fill(255, 190); 
      rect(windowWidth / 2 - 150, windowHeight / 2 - 150, 400, 400);
          
      // Rótulos (Labels)
      createP('Nome:').position(canvasCenterX - 60, canvasCenterY - 65);
      createP('Email:').position(canvasCenterX - 60, canvasCenterY - 15);
      createP('Senha:').position(canvasCenterX - 60, canvasCenterY + 35);
    
      // Campos de entrada (Input fields)
      nomeInput = createInput();
      nomeInput.position(canvasCenterX, canvasCenterY - 50);
      nomeInput.style('text-align', 'center');
    
      emailInput = createInput();
      emailInput.position(canvasCenterX, canvasCenterY);
      emailInput.style('text-align', 'center');
    
      senhaInput = createInput();
      senhaInput.position(canvasCenterX, canvasCenterY + 50);
      senhaInput.style('text-align', 'center');
    
      loginBtn = createButton('Login');
      loginBtn.position(canvasCenterX + 100, canvasCenterY + 100);
      loginBtn.mousePressed(login);

      registarButton = createButton('registar');
      registarButton.position(canvasCenterX, canvasCenterY + 100);
      registarButton.mousePressed(registar);
    
      pop();
    }
    


function gameScene(){
  background(0);
  
  
}
function preload(){
  fundo = loadImage("./recursos/fundo.jpg");
}