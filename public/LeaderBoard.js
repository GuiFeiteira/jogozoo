class LeaderBoard {
    constructor() {
        this.botaoLargura = 120;
        this.botaoAltura = 40;
        this.barraLateralX = 20;
        this.LBAberta = false;
        this.nome1;
        this.dinheiro1;
        this.nome2;
        this.dinheiro2;
        this.nome3;
        this.dinheiro3;
        this.nome4;
        this.dinheiro4;
        this.nome5;
        this.dinheiro5;
        this.nome6;
        this.dinheiro6;
        this.nome;
        this.dinheiro;
        this.tabelaleaderboard();
    }

    tabelaleaderboard(){

        let data ={
            "Nome" : this.nome,
            "Dinheiro" : this.dinheiro,
        
        }
        
        httpPost( '/LeaderBoard', 'json', data, (response)=>{
          
            this.nome1 = response[0].nome
            this.dinheiro1 = response[0].dinheiro
        
            this.nome2 = response[1].nome
            this.dinheiro2 = response[1].dinheiro
        
            this.nome3 = response[2].nome
            this.dinheiro3 = response[2].dinheiro
        
            this.nome4 = response[3].nome
            this.dinheiro4 = response[3].dinheiro
        
            this.nome5 = response[4].nome
            this.dinheiro5 = response[4].dinheiro
        
            this.nome6 = response[5].nome
            this.dinheiro6 = response[5].dinheiro
        })
    }

        clicar(mousex, mousey) {
            let xBotao = this.barraLateralX;
            let yBotao = 4 * (this.botaoAltura + 10) + 150;
        
            if (
                mousex > xBotao &&
                mousex < xBotao + this.botaoLargura &&
                mousey > yBotao &&
                mousey < yBotao + this.botaoAltura
            ) {
                this.LBAberta = true;
            }
        
            if (this.LBAberta) {
                let quadradoX;
                let quadradoY;
                let quadradoLargura = 1000;
                let quadradoAltura = 500;
                quadradoX = windowWidth / 2 - quadradoLargura / 2;
                quadradoY = windowHeight / 2 - quadradoAltura / 2;
        
                // Desenhe a tabela de leaderboard primeiro
                fill(255, 253, 150, 245);
                rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
        
                this.tabelaleaderboard();
        
                let leaderboardX = width * 0.5;
                let leaderboardY = height * 0.25;
                let leaderboardTextSize = 35;
                let tamanho_letra = 15
        
                textSize(leaderboardTextSize);
        
                fill(0);
                text("Leaderboard", leaderboardX, leaderboardY);
                textSize(tamanho_letra);

                fill(0,0,0)
                text("Eu", width*0.25, height*0.35)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.342, width*0.70, height*0.342)
                pop()
                text(dinheiro, width* 0.75, height*0.35)
                
                text(this.nome1, width*0.25, height*0.4)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.392, width*0.70, height*0.392)
                pop()
                text(this.dinheiro1, width* 0.75, height*0.4)
            
                text(this.nome2, width*0.25, height*0.45)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.442, width*0.70, height*0.442)
                pop()
                text(this.dinheiro2, width* 0.75, height*0.45)
            
                text(this.nome3, width*0.25, height*0.5)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.492, width*0.70, height*0.492)
                pop()
                text(this.dinheiro3, width* 0.75, height*0.5)
            
                text(this.nome4, width*0.25, height*0.55)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.542, width*0.70, height*0.542)
                pop()
                text(this.dinheiro4, width* 0.75, height*0.55)
            
                text(this.nome5, width*0.25, height*0.6)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.592, width*0.70, height*0.592)
                pop()
                text(this.dinheiro5, width* 0.75, height*0.6)
            
                text(this.nome6, width*0.25, height*0.65)
                push()
                stroke("#FF2100")
                line(width*0.27, height*0.642, width*0.70, height*0.642)
                pop()
                text(this.dinheiro6, width* 0.75, height*0.65)
                push()

                let botaoFecharX = quadradoX + quadradoLargura - 30;
                let botaoFecharY = quadradoY + 10;

                fill(0);
                text("X", botaoFecharX + 10, botaoFecharY + 10);

                if (
                    mousex > botaoFecharX &&
                    mousex < botaoFecharX + 20 &&
                    mousey > botaoFecharY &&
                    mousey < botaoFecharY + 20
                ) {
                    this.LBAberta = false;
                    console.log("Clicou em Fechar");
                    loop();
                }
            }
        }
    

    mostrar() {
        textAlign(CENTER, CENTER);
        textSize(16);
    
        let x = this.barraLateralX;
        let y = 4 * (this.botaoAltura + 10) + 150;
    
        fill(150);
        rect(x, y, this.botaoLargura, this.botaoAltura, 50);
        fill(0);
        text("LeaderBoard", x + this.botaoLargura / 2, y + this.botaoAltura / 2);
    }
}









/*let nome1;
let dinheiro1;
let nome2;
let dinheiro2;
let nome3;
let dinheiro3;
let nome4;
let dinheiro4;
let nome5;
let dinheiro5;
let nome6;
let dinheiro6;
let nome;
let dinheiro;               

function tabelaleaderboard(){

    let data ={
        "Nome" : nome,
        "Dinheiro" : dinheiro,
    
    }
    
    httpPost( '/LeaderBoard', 'json', data, (response)=>{
      
        nome1 = response[0].nome
        dinheiro1 = response[0].dinheiro
    
        nome2 = response[1].nome
        dinheiro2 = response[1].dinheiro
    
        nome3 = response[2].nome
        dinheiro3 = response[2].dinheiro
    
        nome4 = response[3].nome
        dinheiro4 = response[3].dinheiro
    
        nome5 = response[4].nome
        dinheiro5 = response[4].dinheiro
    
        nome6 = response[5].nome
        dinheiro6 = response[5].dinheiro
    })
}



















/*let dinheiro;
let nome;
let leaderboard;
let nome1;
let dinheiro1;
let nome2;
let dinheiro2;
let nome3;
let dinheiro3;
let nome4;
let dinheiro4;
let nome5;
let dinheiro5;
let nome6;
let dinheiro6;

function LeaderBoard(){

    textAlign(CENTER, CENTER);
    textSize(16);
  
    let x = 20;
    let y = 4 * (40 + 10) + 150;
    fill(150);
    rect(x, y, 120, 40, 50);
    fill(0);
    text("LeaderBoard", x + 120 / 2, y + 40 / 2);
  
    let data ={
      "Nome" : nome,
      "Dinheiro" : dinheiro,
  
  }
  
  httpPost( '/LeaderBoard', 'json', data, (response)=>{
    
      nome1 = response[0].nome
      dinheiro1 = response[0].dinheiro
  
      nome2 = response[1].nome
      dinheiro2 = response[1].dinheiro
  
      nome3 = response[2].nome
      dinheiro3 = response[2].dinheiro
  
      nome4 = response[3].nome
      dinheiro4 = response[3].dinheiro
  
      nome5 = response[4].nome
      dinheiro5 = response[4].dinheiro
  
      nome6 = response[5].nome
      dinheiro6 = response[5].dinheiro
  })
  }
  
  function mousePressed() {
    let x = 20;
    let y = 4 * (40 + 10) + 150;
    
    if (mouseX > x && mouseX < x + 120 && mouseY > y && mouseY < y + 40) {
      let quadradoX;
      let quadradoY;
      let quadradoLargura = 1000;
      let quadradoAltura = 500;
      quadradoX = width / 2 - quadradoLargura / 2;
      quadradoY = height / 2 - quadradoAltura / 2;
      fill(255, 253, 150, 245); 
      rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
      
      telaLeaderBoard();
    }
  }
  
  function telaLeaderBoard(){
    let leaderboardX = width * 0.5;
    let leaderboardY = height * 0.25;
    let leaderboardTextSize = 35;
    let tamanho_letra = 15
    
    textSize(leaderboardTextSize);
    fill(0);
    text("Leaderboard", leaderboardX, leaderboardY);
    textSize(tamanho_letra);
    pop()
    fill(0,0,0)
    text("Eu", width*0.25, height*0.35)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.342, width*0.70, height*0.342)
    pop()
    text(dinheiro, width* 0.75, height*0.35)
  
    text(nome1, width*0.25, height*0.4)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.392, width*0.70, height*0.392)
    pop()
    text(dinheiro1, width* 0.75, height*0.4)
  
    text(nome2, width*0.25, height*0.45)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.442, width*0.70, height*0.442)
    pop()
    text(dinheiro2, width* 0.75, height*0.45)
  
    text(nome3, width*0.25, height*0.5)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.492, width*0.70, height*0.492)
    pop()
    text(dinheiro3, width* 0.75, height*0.5)
  
    text(nome4, width*0.25, height*0.55)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.542, width*0.70, height*0.542)
    pop()
    text(dinheiro4, width* 0.75, height*0.55)
  
    text(nome5, width*0.25, height*0.6)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.592, width*0.70, height*0.592)
    pop()
    text(dinheiro5, width* 0.75, height*0.6)
  
    text(nome6, width*0.25, height*0.65)
    push()
    stroke("#FF2100")
    line(width*0.27, height*0.642, width*0.70, height*0.642)
    pop()
    text(dinheiro6, width* 0.75, height*0.65)
    push()
  }*/