class Tile {
    constructor(x, y, tx, ty, s) {
      this.x = x;
      this.y = y;
      this.tx = tx ;
      this.ty = ty;
      this.s = s;
      //this.cativeiro = new Cativeiro(); 
    }
  
    draw_Tile() {
      noFill();
      //noStroke();
      stroke(BOLD)
      square(this.x, this.y, this.s);
      if (this.cativeiro) {
        this.cativeiro.desenharCativeiro(this.x, this.y, this.s);
      }

    }
  
    click_Tile(x, y) {
      if (
        x > this.x &&
        x < this.x + this.s &&
        y > this.y &&
        y < this.y + this.s
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  
  function draw_Board() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].draw_Tile();
      }
    }
  }
  
  function create_Board() {
    let initialPosX = (width - gridSize * squareSize) / 2;
    let initialPosY = (height - gridSize * squareSize) / 2;
  
    for (let i = 0; i < gridSize; i++) {
      board[i] = [];
      for (let j = 0; j < gridSize; j++) {
        let x = initialPosX + i * squareSize;
        let y = initialPosY + j * squareSize;
        board[i][j] = new Tile(x, y, i, j, squareSize);
  
        // Adiciona cativeiro apenas ao tile na posição (1,1)
        if (i === 1 && j === 1) {
          board[i][j].cativeiro = new Cativeiro();
        }
      }
    }
  }