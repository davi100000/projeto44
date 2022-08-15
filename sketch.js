var jakeimg, jake
var pistaimg, pista
var poderimg
var energyDrinkimg, energyDrink, energyDrinkGroup
var coinimg, coin, coinGroup
var bombimg, bomb, bombGroup
var score = 0
var gameState = 0
var frameCoins = 100
var frameBombs = 120
var frameEnergyDrink = 150

function preload() {
  jakeimg = loadAnimation("jake1.png", "jake2.png", "jake3.png", "jake4.png", "jake5.png")
  pistaimg = loadImage("path.png")
  poderimg = loadImage("power.png")
  energyDrinkimg = loadImage("energyDrink.png")
  coinimg = loadImage("coin.png")
  bombimg = loadImage("bomb.png")
}

function setup() {

  createCanvas(650, windowHeight);
  pista = createSprite(width / 2, 0)
  pista.addImage(pistaimg)
  pista.scale = 1.5
  jake = createSprite(325, height / 2 + 100)
  jake.addAnimation("jake", jakeimg)
  jake.setCollider("rectangle",0,0,170,80,90)
  coinGroup = new Group()
  energyDrinkGroup = new Group()
  bombGroup = new Group()

}

function draw() {
  background(0);
  if (gameState == 0) {
    pista.velocityY = 4
    if (pista.y > pista.height - 260) {
      pista.y = 0
    }
   
    gerarMoedas()
    gerarEnergeticos()
    gerarBombas()
    coletarMoedas()
    coletarEnergeticos()
    if (keyIsDown(RIGHT_ARROW)) {
      jake.position.x += 5
    }

    if (keyIsDown(LEFT_ARROW)) {
      jake.position.x -= 5
    }

    if (jake.x > 600) {
      jake.x = 600
    }

    if (jake.x < 50) {
      jake.x = 50
    }

    if (jake.isTouching(bombGroup)) {
      gameState = 1
    }
  }
  if (gameState == 1) {
    gameOver()
  }


  drawSprites();
  textSize(20)
  textAlign(CENTER, CENTER)
  strokeWeight(1)
  fill("white")
  stroke("yellow")
  text("Placar: " + score, 590, 20)
}
function gerarMoedas() {
  if (frameCount % frameCoins === 0) {
    coin = createSprite(random(100, 550), 0)
    coin.addImage(coinimg)
    coin.scale = 0.5
    coin.velocityY = pista.velocityY
    coin.depth = jake.depth - 1
    coinGroup.add(coin)
  }
}
function gerarEnergeticos() {
  if (frameCount % frameEnergyDrink === 0) {
    energyDrink = createSprite(random(100, 550), 0)
    energyDrink.addImage(energyDrinkimg)
    energyDrink.scale = 0.2
    energyDrink.velocityY = pista.velocityY
    energyDrink.depth = jake.depth - 1
    energyDrinkGroup.add(energyDrink)
    energyDrink.setCollider("rectangle",0,0,400,200,90)
  }
}
function gerarBombas() {
  if (frameCount % frameBombs === 0) {
    bomb = createSprite(random(100, 550), 0)
    bomb.addImage(bombimg)
    bomb.scale = 0.1
    bomb.velocityY = pista.velocityY
    bomb.depth = jake.depth - 1
    bombGroup.add(bomb)
    
  }
}

function coletarMoedas() {
  jake.overlap(coinGroup, function (collector, collected) {
    score += 1
    collected.remove()
    frameCoins += score
    frameEnergyDrink += score
    frameBombs -= score
  })
}
function coletarEnergeticos() {
  jake.overlap(energyDrinkGroup, function (collector, collected) {
    pista.velocityY = +2
    collected.remove()
  })
}
function gameOver() {
  pista.velocityY = 0
  energyDrinkGroup.destroyEach()
  coinGroup.destroyEach()
  bombGroup.destroyEach()
  jake.visible = false
  swal({
    title: `Fim de Jogo`,
    text: "Você perdeu o jogo!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
  },
  function (isConfirm) {
   if (isConfirm) {
    location.reload()
   }
  });
}


