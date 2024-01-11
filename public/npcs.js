let cont = 0;
let numNPCs = Math.floor(Math.random() * 9) + 4;
let NPCs = [];

let Pos_NPC = {
  x: 17,
  y: 8,
};

let posicaoPosterior = []; // possíveis posições que o NPC pode ir
let intervalLeft; // variável para armazenar o ID do intervalo para o NPC_left
let intervalRight; // variável para armazenar o ID do intervalo para o NPC_right
let npcRightStarted = false; // variável para controlar se o NPC_right já começou

function npc() {
  let initialPosX = (width - gridSize * squareSize) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let x = initialPosX + i * squareSize;
      let y = initialPosY + j * squareSize;

      if (i === 17 && j === 8) {
        // Exibe o NPC_left na posição inicial
        NPC_left.show().position(x, y);

        // Define um intervalo para chamar a função searchAzulejo('left') a cada 1000 milissegundos (1 segundo)
        intervalLeft = setInterval(() => {
          searchAzulejo('left');
        }, 1000);
      }
    }
  }
}

let posicoesVisitadas = new Set();

function searchAzulejo(direction) {
  if (cont === 12) {
    console.log('lalalalalal', numNPCs);
    let initialPosX = (width - gridSize * squareSize) / 2;
    let initialPosY = (height - gridSize * squareSize) / 2;
    posicaoPosterior = [];

    // Adiciona todas as posições vizinhas que são azulejos à lista
    const direcoes = [
      { dx: -1, dy: 0 }, // Esquerda
      { dx: 1, dy: 0 }, // Direita
      { dx: 0, dy: -1 }, // Acima
      { dx: 0, dy: 1 }, // Abaixo
    ];

    for (const dir of direcoes) {
      const nx = Pos_NPC.x + dir.dx;
      const ny = Pos_NPC.y + dir.dy;

      // Verifica se a posição não está na lista de posições visitadas
      if (
        nx >= 0 &&
        nx < board.length &&
        ny >= 0 &&
        ny < board[0].length &&
        board[nx][ny].azulejo &&
        !posicoesVisitadas.has(`${nx}-${ny}`)
      ) {
        posicaoPosterior.push([nx, ny]);
      }
    }

    if (posicaoPosterior.length > 0) {
      // Escolhe uma posição aleatória entre as possíveis
      const nextPos = Math.floor(Math.random() * posicaoPosterior.length);
      const proximaPosicao = posicaoPosterior[nextPos];

      // Atualiza as coordenadas do NPC
      const newX = initialPosX + proximaPosicao[0] * squareSize;
      const newY = initialPosY + proximaPosicao[1] * squareSize;

      posicoesVisitadas.add(`${Pos_NPC.x}-${Pos_NPC.y}`); // Adiciona a posição atual à lista de posições visitadas
      Pos_NPC.x = proximaPosicao[0];
      Pos_NPC.y = proximaPosicao[1];

      // Chama a função para exibir a imagem correta na nova posição
      if (direction === 'left') {
        NPC_left.position(newX, newY);
        NPC_right.position(newX, newY);
      } else if (direction === 'right') {
        NPC_right.position(newX, newY);
        NPC_left.position(newX, newY);
      }

      console.log('Nova posição de NPC:', Pos_NPC);
    } else {
      console.log('Não há posições válidas.');

      // Verifica se o NPC_left atingiu o fim da trajetória
      if (direction === 'left') {
        console.log('Reiniciando a busca.');
        posicoesVisitadas.clear();
        clearInterval(intervalLeft); // Interrompe o intervalo para o NPC_left
        NPC_left.hide();
        NPC_right.show();

        // Verifica se o NPC_right já começou e não foi iniciado antes
        if (!npcRightStarted) {
          npcRightStarted = true;

          // Define um intervalo para chamar a função searchAzulejo('right') a cada 1000 milissegundos (1 segundo)
          intervalRight = setInterval(() => {
            searchAzulejo('right');
          }, 1000);
        } else {
          // Se o NPC_right já começou, interrompe o intervalo para o NPC_right
          clearInterval(intervalRight);
          NPC_right.hide();
        }

        reiniciouBusca = true; // Marca que a busca foi reiniciada
      } else if (direction === 'right') {
        // Se o NPC_right não tiver posições válidas, interrompe todo o movimento
        console.log('NPC_right não tem posições válidas. Interrompendo movimento.');
        clearInterval(intervalRight);
        NPC_right.hide();
      }
    }

    console.log(posicoesVisitadas);
    cont = 0;
  } else {
    cont++;
  }
}

