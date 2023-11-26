class Loja {
  constructor() {
    this.itens = ["Cativeiros", "Edificios", "Decorações", "Animais"];
    this.botaoLargura = 120;
    this.botaoAltura = 40;
    this.barraLateralX = 20;
    this.barraAberta = false;
    this.produtos = {
      Cativeiros: ["Cativeiro Pequeno", "Cativeiro Médio", "Cativeiro Grande"],
      Lojas: ["Loja de Souvenirs", "Loja de Comida", "Loja de Brinquedos"],
      Decorações: ["Árvore Decorativa", "Fonte", "Banco de Jardim"],
      Animais: [
        {
          nome: "Leão",
          preco: 100,
          imagem: loadImage("./recursos/lion.png"),
        },
        {
          nome: "Elefante",
          preco: 150,
          imagem: loadImage("./recursos/elephant.png"),
        },
        {
          nome: "Girafa",
          preco: 120,
          imagem: loadImage("./recursos/giraffe.png"),
        },
      ],
    };
    this.produtoSelecionado = null;
    this.barraX = 0;
    this.barraY = 0;
  }

  mostrar() {
    textAlign(CENTER, CENTER);
    textSize(16);

    for (let i = 0; i < this.itens.length; i++) {
      let x = this.barraLateralX;
      let y = i * (this.botaoAltura + 10) + 150;
      fill(150);
      rect(x, y, this.botaoLargura, this.botaoAltura, 50);
      fill(0);
      text(this.itens[i], x + this.botaoLargura / 2, y + this.botaoAltura / 2);
    }
  }

  mostrarProdutosCategoria(categoria) {
    if (categoria === "Animais") {
      this.barraX = this.barraLateralX;
      this.barraY = height - 110;
  
      // Desenhe a barra
      fill(200);
      rect(this.barraX, this.barraY, width - this.barraLateralX * 2, 150, 10);
  
      let espacamento = 30;
  
      for (let i = 0; i < this.produtos["Animais"].length; i++) {
        let produto = this.produtos["Animais"][i];
  
        let produtoX = this.barraX + 10 + (80 + espacamento) * i;
        let produtoY = this.barraY + 10;
  
        fill(255);
        rect(produtoX, produtoY, 90, 90, 10);
  
        image(produto.imagem, produtoX + 10, produtoY + 10, 60, 60);
  
        fill(0);
        text(`Preço: ${produto.preco}`, produtoX + 50, produtoY + 80);
  

        if (
          mouseX > produtoX && mouseX < produtoX + 80 && mouseY > produtoY && mouseY < produtoY + 80
        ) {
          this.produtoSelecionado = produto;
          return; 
        }
      }
    }
  }
  

  clicar(mx, my) {
    for (let i = 0; i < this.itens.length; i++) {
      let x = this.barraLateralX;
      let y = i * (this.botaoAltura + 10) + 150;
      if (
        mx > x &&
        mx < x + this.botaoLargura &&
        my > y &&
        my < y + this.botaoAltura
      ) {
        let categoria = this.itens[i];
        console.log("Clicou em " + this.itens[i]);
        this.mostrarProdutosCategoria(categoria);
        this.barraAberta = true;
      }
    }
    
    if (this.produtoSelecionado !== null) {
      console.log("Comprou o produto:", this.produtoSelecionado.nome);
      if (this.produtoSelecionado.nome !== undefined) {
        console.log("Animal selecionado:", this.produtoSelecionado.nome);
      }
    }

    if (this.barraAberta) {
      let botaoFecharX = this.barraX + width - this.barraLateralX * 2 - 30;
      let botaoFecharY = this.barraY + 10;
      fill(200);
      rect(botaoFecharX, botaoFecharY, 20, 20, 5);
      fill(0);
      text("X", botaoFecharX + 10, botaoFecharY + 10);

      if (
        mouseX > botaoFecharX &&
        mouseX < botaoFecharX + 20 &&
        mouseY > botaoFecharY &&
        mouseY < botaoFecharY + 20
      ) {
        this.barraAberta = false;
        console.log("Clicou em Fechar");
        loop();
      }
    }
  }
}
