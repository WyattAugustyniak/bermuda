//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot

//function preload()
//song = loadSound('assets/islandmusic.mp3');

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 40;
var A;
var B;
var C;

function setup() {
song = loadSound('assets/islandmusic.mp3');
createCanvas(800,600);
//song.loop();
background(0, 150, 150);

A = random(0, 3);
B = random(0, 3);
C = random(0, 3);

bg = loadImage("assets/Bermuda.png");
bulletImage = loadImage("assets/asteroids_bullet.png");
shipImage = loadImage("assets/boat1.png");
particleImage = loadImage("assets/asteroids_particle.png");
islandA = loadImage("assets/islandA.png")
islandB = loadImage("assets/islandB.png")
islandC = loadImage("assets/islandC.png")

ship = createSprite(width/2, height/2);
ship.maxSpeed = 3;
ship.friction = .975;
ship.setCollider("circle", 0,0, 20);

ship.addImage("normal", shipImage);
ship.addAnimation("thrust", "assets/boat2.png", "assets/boat7.png");

asteroids = new Group();
bullets = new Group();

/*for(var i = 0; i<0; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  //createAsteroid(3, px, py);
}*/
}

function draw() {
  //background(bg);
background(0, 230, 210);
islands();


  fill(255);
  textAlign(CENTER);
  text("LEFT CLICK for Tropical Tunes...  DOWN ARROW for Bermuda Magic", width/2, 20);
  text("Press down arrow key for Bermuda Magic", width/2);

  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
//islands();
  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
//  islands();
  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
//  islands();
  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
//  islands();
  }

  //asteroids.overlap(bullets, asteroidHit);

  ship.bounce(asteroids);

  if(keyDown(LEFT_ARROW))
    ship.rotation -= 4;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += 4;
  if(keyDown(UP_ARROW))
    {
    ship.addSpeed(.2, ship.rotation);
    ship.changeAnimation("thrust");
    islands();
    }
  else
    ship.changeAnimation("normal");

  if(keyWentDown("x"))
    {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
    }

  drawSprites();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    setup();
  }
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }
}



/*function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroid"+floor(random(0,3))+".png");
  a.addImage(img);
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  //a.debug = true;
  a.type = type;

  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;

  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
var newType = asteroid.type-1;

if(newType>0) {
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(360));
  p.friction = 0.95;
  p.life = 15;
  }

bullet.remove();
asteroid.remove();
*/

function islands() {
/*A = random(0, 4);
B = random(0, 4);
C = random(0, 4);
D = random(0, 4);*/

//Quadrant A
if (A<= 1) {
  image(islandA, width / 2.65, height / 20);
  } else if (1 < A && A <= 2) {
  image(islandB, width / 2.65, height / 20);
} else if (2 < A && A <= 3){
  image(islandC, width / 2.65, height / 20);
}

//ellipse(width / 2, height / 4, 150);

//Quadrant B
if (B<= 1) {
  image(islandA, width / 13, height - (height / 2.3));
} else if (1 < B && B <= 2) {
  image(islandB, width / 13, height - (height / 2.3));
} else if (2 < B && B <= 3){
  image(islandC, width / 13, height - (height / 2.3));
}

//ellipse(width / 4, height - (height / 4), 200);

//Quadrant C
if (C<= 1) {
  image(islandA, width - (width / 3), height - (height / 2.3));
} else if (1 < C && C <= 2) {
  image(islandB, width - (width / 3), height - (height / 2.3));
} else if (2 < C && C <= 3){
  image(islandC, width - (width / 3), height - (height / 2.3));
}

//ellipse(width - (width / 4), height - (height / 4), 150);
}
