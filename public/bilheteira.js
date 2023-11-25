class Bilheteira {
    constructor() {
        this.bilhImagem = loadImage('./recursos/booth.png');
        this.precoBilhete = 10; // Defina um preço inicial
        this.visitantes = 0; // Contador de visitantes
        this.dinheiroTotal = 0; // Dinheiro total arrecadado
    }

    getPrecoBilhete() {
        return this.precoBilhete;
    }

    setPrecoBilhete(novoPreco) {
        this.precoBilhete = novoPreco;
    }

    registrarVisita() {
        // Incrementa o contador de visitantes
        this.visitantes++;

        // Adiciona dinheiro ao total com base no preço do bilhete
        this.dinheiroTotal += this.precoBilhete;
    }

    getVisitantes() {
        return this.visitantes;
    }

    getDinheiroTotal() {
        return this.dinheiroTotal;
    }
}

function abrirJanelaConfiguracao() {
    // Exemplo: Abra uma janela/modal para configurar o preço do bilhete
    let novoPreco = prompt("Novo preço do bilhete:");
    if (novoPreco !== null) {
        bilheteiraPrincipal.setPrecoBilhete(parseFloat(novoPreco));
    }

    // Exiba informações sobre visitantes e dinheiro total
    alert(`Número de visitantes: ${bilheteiraPrincipal.getVisitantes()}\nDinheiro total arrecadado: ${bilheteiraPrincipal.getDinheiroTotal()}`);

    image(bilheteiraPrincipal.imagem, 0, 0, larguraImagem, alturaImagem);
}

