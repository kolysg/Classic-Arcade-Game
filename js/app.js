
var BLOCK_WIDTH = 101;
var BLOCK_HEIGHT = 120;
var EDGE_X = 450;
var EDGE_Y = 450;
var PLAYER_POS_X = 220;
var PLAYER_POS_Y = 606 - BLOCK_HEIGHT;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set the speed
    var pxlpermsec = 100;
    this.speed = Math.random()*pxlpermsec + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    
    //console.log(this.x);
    if (this.x < EDGE_X){
        this.x += this.speed * dt;
    } else {
        this.x = 0;
        this.x += this.speed * dt;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.Collisions(player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.x = PLAYER_POS_X;
    this.y = PLAYER_POS_Y;
    this.height = 78;
    this.width = 67;
    this.score = 0;
    this.lives = 5;
    this.gemScore = 0;
    this.gameLost = false;
    this.gameWon = false;
    this.sprite = 'images/char-boy.png';
    //assign player's movement
    this.moveLeft = function(){
        this.x -= BLOCK_WIDTH;
    };
    this.moveRight = function(){
        this.x += BLOCK_WIDTH;
    };
    this.moveUp = function(){
        this.y -= BLOCK_HEIGHT*0.5;
    };
    this.moveDown = function(){
        this.y += BLOCK_HEIGHT*0.5;
    };
    
};

//update function
Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y; 
};
//reset function
Player.prototype.reset = function(){
    this.x = PLAYER_POS_X;
    this.y = PLAYER_POS_Y;
};
//render function
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.restart = function(){
    this.x = PLAYER_POS_X;
    this.y = PLAYER_POS_Y;
    this.score = 0;
    this.lives = 5;
};


//Life decrease after enemy-collision in a separate function
Player.prototype.livesDecrease = function(){
    if (this.lives > 0){
        this.lives -= 1;
        this.reset();
    }else {
        this.lives = 0;
    }
    if(this.lives === 0){
        this.lives = 0;
        alert("Game Over, Try again!");
        this.restart(); 
    }
    document.getElementById("Lives").innerHTML = this.lives;
};

//Enemy collision function
Player.prototype.enemyCollision = function() {
    var bug = checkCollisions(allEnemies);
    //if collision detected, reduce a player life.
    //Game over if all lives lost.
    if (bug){
        allEnemies.forEach(function(enemy){
            console.count ("collision!!");
            this.y += 20;//pushes the player back
            return true;
        });
        this.livesDecrease();
        this.reset();
    }
    return false;
    
};

  
// Gem Superclass
var Gem = function (x, y){
    this.height = 105;
    this.width = 101;
    this.x = (Math.floor(Math.random() * (5 - 1)) + 1) * 101;
    this.y = -400;
};

Gem.prototype.update = function(){
    this.y = -400;
};

Gem.prototype.reset = function(x,y){ 
    this.y = -400;//gem disappears from the canvas
    if (player.y < 0){
        player.y -= 20;
    } 
};

Gem.prototype.render = function(){
    this.y = 100; 
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Subclasses of collectibles & prototype delegation

//Blue
var BlueGem = function(x,y){
    Gem.call(this, x, y);
    this.sprite = 'images/gem-blue.png';
};
BlueGem.prototype = Object.create(Gem.prototype);

//Green
var GreenGem = function(x,y){
    Gem.call(this, x, y);
    this.sprite = 'images/gem-green.png';
};
GreenGem.prototype = Object.create(Gem.prototype);

//Orange
var OrangeGem = function(x,y){
    Gem.call(this,x,y);
    this.sprite = 'images/gem-orange.png';
};
OrangeGem.prototype = Object.create(Gem.prototype);

//Heart
var Heart = function(x,y){
    Gem.call(this,x,y);
    this.sprite = 'images/Heart.png';
};
Heart.prototype = Object.create(Gem.prototype);

//Collectibles
var Key = function(x,y){
    Gem.call(this,x,y);
    this.sprite = 'images/Key.png';
};
Key.prototype = Object.create(Gem.prototype);

var Star= function(x,y){
    Gem.call(this,x,y);
    this.sprite = 'images/Star.png';
};
Star.prototype = Object.create(Gem.prototype);


//Check for Collision between Gems and player.
Gem.prototype.gemCollision = function() {
    var target = checkCollisions(allGems);
    var index = allGems.indexOf(target);
    if (target){
        this.reset();
        player.lives += 1;
        document.getElementById("Lives").innerHTML = player.lives;
        
        var removedGem = allGems.splice(index, 1); //removes item from the array after collision
        removedGem.y = -400;// item disappears from the canvas
        console.log(removedGem);
    }
    return false;
    
};

//Check for Collision between Collectible and player.
Gem.prototype.collectibleCollision = function() {
    var target = checkCollisions(allCollectibles);
    var index = allCollectibles.indexOf(target);
    if (target){
        this.reset();
        player.lives += 1;
        player.score += 100;
        document.getElementById("Lives").innerHTML = player.lives;
        document.getElementById("Score").innerHTML = player.score;
        
        var removedItem = allCollectibles.splice(index, 1);
        removedItem.y = -400;
        console.log(removedItem);
    }
    return false;
    
};

////Check for Collision between heart and player. A new player will appear on the board. When one player collide with another, player wins.
Gem.prototype.heartCollision = function() {
    var target = checkCollisions(heart);
    var index = heart.indexOf(target);
    if (target){
        this.reset();
        //return false;
        player.sprite = 'images/char-princess-girl.png';
    }
    return false;
    
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

Player.prototype.handleInput = function(allowedKeys){
    switch (allowedKeys) {
        case 'left':
            if (this.x > this.width){
                this.moveLeft();
            }   
            if (this.y === 0){
                this.reset();
            }
            //this.moveLeft();
            break;
       
        case 'up':
            if (this.y > BLOCK_HEIGHT ){
                this.moveUp();
            } else if (this.y < BLOCK_HEIGHT*0.5){
                this.y = 0;
                this.score += 100;
                this.reset();
            } else {
                this.score += 100;
                this.reset();
            }
            document.getElementById('Score').innerHTML = this.score;
            break;
        
        case 'right':
             if (this.x + BLOCK_WIDTH < ctx.canvas.width - this.width){
                this.moveRight();
            }   
            if (this.y === 0){
                this.reset();
            }
            break;
        
        case 'down':
            if (this.y < (ctx.canvas.height - this.height) && this.y !== 0 && (this.y + this.height) < (ctx.canvas.height - BLOCK_HEIGHT*0.5)){
                this.moveDown();
            }
            if (this.y === 0){
                this.reset();
            }
            break;
    } 
};


//CheckCollision function, this checks for all collision for array-items with player
var checkCollisions = function(targetArray) {
    for(var i = 0; i < targetArray.length; i++) {
        if(player.x < targetArray[i].x + targetArray[i].width &&
            player.x + player.width > targetArray[i].x &&
            player.y < targetArray[i].y + targetArray[i].height &&
            player.y + player.height > targetArray[i].y) {
                return targetArray[i];//collision
        }
        //return false; //no collision
    }
    //return false;
};

//Initiate Enemy
var enemy = new Enemy(0,0);
var allEnemies = [];
for (var i = 1; i < 4; i++) {
    allEnemies.push(new Enemy(this.x, (i * 119) + 25, this.speed * 99 * i));
}
//Initiate Player
var player = new Player(200,450);

//Initiate Gems
var bluegem = new BlueGem(0,0);
var greengem = new GreenGem(0,0);
var orangegem = new OrangeGem(0,0);
var heart = new Heart(0,0);
var key = new Key(0,0);
var star = new Star(0,0);

var allGems = [bluegem, greengem, orangegem];
var allCollectibles = [key, star];
var heart = [heart];
//var allGems = [bluegem];

//Define handleInput function
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down', 
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
