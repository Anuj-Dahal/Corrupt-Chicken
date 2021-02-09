var caveman, cavemanRun, cavemanJump;
var chicken, chickenImage, chickenStill;
var caveBg, caveBgImage;
var startscreen, startImage;
var gameState = "title";
var title, titleImage;
var song;
var spike, spikeImage, spikeGroup;
var points;
var invisCaveGround;
var cutscene, cutsceneGif;
var caught, caughtImage;
var reset, resetImage;
var score=0;

function preload(){
  cavemanRun = loadAnimation("caveman-running.gif");
  cavemanJump = loadAnimation("jumping_caveman.png");
  chickenImage = loadAnimation("chicken.gif");
  chickenStill = loadAnimation("chickenStill.png")
  startImage = loadImage("crystal cave.gif");
  titleImage = loadImage("CORRUPT-CHICKEN.png");
  song = loadSound("music.mp3");
  cutsceneGif = loadImage("Cutscene.gif");
  caveBgImage = loadImage("cavebg.png");
  spikeImage = loadImage("stalactite.png");
  caughtImage = loadImage("YOU-GOT-CAUGHT.png");
  resetImage = loadImage("reset.png");
}

function setup() {
  createCanvas(600,400);
  spikePoint = createSprite(9999,9999);
  spikeGroup = new Group();
  //startscreen stuff
  song.loop();
  startScreen = createSprite(280,200);
  startScreen.addImage(startImage);
  startScreen.scale = 1.2;
  title = createSprite(300,130);
  title.addImage(titleImage);
  title.scale = 0.65;
  spike = createSprite(0,0);
  spike.visible = false;
}

function draw() {
  background(0);
  if (gameState == "title"){
    if (mouseWentDown("leftButton")){
      startScreen.destroy();
      title.destroy();
      gameState = "cutscene"
      scene();
    }
  }
  if (gameState == "playSetup"){
  score = 0;
  caveBg = createSprite(512,200);
  caveBg.addImage(caveBgImage);
  caveBg.scale = 1.52;
  caveman = createSprite(220,307);
  caveman.addAnimation("running", cavemanRun);
  caveman.addAnimation("jumping", cavemanJump);
  caveman.scale = 1.7;
  chicken = createSprite(80,266);
  chicken.addAnimation("run",chickenImage);
  chicken.addAnimation("still",chickenStill);
  chicken.scale = 3;
  invisCaveGround = createSprite(300,340,600,10);
  invisCaveGround.visible = false;
  
    gameState = "play";
  }
  if (gameState == "play"){
    caveBg.velocityX = -4;
    if (caveBg.x < 0){
      caveBg.x = 775;
    }
    caveman.setCollider("rectangle",0,0,20,30);
    spikeGroup.setColliderEach("rectangle",0,0,20,80);
    spawnStalactites();
    if (keyDown("space")&&caveman.y == 309.5){
      caveman.velocityY = -17;
      caveman.changeAnimation("jumping",cavemanJump);
    }
    else if (caveman.y == 309.5||caveman.y == 310.3){
      caveman.changeAnimation("running",cavemanRun);
    }
    caveman.velocityY = caveman.velocityY + 0.8;
    caveman.collide(invisCaveGround);
    if (caveman.isTouching(spikeGroup)){
      gameState = "end";
    }
    if (caveman.isTouching(spikePoint)){
      spikePoint.destroy();
      score = score + 1;
    }

  }
  if (gameState == "end"){
    caveman.velocityY = 0;
    caveman.changeAnimation("jumping",cavemanJump);
    chicken.changeAnimation("still",chickenStill);
    caveBg.velocityX = 0;
    spikeGroup.setVelocityXEach(0);
    spikeGroup.setLifetimeEach(-1);
    caught = createSprite(300,120);
    caught.addImage(caughtImage);
    caught.scale = 0.7;
    reset = createSprite(300,220);
    reset.addImage(resetImage);
    reset.scale = 0.3
    if (mousePressedOver(reset)){
      gameState = "playSetup";
      reset.destroy();
      caught.destroy();
      spikeGroup.destroyEach();
    }
  }
  drawSprites();
  scoreText();

}
function scene(){
  cutscene = createSprite(300,200);
  cutscene.addImage(cutsceneGif);
  setTimeout(endScene,21200);
}
function endScene(){
  cutscene.destroy();
  gameState = "playSetup";
}
function spawnStalactites(){
  if (frameCount % 100 == 0){
    spikePoint = createSprite(610,210,20,100);
    spikePoint.velocityX = -4;
    spikePoint.visible = false;
    spike = createSprite(610,50);
    spike.visible = true;
    spike.addImage(spikeImage);
    spike.velocityX = -4;
    spike.velocityY = 8;
    spike.scale = 1.3;
    spike.lifetime = 800;
    spike.depth = caveman.depth;
    caveman.depth = caveman.depth + 1;
    spikeGroup.add(spike);
  }
  spike.collide(invisCaveGround);
}
function scoreText(){
  if (gameState == "play"){
    textSize(18)
    stroke("black");
    strokeWeight(4);
    fill("white");
    text("Score: "+score,512,30);
  }
}




