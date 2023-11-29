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

let showPopup = false;

let scene = 0;
let popup;
let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = min(width, height) / gridSize;
  popup = new Popup(width / 2, height / 2, width * 0.6, height * 0.5);
  loja = new Loja();

  create_Board();
  board[1][4].bilheteira = new Bilheteira(bilhImagem);
  board[3][4].bilheteira = new Bilheteira(bilhImagem);
}

function draw() {
  if (scene === 0) {
    loginScene();
  }
  if (scene === 1) {
    if (!telaSelecaoGenero) {
      
      telaSelecaoGenero = true;
      desenharTelaSelecaoGenero();
    } else {
      scene = 2

    }
  } else if (scene === 2) {
    clear();
    console.log("Chamando gameScene2");
    draw_Board();
    gameScene();
    loja.mostrar();
    
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
  if (scene === 1) {
    verificarSelecaoGenero(width / 3, height / 2, 200, 220, "Homem");
    verificarSelecaoGenero((3 * width) / 4, height / 2, 200, 220, "Mulher");

    if (generoSelecionado !== "") {
      scene = 2;
      loop();
    }
  }
  if (scene === 2) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          console.log(i, j);
          if ((i === 1 && j === 4) || (i === 3 && j === 4)) {
            console.log("Amazingggg");

            popup.show();

          }
        }
      }
    }
    loja.clicar(mouseX, mouseY);
    //loja.mostrarProdutosCategoria("Animais");
  }


}

function preload() {
  fundo = loadImage("./recursos/fundo.jpg");
  relva = loadImage("./recursos/relva.jpg");
  personagem = loadImage("./recursos/woman.png");
  bacano = loadImage("./recursos/man.png");
  imgMoney = loadImage("./recursos/money.png");
  bilhImagem = loadImage("./recursos/booth.png");
  loja= loadImage('./recursos/loja.png')
}
