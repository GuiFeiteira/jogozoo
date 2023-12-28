class Cativeiro {
  constructor(fense) {
    
    this.cercaImagem = fense;
    this.animais = [];
  }
  desenharCativeiro(x, y, tamanho) {
    // Calcular as coordenadas para desenhar a cerca uma vez
    let offsetX = x;
    let offsetY = y;
    for (let i = 0; i < this.animais.length; i++) {
      let animal = this.animais[i];
      if (animal && animal.imagem) {
        // Calcular as coordenadas do animal para cada posição no array de animais
        let animalX = (offsetX + (i % 2) * tamanho / 2) ;
        let animalY = offsetY + Math.floor(i / 2) * tamanho / 2;
        // Calcular as coordenadas do tile do cativeiro ocupado pelo animal
        let tileX = Math.floor((animalX - offsetX) / (tamanho ));
        let tileY = Math.floor((animalY - offsetY) / (tamanho ));
        // Verificar se o animal está dentro do cativeiro antes de desenhá-lo
        if (tileX >= 0 && tileX < 2 && tileY >= 0 && tileY < 2) {
          image(animal.imagem, animalX, animalY+ 10, tamanho +7 , tamanho +7 );
        } 
      } else {
        console.log("A propriedade imagem do animal é undefined.");
      }
    }
    image(this.cercaImagem, offsetX, offsetY, tamanho * 2, tamanho * 2);

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
    const { i, j } = tileClicado;

    // Verifique se não há nada no tile
    if (!board[i][j].isOcupado())  {
      
          board[i][j].cativeiro = new Cativeiro(fence);
          adicionarConstrucaoNoServidor(i, j, "cativeiro");
          board[i][j].setOcupado();
          board[i + 1][j].setOcupado();
          board[i][j + 1].setOcupado();
          board[i + 1][j + 1].setOcupado();


      console.log(`Cativeiro adicionado em (${i}, ${j}).`);
    } else {
      console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
    }
  } else {
    console.log('Nenhum tile clicado.');
  }
}

