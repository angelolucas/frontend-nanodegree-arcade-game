'use strict';

// Player and Enemies Points
var points = {
    player: 0,
    enemy: 0
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -game.cellX;
    this.y = Math.floor(Math.random() * 3 + 1) * game.cellY - 24;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game 
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    var speed = Math.random() * 2;
    this.x += (dt * 100) + speed;

    // If enemy has already crossed the path
    // put back at the beginning
    if(this.x > game.cellX * game.cols) {
        this.x = -game.cellX;
        this.y = Math.floor(Math.random() * 3 + 1) * game.cellY - 24;
    }
    
    // Check collision
    var positionSameLine = this.y === player.y,
        rangeRightCollision = this.x + 70 > player.x,
        rangeLeftCollision = this.x < player.x + 70;

    if(positionSameLine && rangeRightCollision && rangeLeftCollision) {
        player.x = player.initX;
        player.y = player.initY;
        points.enemy += 1;
        console.log(points.enemy)
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    /* Draw Enemy */
    game.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    /* Draw Enemy Points */
    game.ctx.fillStyle = "#FFF";
    game.ctx.font = "bold 38px Impact";
    game.ctx.strokeStyle = "#c43d0b";
    game.ctx.lineWidth = 2;
    game.ctx.textAlign = "right";
    game.ctx.miterLimit = 1;
    game.ctx.fillText('Enemy: ' + points.enemy, (game.cols * game.cellX) - 20, 105);
    game.ctx.strokeText('Enemy: ' + points.enemy, (game.cols * game.cellX) - 20, 105);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x * game.cellX;
    this.y = y * game.cellY - 24;
    this.initX = this.x;
    this.initY = this.y;
    this.victories = 0;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    
}

Player.prototype.render = function() {
    /* Draw Player */
    game.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    /* Draw Player Points */
    game.ctx.strokeStyle = "#4e66d2";
    game.ctx.textAlign = "left";
    game.ctx.fillText('You: ' + points.player, 20, 105);
    game.ctx.strokeText('You: ' + points.player, 20, 105);
}

Player.prototype.handleInput = function (keyPress) {

    var width = game.cellX * (game.cols - 1);
    var height = game.cellY * (game.rows - 2);

    if (keyPress === 'up'){
        this.y -= game.cellY;

        player.render('test')

        // check if player won
        if ( this.y <= 0 ) {
            player.x = player.initX;
            player.y = player.initY;
            points.player += 1;
        }
    }

    else if (keyPress === 'down' && this.y < height)
        this.y += game.cellY;

    else if (keyPress === 'left' && this.x > 0)
        this.x -= game.cellX;

    else if (keyPress === 'right' && this.x < width)
        this.x += game.cellX;

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(3, 5);

var allEnemies = [];

for (var i = 0; i < 6; i++) {
    setTimeout(function() {
        var enemy = new Enemy();

        allEnemies.push(enemy);
    }, i * 1100)
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if (allowedKeys[e.keyCode])
        player.handleInput(allowedKeys[e.keyCode]);
    else
        return false;

});
