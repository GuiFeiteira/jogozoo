class Loja {
  constructor() {
    this.itens = ["Cativeiros", "Edificios", "Decorações", "Animais"];
    this.botaoLargura = 120;
    this.botaoAltura = 40;
    this.barraLateralX = 20;
    this.produtos = {
      Cativeiros: ["Cativeiro Pequeno", "Cativeiro Médio", "Cativeiro Grande"],
      Lojas: ["Loja de Souvenirs", "Loja de Comida", "Loja de Brinquedos"],
      Decorações: ["Árvore Decorativa", "Fonte", "Banco de Jardim"],
      Animais: [
        { 
        nome: "Leão", 
        preco: 100, 
        imagem: loadImage("./recursos/lion.png") },
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
      // Defina a posição inicial da barra
      let barraX = this.barraLateralX;
      let barraY = 200;

      // Desenhe a barra
      fill(200);
      rect(barraX, barraY, this.botaoLargura, height - barraY);

      // Desenhe os produtos
for (let i = 0; i < this.produtos["Animais"].length; i++) {
  let produto = this.produtos["Animais"][i];


        // Defina a posição do quadrado do produto
        let produtoX = barraX + 10;
        let produtoY = barraY + 10 + i * 100;

        // Desenhe o quadrado do produto
        fill(255);
        rect(produtoX, produtoY, 80, 80);

        // Desenhe a imagem do produto
        image(produto.imagem, produtoX + 10, produtoY + 10, 60, 60);

        // Desenhe o preço do produto
        fill(0);
        text(`Preço: ${produto.preco}`, produtoX + 50, produtoY + 80);

        // Verifique se o mouse está sobre o produto
        if (
          mouseX > produtoX &&
          mouseX < produtoX + 80 &&
          mouseY > produtoY &&
          mouseY < produtoY + 80
        ) {
          this.produtoSelecionado = produto;
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
      }
    }
    if (this.produtoSelecionado !== null) {
      console.log("Comprou o produto:", this.produtoSelecionado.nome);
    }
  }
}
