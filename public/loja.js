class Loja {
  constructor() {
    this.itens = ["Cativeiros", "Edificios", "Decorações", "Animais"];
    this.botaoLargura = 120;
    this.botaoAltura = 40;
    this.barraLateralX = 20;
    this.barraAberta = false;
    this.produtos = {
      Cativeiros: ["Cativeiro Pequeno", "Cativeiro Médio", "Cativeiro Grande"],
      Edificios: ["Loja de Souvenirs", "Loja de Comida", "Loja de Brinquedos"],
      Decorações: ["Árvore Decorativa", "Fonte", "Banco de Jardim"],
      Animais: [
        new Animal("Leão", 100, loadImage("./recursos/lion.png")),
        new Animal("Elefante", 150, loadImage("./recursos/elephant.png")),
        new Animal("Girafa", 120, loadImage("./recursos/giraffe.png")),
      ],
    };
    this.produtoSelecionado = null;
    this.barraX = 0;
    this.barraY = 0;
    this.ultimaCategoriaClicada = null;
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
  
  comprarProduto() {
    if (this.produtoSelecionado) {
      if (!this.produtoSelecionado.comprado && dinheiro >= this.produtoSelecionado.preco) {
        dinheiro -= this.produtoSelecionado.preco;
        atualizarDinheiro(dinheiro);
        console.log(`Produto comprado: ${this.produtoSelecionado.nome}`);
        // Marcar o produto como comprado
        this.produtoSelecionado.comprado = true;
        this.mostrarProdutosCategoria(this.ultimaCategoriaClicada);
        this.adicionarAnimalAoCativeiro(this.produtoSelecionado);

      } else {
        console.log("Não é possível comprar o produto.");
      }
    } else {
      console.log("Nenhum produto selecionado para compra.");
    }
  }

  removerProduto(categoria, produtoNome) {
    // Verifique se a categoria existe antes de tentar acessar a lista de produtos
        const index = this.produtos[categoria].findIndex((produto) => produto.nome === produtoNome);
        // Remova o produto da lista
        this.produtos[categoria].splice(index, 1);
        // Atualize a exibição da categoria para refletir a remoção do produto
        this.mostrarProdutosCategoria(categoria);

}



  mostrarProdutosCategoria(categoria) {
    
    if (categoria !== null) {
      this.barraX = this.barraLateralX;
      this.barraY = height - 110;
  
      // Desenhe a barra
      fill(200);
      rect(this.barraX, this.barraY, width - this.barraLateralX * 2, 150, 10);
  
      let espacamento = 30;
  
      this.produtoSelecionado = null;

      // Verificar a categoria atual e exibir os produtos correspondentes
      let produtos = this.produtos[categoria];

      for (let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];
        let botaoFecharX = this.barraX + width - this.barraLateralX * 2 - 30;
        let botaoFecharY = this.barraY + 10;
  

        let produtoX = this.barraX + 10 + (80 + espacamento) * i;
        let produtoY = this.barraY + 10;
        if (produto.comprado) {
          fill(100); 
        } else {
          
          fill(255);
        }

        
        rect(produtoX, produtoY, 90, 90, 10);

        fill(0);
        text("X", botaoFecharX + 10, botaoFecharY + 10);
  
        if (produto.imagem) {
          image(produto.imagem, produtoX + 10, produtoY + 10, 60, 60);
        }
  
        fill(0);
        text(`Preço: ${produto.preco}`, produtoX + 50, produtoY + 80);

        if (
          mouseX > produtoX && mouseX < produtoX + 80 && mouseY > produtoY && mouseY < produtoY + 80
        ) {

          this.produtoSelecionado = produto;
          console.log(produto)
          

        }
      }
    }
    
  } 
  
  
  clicar(mx, my) {
    console.log("barraAberta:", this.barraAberta);

    let categoriaClicada = null;

    for (let i = 0; i < this.itens.length; i++) {
      let x = this.barraLateralX;
      let y = i * (this.botaoAltura + 10) + 150;
      if (
        mx > x &&
        mx < x + this.botaoLargura &&
        my > y &&
        my < y + this.botaoAltura
      ) {
        categoriaClicada = this.itens[i];
        console.log("Clicou em " + this.itens[i]);
        this.mostrarProdutosCategoria(categoriaClicada);
        this.barraAberta = true;
        this.ultimaCategoriaClicada = categoriaClicada; // Atualiza a última categoria clicada
      }
    }

    if (this.barraAberta) {
      let botaoFecharX = this.barraX + width - this.barraLateralX * 2 - 30;
      let botaoFecharY = this.barraY + 10;

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
      } else {
        // Mostra os produtos da última categoria clicada
        this.mostrarProdutosCategoria(this.ultimaCategoriaClicada);
        this.comprarProduto();
      }
    }
  }

  adicionarAnimalAoCativeiro(animal) {
    // Encontrar cativeiros do jogador (pode ser necessário adaptar esta lógica com base no seu código)
    const cativeirosDoJogador = encontrarCativeiros();
  console.log(cativeirosDoJogador)
    // Adicionar o animal ao primeiro cativeiro disponível
    if (cativeirosDoJogador.length > 0) {
      cativeirosDoJogador[0].adicionarAnimal(animal);
      cativeirosDoJogador[0].desenharCativeiro();
      loop()

      console.log("Animal adicionado ao cativeiro com sucesso.");
      
    }
  }

 
}
