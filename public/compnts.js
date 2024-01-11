
let dinheiro = 500;

function gameScene() {
  background(relva);
  draw_Board();
  desenharQuadrado();

  desenharBarraDinheiro();
  if (!noite) {
    setTimeout(npc,5000);
  }
  
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

function mostrarInformacoesCativeiro(cativeiro) {
  // Aqui você pode exibir as informações do cativeiro como quiser
  console.log("Informações do Cativeiro:");
  console.log("Animais:", cativeiro.animais);
  console.log("Outras informações...");

  // Adapte esta parte para exibir visualmente as informações na tela
  let quadradoX;
  let quadradoY;
  let quadradoLargura = 600;
  let quadradoAltura = 350;
  let maxAnimaisPorLinha = 2


  quadradoX = width / 2 - quadradoLargura / 2;
  quadradoY = height / 2 - quadradoAltura / 2;

  fill(255, 253, 150, 245); 
  rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
  textAlign(LEFT, TOP);
  fill(0)
  text("Os seus animais precisam de comer e ser limpos, isto vai fazer com ", quadradoX + 20, quadradoY +20);
  text("que tenham boa saude e atraim mais gente ao seu zoo !", quadradoX + 20, quadradoY +35)
  text("Os seus animais :", quadradoX + 20, quadradoY +100);
  
  
  let offsetX = quadradoX + 10;
  let offsetY = quadradoY + 80;
  let imageSize = 50;

  for (let i = 0; i < cativeiro.animais.length; i++) {
    let animal = cativeiro.animais[i];
  
    // Mostrar barras de fome, limpeza e saúde
    let barraWidth = 10; // Largura da barra
    let barraHeight = 10; // Altura da barra
    let fomeBarra = map(animal.fome, 0, 1, 0, barraWidth);

    let limpezaBarra = map(animal.limpeza, 0, 1, 0, barraWidth);
    let saudeBarra = map(animal.saude, 0, 1, 0, barraWidth);
    console.log(animal.saude)
    if (animal.imagem) {
      image(animal.imagem, offsetX + 10, offsetY + 3 * (barraHeight + 5), imageSize, imageSize);
      offsetX += imageSize + 10;
    
      push()
      fill(255, 0, 0); // Cor da barra de fome (vermelho)
      rect(offsetX + 100, offsetY + imageSize + 5, fomeBarra, barraHeight);
      
      fill(0, 255, 0); // Cor da barra de limpeza (verde)
      rect(offsetX + 100, offsetY + imageSize + 5 + barraHeight + 5, limpezaBarra, barraHeight);
      fill(0, 0, 255); // Cor da barra de saúde (azul)
      rect(offsetX + 100, offsetY + imageSize + 5 + 2 * (barraHeight + 5), saudeBarra, barraHeight);

      // Descrição das barras
      textAlign(LEFT, CENTER);
      fill(0);
      text("Fome: ", offsetX + barraWidth + 10, offsetY + imageSize + 5 + barraHeight / 2);
      text("Higiene: ", offsetX + barraWidth + 10, offsetY + imageSize + 5 + barraHeight + 5 + barraHeight / 2);
      text("Saúde: ", offsetX + barraWidth + 10, offsetY + imageSize + 5 + 2 * (barraHeight + 5) + barraHeight / 2);
      pop()
      

      offsetX += imageSize + barraWidth + 150;
      if ((i + 1) % maxAnimaisPorLinha === 0) {
        offsetX = quadradoX + 10;
        offsetY += imageSize + 75;
      }
      
  

  }

  }



  // Botão de alimentar
  let btnAlimentar = createButton("Alimentar");
  btnAlimentar.position(quadradoX + 20, quadradoY + 60);
  btnAlimentar.mousePressed(() => {

    console.log("Ação de alimentar");
  });

  // Botão de limpar
  let btnLimpar = createButton("Limpar");
  btnLimpar.position(quadradoX + 120, quadradoY + 60);
  btnLimpar.mousePressed(() => {

    console.log("Ação de limpar");
  });

  let btnFechar = createButton("  X  ");
  btnFechar.position(quadradoX + quadradoLargura - 30, quadradoY + 10);
  
  btnFechar.mousePressed(() => {
    btnFechar.remove();
    btnAlimentar.remove()
    btnLimpar.remove()
    loop()
  });

}

function desenharQuadrado() {
  let tamanhoQuadrado = min(width, height) * 0.1;
  if (noite) {
    
    image(imagemNoite, 20, 20, tamanhoQuadrado, tamanhoQuadrado);
  } else {
    image(imagemDia, 20, 20, tamanhoQuadrado, tamanhoQuadrado);
  }
}


function atualizarDinheiro(novoValor) {
  dinheiro = novoValor;
  desenharBarraDinheiro();
  atualizarDinheiroNoServidor(dinheiro)


}
function atualizarDinheiroMais(novoValor) {
  dinheiro = dinheiro + novoValor;
  desenharBarraDinheiro();
  atualizarDinheiroNoServidor(dinheiro)

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

function adicionarAnimalNoServidor(tileX, tileY, animal) {

  let userId = userServ[0].id; // ID do usuário logado

  let data = {
    user_id: userId,
    tile_x: tileX,
    tile_y: tileY,
    nome: animal.nome,
    fome: animal.fome,
    limpeza: animal.limpeza,
    saude: animal.saude
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
    //console.log(respostaServer);
    
  });
}


function atualizarAtributosAnimal(animalId, fome, saude, limpeza) {
  
  let data = {
    animal_id: animalId,
    fome: fome,
    saude: saude,
    limpeza: limpeza
    }
  httpPost("/atualizarAtributosAnimal", data, "json",( respostaServer) =>{
    console.log(respostaServer);
  });

}

