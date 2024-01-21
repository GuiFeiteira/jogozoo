let cont = 0;
let NPCs = [];
let Pos_NPC = {
  x: 17,
  y: 8,
};
let posicaoPosterior = [];
let intervalLeft;
let intervalRight;
let npcRightStarted = false;

function npc() {
  let initialPosX = (width - gridSize * squareSize) / 2;
  let initialPosY = (height - gridSize * squareSize) / 2;

  // Exibe o NPC_left na posição inicial
  NPC_left.show().position(initialPosX + Pos_NPC.x * squareSize, initialPosY + Pos_NPC.y * squareSize);

  // Define um intervalo para chamar a função searchAzulejo a cada 1000 milissegundos (1 segundo)
  intervalLeft = setInterval(() => {
    searchAzulejo('left');
  }, 1000);
}

let posicoesVisitadas = new Set();

function searchAzulejo(direction) {
  if (cont === 12) {
    let initialPosX = (width - gridSize * squareSize) / 2;
    let initialPosY = (height - gridSize * squareSize) / 2;
    posicaoPosterior = [];

    const direcoes = [
      { dx: -1, dy: 0 }, // Esquerda
      { dx: 1, dy: 0 },  // Direita
      { dx: 0, dy: -1 }, // Acima
      { dx: 0, dy: 1 },  // Abaixo
    ];

    for (const dir of direcoes) {
      const nx = Pos_NPC.x + dir.dx;
      const ny = Pos_NPC.y + dir.dy;

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
      const nextPos = Math.floor(Math.random() * posicaoPosterior.length);
      const proximaPosicao = posicaoPosterior[nextPos];

      const newX = initialPosX + proximaPosicao[0] * squareSize;
      const newY = initialPosY + proximaPosicao[1] * squareSize;

      posicoesVisitadas.add(`${Pos_NPC.x}-${Pos_NPC.y}`);
      Pos_NPC.x = proximaPosicao[0];
      Pos_NPC.y = proximaPosicao[1];

      NPC_left.position(newX, newY);
      NPC_right.position(newX, newY);

      console.log('Nova posição de NPC:', Pos_NPC);
    } else {
      console.log('Não há posições válidas.');

      if (direction === 'left') {
        clearInterval(intervalLeft);
        posicoesVisitadas.clear();
        NPC_left.hide();
        NPC_right.show();

        if (!npcRightStarted) {
          npcRightStarted = true;
          intervalRight = setInterval(() => {
            searchAzulejo('right');
          }, 1000);
        } else {
          clearInterval(intervalRight);
          NPC_right.hide();
        }
      } else if (direction === 'right') {
        console.log('NPC_right não tem posições válidas. Interrompendo movimento.');
        clearInterval(intervalRight);
        clearInterval(intervalLeft)
        NPC_right.hide();
        noLoop()
      }
    }

    console.log(posicoesVisitadas);
    cont = 0;
  } else {
    cont++;
  }
}