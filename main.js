var AM = new AssetManager();

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};


AM.queueDownload("./img/knight/IDLE.png");
AM.queueDownload("./img/knight/WALK.png");
AM.queueDownload("./img/knight/ATTACK.png");
AM.queueDownload("./img/knight/JUMP.png");
AM.queueDownload("./img/background.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
	
	var spritesheets = [];
	spritesheets.push(AM.getAsset("./img/knight/IDLE.png"));
	spritesheets.push(AM.getAsset("./img/knight/WALK.png"));
	spritesheets.push(AM.getAsset("./img/knight/ATTACK.png"));
	spritesheets.push(AM.getAsset("./img/knight/JUMP.png"));
	
	gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/background.png")));
	
	gameEngine.addEntity(new Knight(gameEngine, spritesheets));

    console.log("All Done!");
});