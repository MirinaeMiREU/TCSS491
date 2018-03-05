function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale, flip) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
	this.flip = flip;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

	if (this.flip) {
		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(this.spriteSheet,
					 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
					 this.frameWidth, this.frameHeight,
					 -x - (this.frameWidth/2), y,
					 this.frameWidth * this.scale,
					 this.frameHeight * this.scale);
		ctx.restore();
	} else {
		ctx.drawImage(this.spriteSheet,
					 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
					 this.frameWidth, this.frameHeight,
					 x, y,
					 this.frameWidth * this.scale,
					 this.frameHeight * this.scale);
	}
	
    
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}