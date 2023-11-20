
class Tile {
    constructor(x, y, tx, ty, s) {
      this.x = x;
      this.y = y;
      this.tx = tx ;
      this.ty = ty;
      this.s = s;
    }
  
    draw_Tile() {
      square(this.x, this.y, this.s);
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

  
  