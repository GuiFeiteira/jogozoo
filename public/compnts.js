let dinheiro = 500;
let contadorDias = 0;

function gameScene() {
  background(relva);
  draw_Board();
  desenharQuadrado();
  desenharBarraDoTopo();
  tempo();
}

function desenharBarraDoTopo() {
  // Defina as propriedades da barra no topo
  let barraTopoX = width - 150;
  let barraTopoY = 20;
  let barraTopoLargura = 100;
  let barraTopoAltura = 25;

  // Desenhe a barra no topo
  fill(255);
  noStroke();
  rect(barraTopoX, barraTopoY, barraTopoLargura, barraTopoAltura, 10);

  // Adicione o texto para mostrar o valor do dinheiro
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(` ${dinheiro}`, barraTopoX + barraTopoLargura / 2, barraTopoY + barraTopoAltura / 2);

  image(imgMoney, barraTopoX, barraTopoY, barraTopoAltura, barraTopoAltura);
}


function desenharQuadrado() {
  fill(150, 245 ); 
  noStroke(); 
  rectMode(CORNER);


  let tamanhoQuadrado = min(width, height) * 0.1;

  
  rect(20, 20, tamanhoQuadrado, tamanhoQuadrado, 20);
}

function atualizarDinheiro(novoValor) {
  dinheiro = novoValor;
}

function tempo(){
  let data = new Date(2023, 0, 1);
  data.setDate(contadorDias);

  let dia = data.getDate();
  let mes = data.getMonth() + 1;
  let ano = data.getFullYear();

  // Desenhe a barra no topo
  fill(255);
  noStroke();
  rect(width - 800, 20, 100, 40, 10);

  // Adicione o texto para mostrar o valor do contador de dias
  fill(0);
  textAlign(CENTER, CENTER);

  textSize(20);
  text(`${dia}/${mes}/${ano}`, width - 750, 43);
  console.log(dia)
}

function atualizarTempo() {
  contadorDias += 1; // Incrementa o contador de dias
}