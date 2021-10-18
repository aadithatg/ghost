var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  //spookySound.play()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(150,150);
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3

 doorsGroup = new Group()
 climbersGroup = new Group()
 invisibleBlockGroup = new Group()
}


function draw() {
  background(200);
  if(gameState === "play"){
  
  if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x-=4
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.x+=4
    }
    if(keyDown("SPACE")){
      ghost.velocityY=-4
    }
    ghost.velocityY = ghost.velocityY + 0.5
    
    if(ghost.isTouching(climbersGroup)) {
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }
    doors()
    drawSprites()
  }
  if(gameState === "end"){
    fill("blue")
    textSize(30)
    text("GAME OVER",250,250)
  }
}

function doors(){
  if(frameCount % 200===0){
  door = createSprite(250,50)
  climber = createSprite(250,120)
  invisibleBlock = createSprite(250,130)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 2

  door.x = Math.round(random(120,400))
  invisibleBlock.velocityY = 1
  invisibleBlock.debug = false
  climber.x = door.x
  invisibleBlock.x = door.x
  door.velocityY = 1
  climber.velocityY = 1
  door.addImage(doorImg)
  climber.addImage(climberImg)
  door.lifetime = 600
  climber.lifetime = 600
  invisibleBlock.lifetime = 600
  doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
  ghost.depth = door.depth
  ghost.depth+=1
  }
}