game.Bomb = me.ObjectEntity.extend({
	init: function(x, y, settings){
		this.parent(x, y, settings);

		this.collidable = true; //можно сталкиваться
		this.type = me.game.ENEMY_OBJECT;
	},

	onCollision: function(res, obj){

	},

	update: function(){
		return false;
	}
});