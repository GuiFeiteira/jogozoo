class Popup {
    constructor(x, y, sx, sy) {
      this.x = x;
      this.y = y;
      this.sx = sx;
      this.sy = sy;
      this.visible = false;
    }
  
    draw() {
      if (this.visible) {
        
      
      }
    }
  
    show() {
      this.visible = true;
    }
  
    hide() {
      this.visible = false;
    }
  }




  function exibirPopUp() {
    // Exibe uma caixa de diálogo simples usando window.prompt
    let mensagem = "Você clicou em uma tile especial!\nDigite algo:";
    let resposta = window.prompt(mensagem);
  
    // Você pode fazer algo com a resposta, se desejar
    if (resposta !== null) {
      console.log("Resposta:", resposta);
    }

  }
  