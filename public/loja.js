cativeiroHelp = false
class Loja {
  constructor() {
    this.itens = ["Cativeiros", "Edificios", "Decorações", "Animais"];
    this.botaoLargura = 120;
    this.botaoAltura = 40;
    this.barraLateralX = 20;
    this.barraAberta = false;
    this.proximoAnimalDesbloquear = {
      leao: 0,
      elefante: 0,
      girafa: 0,
      
    };
    
    this.produtos = {
      Cativeiros: [
        new Cativeiro_Loja("Cativeiro Normal", 200, fence),
        new Cativeiro_Loja("Cativeiro Normal2", 200 +50, fence),
        "Cativeiro Médio",  
        "Cativeiro Grande",
      ],
      Edificios: [
        new Edificio('Armazem', 120, armazem),
        new Edificio('Loja Lembracas', 250, sovenir),
        new Edificio('Clinica', 300, clinic)
      ],
      Decorações: [
        new Caminho('caminho', 50, azulejo),
        new Decoracao('tree', 50, tree),
        new Decoracao('flor', 50, flores)
      ],
      Animais: [
        new Animal("lion", 100, loadImage("./recursos/lion.png"), 'leao'),          
        new Animal("elephant", 150, loadImage("./recursos/elephant.png"), 'elefante'),
        new Animal("giraffe", 120, loadImage("./recursos/giraffe.png"), 'girafa'),
        new Animal('lion (4)', 200, loadImage("./recursos/lion (4).png"), 'leao'),
        new Animal('lions', 400, loadImage("./recursos/lions.png"), 'leao'),
        new Animal("giraffe (1)", 240, loadImage("./recursos/giraffe (1).png"), 'girafa'),
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
      if (
        !this.produtoSelecionado.comprado &&
        dinheiro >= this.produtoSelecionado.preco
      ) {
        dinheiro -= this.produtoSelecionado.preco;
        atualizarDinheiro(dinheiro);
        console.log(`Produto comprado: ${this.produtoSelecionado.nome}`);
        
        noLoop()

        this.produtoSelecionado.comprado = true;
        if (this.produtoSelecionado instanceof Animal) {
          this.desbloquearProximoAnimal(this.produtoSelecionado.tipo);
          console.log("ANIMAL A ABABABB", this.produtoSelecionado.tipo)

          this.aguardandoCliqueAnimal = true;
          
          
          loop();
        } else if (this.produtoSelecionado instanceof Cativeiro_Loja) {
          cativeiroHelp = true

          this.aguardandoClique = true;
          loop()
        }else if (this.produtoSelecionado instanceof Caminho) {
          this.aguardandoClique2 = true;
          this.produtoSelecionado.comprado = false;
          this.produtoSelecionado.preco = Math.round(this.produtoSelecionado.preco + (this.produtoSelecionado.preco * 0.2));
          loop()
        } else if (this.produtoSelecionado instanceof Decoracao) {
          this.aguardandoClique4 = true;
          this.produtoSelecionado.comprado = false;
          this.produtoSelecionado.preco = Math.round(this.produtoSelecionado.preco + (this.produtoSelecionado.preco * 0.2));
          loop()
        } else if (this.produtoSelecionado instanceof Edificio) {
          this.aguardandoClique3 = true;

            
          loop()

        }
      } else {
        console.log("Não é possível comprar o produto.");
      }
    } else {
      console.log("Nenhum produto selecionado para compra.");
    }
  }

  
  mostrarProdutosCategoria(categoria) {
    if (categoria !== null) {
      this.barraX = this.barraLateralX;
      this.barraY = height - 110;
      precoAtualizado = false;
      // Desenhe a barra
      fill(200);
      rect(this.barraX, this.barraY, width - this.barraLateralX * 2, 150, 10);
  
      let espacamento = 30;
  
      // Verificar a categoria atual e exibir os produtos correspondentes
      let produtos = this.produtos[categoria];
  
      for (let i = 0; i < produtos.length; i++) {
        let produto = produtos[i];
  
        // Verifica se é um animal e se está desbloqueado
        if (produto instanceof Animal) {
          let tipoAnimal = produto.tipo;
          let proximoAnimalDisponivel = this.obterProximoAnimalDisponivel(tipoAnimal);
  
          if (proximoAnimalDisponivel === null || produto !== proximoAnimalDisponivel) {
            // Se não for o próximo animal disponível, não exibe na loja
            continue;
          }
        }
  
        let botaoFecharX = this.barraX + width - this.barraLateralX * 2 - 30;
        let botaoFecharY = this.barraY + 10;
  
        let produtoX = this.barraX + 20 + (80 + espacamento) * i;
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
          image(produto.imagem, produtoX + 18, produtoY + 10, 55, 55);
        }
  
        fill(0);
        text(`Preço: ${produto.preco}`, produtoX + 45, produtoY + 80);
  
        if (
          mouseX > produtoX &&
          mouseX < produtoX + 80 &&
          mouseY > produtoY &&
          mouseY < produtoY + 80
        ) {
          this.produtoSelecionado = produto;
          console.log(produto);
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
        this.barraAberta = true;
        this.ultimaCategoriaClicada = categoriaClicada; 
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
        this.mostrarProdutosCategoria(this.ultimaCategoriaClicada);

        if (this.aguardandoClique) {
          
          adicionarCativeiroComprado(mx, my);
          cativeiroHelp = false
          
          this.aguardandoClique = false; 
          this.barraAberta = false;
          
          loop();
          
        }else if (this.aguardandoClique2) {
          adicionarAzulejo(mx, my, this.produtoSelecionado);
          this.aguardandoClique2 = false;
          this.barraAberta = false;
          this.produtoSelecionado = null
          
          loop();

          
        }else if (this.aguardandoClique3) {
          adicionarEdificioComprado(mx, my, this.produtoSelecionado);
          
          this.aguardandoClique3 = false;
          this.barraAberta = false;
          loop()
          
        }else if (this.aguardandoClique4) {
          adicionarDecoracao(mx, my, this.produtoSelecionado)
          
          this.aguardandoClique4 = false;
          this.barraAberta = false;
          this.produtoSelecionado = null
          loop()
          
        }else if (this.aguardandoCliqueAnimal) {
          adicionarAnimalAoCativeiro(mx, my, this.produtoSelecionado)
          
          this.aguardandoCliqueAnimal = false
          this.barraAberta = false
          loop()
          
        } else {
          this.comprarProduto();
          
        }
      }
    }
  }
  desbloquearProximoAnimal(tipo) {
    this.proximoAnimalDesbloquear[tipo]++;
    console.log("animal a desbloquera", this.proximoAnimalDesbloquear[tipo])
    this.proximoAnimalDesbloquear[tipo] = this.proximoAnimalDesbloquear[tipo] -1
  }
  obterProximoAnimalDisponivel(tipo) {
    const animais = this.produtos.Animais.filter(animal => animal.tipo === tipo);
    const indiceProximo = this.proximoAnimalDesbloquear[tipo];
    
    if (indiceProximo < animais.length) {
      
      return animais[indiceProximo];
      
    } else {
      return null; // Não há mais animais desbloqueados desse tipo
    }
  }
}
