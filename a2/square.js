function Square(game, xPos, yPos) {
	this.game = game;
	this.ctx = game.ctx;
	this.neighbors = [];
	this.alive = Math.random() > .90 ? true : false;
	Entity.call(this, game, xPos * 10, yPos * 10);
}

Square.prototype = new Entity();
Square.prototype.constructor = Square;

Square.prototype.update = function() {
	var liveNeighbors = 0;
	for (var i = 0; i < 8; i++) {
		if (this.neighbors[i].alive) {
			liveNeighbors++;
		}
	}
	
	if (liveNeighbors < 2 || liveNeighbors > 3) {
		this.alive = false;
	} else if (!this.alive && liveNeighbors === 3) {
		this.alive = true;
	}
	this.draw();
}

Square.prototype.draw = function() {
	if (this.alive) {
		this.ctx.fillStyle = "red";
	} else {
		this.ctx.fillStyle = "white";
	}
	
	this.ctx.fillRect(this.x, this.y, 10, 10);
}

Square.prototype.setNeighbors = function(neighbors) {
	this.neighbors = neighbors;
}