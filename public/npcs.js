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
  if (cont === 10){
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