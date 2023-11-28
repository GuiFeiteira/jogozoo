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
      image(
        this.animais[i],
        x + offsetX,
        y + offsetY,
        tamanho / 4,
        tamanho / 4
      );
    }
  }

  adicionarAnimal(animal) {
    if (this.animais.length < 4) {
      this.animais.push(animal);
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

