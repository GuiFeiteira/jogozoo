class Caminho {
  constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem
  }
}

let tileClicado;
function adicionarAzulejo(mx, my, azulejo) {
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
    let { i, j } = tileClicado;

    
    if (!board[i][j].isOcupado())  {
      
          board[i][j].azulejo = true;
          board[i][j].setOcupado();

      console.log(`Caminho adicionado em (${i}, ${j}).`);
      adicionarConstrucaoNoServidor(i, j, "azulejo");
      tileClicado = null 
      
      loop()
      
    } else {
      console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
      tileClicado = null;
    }
  } else {
    console.log('Nenhum tile clicado.');
  }
  
}


class Decoracao{
  constructor(nome, preco, imagem){
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem
  }
  desenharDecoracao(x, y, s) {
    image(this.imagem, x, y, s, s);
  }
}

function adicionarDecoracao(mx, my, decoracao) {
  let tileClicado = null;
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
    let { i, j } = tileClicado;

    if (!board[i][j].isOcupado()) {
      board[i][j].decoracao = decoracao; // Armazena a imagem da decoração
      board[i][j].setOcupado();
      console.log(`Decoração adicionada em (${i}, ${j}).`);
      adicionarConstrucaoNoServidor(i, j, decoracao.nome);
     

    } else {
      console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
      
    }
  } else {
    console.log('Nenhum tile clicado.');
  }
}
