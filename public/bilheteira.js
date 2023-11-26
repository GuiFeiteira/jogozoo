class Bilheteira {
    constructor() {
        this.bilhImagem = loadImage('./recursos/booth.png');
        this.precoBilhete = 10; 
        this.visitantes = 0; 
        this.dinheiroTotal = 0; 
    }

    getPrecoBilhete() {
        return this.precoBilhete;
    }

    setPrecoBilhete(novoPreco) {
        this.precoBilhete = novoPreco;
    }

    registrarVisita() {
        this.visitantes++;

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
    let novoPreco = prompt("Novo preço do bilhete:");
    if (novoPreco !== null) {
        bilheteiraPrincipal.setPrecoBilhete(parseFloat(novoPreco));
    }

    alert(`Número de visitantes: ${bilheteiraPrincipal.getVisitantes()}\nDinheiro total arrecadado: ${bilheteiraPrincipal.getDinheiroTotal()}`);

    image(bilheteiraPrincipal.imagem, 0, 0, larguraImagem, alturaImagem);
}

