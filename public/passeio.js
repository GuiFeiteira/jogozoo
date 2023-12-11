function hexagon(x, y, radius) {
  let angle = PI / 3;
  beginShape();
  for (let i = 0; i < 6; i++) {
    let hx = x + cos(angle * i) * radius;
    let hy = y + sin(angle * i) * radius;
    vertex(hx, hy);
  }
  endShape(CLOSE);
}

class Caminho {
  constructor(nome, preco, forma) {
    this.nome = nome;
    this.preco = preco;
    
  }
}
