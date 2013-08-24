// Base person.
game.Comrad = me.ObjectEntity.extend({
	init: function(x, y, settings) {
		this.parent(x, y, settings);

		this.gravity = 0.0;
    this.origVelocity = new me.Vector2d( 7.0, 7.0 );
    this.setVelocity( this.origVelocity.x, this.origVelocity.y );
    this.setFriction(0.35,0.35);

   // this.updateColRect(-1, 0, 4, 30);

    this.directionString = "up";
    var directions = [ "up", "right", "down", "left" ];
    
    for ( var i = 0; i < directions.length; i++ )  {
    	var index = 0;
      this.renderable.addAnimation( directions[ i ] + "idle", [ index + 2 ] );
      this.renderable.addAnimation( directions[ i ] + "run",
          [ index + 1, index ] );
    }
    this.renderable.setCurrentAnimation( this.directionString + "idle" );
    this.renderable.animationspeed = 8;

    game.comrads.push(this);
	},

	checkMovement: function(){
		//move
      //this.vel.x = game.sam.vel.x;
      //this.vel.y = game.sam.vel.y;
      //x
      var dist = this.distanceTo(game.sam);
      
      //if (Math.cos())
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