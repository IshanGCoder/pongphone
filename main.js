//create the ball, playerPaddle and computerPaddle as sprite objects
var ball = createSprite(200,200,10,10);
var playerPaddle = createSprite(380,200,10,70);
var computerPaddle = createSprite(10,200,10,70);

//variable to store different state of game
var gameState = "serve";

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
var playerscore = 0;
var computerscore = 0;

function draw() {
  //clear the screen
  background("white");
  
  //place info text in the center
  textSize(20);
  if (gameState === "serve") {
    text("Press the Yellow Button to Serve",70,180);
  }

  
  //make the player paddle move with the mouse's y position
  if (keyDown("up")) {
    playerPaddle.velocityY = -5;
  }
  if (keyDown("down")) {
    playerPaddle.velocityY = 5;
  }
  if (keyWentUp("up") || keyWentUp("down")) {
    playerPaddle.velocityY = 0;
  }
  
  //AI for the computer paddle
  //make it move with the ball's y position
  if (keyDown("w")) {
    computerPaddle.velocityY = -5;
  }
  if (keyDown("s")) {
    computerPaddle.velocityY = 5;
  }
  if (keyWentUp("w") || keyWentUp("s")) {
    computerPaddle.velocityY = 0;
  }
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  playerPaddle.collide(edges);
  computerPaddle.collide(edges);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    if (ball.x > 400) {
      computerscore = computerscore + 1;
    }
    if (ball.x < 0) {
      playerscore = playerscore + 1;
    }
    reset();
    gameState = "serve";
  }
  text(computerscore, 180, 20);
  text(playerscore, 210, 20);
  if (playerscore == 5||computerscore == 5){
    gameState = "GameOver";
  }
  if (gameState == "GameOver") {
    text("Game Over", 145, 180);
    text("Press the Yellow Button to restart", 130, 230);
  }
  if (gameState == "GameOver" && keyDown("space")) {
    computerscore = 0;
    playerscore = 0;
    gameState = "serve";
  }
  
  
  drawSprites();
}

