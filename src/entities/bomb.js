game.BombEntity = me.ObjectEntity.extend({
	init: function(x, y){
		var settings = new Object();
		settings.image = "tempenemy";
		settings.spritewidth = 96;
		settings.spriteheight = 96;
		this.parent(x, y, settings);
		this.updateColRect(32,32,32,32);

		this.gravity = 0.0;
		this.collidable = true; //можно сталкиваться
		this.type = me.game.ENEMY_OBJECT;

		game.bomb = this;
	},

	update: function(){
		// do nothing if not in viewport
    if (!this.inViewport)
    	return false;

    var res = me.game.collide(this, true);
    if (res){
    	for (var i = 0, len = res.length; i < len; ++i){
    		if (res[i].obj.type === me.game.COMRADE_OBJECT ){
    			res[i].obj.die();
    		}
    	}
    }

    this.parent();
    return 
	}
});