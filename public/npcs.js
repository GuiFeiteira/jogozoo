class NPC {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.velocidade = 2;
      this.caminhoAtual = null;
      this.indiceAzulejoAtual = 0;
    }
  
    seguirCaminho(caminho) {
      this.caminhoAtual = caminho;
      this.indiceAzulejoAtual = 0;
    }
    desenharNPC() {
        fill(255, 0, 0); // Cor do NPC (por exemplo, vermelho)
        ellipse(this.x, this.y, 20, 20); // Desenhe um círculo como representação do NPC
      }
  
    mover() {
        if (this.caminhoAtual) {
          const azulejoAtual = this.caminhoAtual.azulejos[this.indiceAzulejoAtual];
    
          // Verificar azulejos vizinhos
          const azulejosVizinhos = this.obterAzulejosVizinhos(azulejoAtual);
    
          // Encontrar o azulejo mais próximo
          let azulejoDestino = null;
          let distanciaMinima = Infinity;
    
          for (const vizinho of azulejosVizinhos) {
            const distancia = dist(this.x, this.y, vizinho.x + vizinho.s / 2, vizinho.y + vizinho.s / 2);
            if (distancia < distanciaMinima) {
              distanciaMinima = distancia;
              azulejoDestino = vizinho;
            }
          }
    
          // Mover o NPC em direção ao azulejo destino
          if (azulejoDestino) {
            const destinoX = azulejoDestino.x + azulejoDestino.s / 2;
            const destinoY = azulejoDestino.y + azulejoDestino.s / 2;
    
            if (dist(this.x, this.y, destinoX, destinoY) > 1) {
              const angulo = atan2(destinoY - this.y, destinoX - this.x);
              this.x += this.velocidade * cos(angulo);
              this.y += this.velocidade * sin(angulo);
            } else {
              // Avançar para o próximo azulejo
              this.indiceAzulejoAtual++;
    
              // Verificar se chegamos ao final do caminho
              if (this.indiceAzulejoAtual >= this.caminhoAtual.azulejos.length) {
                this.caminhoAtual = null;
              }
            }
          }
        }
      }
    
      obterAzulejosVizinhos(azulejo) {
        const vizinhos = [];
    
        // Verificar azulejos vizinhos acima, abaixo, à esquerda e à direita
        const direcoes = [
          { dx: 0, dy: -1 }, // acima
          { dx: 0, dy: 1 },  // abaixo
          { dx: -1, dy: 0 }, // à esquerda
          { dx: 1, dy: 0 },  // à direita
        ];
    
        for (const direcao of direcoes) {
          const iVizinho = azulejo.tx + direcao.dx;
          const jVizinho = azulejo.ty + direcao.dy;
    
          // Verificar se o vizinho está dentro dos limites do tabuleiro
          if (iVizinho >= 0 && iVizinho < gridSize && jVizinho >= 0 && jVizinho < gridSize) {
            const azulejoVizinho = board[iVizinho][jVizinho];
    
            // Verificar se o vizinho é um azulejo
            if (azulejoVizinho.azulejo) {
              vizinhos.push(azulejoVizinho);
            }
          }
        }
    
        return vizinhos;
      }
  }
  