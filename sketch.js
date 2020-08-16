var hall1,hall2,hall3;
var rand, backsprite;
var steve,steveImg;
var logan,loganImg;
var zombie,megaZombie;
var zombImg,megaZombImg;
var score = 0;
var rect,healthBar;
var x = 20;
var barArray = [];
var zombieGroup = [];
var megaZombieGroup = [];
var y = [];
var z = [];
var bulletImg, bullet;
var bulletArray = [];
var bar = 10;
var flag = []; 
var j = [];

function preload(){
  hall1 = loadImage("images/1.png");
  hall2 = loadImage("images/2.png");
  hall3 = loadImage("images/3.png");
  steveImg = loadImage("images/img111.png");
  loganImg = loadImage("images/img221.png");
  zombImg = loadImage("images/zombies.png");
  megaZombImg = loadImage("images/megaZombies.png");
  bulletImg = loadImage("images/bullet.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight-100);
  backsprite = createSprite(0,(displayHeight-100)/2,displayWidth,displayHeight);  
  backsprite.addImage("1",hall1);
  backsprite.addImage("2",hall2);
  backsprite.addImage("3",hall3);
  backsprite.velocityX = -5;
  rect = createSprite(80,40,150,50);
  rect.shapeColor = "white";

  steve = new Steve(300,300);
  logan = new Logan(150,300);

  for(var i = 0; i < 10; i++){
    //making healthbar
    healthBar = new HealthBar(x,40);
    x=x+13;
    barArray.push(healthBar);
    
  }

}

function draw(){
  
  infiniteBackground();
  shootBullets();
  a();
  createZomb();
  damage();
  loganPos();

  steve.display();
  logan.display();
  steve.move();

  drawSprites();

  stroke("white");
  strokeWeight(8);
  text("score:"+score,200,40);
  console.log(score);
}

function infiniteBackground(){
  if(frameCount % 1000 === 0){
    //changing background
    rand = Math.round(random(1,3));
    console.log(rand);
    backsprite.x = backsprite.width/2;
    switch(rand){
      case 1 : backsprite.changeAnimation("1");
      break;
      case 2 : backsprite.changeAnimation("2",);
      break;
      case 3 : backsprite.changeAnimation("3");
      break;
    }
  }     
  
  if(backsprite.x<=0){
    //making infinite background
    backsprite.x = backsprite.width/2;
  }

}

function shootBullets(){
  if(keyWentDown("space")){
    //shooting bullets on space
    console.log("h");
    bullet = new Bullet(steve.character.x+30,steve.character.y-70);
    bullet.display();
    bullet.body.velocityX = 6;
    bulletArray.push(bullet);
    bullet.body.lifetime = 200;
  }

  if(frameCount % 300 === 0){
    //shooting buleets for AI
    bullet = new Bullet(logan.body.x+30,logan.body.y+40);
    bullet.display();
    bullet.body.velocityX = 6;
    bulletArray.push(bullet);
    bullet.body.lifetime = 250;
  }

}

function a(){
  for(var i = 0; i<bulletArray.length; i++ ){
    for(var j = 0; j<zombieGroup.length; j++){
      //making zombies and bullet destroy if they touch
      if(bulletArray[i].body.isTouching(zombieGroup[j].body)){
        zombieGroup[j].body.destroy();
        bulletArray[i].body.destroy();
        score++;
        break;
      }
    }
  }

  for(var k=0; k<megaZombieGroup.length; k++){
    for(var i=0; i<bulletArray.length;i++){
      if(bulletArray[i].body.collide(megaZombieGroup[k].character)){
        score++;
        flag.push(i); 
      }
    }
    if(flag.length === 3){
      
      //destroy all the bullets and megaZombie
      for(j=0;j<flag.length;j++){
        bulletArray[flag[j]].body.destroy();
      }
      megaZombieGroup[k].character.destroy();

      //empty touchedbullet array
      flag = [];
    }
  }
}

function createZomb(){
  if(frameCount % 100 === 0){
    //creating zombies
    zombie = new Zombies();
    zombie.displayZombie();
    zombieGroup.push(zombie);
  }

  if(frameCount % 500 === 0){
    //creating megaZombies
    megaZombie = new Zombies();
    megaZombie.display();
    megaZombieGroup.push(megaZombie);
  }
}

function damage(){
  for(var i = 0; i < zombieGroup.length; i++){
    if(zombieGroup[i].body.isTouching(steve.character)){
      //damaging the health bar if zombies are near you
      zombieGroup[i].body.destroy();
      popped = barArray.pop();
      popped.bar.destroy();
    }
  }
  for(var i = 0; i < megaZombieGroup.length; i++){
    if(megaZombieGroup[i].character.isTouching(steve.character)){
      //damaging you if megaZombies are near you
      megaZombieGroup[i].character.destroy();
      popped = barArray.pop();
      popped.bar.destroy();
    }
  }
}

function loganPos(){
  //setting the position of NPC
  logan.body.x = steve.character.x-150;
  logan.body.y = steve.character.y;
}