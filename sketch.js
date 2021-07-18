const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var man, manImg, manImg2;
var bgImg;
var bg;
var corona, coronaImg,covidImg;
var mask, maskImg, maskG;
var hospital, hospitalImg, hospitalG;
var sanitizer, sanitizerImg, sanitizerG;
var infected,infImg1,imfImg2,infImg3,infectedG;
var vaccine, vaccineImg;
var roomImg;
var gameState = "start";
var form, system, code, security;
var score = 0;
var vaccination, vImg;
var i = 0;
var invisibleG;
var rand1, time;

var engine, world;

var ground1,ground2,ground3;

var b1,b2,b3,b4,b5,b6,b7,b8,b9,b10;
var b11,b12,b13,b14,b15,b16;
var b17,b18,b19,b20 ;
var b21,b22,b23,b24 ;
var ball;
var slingshot1;

var immunityBoard,immunitySprites=[],immunityCount=8,immunitySprite;
var y=138;
var score2 =0;

function preload() {

  manImg = loadAnimation("images/man1.png", "images/man2.png",
    "images/man3.png", "images/man4.png",
    "images/man5.png", "images/man6.png",
    "images/man7.png", "images/man8.png");
  manImg2 = loadImage("images/backFace.png");
  bgImg = loadImage("images/bg.jpg");
  coronaImg = loadImage("images/corona.png");
  maskImg = loadImage("images/mask.png");
  hospitalImg = loadImage("images/hospital.png");
  sanitizerImg = loadImage("images/sanitizer.png");
  roomImg = loadImage("images/room.jpg");
  vaccineImg = loadImage("images/vaccine.png");
  vImg = loadImage("images/vaccination.png");
  infImg1=loadImage("images/sick1.png");
  infImg2=loadImage("images/sick2.png");
  infImg3=loadImage("images/sick3.png");
  covidImg=loadImage("images/covid.png");
}

function setup() {

  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  bg = createSprite(900, 250);
  bg.addImage(bgImg);
  bg.scale = 2.2;
  bg.velocityX =-5;

  invisibleG = createSprite(400, 550, 200, 50);
  invisibleG.visible = false;

  man = createSprite(400, 385, 40, 30);
  man.addAnimation("running", manImg);

  corona = createSprite(150, 390, 50, 50);
  corona.addImage(coronaImg);
  corona.scale = 0.5;

  maskG = new Group();
  hospitalG = new Group();
  sanitizerG = new Group();
  infectedG= new Group();

  vaccination = createSprite(600, 280, 50, 50);
  vaccination.addImage(vImg);
  vaccination.visible = false;
  vaccination.scale = 0.4;

  security = new Security();
  system = new System();

  immunityBoard=createSprite(50,80,30,135);
  immunityBoard.shapeColor="white";

  for(var j=0;j<immunityCount;j++,y-=16){

    immunitySprites.push(createSprite(50,y,25,12));
    immunitySprites[j].shapeColor="green";
   
  }

}

function draw() {

  //console.log(gameState);
  // console.log(score);
  
  if(gameState==="start"){

    man.visible = false;
    bg.visible = false;
    corona.visible = false;
    security.button1.hide();
    security.button2.hide();
    security.button3.hide();
    security.access1.hide();
    security.access2.hide();
    security.access3.hide();
    immunityBoard.visible=false;
    
    background(0);
    textSize(50);
    fill(255);
    text("How to play the Game",350,60);
    text("__________________",345,80);
    textSize(30);
    text("1. Press the SPACE key to make the boy Jump",100,150);
    text("2. Collect MASK & SANITIZER to Increase your Immunity",100,200);
    text("3. Try to Avoid the INFECTED PEOPLE , otherwise your immunity will decrease",100,250);
    text("4. Once your immunity meter exhausts you will lose the game",100,300);
    //text("5. Press 'E' to enter the hospital and get Vaccinated",100,350);
    text("5. Once you're vaccinated your immunity will be fully increased",100,350);
    text("6. Follow all the instructions to be safe from corona and win the game",100,400);
    text("7. Hope you'll like this game !!",100,450);
    textSize(40);
    text("Press 'P' to continue to the Game....",290,520);
    textSize(26);
    text("Developed by:Priyansh K Shah",750,585);

    if(keyDown("p")){
      gameState="running";
    }

  }else if (gameState === "running") {
    background(255);

    man.visible = true;
    bg.visible = true;
    corona.visible = true;
    immunityBoard.visible=true;

    if (bg.x < 350) {
      bg.x = 900;
    }

    if(frameCount%45===0){
      bg.velocityX+=-.20;
    }

    man.collide(invisibleG);

    spawnHospital();
    spawnItems();
    
    security.button1.hide();
    security.button2.hide();
    security.button3.hide();
    security.access1.hide();
    security.access2.hide();
    security.access3.hide();

    if (man.y > 150) {

      if (keyDown("space")) {
        man.velocityY = -8;
      }

    }

    man.velocityY = man.velocityY + 0.5;
    
    if(immunityCount===0){
      gameState="end";
    }

    if(frameCount%150===0 && immunityCount>0 && gameState==="running"){
      //console.log(immunityCount);
      immunitySprites[immunitySprites.length-1].destroy();
      immunitySprites.pop();
      immunityCount--;
      y+=16;
    }

    if (man.isTouching(hospitalG) && keyDown("e")) {
      gameState = "inHospital";
      bg.visible = false;
      corona.visible = false;
      man.visible = false;
      hospitalG.destroyEach();
      hospital=undefined;
      maskG.destroyEach();
      sanitizerG.destroyEach();
      infectedG.destroyEach();
      rand1 = Math.round(random(1,2));
      if(rand1 === 2)
        createElements();
      inHospital();
    }
    else if(man.isTouching(maskG)){
      immunityCount++;
      maskG.destroyEach();
      immunitySprite=createSprite(50,y,25,12);
      immunitySprite.shapeColor="green";
      immunitySprites.push(immunitySprite);
      y-=16;
    }
    else if(man.isTouching(sanitizerG)){
      immunityCount++;
      sanitizerG.destroyEach();
      immunitySprite=createSprite(50,y,25,12);
      immunitySprite.shapeColor="green";
      immunitySprites.push(immunitySprite);
      y-=16;
    }
    else if(man.isTouching(infectedG)){
      infectedG.destroyEach();
      immunityCount--;
      immunitySprites[immunitySprites.length-1].destroy();
      immunitySprites.pop();
      y+=16;
    }
  } else if (gameState === "inHospital") {

    inHospital();

  } else if (gameState === "doctor") {

    background(255);
    vaccination.visible = true;
    fill("green");
    stroke(50);
    strokeWeight(3);
    textSize(40);
    text("YOU ARE VACCINATED NOW !!", 300, 50);
    fill(0);
    text("Press C to Continue", 420, 570);

    if(time === 1){
      immunityCount=8;
      immunitySprites=[];
      y=138;
      for(var j=0;j<immunityCount;j++,y-=16){
        immunitySprites.push(createSprite(50,y,25,12));
        immunitySprites[j].shapeColor="green";
        
      }
      time++;
    }
 
    if (keyDown("c")) {
      vaccination.visible = false;
      gameState = "running";
      if(frameCount%100===0 && immunityCount>0 ){ 
        //console.log(immunityCount);
        immunitySprites[immunitySprites.length-1].destroy();
        immunitySprites.pop();
        immunityCount--;
        y+=16;
      }
      man.visible = true;
      man.x=400;
      man.y=385;
      score = 0;
      i = 0;
      security=new Security();
    }
  
  }else if(gameState==="end"){
    corona.x=550;
    corona.y=310;
    corona.addImage(covidImg);
    corona.scale=1;
    man.destroy();
    bg.destroy();
    immunityBoard.destroy();
    hospitalG.destroyEach();
    sanitizerG.destroyEach();
    maskG.destroyEach();
    infectedG.destroyEach();
    background(30);
    textSize(55);
    fill("red");
    //stroke();
    strokeWeight(6);
    text("You didn't took care of your self",190,80);
    textSize(30);
    strokeWeight(4);
    text(" Corona - YOU LOSE the game and I WON , hahaha....",200,150);
    text("If you don't want to Lose THE GAME OF LIFE then STAY HOME STAY SAFE",80,520);
    textSize(26);
    text("Developed by: Priyansh Shah",750,585);

  }
  drawSprites();
  
  if(hospital!=undefined && hospital.x>162.5 && hospital.x<1200 && gameState==="running"){
    textSize(22);
    fill(255);
    stroke(0);
    strokeWeight(3);
    text("Press 'E' to enter the hospital",hospital.x-100,30);
    //console.log(hospital.x);
  }
}

function inHospital(){
  //var rand = Math.round(random(1,2));
  switch (rand1) {
    case 1: game1();
      break;
    case 2: game2();
      break;
    default: break;
  }
}

function spawnItems() {

  if (frameCount % 200 == 0) {
    var rand = Math.round(random(1,3));
    switch (rand) {
      case 1: mask1();
        break;
      case 2:  sanitizer1();
        break;
      case 3: infected1();
        break;
      default: break;

    }
  }
}

function spawnHospital(){
  if(frameCount%650==0){
    hospital = createSprite(1400, 210, 30, 30);
    hospital.scale = 0.3;
    hospital.lifetime = 300;
    hospital.velocityX = bg.velocityX;
    hospital.addImage(hospitalImg);
    hospitalG.add(hospital);
    man.depth = hospital.depth + 1;
    corona.depth = hospital.depth + 1;
    
    if(frameCount%100===0){
      hospital.velocityX+=0.05;
    }
  }
  
}

function mask1() {
  mask = createSprite(1300, 370, 30, 40);
  mask.addImage(maskImg);
  mask.y = Math.round(random(50, 300));
  mask.scale = 0.2;
  mask.lifetime = 300;
  mask.velocityX = -5;
  maskG.add(mask);
  man.depth = mask.depth + 1;
  corona.depth = mask.depth + 1;  
  
}

function sanitizer1() {
  sanitizer = createSprite(1300, 370, 30, 40);
  sanitizer.addImage(sanitizerImg);
  sanitizer.y = Math.round(random(50, 300));
  sanitizer.scale = 2;
  sanitizer.lifetime = 300;
  sanitizer.velocityX = -5;
  sanitizerG.add(sanitizer);
  man.depth = sanitizer.depth + 1;
  corona.depth = sanitizer.depth + 1;
  
}

function infected1() {
  infected = createSprite(1400, 350, 10, 10);
  infected.debug=false;
  infected.y=Math.round(random(370,400));
  infected.scale = 0.15;
  infected.lifetime = 300;
  infected.velocityX = bg.velocityX;
  infectedG.add(infected);
  man.depth = infected.depth + 1;
  corona.depth = infected.depth + 1;
  var rand2 = Math.round(random(1,3));
  switch(rand2){
    case 1 : infected.addImage(infImg1);
      break;
    case 2 : infected.addImage(infImg2);
      break;
    case 3 : infected.addImage(infImg3);
      break;
    default:break;
  }
}

function mouseDragged(){
  if(gameState==="inHospital"){
    Matter.Body.setPosition(ball.body,{x: mouseX , y: mouseY});
  }
}

function mouseReleased(){
  if(gameState==="inHospital"){
    slingshot1.fly();
  }
}

function keyPressed(){
  if(keyCode===32 && gameState === "inHospital"){
    slingshot1.attach(ball.body);
  }
}

function game1(){
  background(roomImg);
  security.access1.position(700, 205);
  security.button1.position(700, 235);
  security.access2.position(190, 300);
  security.button2.position(190, 340);
  security.access3.position(700, 460);
  security.button3.position(700, 490);
  if (i === 0) {
    security.button1.show();
    security.button2.show();
    security.button3.show();
    security.access1.show();
    security.access2.show();
    security.access3.show();
    i++;
  }
  clues();
  security.display();
  //console.log(score)

  if (score === 3) {
    man.x = 400;
    man.y = 385;

    security.element1.hide();
    security.element2.hide();
    security.element3.hide();
    
    gameState = "doctor";
    time = 1;
  }
}

function game2(){
  Engine.update(engine);
  background(50);
  textSize(20);
  fill(255);
  text("Score : "+score2,100,50);
  text("Score 100 points to get vaccinated", 100, 100)
  text("Press space to get another shot", 100, 150);

  ground1.display();
  ground2.display();
  ground3.display();

  fill(255, 180, 180);
  b1.display();
  b2.display();
  b3.display();
  b4.display();
  b5.display();
  b6.display();
  b7.display();

  fill(160, 275, 150);
  b8.display();
  b9.display();
  b10.display();
  b11.display();
  b12.display();

  fill(100, 200, 200);
  b13.display();
  b14.display();
  b15.display();

  fill(240,275,150);
  b16.display();

  fill(240,275,150);
  b17.display();
  b18.display();
  b19.display();
  b20.display();
  b21.display();

  fill(255,180,180);
  b22.display();
  b23.display();
  b24.display();

  fill(160, 200, 200);
  b25.display();

  b1.score();
  b2.score();
  b3.score();
  b4.score();
  b5.score();
  b6.score();
  b7.score();
  b8.score();
  b9.score();
  b10.score();
  b11.score();
  b12.score();
  b13.score();
  b14.score();
  b15.score();
  b16.score();
  b17.score();
  b18.score();
  b19.score();
  b20.score();
  b21.score();
  b22.score();
  b23.score();
  b24.score();
  b25.score();

  slingshot1.display();

  ball.display();

  if(score2>100){

    man.x = 400;
    man.y = 385;

    gameState="doctor";
    time = 1;
    score2=0;
  }
  
}

function createElements(){
  ground1 = new Ground(600,590,1200,20);
  ground2 = new Ground(500,450,350,20);
  ground3 = new Ground(900,320,260,20);

  // line 1
  b1 = new Block(380,420);
  b2 = new Block(420,420);
  b3 = new Block(460,420);
  b4 = new Block(500,420);
  b5 = new Block(540,420);
  b6 = new Block(580,420);
  b7 = new Block(620,420);

  // line 2
  b8 = new Block(420,370);
  b9 = new Block(460,370);
  b10 = new Block(500,370);
  b11 = new Block(540,370);
  b12 = new Block(580,370);

  // line 3
  b13 = new Block(460,320);
  b14 = new Block(500,320);
  b15 = new Block(540,320);

  // line 4 
  b16 = new Block(500,270);

  // line 5
  b17 = new Block(900,290);
  b18 = new Block(860,290);
  b19 = new Block(820,290);
  b20 = new Block(940,290);
  b21 = new Block(980,290);

  // line 6
  b22 = new Block(860,240);
  b23 = new Block(900,240);
  b24 = new Block(940,240);

  // line 7
  b25 = new Block(900,190);

  ball= new Ball(200,500,60);

  slingshot1 = new SlingShot(ball.body,{x: 150,y: 400});
  
}