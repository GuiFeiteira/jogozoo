class Edificio {
    constructor(nome, preco, imagem) {
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem;
    }

    desenharEdificio(x, y, s) {
        image(this.imagem, x, y, s , s );
    }
}

function adicionarEdificioComprado(mx, my, edificio) {
    console.log('Adicionando edifício:', edificio);
    
    let tileClicado = null;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].click_Tile(mx, my)) {
                tileClicado = { i, j };
                console.log('Clicou no tile:', i, j);
                break;
            }
        }
        if (tileClicado) {
            break;
        }
    }

    if (tileClicado) {
        const { i, j } = tileClicado;

        if (!board[i][j].isOcupado()) {
            board[i][j].edificio = edificio;
            board[i][j].setOcupado();

            adicionarConstrucaoNoServidor(i, j, edificio.nome);
            console.log(`Edifício adicionado em (${i}, ${j}).`);
        } else {
            console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
        }
    } else {
        console.log('Nenhum tile clicado.');
    }
}