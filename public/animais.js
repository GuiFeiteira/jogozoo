

class Animal {
  constructor(nome, preco, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
    

    // Atributos de fome, limpeza e saúde
    this.fome = 10;
    this.limpeza = 10;
    this.saude = 10;

    // Defina a taxa de degradação ao longo do tempo
    this.taxaFome = 0.05;
    this.taxaLimpeza = 0.09;
    this.taxaSaude = 0.030;

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
function simularDoenca(animal) {

  animal.saude = 0;

  text(`Algum visitante atirou comida ao seu animal, ${animal.nome}, ele ficou doente e tera de ir ao veterinario!`);
  let quadradoX;
  let quadradoY;
  let quadradoLargura = 600;
  let quadradoAltura = 350;

  quadradoX = width / 2 - quadradoLargura / 2;
  quadradoY = height / 2 - quadradoAltura / 2;

  fill(255, 253, 150, 245);
  rect(quadradoX, quadradoY, quadradoLargura, quadradoAltura);
  textAlign(LEFT, TOP);
  fill(0);
  
  let btnFechar = createButton("  X  ");
  btnFechar.position(quadradoX + quadradoLargura - 30, quadradoY + 10);
  btnFechar.mousePressed(() => {
    btnFechar.remove();
    loop();
  });

}
