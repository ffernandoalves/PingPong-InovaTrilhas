// Tamanho da Tela
let WIDTH = 600;
let HEIGHT = 400;

// variáveis da bolinha
let xBolinha = WIDTH/2;
let yBolinha = HEIGHT/2;
let diametro = 16;
let raio = diametro/2;

// velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

let distanciaParede = 5;

// variáveis da Raquete Player
let xRaquete = distanciaParede;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

// variáveis da Raquete do Oponente
let xRaqueteOponente = WIDTH - (raqueteComprimento + distanciaParede);
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;
let xPlacar = 150;
let yPlacar = 10;
let yTextoPlacar = yPlacar + 16
let comprimentoPlacar = 40;
let alturaPlacar = 20;
// placar jogador
let xPlacarPlayer = xPlacar;
let yPlacarPlayer = yPlacar;
let xTextoPlayer = xPlacarPlayer + comprimentoPlacar/2;
// placar oponente
let xPlacarOponente = WIDTH - (xPlacar + comprimentoPlacar);
let yPlacarOponente = yPlacar;
let xTextoOponente = xPlacarOponente + comprimentoPlacar/2;

let multiplayer = false;
let chanceDeErrar = 0;

function preload() {
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  trilha.loop();
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);  
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = xRaquete + raqueteComprimento + 5;
    }
    if (xBolinha + raio > WIDTH){
      xBolinha = xRaqueteOponente - (raqueteComprimento + 5);
    }
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha+raio > width || xBolinha-raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha+raio > height || yBolinha-raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    if (yRaquete > 0) {
      yRaquete -= 10;
    }
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    if (yRaquete < HEIGHT-raqueteAltura) {
      yRaquete += 10;
    }
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}

function movimentaRaqueteOponente() {
  if (multiplayer == false) {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento/2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
    calculaChanceDeErrar();
  } else {
    if (keyIsDown(87)) {
      if (yRaqueteOponente > 0) {
        yRaqueteOponente -= 10;
      }
    }

    if (keyIsDown(83)) {
      if (yRaqueteOponente < HEIGHT-raqueteAltura) {
        yRaqueteOponente += 10;
      }
    }
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(xPlacarPlayer, yPlacarPlayer, comprimentoPlacar, alturaPlacar);
  fill(255);
  text(meusPontos, xTextoPlayer, yTextoPlacar);
  fill(color(255, 140, 0));
  rect(xPlacarOponente, yPlacarOponente, comprimentoPlacar, alturaPlacar);
  fill(255);
  text(pontosDoOponente, xTextoOponente, yTextoPlacar);
}

function marcaPonto() {
  if (xBolinha > WIDTH-2*distanciaParede) {
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 2*distanciaParede) {
    pontosDoOponente += 1;
    ponto.play();
  }
}