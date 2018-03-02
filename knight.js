const IDLE_RIGHT = 0;
const IDLE_LEFT = 1;
const WALK_RIGHT = 2;
const WALK_LEFT = 3;
const ATTACK_RIGHT = 4;
const ATTACK_LEFT = 5;
const JUMP_RIGHT = 6;
const JUMP_LEFT = 7;
const IDLE = 0;
const WALK = 1;
const ATTACK = 2;
const JUMP = 3;

function Knight(game, spritesheets) {
	this.spritesheets = spritesheets;
    this.animation = new Animation(spritesheets[IDLE], 174, 128, 7, 0.14, 7, true, 1, false);
	this.state = IDLE_RIGHT;
    this.speed = 0;
	this.isJumping = false;
    this.ctx = game.ctx;
    Entity.call(this, game, 300, 150);
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function () {
	var knight = this;
	//console.log(this.speed);
	this.ctx.canvas.addEventListener("keydown", function (e) {
		if (e.code === "ArrowRight" && knight.state !== WALK_RIGHT && 
		    (knight.state !== JUMP_RIGHT && knight.state !== JUMP_LEFT)) {
			knight.setState(WALK_RIGHT);
		} else if (e.code === "ArrowLeft" && knight.state !== WALK_LEFT && 
		           (knight.state !== JUMP_RIGHT && knight.state !== JUMP_LEFT)) {
			knight.setState(WALK_LEFT);
		}
		if (e.code === "ArrowUp" && knight.state === WALK_RIGHT && knight.state !== JUMP) {
			knight.setState(JUMP_RIGHT);
		}
		if (e.code === "ArrowUp" && knight.state === WALK_LEFT && knight.state !== JUMP) {
			knight.setState(JUMP_LEFT);
		}	
    }, false);
	
	this.ctx.canvas.addEventListener("keyup", function (e) {
        if (e.code === "ArrowRight" && 
		    knight.state !== IDLE_RIGHT && 
			knight.state !== JUMP_RIGHT && 
			knight.state !== JUMP_LEFT) {
			knight.setState(IDLE_RIGHT);
		}
		if (e.code === "ArrowLeft" && 
		    knight.state !== IDLE_LEFT && 
			knight.state !== JUMP_RIGHT && 
			knight.state !== JUMP_LEFT) {
			knight.setState(IDLE_LEFT);
		}
    }, false);
	
	if (this.state === WALK_RIGHT || this.state === WALK_LEFT) {
		this.x += this.game.clockTick * this.speed;
	}
   
    if (this.x > 800) this.x = -230;
	
    Entity.prototype.update.call(this);
}

Knight.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Knight.prototype.setState = function(state) {
	if (state === IDLE_RIGHT) {
		this.speed = 0;
		this.state = IDLE_RIGHT;
		this.animation = new Animation(this.spritesheets[IDLE], 174, 128, 7, 0.14, 7, true, 1, false);
	} else if (state === IDLE_LEFT) {
		this.speed = 0;
		this.state = IDLE_LEFT;
		this.animation = new Animation(this.spritesheets[IDLE], 174, 128, 7, 0.14, 7, true, 1, true);
	} else if (state === WALK_RIGHT) {
		this.speed = 50;
		this.state = WALK_RIGHT;
		this.animation = new Animation(this.spritesheets[WALK], 174, 128, 7, 0.14, 7, true, 1, false);
	} else if (state === WALK_LEFT) {
		this.speed = -50;
		this.state = WALK_LEFT;
		this.animation = new Animation(this.spritesheets[WALK], 174, 128, 7, 0.14, 7, true, 1, true);
	} else if (state === ATTACK_RIGHT) {
		this.speed = 0;
		this.state = ATTACK_RIGHT;
		this.animation = new Animation(this.spritesheets[ATTACK], 174, 128, 7, 0.14, 7, true, 1, false);
	} else if (state === ATTACK_LEFT) {
		this.speed = 0;
		this.state = ATTACK_LEFT;
		this.animation = new Animation(this.spritesheets[ATTACK], 174, 128, 7, 0.14, 7, true, 1, true);
	} else if (state === JUMP_RIGHT) {
		this.isJumping = true;
		this.speed = 50;
		this.state = JUMP_RIGHT;
		this.animation = new Animation(this.spritesheets[JUMP], 174, 128, 7, 0.25, 7, true, 1, false);
	} else if (state === JUMP_LEFT) {
		this.isJumping = true;
		this.speed = 50;
		this.state = JUMP_LEFT;
		this.animation = new Animation(this.spritesheets[JUMP], 174, 128, 7, 0.25, 7, true, 1, true);
	}
}