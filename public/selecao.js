function desenharTelaSelecaoGenero() {
    background(220);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Selecione o Personagem", width / 2, 80);
    
  
  
    
    desenharBotao(width / 3, height / 2, 200, 220, bacano);
  
    
    desenharBotao((3 * width) / 4, height / 2, 200, 220, personagem);
  }
  
  function desenharBotao(x, y, largura, altura, imagem) {
    fill(150); 
    if (mouseX > x - largura / 2 && mouseX < x + largura / 2 && mouseY > y - altura / 2 && mouseY < y + altura / 2) {
      fill(204, 255, 204); 
    }
    rectMode(CENTER);
    rect(x, y, largura +100, altura +100);
    imageMode(CENTER);
    image(imagem, x, y, largura +20  , altura );
    fill(0);
  }
  
  
  function verificarSelecaoGenero(x, y, largura, altura, genero) {
  
    console.log(`Mouse: ${mouseX},${mouseY}`);
    console.log(`Botão - X: ${x}, Y: ${y}, Largura: ${largura}, Altura: ${altura}`);
    if (mouseX > x && mouseX < x + largura && mouseY > y && mouseY < y + altura) {
      console.log(`Botão ${genero} selecionado!`);
      generoSelecionado = genero;
      
    }
  }