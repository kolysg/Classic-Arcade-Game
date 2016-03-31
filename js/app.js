var blockWidth = 101;
var blockHeight = 83;
var edge_x = 450;
var edge_y = 450;
var player_pos_x = 200;
var player_pos_y = 400;
var player_width = 101;
var player_height = 171;



// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //set the speed
    var pxlpermsec = 100;
    this.speed = Math.floor(Math.random()*pxlpermsec + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    
    //console.log(this.x);
    if (this.x < edge_x){
        this.x += this.speed * dt;
    } else {
        this.x = 0;
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

var enemy = new Enemy(0,0);




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    //assign player's movement
    this.moveLeft = function(){
        this.x -= blockWidth;
    };
    this.moveRight = function(){
        this.x += blockWidth;
    };
    this.moveUp = function(){
        this.y -= blockHeight*0.5;
    };
    this.moveDown = function(){
        this.y += blockHeight*0.5;
    };
    
};

player.prototype.update = function(){
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > edge_x - blockWidth * 0.5) {
        this.x = edge_x - blockWidth * 0.5;
        //console.log(this.x);    
    } else if (this.y < 0) {
        this.y = 0;
    } else if (this.y === 0) {
        this.y = player_pos_y;
        this.x = player_pos_x;
        //player.reset();
    } else if (this.y > edge_y - blockHeight * 0.5) {
        this.y = edge_y - blockHeight*0.5;
    }
    
};

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

player.prototype.handleInput = function(key){
    switch (key) {
        case 'left': 
            this.moveLeft();
            break;
        case 'up':
            this.moveUp();
            break;
        case 'right':
            this.moveRight();
            break;
        case 'down':
            this.moveDown();
            break;
    }
    
};

//Collision code for player class

player.prototype.collisions = function (targets){
    if (targets.constructor === Array){
        var target;
        for (var i =0; i < targets.length; i++){
            targets[i] = target;
            this.collisions(target);
        }
    } else {
        this.collisions(target);
    }
};

//collision code
var collisions = function(target){
    if (target.x <= player.x + player_width * 0.5){
        console.log("collision");
    } else if (target.y <= player.y + player_height * 0.5){
        console.log("collision");
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy (0,200), new Enemy(100,400), new Enemy(200,300)];

// Place the player object in a variable called player
var player = new player(200,400);


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