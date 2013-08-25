// TODO
game.Sam = me.ObjectEntity.extend({
	init: function(x, y, settings) {
    settings.image = "sam";  
    this.parent(x, y, settings);
    this.nickname = settings.nickname || "Sam";

		this.gravity = 0.0;
    this.origVelocity = new me.Vector2d( 7.0, 7.0 );
    this.setVelocity( this.origVelocity.x, this.origVelocity.y );
    this.setFriction(0.35,0.35);
    this.direction = new me.Vector2d( 0.0, 1.0 );

   // this.updateColRect(-1, 0, 4, 30);

		me.input.bindKey( me.input.KEY.LEFT, "left" );
    me.input.bindKey( me.input.KEY.RIGHT, "right" );
    me.input.bindKey( me.input.KEY.UP, "up" );
    me.input.bindKey( me.input.KEY.DOWN, "down" );
    this.directionString = "up";
    var directions = [ "up", "right", "down", "left" ];
    
    for ( var i = 0; i < directions.length; i++ )  {
    	var index = i*3;
      this.renderable.addAnimation( directions[ i ] + "idle", [ index ] );
      this.renderable.addAnimation( directions[ i ] + "run",
          [ index + 1, index + 2 ] );
    }
    this.renderable.setCurrentAnimation( this.directionString + "idle" );
    this.renderable.animationspeed = 8;

    me.game.viewport.follow( this.pos, me.game.viewport.AXIS.BOTH );
    this.type = me.game.COMRADE_OBJECT;
    game.sam = this;
	},

	checkMovement: function(){
		var tempDir = new me.Vector2d( 0.0, 0.0 );
		//Prepare movement
		if (me.input.isKeyPressed('left')){
			this.directionString = "left";
			tempDir.x = -1.0;
		}
		if (me.input.isKeyPressed('right')){
			this.directionString = "right";
			tempDir.x = 1.0;
		}
		if (me.input.isKeyPressed('down')){
			this.directionString = "down";
			tempDir.y = 1.0;
		}
		if (me.input.isKeyPressed('up')){
			this.directionString = "up";
			tempDir.y = -1.0;
		}

		//move
		if ( tempDir.x != 0.0 || tempDir.y != 0.0 ) {
      this.vel.x += tempDir.x * this.accel.x * me.timer.tick;
      this.vel.y += tempDir.y * this.accel.y * me.timer.tick;
      this.direction = tempDir;
    }
	},

	updateAnimation: function(){
		if ( this.vel.x != 0.0 || this.vel.y != 0.0 ) {
      this.renderable.setCurrentAnimation( this.directionString + "run" );
    } else {
      this.renderable.setCurrentAnimation( this.directionString + "idle" );
    }
	},

	update: function(){
		this.checkMovement();
		this.updateAnimation();

		this.updateMovement();

		this.parent(this);
		return true;
	}
});