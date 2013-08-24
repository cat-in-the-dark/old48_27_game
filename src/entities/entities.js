// TODO
game.Sam = me.ObjectEntity.extend({
	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.gravity = 0.0;
    this.origVelocity = new me.Vector2d( 7.0, 7.0 );
    this.setVelocity( this.origVelocity.x, this.origVelocity.y );
    this.setFriction(0.35,0.35);

		me.input.bindKey( me.input.KEY.LEFT, "left" );
    me.input.bindKey( me.input.KEY.RIGHT, "right" );
    me.input.bindKey( me.input.KEY.UP, "up" );
    me.input.bindKey( me.input.KEY.DOWN, "down" );

    me.game.viewport.follow( this.pos, me.game.viewport.AXIS.BOTH );
	},

	checkMovement: function(){
		var tempDir = new me.Vector2d( 0.0, 0.0 );
		//Prepare movement
		if (me.input.isKeyPressed('left')){
			tempDir.x = -1.0;
		}
		if (me.input.isKeyPressed('right')){
			tempDir.x = 1.0;
		}
		if (me.input.isKeyPressed('down')){
			tempDir.y = 1.0;
		}
		if (me.input.isKeyPressed('up')){
			tempDir.y = -1.0;
		}

		//move
		if ( tempDir.x != 0.0 || tempDir.y != 0.0 ) {
      this.vel.x += tempDir.x * this.accel.x * me.timer.tick;
      this.vel.y += tempDir.y * this.accel.y * me.timer.tick;
      this.direction = tempDir;
    }
	},

	update: function(){
		this.checkMovement();

		this.updateMovement();

		this.parent(this);
		return true;
	}
});