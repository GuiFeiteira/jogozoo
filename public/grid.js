class Tile {
  constructor(x, y, tx, ty, s) {
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.s = s;
    this.cativeiro = null;
    this.bilheteira = null;
    this.azulejo = false; 

  }

  draw_Tile() {
    noFill();
    stroke(BOLD)
    square(this.x, this.y, this.s);
    if (this.azulejo) {
      noStroke()
      fill(color(200,230)); // Cor do hexágono especial
      let centerX = this.x + this.s / 2;
      let centerY = this.y + this.s / 2;

      hexagon(centerX, centerY, this.s / 2 * 0.9);
    }
  }

  draw_Cativeiro() {
    if (this.cativeiro) {
      this.cativeiro.desenharCativeiro(this.x, this.y, this.s);
    }
  }
  draw_Bilheteira() {
    if (this.bilheteira) {
      image(this.bilheteira.bilhImagem, this.x, this.y, this.s, this.s);
    }
  }

  click_Tile(x, y) {
    return (
      x > this.x &&
      x < this.x + this.s &&
      y > this.y &&
      y < this.y + this.s
    );
  }
}

function draw_Board() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw_Tile();
      board[i][j].draw_Cativeiro();
      board[i][j].draw_Bilheteira();
    }
  }


}

function create_Board() {
  let initialPosX = ((width - gridSize * squareSize) -100) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;
      board[i][j] = new Tile(x, y, i, j, squareSize);
      if (
        (i === 12 && j === 13) ||
        (i === 11 && j === 13) ||
        (i === 13 && j === 13) ||
        (i === 12 && j === 14)
        // Adicione mais condições conforme necessário
      ) {
        board[i][j].azulejo = true;
      }
      


    }
  }
}
