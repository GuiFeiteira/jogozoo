class Animal {
  constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
    this.comprado = false;

    // Atributos de fome, limpeza e saúde
    this.fome = 10;
    this.limpeza = 10;
    this.saude = 10;

    // Defina a taxa de degradação ao longo do tempo
    this.taxaFome = 0.01;
    this.taxaLimpeza = 0.02;
    this.taxaSaude = 0.015;

    // Inicie um intervalo para atualizar os atributos ao longo do tempo
    setInterval(() => {
      this.atualizarAtributos();
    }, 1000); // Atualiza a cada segundo (ajuste conforme necessário)
  }

  // Método para alimentar o animal
  alimentar() {
    this.fome += 10;
    this.limpeza -= 5;
    this.atualizarSaude();
    loop() 
  }

  // Método para limpar o animal
  limpar() {
    this.limpeza += 15;
    this.atualizarSaude();
    loop() 

  }

  // Método para monitorar a saúde do animal
  atualizarSaude() {
    this.saude = (this.fome + this.limpeza) / 2;
  }

  // Método para atualizar os atributos ao longo do tempo
  atualizarAtributos() {
    this.fome -= this.taxaFome;
    this.limpeza -= this.taxaLimpeza;

    
    this.fome = constrain(this.fome, 0, 10);
    this.limpeza = constrain(this.limpeza, 0, 10);

    this.atualizarSaude();
  }
}
