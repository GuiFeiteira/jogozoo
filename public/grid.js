class Tile {
  constructor(x, y, tx, ty, s) {
    this.x = x;
    this.y = y;
    this.tx = tx;
    this.ty = ty;
    this.s = s;

    this.ocupado = false;
    this.cativeiro = null;
    this.bilheteira = null;
    this.azulejo = false;
    this.edificio = null;
  }

  draw_Tile() {
    noFill();
    stroke(BOLD);
    square(this.x, this.y, this.s  );
    if (this.azulejo) {
      image(azulejo, this.x, this.y, this.s, this.s);
    }

  }

  draw_Cativeiro() {
    if (this.cativeiro) {
      this.cativeiro.desenharCativeiro(this.x, this.y, this.s);
    }
  }
  draw_Edificio() {
    if (this.edificio) {
      this.edificio.desenharEdificio(this.x, this.y, this.s)
    }
  }
  draw_Bilheteira() {
    if (this.bilheteira) {
      this.bilheteira.desenharBilheteira(this.x, this.y, this.s);
    }
  }

  click_Tile(x, y) {
    return (
      x > this.x && x < this.x + this.s && y > this.y && y < this.y + this.s
    );
  }
  setOcupado() {
    this.ocupado = true;
  }

  isOcupado() {
    return this.ocupado;
  }
}

function draw_Board() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw_Tile();
      board[i][j].draw_Cativeiro();
      board[i][j].draw_Bilheteira();
      board[i][j].draw_Edificio();
    }
  }
}

function create_Board() {
  let initialPosX = (width - gridSize * squareSize ) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  for (let i = 0; i < gridSize; i++) {
    board[i] = [];
    for (let j = 0; j < gridSize; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;
      board[i][j] = new Tile(x, y, i, j, squareSize);
      if (
        (i === 17 && j === 8) ||
        (i === 16 && j === 8) 
        // Adicione mais condições conforme necessário
      ) {
        board[i][j].azulejo = true;
        board[i][j].setOcupado();
      }
    }
  }
}
