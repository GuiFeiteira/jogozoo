class Cativeiro {
    constructor() {
      this.cercaImagem = loadImage('./recursos/fence.png');
      this.animaisImagens = [];
    }
  
    desenharCativeiro(x, y, tamanho) {
      // Desenhe a cerca (imagem) na posição do cativeiro
      image(this.cercaImagem, x, y, tamanho, tamanho);
  
      // Desenhe até quatro animais (imagens) dentro do cativeiro
      for (let i = 0; i < this.animaisImagens.length; i++) {
        // Aqui você pode ajustar as posições dos animais dentro do cativeiro
        let offsetX = i * tamanho / 4;
        let offsetY = 0;
        image(this.animaisImagens[i], x + offsetX, y + offsetY, tamanho / 4, tamanho / 4);
      }
    }
  
    adicionarAnimal(imagemAnimal) {
      if (this.animaisImagens.length < 4) {
        this.animaisImagens.push(imagemAnimal);
      } else {
        console.log("O cativeiro já está cheio de animais!");
      }
    }
  }
  