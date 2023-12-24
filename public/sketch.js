let nomeInput;
let emailInput;
let senhaInput;
let loginBtn;
let registarButton;
let generoSelecionado;
let telaSelecaoGenero = false;
let quadradoVisivel = true;
let azulejo;

let board = [];
let gridSize = 18;



let scene = 2;
let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = min(width, height) / gridSize;
  loja = new Loja();

  create_Board();
  board[17][6].bilheteira = new Bilheteira(both);
  board[3][4].cativeiro = new Cativeiro(fence);
}

function draw() {
  if (scene === 0) {
    loginScene();
  }
  if (scene === 1) {
    desenharTelaSelecaoGenero();
    verificarSelecaoGenero(width / 3, height / 2, 200, 220, "Homem");
    verificarSelecaoGenero((3 * width) / 4, height / 2, 200, 220, "Mulher");
  } else if (scene === 2) {
    console.log("Chamando gameScene2");
    draw_Board();
    gameScene();
    loja.mostrar();


    if (registroConcluido) {
      image(bonecoHelp, 20, 420, 550, 145);
      loop()
    }
    if (precoAtualizado && registroConcluido2) {
      image(bonecoHelp2, 20, 420, 550, 145);
      loop()
      
    }
  }
  console.log(`Cena Atual: ${scene}`);
  noLoop();
}
function gameScene() {
  background(relva);
  desenharQuadrado();
  desenharMiniBarra();
}

function mousePressed() {
  if (scene === 2) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          console.log(i, j);

        
        if ((i === 17 && j === 6) || (i === 17 && j === 7)) {
          console.log("Amazingggg");
          registroConcluido = false
          loop()
          board[17][6].bilheteira.desenharPopup();

        }
      }
      }
    }
    

    
    loja.clicar(mouseX, mouseY);
  }
}

function preload() {
  fundo = loadImage("./recursos/fundo.jpg");
  relva = loadImage("./recursos/relva.jpg");
  personagem = loadImage("./recursos/woman.png");
  bacano = loadImage("./recursos/man.png");
  imgMoney = loadImage("./recursos/money.png");
  loja = loadImage("./recursos/loja.png");
  azulejo = loadImage("./recursos/paving.png");
  fence = loadImage("./recursos/fence.png");
  bonecoHelp = loadImage("./recursos/Group 1.png");
  both = loadImage("./recursos/booth.png");
  bonecoHelp2 = loadImage('./recursos/Group 2.png')
  bonecoHelp3 = loadImage('./recursos/Group 3.png')
}
