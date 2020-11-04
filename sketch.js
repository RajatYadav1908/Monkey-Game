var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var bananaGroup;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle1.png");
}



function setup() {
  createCanvas(600, 600);

  monkey = createSprite(150, 380, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 400, 2000, 10);
  ground.velocityX = -4;
  ground.X = ground.X / 2;

  bananaGroup = createGroup();
  banana = new Group();
  obstacleGroup = createGroup();
  obstacle = new Group();
}


function draw() {
  background(255);

 if(gameState === PLAY){

         if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  } 
   if (keyDown("space")) {
    monkey.velocityY = -15;
  }

  monkey.velocityY = monkey.velocityY + 0.8;


  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
  
    }
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time:" + survivalTime, 100, 50);
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  
  monkey.collide(ground);
  spawnobstacle();
  spawnbanana();
  drawSprites();
}


function spawnbanana() {

  if (frameCount % 150 === 0) {
    var banana = createSprite(600, 120, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(10 + survivalTime / 5);

    //assign lifetime to the variable
    banana.lifetime = 200;

    //adjust the depth


    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function spawnobstacle() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600, 360, 40, 10);
    obstacle.addImage("Moving", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(10 + survivalTime / 5);

    //assign lifetime to the variable
    obstacle.lifetime = 200;

    //adjust the depth


    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}