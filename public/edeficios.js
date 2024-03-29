class Edificio {
  constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
  }

  desenharEdificio(x, y, s) {
    image(this.imagem, x, y, s, s);
  }
}

function adicionarEdificioComprado(mx, my, edificio) {
  console.log("Adicionando edifício:", edificio);

  let tileClicado = null;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].click_Tile(mx, my)) {
        tileClicado = { i, j };
        console.log("Clicou no tile:", i, j);
        break;
      }
    }
    if (tileClicado) {
      break;
    }
  }

  if (tileClicado) {
    const { i, j } = tileClicado;

    if (!board[i][j].isOcupado()) {
      board[i][j].edificio = edificio;
      board[i][j].setOcupado();

      adicionarConstrucaoNoServidor(i, j, edificio.nome);
      console.log(`Edifício adicionado em (${i}, ${j}).`);
    } else {
      console.log(
        `Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`
      );
    }
  } else {
    console.log("Nenhum tile clicado.");
  }
}


let dinheiroLoja = 0; 
let taxaProducao = 10; // Dinheiro gerado por segundo
let intervaloAtualizacao = 7000; // 40 segundos em milissegundos

function atualizarDinheiro2() {
  // Escolher uma categoria aleatória com quantidade maior que zero
  let categoriasDisponiveis = categorias.filter(categoria => categoria.quantidade > 0);
  if (categoriasDisponiveis.length > 0) {
    let categoriaAleatoria = categoriasDisponiveis[Math.floor(Math.random() * categoriasDisponiveis.length)];
    
    dinheiroLoja += taxaProducao;
    categoriaAleatoria.quantidade--; // Diminuir apenas a quantidade da categoria aleatória
    console.log(`Dinheiro atual: ${dinheiroLoja.toFixed(2)}, Quantidade do produto ${categoriaAleatoria.nome} diminuída.`);
  }
}


function coletarDinheiroLoja() {
  console.log("Dinheiro coletado:", dinheiroLoja.toFixed(2));
  atualizarDinheiroMais(dinheiroLoja)
 
  dinheiroLoja = 0;
  
}



let categorias = [
    { nome: "Peluches", preco: 20, quantidade: 5, quantidadeMax: 20},
    { nome: "T-shirt", preco: 20, quantidade: 8, quantidadeMax: 15},
    { nome: "Sweat", preco: 30, quantidade: 8, quantidadeMax: 15},
    { nome: "Canecas", preco: 10, quantidade: 10, quantidadeMax: 20},
  ];



  function mostrarDinheiro() {
    let quadradoX;
    let quadradoY;
    let quadradoLargura = 600;
    let quadradoAltura = 350;
  
    quadradoX = width / 2 - quadradoLargura / 2;
    quadradoY = height / 2 - quadradoAltura / 2;
  
    fill(255, 253, 150, 245);
    rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
    textAlign(LEFT, TOP);
    fill(0);
  
    let btnFechar = createButton("  X  ");
    btnFechar.position(quadradoX + quadradoLargura - 30, quadradoY + 10);
    btnFechar.mousePressed(() => {
      btnColetar.remove();
      btnFechar.remove();
      for (let i = 0; i < categorias.length; i++) {
        categorias[i].btnComprar.remove();
      }
  
      loop();
    });
  
    // Mostrar categorias
    let categoriaX = quadradoX + 20;
    let categoriaY = quadradoY + 120;
  
    for (let i = 0; i < categorias.length; i++) {
      let categoria = categorias[i];
  
      fill(200);
      rect(categoriaX, categoriaY, 400, 40, 20);
      fill(0);
      textSize(16);
      text(
        `${categoria.nome}
        Preço: ${categoria.preco.toFixed(2)}€ Quantidade: ${categoria.quantidade}/${categoria.quantidadeMax} `,
        categoriaX + 10,
        categoriaY + 4
      );
  
      // Botão para comprar
      categoria.btnComprar = createButton("Comprar Estoque");
      categoria.btnComprar.position(categoriaX + 260, categoriaY);
      categoria.btnComprar.mousePressed(() => {
        comprarProduto(categoria);
      });
  
      categoriaY += 60;
    }
  
    textSize(20);
    text("Dinheiro atual: " + dinheiroLoja.toFixed(2)+ "€", quadradoX + 20, quadradoY + 20);
  
    // Botão para coletar dinheiro
    let btnColetar = createButton("Coletar Dinheiro");
    btnColetar.position(quadradoX + 20, quadradoY + 60);
    btnColetar.mousePressed(() => {
      coletarDinheiroLoja();
    });
  }
  
  
  function comprarProduto(categoria) {
    if (dinheiro >= categoria.preco && categoria.quantidade < categoria.quantidadeMax) {
      dinheiro   -= categoria.preco;
      categoria.quantidade += 1;
      console.log(`Produto ${categoria.nome} comprado por ${categoria.preco.toFixed(2)}`);
      
    } else {
      console.log("Não é possível comprar o produto.");
    }
  }


  
  function animaisDoentes(){
    let quadradoX;
    let quadradoY;
    let quadradoLargura = 600;
    let quadradoAltura = 350;
  
    quadradoX = width / 2 - quadradoLargura / 2;
    quadradoY = height / 2 - quadradoAltura / 2;
  
    fill(255, 253, 150, 245);
    rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
    textAlign(LEFT, TOP);
    fill(0);
  
    let btnFechar = createButton("  X  ");
    btnFechar.position(quadradoX + quadradoLargura - 30, quadradoY + 10);
    btnFechar.mousePressed(() => {

      btnFechar.remove();
  
      loop();
    });
  }