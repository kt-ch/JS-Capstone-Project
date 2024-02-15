//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, rubber, bug, bug2, bg;
let score = 1;
let catcherIMG, fallingObject1, fallingObject2, fallingObject3;

/* PRELOAD LOADS FILES */
function preload() {
  catcherIMG = loadImage("assets/catch.png")
  rubber = loadImage("assets/duck.png");
  bug = loadImage("assets/bug.png");
  bug2 = loadImage("assets/bug2.png");
  bg = loadImage("assets/backgroundgif.gif");
  win = loadImage("assets/win.jpg");
  lose = loadImage("assets/lose.webp");
}

/* SETUP RUNS ONCE; establishes the components */
function setup() {
  createCanvas(400, 400); // width, height is established
  background(224,224,224);
  
  //Resize assets

  bg.resize(600,400); // (width,height)
  win.resize(400,400);
  lose.resize(400, 400);
  catcherIMG.resize(75,0);
  rubber.resize(50,0);
  bug.resize(50,0);
  bug2.resize(50,0);

  //Create catcher 
  catcher = new Sprite(catcherIMG, 200, 375, "k"); // (x,y,w,h) -> box; added kinematic so the catcher is not affected by the object but can be still programmed by the keyboard

  //Create falling objects
  fallingObject1 = new Sprite(rubber,100, 0); 
  fallingObject1.vel.y = 2; // y because vertical position
  fallingObject1.rotationLock = true;

  fallingObject2 = new Sprite(bug, 100, 0);
  fallingObject2.vel.y = 3;
  fallingObject2.rotationLock = true;
  
  fallingObject3 = new Sprite(bug2, 100, 0);
  fallingObject3.vel.y = 3;
  fallingObject3.rotationLock = true;
}

/* DRAW LOOP REPEATS */
function draw() {

  background(bg);


  // Draw directions to screen

  fill(0);
  textSize(12);
  text("Avoid the bugs and \ncatch the ducks!", width - 100, 20);

  // Score system
  fill(0);
  textSize(15);
  text("Score:" + score, 10, 30); // concatenation: joining two values together using a plus sign.

  // If fallingObject reaches bottom, move back to random position at top
  if (fallingObject1.y >= height) {
    fallingObject1.y = 0;
    fallingObject1.x = random(width); // to make the ball fall randomly
    fallingObject1.vel.y = random(4, 6); // random speeds 
  }

  if (fallingObject2.y >= height) {
    fallingObject2.y = 0;
    fallingObject2.x = random (width);
    fallingObject2.vel.y = random (5,7);
  }

  if (fallingObject3.y >= height) {
    fallingObject3.y = 0;
    fallingObject3.x = random (width);
    fallingObject3.vel.y = random (5,7);
  }

  // Move catcher
  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  } else if (kb.pressing("right")) {
    catcher.vel.x = 3;
  } else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  if (catcher.x < 50) {
    catcher.x = 50;
  } else if (catcher.x > 350) {
    catcher.x = 350;
  }

    // If fallingObject collides with catcher, move back to random position at top
    if (fallingObject1.collides(catcher)) {
      score = score + 2;
      restart();
    }
    
    if (fallingObject2.collides(catcher)) {
      score = score - 1;
      restart();
    }

    if (fallingObject3.collides(catcher)) {
      score = score - 1; 
      restart();
    }

    // medium
    if (score < 0) {
      background(224, 224, 224);
      image(lose, 0, 0)

      eliminate();

      fill('white');
      textFont('Courier New', 15);
      text("You lose!", 160, 50);
      text("There were too many bugs!", 95, 70);
    }

    if (score >= 10) {
      background(225,225, 225);
      image(win, 0, 0);
      
      eliminate();

      fill('white');
      textFont('Courier New', 15);
      text("You win!", 160, 50);
      text("Your code runs!", 130, 70);
      //textSize(40);

    if (mouseIsPressed) {
        score = 0;
        catcher.pos = { x: 200, y: 380 };
        restart();
      }
    }
  }

  function restart() {
    fallingObject1.y = 0;
    fallingObject1.x = random (width);
    fallingObject1.vel.y = random(5, 6);
    
    fallingObject2.y = 0;
    fallingObject2.x = random (width);
    fallingObject2.vel.y = random (5,7);
    
    fallingObject3.y = 0;
    fallingObject3.x = random (width);
    fallingObject3.vel.y = random (5,7);
    
    fallingObject1.direction = "down";
    fallingObject2.direction = "down";
    fallingObject3.direction = "down";
    

  }

  function eliminate() {
    catcher.pos = { x: -300, y: -300 };

    fallingObject1.pos = { x: -100, y: -100 };
    fallingObject1.vel = 0;

    fallingObject2.pos = { x: -100, y: -100};
    fallingObject2.vel = 0;

    fallingObject3.pos = { x: -100, y: -100 };

    fallingObject3.vel = 0;
  }

