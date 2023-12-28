    class Edificio{
        constructor(nome, preco, imagem){
            this.nome = nome;
            this.preco = preco;
            this.imagem = imagem;
            
        }
        desenharEdificio(){
            image(this.edificio.imagem, this.x, this.y, this.s, this.s);
        }

    }
    function adicionarEdificioComprado(mx, my, edificio) {
        console.log('Adicionando edifício:', edificio);
        // Lógica para adicionar o edifício no local clicado
        // Certifique-se de ajustar essa lógica conforme necessário
        let tileClicado = null;
    
        // Verifica se o clique está dentro de algum tile
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
    
        // Verifique se não há nada no tile
        if (!board[i][j].isOcupado()) {

            board[i][j].edificio = edificio;
            board[i][j].setOcupado();
    
            console.log(`Edifício adicionado em (${i}, ${j}).`);
            // Adicione aqui qualquer lógica adicional necessária
        } else {
            console.log(`Já existe algo no tile (${tileClicado.i}, ${tileClicado.j}).`);
        }
        } else {
        console.log('Nenhum tile clicado.');
        }
    }
    