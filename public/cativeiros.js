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

        // Adicione uma verificação para garantir que o animal não seja undefined
        if (this.animais[i]) {
            // Adicione uma verificação para garantir que a propriedade imagem não seja undefined
            if (this.animais[i].imagem) {
                image(
                    this.animais[i].imagem,
                    x + offsetX,
                    y + offsetY,
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

