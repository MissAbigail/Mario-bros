var mario;
var ground;
var nube;
var obstacle1;
var count=0;
var gameState="START";
var cuboImg, cubosGroup;
var monedaImg, monedasGroup;
var obstaclesGroup;

function preload(){
  mario = loadImage("marios.png");
  nube = loadImage("cloud.png");
  obstacle1 = loadImage("bowser.png");
  obstacle2 = loadImage("hongo.png");
  cuboImg = loadImage("cubo.png");
  monedaImg = loadImage("coin.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("died.mp3");

}

function setup(){
  createCanvas(600,700);
  
  //crea el Mario
  marios = createSprite(300,450,20,20);
  marios.addImage(mario); 
  marios.scale=0.08;
  //  marios.debug =true;
  cubosGroup = new Group(); 
  monedasGroup = new Group();
  obstaclesGroup = new Group();
}


function draw(){
  background(12,147,252);
   //Puntuación 
  textSize(20);
  fill("white");
  text("Puntos: " + count, 12, 35);
   //Inicio del juego
  if(gameState==="START" && keyDown("space")){
      //Cambio de estado 
      gameState="PLAY";
  
     }
    if(gameState==="PLAY"){
      
       marios.velocityY = marios.velocityY + 0.8;
    
  
    if(keyDown("right_arrow")){
       marios.x = marios.x+3;
      
      }
  
      if(keyDown("left_arrow")){
        marios.x = marios.x-3;
        
      }
    
  
    if(keyDown("space")){
      marios.velocityY = -4;
      jumpSound.play();  
      jumpSound.setVolume(0.10);
    }
     if(marios.isTouching(cubosGroup)){
      marios.velocityY = 0;
    }
    if(marios.isTouching(monedasGroup, removeMonedas)){
      count = count + 10;
    }
     if(marios.isTouching(obstaclesGroup)){
       dieSound.play();
       gameState="GAMEOVER";
       }
    createCubos();       
    createClouds();
    crearObstaculos();     
    }   
  
  
    if(gameState==="GAMEOVER"){
      
        marios.velocityY=0;
        marios.velocityX=0; 
        fill("#471E51")
        textSize(30);
        text("GAME OVER", 200, 400);
        textSize(15);
        text("Presiona tecla Y para reiniciar ",200, 450);
    
      if(keyDown("y")){
        count=0;
        marios.x=300;
        marios.y=450;
        dieSound.stop();
        gameState="START";
      }
     }
  
    
  
  drawSprites();
}

function createClouds(){

   if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(nube);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
   } 
}
  
function crearObstaculos(){
 if(frameCount % 120 === 0) {
   var obstacle = createSprite(random(50,450),0, 70, 20);
    //obstacle.debug = true;
    obstacle.velocityY = 4;
    
    var rand = Math.round(random(1,2));
     
    switch(rand) {
    case 1: obstacle.addImage(obstacle1);
            break; 
    case 2: obstacle.addImage(obstacle2);
            break; 
              
            default: break;
    }
      obstacle.scale = 0.10;
      obstaclesGroup.add(obstacle);
  }
}

function createCubos(){
   if(frameCount % 100 === 0){
     var cubo = createSprite(random(50,450),0, 70, 20);
     //var cubo = createSprite(500,330,1,1)
     cubo.velocityY = 2;
     cubo.addImage(cuboImg);
     cubo.scale = 0.08;
     cubosGroup.add(cubo);
     var coin = createSprite(cubo.x,cubo.y-60, 20, 20);
     coin.velocityY = 2;
     coin.addImage(monedaImg);
     coin.scale= 0.12;
     monedasGroup.add(coin);
    
   }
}
//Función para eliminar CosasBuenas
function removeMonedas(sprite,monedasGroup ){
   monedasGroup.remove();
}
