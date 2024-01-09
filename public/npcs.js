let cont = 0
let numNPCs = Math.floor(Math.random() * 5) + 1;
let NPCs = [];

let Pos_NPC = {
  x: 17,
  y: 8,
}

let posicaoPosterior = []; //possíveis posições que o NPC pode ir 


function npc() {
  let initialPosX = (width - gridSize * squareSize) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;

      if (i === 17 && j === 8) {
        // Chama a função para exibir o NPC na posição inicial
        NPC_left.show().position(x,y);
        setInterval(searchAzulejo, 1000);
      }
    }
  }
}

function searchAzulejo() {
  if (cont === 7){
    console.log(numNPCs)
  let initialPosX = (width - gridSize * squareSize) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;
   posicaoPosterior = [];

  if (Pos_NPC.x - 1 >= 0 && board[Pos_NPC.x - 1][Pos_NPC.y].azulejo == true) {
    posicaoPosterior.push([Pos_NPC.x - 1, Pos_NPC.y]);
  }

  if (Pos_NPC.y - 1 >= 0 && board[Pos_NPC.x][Pos_NPC.y - 1].azulejo == true) {
    posicaoPosterior.push([Pos_NPC.x, Pos_NPC.y - 1]);
  }

  if (Pos_NPC.x + 1 < board.length && board[Pos_NPC.x + 1][Pos_NPC.y].azulejo == true) {
    posicaoPosterior.push([Pos_NPC.x + 1, Pos_NPC.y]);
  }

  if (Pos_NPC.y + 1 < board[0].length && board[Pos_NPC.x][Pos_NPC.y + 1].azulejo == true) {
    posicaoPosterior.push([Pos_NPC.x, Pos_NPC.y + 1]);
  }

  if (posicaoPosterior.length > 0) {
    let nextPos = int(random(posicaoPosterior.length));

    // Atualiza as coordenadas do NPC
    let newX = initialPosX + posicaoPosterior[nextPos][0] * squareSize;
    let newY = initialPosY + posicaoPosterior[nextPos][1] * squareSize;

    Pos_NPC.x = posicaoPosterior[nextPos][0];
    Pos_NPC.y = posicaoPosterior[nextPos][1];

    // Chama a função para exibir o NPC na nova posição
    NPC_left.show().position(newX, newY);

    console.log("Nova posição de NPC:", Pos_NPC);
  } else {
    console.log("Não há posições válidas. Reiniciando a busca.");
    setTimeout(searchAzulejo, 1000);
  }

  console.log(posicaoPosterior);
  cont = 0
  }else{
    cont++ 
  }
}












/*let telasX = []; //posiçao x dos azulejos
let telasY = []; //posição y dos azulejos
let posicaoPosterior = [[1,1],[2,1],[3,1],[4,1]]; //possíveis posições que o NPC pode ir 
let posicaoAnterior = [[16,8]]; //Posição atual do NPC
let NPCs = [];

function npc(){
  let initialPosX = (width - gridSize * squareSize ) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;   
      if(i === 17 && j === 8){
        NPC_left.show();
        board[i][j] == NPC_left.position(x,y).size(30,30);
        setInterval(moveNPC, 1000);
      }
    }
  }
}
function azulejosArray() {
  let userId = userServ[0].id; // ID do usuário logado
  loadJSON("/getAzulejos/" + userId, (resposta) => {
    Azulejos = resposta;
    if(telasX.length < 1){
      for (let i = 0; i < Azulejos.length; i++) {
        let pos_x = Azulejos[i].tile_x;
        let pos_y = Azulejos[i].tile_y;
        telasX.push(pos_x);
        telasY.push(pos_y);
      }
    }
  });
}

function moveNPC() {
  let initialPosX = (width - gridSize * squareSize ) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;
  if (NPC_left) {
    NPC_left.position(initialPosX + 16 * squareSize, initialPosY + 8 * squareSize);
  }
  setTimeout(moveNPC2,1000);
}

function moveNPC2(){   
  let initialPosX = (width - gridSize * squareSize ) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {  
      
      posicaoPosterior[0][1] = posicaoAnterior[0][1] + 1.
      posicaoPosterior[0][0] = posicaoAnterior[0][0]
      posicaoPosterior[1][1] = posicaoAnterior[0][1] - 1
      posicaoPosterior[1][0] = posicaoAnterior[0][0]
      posicaoPosterior[2][1] = posicaoAnterior[0][1] 
      posicaoPosterior[2][0] = posicaoAnterior[0][0] + 1
      posicaoPosterior[3][1] = posicaoAnterior[0][1]
      posicaoPosterior[3][0] = posicaoAnterior[0][0] - 1

      for (let i = 0; i < posicaoPosterior.length; i++){
          let posicao = posicaoPosterior[i];
          let linha = posicao[0];
          let coluna = posicao[1];
          for (let j = 0 ; j < telasX.length ; j++){
            New_x = telasX[j];
            New_y = telasY[j];
            if (linha === New_x && coluna === New_y){
              NPC_left.position(initialPosX + linha * squareSize, initialPosY + coluna * squareSize);
              //if (posicaoAnterior[0][0] !== posicaoPosterior[i][0] || posicaoAnterior[0][1] !== posicaoPosterior[i][1]){
                posicaoAnterior[0][0] = posicaoPosterior[i][0];
                posicaoAnterior[0][1] = posicaoPosterior[i][1];
              //}
              console.log(posicaoAnterior);
            } else {
              console.error("NPC_left.position não é uma função válida.");
            }
          }
        }
      }
    }
  }*/
