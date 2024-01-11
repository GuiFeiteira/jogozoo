class LeaderBoard {
    constructor() {
        this.botaoLargura = 120;
        this.botaoAltura = 40;
        this.barraLateralX = 20;
        this.LBAberta = false;
        this.dadosLeaderboard = [];

        this.tabelaleaderboard();
    }

    tabelaleaderboard() {
        let data = {
            "Nome": this.nome,
            "Dinheiro": this.dinheiro,
        }

        httpPost('/LeaderBoard', 'json', data, (response) => {
            this.dadosLeaderboard = response.slice(0, 6); // Limitando a 6 resultados
        });
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
            let quadradoX = windowWidth / 2 - 500;
            let quadradoY = windowHeight / 2 - 250;

            // Desenhe a tabela de leaderboard primeiro
            fill(255, 253, 150, 245);
            rect(quadradoX, quadradoY, 1000, 500);

            let leaderboardX = width * 0.5;
            let leaderboardY = height * 0.25;
            let leaderboardTextSize = 35;
            let tamanho_letra = 15;

            textSize(leaderboardTextSize);
            fill(0);
            text("Leaderboard", leaderboardX, leaderboardY);
            textSize(tamanho_letra);

            for (let i = 0; i < this.dadosLeaderboard.length; i++) {
                let posY = height * (0.35 + i * 0.05);
                let nome = this.dadosLeaderboard[i].nome;
                let dinheiro = this.dadosLeaderboard[i].dinheiro;

                text(nome, width * 0.25, posY);
                push();
                stroke("#FF2100");
                line(width * 0.27, posY - 0.008 * height, width * 0.70, posY - 0.008 * height);
                pop();
                text(dinheiro, width * 0.75, posY);
            }

            let botaoFecharX = quadradoX + 970;
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