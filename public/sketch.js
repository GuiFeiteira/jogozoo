let nomeInput;
let emailInput;
let senhaInput;
let loginBtn;
let registarButton;
let generoSelecionado = ""; // Armazena o personagem selecionado
let telaSelecaoGenero = false; // Flag para indicar se está na tela de seleção de personagem
let quadradoVisivel = true; // Mude para false se quiser ocultar inicialmente

let board = [];
let gridSize = 3; // Number of rows and columns in the grid
let squareSize;

let scene = 2; 

let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
 
}


function draw() {
  if (scene === 0) {
    loginScene();
  } else if (scene === 1) {
    if (!telaSelecaoGenero) {
      // Se não estiver na tela de seleção de personagem, vá para a cena de seleção
      telaSelecaoGenero = true;
      desenharTelaSelecaoGenero();
    } else {
      // Se já estiver na tela de seleção, vá para a cena do jogo
      console.log("Chamando gameScene");
      draw_Board(); 
      gameScene();
      
    }
  } else if (scene === 2) {
    
    clear();
    console.log("Chamando gameScene2");
    draw_Board();
    gameScene();
    
    
  }
  console.log(`Cena Atual: ${scene}`);
  noLoop();
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
      rect(windowWidth / 2 - 120, windowHeight / 2 - 150, 400, 400);
          
    
      // Campos de entrada (Input fields)
      fill(0);  
      text("Nome",canvasCenterX, canvasCenterY -53 );
      nomeInput = createInput();
      nomeInput.position(canvasCenterX, canvasCenterY - 50);
      nomeInput.style('text-align', 'center');
    
      fill(0); // 0 representa a cor preta no modo RGB
      text("Email",canvasCenterX, canvasCenterY -2 );
      emailInput = createInput();
      emailInput.position(canvasCenterX, canvasCenterY);
      emailInput.style('text-align', 'center');

     
      fill(0); // 0 representa a cor preta no modo RGB
      text("Password",canvasCenterX, canvasCenterY + 48);
      senhaInput = createInput();
      senhaInput.position(canvasCenterX, canvasCenterY + 50);
      senhaInput.style('text-align', 'center');
    
      
      loginBtn = createButton('Login');
      loginBtn.position(canvasCenterX + 100, canvasCenterY + 100);
      loginBtn.mousePressed(login);

      registarButton = createButton('Registar');
      registarButton.position(canvasCenterX, canvasCenterY + 100);
      registarButton.mousePressed(registar);
    
      pop();
    }
    


function gameScene(){
  createCanvas(windowWidth,windowHeight)
  background(relva)
  
  desenharQuadrado();
  
 
  
 
}

//FUNCOES PARA SELECIONAR BACANO/BACANA

function desenharTelaSelecaoGenero() {
  background(220);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Selecione o Personagem", width / 2, 80);
  


  // Botão "Homem"
  desenharBotao(width / 3, height / 2, 200, 220, bacano);

  // Botão "Mulher"
  desenharBotao((3 * width) / 4, height / 2, 200, 220, personagem);
}

function desenharBotao(x, y, largura, altura, imagem) {
  fill(150); // Cor base do botão
  if (mouseX > x - largura / 2 && mouseX < x + largura / 2 && mouseY > y - altura / 2 && mouseY < y + altura / 2) {
    fill(204, 255, 204); 
  }
  rectMode(CENTER);
  rect(x, y, largura +100, altura +100);
  imageMode(CENTER);
  image(imagem, x, y, largura +20  , altura );
  fill(0);
}

function mousePressed() {
  //console.log("Mouse pressionado");

  if (scene === 1) {
    verificarSelecaoGenero(width / 3, height / 2, 200, 220, "Homem");
    verificarSelecaoGenero((3 * width) / 4, height / 2, 200, 220, "Mulher");

   
    if (generoSelecionado !== "") {
      scene = 2;
      loop();
      
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].click_Tile(mouseX, mouseY)) {
        console.log(board[i][j].tx, board[i][j].ty);
      }
    }
  }

}

function verificarSelecaoGenero(x, y, largura, altura, genero) {

  console.log(`Mouse: ${mouseX},${mouseY}`);
  console.log(`Botão - X: ${x}, Y: ${y}, Largura: ${largura}, Altura: ${altura}`);
  if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {
    console.log(`Botão ${genero} selecionado!`);
    generoSelecionado = genero;
    
  }
}


//TERMINO BACANO/BACANA


function desenharQuadrado() {
  fill(150, 245 ); // Cor do quadrado
  noStroke(); // Sem contorno
  rectMode(CORNER);

  // Calcula o tamanho do quadrado com base nas dimensões da tela
  let tamanhoQuadrado = min(width, height) * 0.1;

  
  rect(20, 20, tamanhoQuadrado, tamanhoQuadrado, 20);
}

// FUNCOES PARA GRID
function draw_Board() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw_Tile();
    }
  }
}

function create_Board() {
  let initialPosX = (width - gridSize * squareSize) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;
      board[i][j] = new Tile(x, y, i, j, squareSize);
    }
  }
}

//FIM FUCOENS GRID  



function preload(){
  fundo = loadImage("./recursos/fundo.jpg");
  relva = loadImage("./recursos/relva.jpg");
  personagem = loadImage('./recursos/woman.png');
  bacano = loadImage('./recursos/man.png');
}