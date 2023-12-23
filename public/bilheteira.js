class Bilheteira {
  constructor(both) {
    this.bilhImagem = both;
    this.precoBilhete = 10;
    this.visitantes = 0;
    this.dinheiroTotal = 0;
  }

  getPrecoBilhete() {
    return this.precoBilhete;
  }

  setPrecoBilhete(novoPreco) {
    this.precoBilhete = novoPreco;
  }

  registrarVisita() {
    this.visitantes++;

    this.dinheiroTotal += this.precoBilhete;
  }

  getVisitantes() {
    return this.visitantes;
  }

  getDinheiroTotal() {
    return this.dinheiroTotal;
  }

  desenharBilheteira(x, y, tamanho) {
    let offsetX = x;
    let offsetY = y;

    image(this.bilhImagem, offsetX, offsetY, tamanho * 2, tamanho * 2);
  }
}

let inputPreco;
function desenharPopup() {

  let quadradoX;
  let quadradoY;
  let quadradoLargura = 600;
  let quadradoAltura = 300;
  let botaoFecharX;
  let botaoFecharY;
  let botaoFecharLargura = 30;
  let botaoFecharAltura = 20;

  quadradoX = width / 2 - quadradoLargura / 2;
  quadradoY = height / 2 - quadradoAltura / 2;
  botaoFecharX = quadradoX + quadradoLargura - botaoFecharLargura;
  botaoFecharY = quadradoY;

  fill(255, 253, 150, 245); 
  rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);

  inputPreco = createInput();
  inputPreco.position(quadradoX + 20, quadradoY + 120);
  inputPreco.style("width", "100px");
  inputPreco.attribute("placeholder", "Digite o preço");

  // Criar um botão submit
  botaoSubmit = createButton("Submit");
  botaoSubmit.position(quadradoX + 140, quadradoY + 120);
  botaoSubmit.mousePressed(atualizarPreco);

  fill(0); // Cor do texto do botão de fechar
  textAlign(CENTER, CENTER);
  textSize(12);
  text(
    "X",
    botaoFecharX + botaoFecharLargura / 2,
    botaoFecharY + botaoFecharAltura / 2 + 7
  );
  text("Preço do Bilhete", quadradoX + 300, quadradoY + 30);
  text(
    "Preço Atual do Bilhete: " +
      board[17][6].bilheteira.getPrecoBilhete() +
      " € ",
    quadradoX + 300,
    quadradoY + 90
  );

  text(
    "Tip - Quanto maior o preço do bilhete mais vais receber por cabeça, mas menos pessoas entrarão no zoo",
    quadradoX + 300,
    quadradoY + 60
  );

  if (
    mouseX > botaoFecharX - botaoFecharLargura / 2 &&
    mouseX < botaoFecharX + botaoFecharLargura / 2 &&
    mouseY > botaoFecharY - botaoFecharAltura / 2 &&
    mouseY < botaoFecharY + botaoFecharAltura / 2
  ) {
    console.log("Botão Fechar pressionado");
    janelaAberta = false; // Fechar a janela pop-up

    loop();
  }
}

function atualizarPreco() {
  // Obter o valor digitado no campo de input e atualizar o preço da bilheteira
  let novoPreco = inputPreco.value();
  if (!isNaN(novoPreco) && novoPreco >= 1 && novoPreco <= 100) {
    board[17][6].bilheteira.setPrecoBilhete(novoPreco);
    console.log("Novo preço definido: " + novoPreco);
    desenharPopup();
    
  } else {
    console.log("Por favor, insira um número válido entre 1 e 100.");
  }
}
