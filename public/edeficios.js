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
let intervaloAtualizacao = 400000; // 40 segundos em milissegundos

function atualizarDinheiro2() {
  dinheiroLoja += taxaProducao;
  console.log("Dinherio atual:", dinheiroLoja.toFixed(2));
}

function coletarDinheiroLoja() {
  console.log("Dinheiro coletado:", dinheiroLoja.toFixed(2));
  atualizarDinheiroMais(dinheiroLoja)
 
  dinheiroLoja = 0;
  loop() // Reiniciar o dinheiroLoja ao coletar
}

setInterval(atualizarDinheiro2(), intervaloAtualizacao);


let categorias = [
    { nome: "Peluches", preco: 10, quantidade: 5 },
    { nome: "T-shirt", preco: 20, quantidade: 8 },
    { nome: "Sweat", preco: 30, quantidade: 3 },
    { nome: "Canecas", preco: 15, quantidade: 10 },
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
    btnFechar.remove();
    btnColetar.remove()

    loop();
  });
  textSize(20);
  text("Dinheiro atual: " + dinheiroLoja.toFixed(2)+ '', quadradoX + 20, quadradoY + 20);

  // Botão para coletar dinheiro
  let btnColetar = createButton("Coletar Dinheiro");
  btnColetar.position(quadradoX + 20, quadradoY + 60);

  btnColetar.mousePressed(() => {
    coletarDinheiroLoja();
  });
  
}
