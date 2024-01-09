let dinheiro = 500;

function gameScene() {
  background(relva);
  draw_Board();
  desenharQuadrado();
  desenharBarraDinheiro();
}

function desenharBarraDinheiro() {
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
  desenharBarraDinheiro();

}




function adicionarConstrucaoNoServidor(tileX, tileY, tipoConstrucao) {

  let userId = userServ[0].id; // ID do usuário logado

  let data = {
    user_id: userId,
    tile_x: tileX,
    tile_y: tileY,
    building_type: tipoConstrucao,
  };

  httpPost("/insertTile", data, "json", (respostaServer) => {
    console.log(respostaServer);
  });
}

function adicionarAnimalNoServidor(tileX, tileY, nome) {

  let userId = userServ[0].id; // ID do usuário logado

  let data = {
    user_id: userId,
    tile_x: tileX,
    tile_y: tileY,
    nome: nome,
  };

  httpPost("/insertAnimal", data, "json", (respostaServer) => {
    console.log(respostaServer);
  });
}
function atualizarDinheiroNoServidor(novoDinheiro) {
  console.log('MONEY MONEY')
  let userId = userServ[0].id; // ID do usuário logado

  let data = {
    user_id: userId,
    novoDinheiro: novoDinheiro,
  };
  console.log(data)
  // Envia uma solicitação POST para o servidor
  httpPost("/updateMoney", data, "json",(respostaServer) =>{
    console.log(respostaServer);
    // Aqui você pode adicionar lógica adicional se necessário
  });
}


