'use strict';

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var allEnemies = [];

var Player = function(x, y) {
    //console.log(game)
    this.x = x * game.cellX;
    this.y = y * game.cellY - 30;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {

}

Player.prototype.render = function() {
    game.ctx.clearRect(0,0,9999,50);
    game.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
}

Player.prototype.handleInput = function (keyPress) {
    var width = game.cellX * (game.cols - 1);
    var height = game.cellY * (game.cols - 1);

    if (keyPress === 'up' && this.y >= 0)
        this.y -= game.cellY;

    else if (keyPress === 'down' && this.y < height)
        this.y += game.cellY;

    else if (keyPress === 'left' && this.x > 0)
        this.x -= game.cellX;

    else if (keyPress === 'right' && this.x < width)
        this.x += game.cellX;
    
}

var player = new Player(2, 4);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


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
