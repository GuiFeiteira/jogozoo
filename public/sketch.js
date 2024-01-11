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

let scene = 0;
let userServ;
function setup() {
  createCanvas(windowWidth, windowHeight);
  squareSize = min(width, height) / gridSize;
  loja = new Loja();
  leaderboard = new LeaderBoard();

  create_Board();
  board[17][6].bilheteira = new Bilheteira(both);
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
    leaderboard.mostrar();

    if (registroConcluido) {
      image(bonecoHelp, 20, 420, 550, 145);
    }
    if (precoAtualizado && registroConcluido2) {
      image(bonecoHelp2, 20, 420, 550, 145);
      registroConcluido2 = false;
    }
    if (cativeiroHelp && registroConcluido3) {
      image(bonecoHelp3, 20, 420, 550, 145);
      registroConcluido3 = false;
    }
  }
  console.log(`Cena Atual: ${scene}`);
  noLoop();
}


function mousePressed() {
  if (scene === 2) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          console.log(i, j);
          if (board[i][j].isOcupado()) {
            console.log("Ocupado");
            if (board[i][j].cativeiro) {
              console.log("Cativeiro");
              const animaisNoCativeiro = board[i][j].cativeiro.animais;
              if (board[i][j].cativeiro.animais.length > 0) {
                mostrarInformacoesCativeiro(board[i][j].cativeiro);
                

                console.log("Cativeiro possui animais:", board[i][j].cativeiro.animais);
                for (let k = 0; k < animaisNoCativeiro.length; k++) {
                  const animal = animaisNoCativeiro[k];
                  console.log("Nome do animal:", animal.nome);
                  console.log(animal.saude, animal.limpeza)
                  //atualizarAtributosAnimal(animal.animal_id, animal.fome, animal.saude, animal.limpeza)
                
                 
                  
                  

                }
                
              } else {
                console.log("Cativeiro vazio, sem animais.");
              }


            } else if (board[i][j].edificio) {
              if (board[i][j].edificio.nome === 'Loja Lembracas') {
                console.log("Loja Lembracas");
                mostrarDinheiro()

              }
              if (board[i][j].edificio.nome === 'Armazem') {
                console.log("Armazem");
              }


            } else if (board[i][j].azulejo) {
              console.log("Azulejo");
            } else {
              console.log("Outro tipo de ocupação");
            }
          }

          if ((i === 17 && j === 6) || (i === 17 && j === 7)) {
            registroConcluido = false;
            loop();
            board[17][6].bilheteira.desenharPopup();
          }
          if (i===9 && j=== 12) {
            
            
          }
        }
      }
    }

    loja.clicar(mouseX, mouseY);
    leaderboard.clicar(mouseX,mouseY);
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
  bonecoHelp2 = loadImage("./recursos/Group 2.png");
  bonecoHelp3 = loadImage("./recursos/Group 3.png");
  sovenir = loadImage("./recursos/shop.png");
  armazem = loadImage("./recursos/warehouse.png");
  NPC_left = createImg('./recursos/char_walk_left.gif');
  NPC_left.hide();
  NPC_right = createImg('./recursos/char_walk_right.gif');
  NPC_right.hide();
  clinic = loadImage('./recursos/clinic.png')
  tree = loadImage('./recursos/tree.png')
  flores = loadImage('./recursos/flowers.png')
}
