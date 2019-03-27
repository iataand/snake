var snake;
var randX;
var randY;
var scl;
var score;

function setup() 
{
  // put setup code here
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(12);
  scl = 12;
  score = 0;

  randX = Math.floor(random(1, 50)) * scl;
  randY = Math.floor(random(1, 50)) * scl;
}

drawFood();

function draw() 
{
  // put drawing code here
  background(52);

  snake.show();
  keyPressed();
  check();
}

function keyPressed()
    {
      
      if(keyCode === UP_ARROW)
      {
        snake.update(0, -1);
      }
      else if(keyCode === DOWN_ARROW)
      {
        snake.update(0, 1);
      }
      else if(keyCode === RIGHT_ARROW)
      {
        snake.update(1, 0);
      }
      else if(keyCode === LEFT_ARROW)
      {
        snake.update(-1, 0);
      }
    }

function Snake()
{
  this.x = 300;
  this.y = 300;

  this.prevX = [];
  this.prevY = [];

  this.update = function(xSpeed, ySpeed)
  {
    for(var i = 0; i < score; i++)
    {
      this.prevX[i] = this.prevX[i + 1];
      this.prevY[i] = this.prevY[i + 1];
    }
    this.prevX[score - 1] = this.x;
    this.prevY[score - 1] = this.y;    

    this.x += xSpeed * scl;
    this.y += ySpeed * scl;

    this.x = constrain(this.x, 0, 600 -scl);
    this.y = constrain(this.y, 0, 600 -scl);

    for(var i = 0; i < score; i++)
    {
      var posX = this.prevX[i];
      var posY = this.prevY[i];
      
      var d = dist(this.x, this.y, posX, posY);

      if(d < 1)
      {
        if(confirm('Game Over! Score: ' + score)){
          window.location.reload();  
        }
      }
    }

    if(this.x > 600 || this.y > 600 || this.x < -15 || this.y < -15)
    {
      
    }
  }

  this.show = function()
  {
    fill(255);
    console.log(this.x);
    
    for(var i = 0; i <= score; i++)
    {
      rect(this.prevX[i], this.prevY[i], scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}

function drawFood()
{
	fill(255, 0, 100);
  rect(randX, randY, scl, scl);
}

function check()								//vezi daca x este pe mancare
{
  drawFood();

	if(snake.x == randX && snake.y == randY)
	{
    randX = Math.floor(random(1, 39)) * scl;
    randY = Math.floor(random(1, 39)) * scl;
    score++;
	}
}