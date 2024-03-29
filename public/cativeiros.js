class Cativeiro {
  constructor(fense) {
    this.cercaImagem = fense;
    this.animais = [];
  }
  desenharCativeiro(x, y, tamanho) {
   
    let offsetX = x;
    let offsetY = y;
    for (let i = 0; i < this.animais.length; i++) {
      let animal = this.animais[i];
      this.atualizarAtributosAnimais()

      if (animal && animal.imagem) {
       
        let animalX = offsetX + (i % 2) * tamanho / 1.2;
        let animalY = offsetY + Math.floor(i / 2) * tamanho / 2;
       
        let tileX = Math.floor((animalX - offsetX) / (tamanho ));
        let tileY = Math.floor((animalY - offsetY) / (tamanho ));
       
        if (tileX >= 0 && tileX < 2 && tileY >= 0 && tileY < 2) {
          image(animal.imagem, animalX, animalY+ 10, tamanho +5 , tamanho +5 );
        } 
      } else {
        console.log("A propriedade imagem do animal é undefined.");
      }
    }
    image(this.cercaImagem, offsetX, offsetY, tamanho * 2, tamanho * 2);

  }


  adicionarAnimal(animal) {
    if (this.animais.length < 4) {
      if (this.animais.length === 0 || animal.tipo === this.animais[0].tipo) {
        this.animais.push(animal);
        console.log(`${animal.nome} adicionado ao cativeiro.`);
      } else {
        console.log(`O cativeiro só aceita animais do tipo ${this.animais[0].tipo}.`);
      }
    } else {
      console.log("O cativeiro já está cheio de animais!");
    }
  }

  atualizarAtributosAnimais() {
    for (let i = 0; i < this.animais.length; i++) {
      let animal = this.animais[i];
      
      animal.fome -= 0.1;
      animal.saude -= 0.05;
      animal.limpeza -= 0.07;

      animal.fome = Math.max(0, animal.fome);
      animal.saude = Math.max(0, animal.saude);
      animal.limpeza = Math.max(0, animal.limpeza);

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

function adicionarAnimalAoCativeiro(mx, my, animal) {
  const cativeiroClicado = encontrarCativeiroClicado(mx, my);

  if (cativeiroClicado) {
    const proximoAnimal = loja.obterProximoAnimalDisponivel(animal.tipo);

    if (proximoAnimal) {
      // Remove o animal atual da loja e adiciona o próximo
      loja.produtos.Animais = loja.produtos.Animais.filter(a => a !== animal);
      loja.produtos.Animais.push(proximoAnimal);

      // Incrementa o índice do próximo animal disponível
      loja.desbloquearProximoAnimal(animal.tipo);
    }

    // Adiciona o animal clicado ao cativeiro
    cativeiroClicado.adicionarAnimal(animal);

    // Atualiza o desenho do cativeiro
    cativeiroClicado.desenharCativeiro(mx, my, squareSize);

    // Encontra o tile clicado no tabuleiro
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

    // Se encontrou o tile clicado, adiciona o animal ao servidor
    if (tileClicado) {
      const { i, j } = tileClicado;
      adicionarAnimalNoServidor(i, j, animal);
    }

    console.log("Animal adicionado ao cativeiro com sucesso.", cativeiroClicado);
  } else {
    console.log("Clique fora do cativeiro. Animal não adicionado.");
  }

  loop();
}


function encontrarCativeiroClicado(mx, my) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cativeiro = board[i][j].cativeiro;

      if (cativeiro && cliqueDentroDoCativeiro(mx, my, i, j)) {
        return cativeiro;
      }
    }
  }

  return null; 
}

function cliqueDentroDoCativeiro(mx, my, tileX, tileY) {
  const tileSize = squareSize;
  const offsetX = board[tileX][tileY].x;
  const offsetY = board[tileX][tileY].y;

  return (
    mx > offsetX &&
    mx < offsetX + tileSize * 2 &&
    my > offsetY &&
    my < offsetY + tileSize * 2
  );
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

