let nomeInput;
let emailInput;
let senhaInput;
let loginBtn;
let registarButton;
let generoSelecionado = ""; 
let telaSelecaoGenero = false; 
let quadradoVisivel = true; 

let board = [];
let gridSize = 5; 


let scene = 0 ; 

let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = min(width, height) / gridSize;

  create_Board();
}


function draw() {
  if (scene === 0) {
    loginScene();
  }if (scene === 1) {
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

    


function gameScene(){
  background(relva)
  draw_Board();
  desenharQuadrado();
  desenharMiniBarra();

 
}



function preload(){
  fundo = loadImage("./recursos/fundo.jpg");
  relva = loadImage("./recursos/relva.jpg");
  personagem = loadImage('./recursos/woman.png');
  bacano = loadImage('./recursos/man.png');
  imgMoney = loadImage('./recursos/money.png')
}