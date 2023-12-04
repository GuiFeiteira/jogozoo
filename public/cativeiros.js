class Cativeiro {
  constructor() {
    
    this.cercaImagem = loadImage("./recursos/fence.png");
    this.animais = [];
  }

  desenharCativeiro(x, y, tamanho) {
    image(this.cercaImagem, x, y, tamanho, tamanho);

    for (let i = 0; i < this.animais.length; i++) {
        let offsetX = (i * tamanho) / 4;
        let offsetY = 0;
        if (this.animais[i]) {
          if (this.animais[i].imagem) {
              image(
                  this.animais[i].imagem,
                  x + offsetX,
                  y + offsetY +5,
                  tamanho / 2,
                  tamanho / 2
              );
          } else {
              console.log("A propriedade imagem do animal é undefined.");
          }
      } else {
          console.log("O objeto Animal no cativeiro é undefined.");
      }
    }
}


  adicionarAnimal(animal) {
    if (this.animais.length < 4) {
      this.animais.push(animal);
      console.log('bahhhhh')
      console.log(this.animais)
    } else {
      console.log("O cativeiro já está cheio de animais!");
    }
  }
}

function encontrarCativeiros() {
  let cativeirosEncontrados = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].cativeiro) {
        cativeirosEncontrados.push(board[i][j].cativeiro);
      }
    }
  }

  return cativeirosEncontrados;
}

class Cativeiro_Loja {
  constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
    this.comprado = false; 
  }
}

 function adicionarAnimalAoCativeiro(animal) {
  // Encontrar cativeiros do jogador (pode ser necessário adaptar esta lógica com base no seu código)
  const cativeirosDoJogador = encontrarCativeiros();
  console.log(cativeirosDoJogador);
  // Adicionar o animal ao primeiro cativeiro disponível
  if (cativeirosDoJogador.length > 0) {
    cativeirosDoJogador[0].adicionarAnimal(animal);
    cativeirosDoJogador[0].desenharCativeiro();

    console.log("Animal adicionado ao cativeiro com sucesso.");
  }
  loop();
}

function adicionarCativeiroComprado(mx, my) {
  let tileClicado = null;

  // Verifica se o clique está dentro de algum tile
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].click_Tile(mx, my)) {
        tileClicado = { i, j };
        console.log('Clicou no tile:', i, j);
        break; 
      }
    }
    if (tileClicado) {
      break; 
    }
  }

  if (tileClicado) {

    if (!board[tileClicado.i][tileClicado.j].cativeiro) {

      board[tileClicado.i][tileClicado.j].cativeiro = new Cativeiro();
      
      console.log(`Cativeiro adicionado em (${tileClicado.i}, ${tileClicado.j}).`);
      
    } else {
      console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
    }
  } else {
    console.log('Nenhum tile clicado.');
  }
}


