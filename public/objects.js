
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
  
  
  
  
  
  
  
  let fenceImage; 
  function preload() {
    fenceImage = loadImage('fence.png'); // Substitua 'fence.png' pelo nome da sua imagem
  }
  
  class Habitat {
    constructor(name, maxAnimals) {
      this.name = name;
      this.maxAnimals = maxAnimals;
      this.animals = [];
      this.fenceImage = fenceImage; // Adicione a imagem da cerca
    }
  
    addAnimal(animal) {
      if (this.animals.length < this.maxAnimals) {
        this.animals.push(animal);
        console.log(`Added ${animal.name} to ${this.name}`);
      } else {
        console.log(`${this.name} is full, cannot add more animals.`);
      }
    }
  
    removeAnimal(animal) {
      const index = this.animals.indexOf(animal);
      if (index !== -1) {
        this.animals.splice(index, 1);
        console.log(`Removed ${animal.name} from ${this.name}`);
      }
    }
  
  
  
    // Método para desenhar a cerca
    displayFence(x, y, squareSize) {
      image(this.fenceImage, x, y, squareSize, squareSize);
    }
  }
  
  
  