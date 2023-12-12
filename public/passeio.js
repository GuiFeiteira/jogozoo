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
    const { i, j } = tileClicado;

    // Verifique se não há nada no tile
    if (!board[i][j].azulejo)  {
      
          board[i][j].azulejo = true;


      console.log(`Caminho adicionado em (${i}, ${j}).`);
      adicionarConstrucaoAoUsuario(i, j, "azulejo");
      tileClicado = false 
    } else {
      console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
    }
  } else {
    console.log('Nenhum tile clicado.');
  }
  
}