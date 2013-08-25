game.GameOverScreen = me.ScreenObject.extend({
	init: function() {
		this.parent(true);
		this.title = null;
		this.font = null;
//        game.panel.clear();
//        game.panel.resetBackround();
	},

	onResetEvent: function() {

		if (this.title == null) {
			this.title = me.loader.getImage("gameover_screen");
			this.font = new me.BitmapFont("32x32_font", 32);
		}
		me.input.bindKey(me.input.KEY.ESC, "esc", true);
	},

	draw: function(context) {
		context.drawImage(this.title, 0, 0);
		this.font.draw(context, "YOU LOOSE FOOL!", 0, 0);
	},

	update: function() {
		if (me.input.isKeyPressed('esc')) {
			me.state.change(me.state.MENU);
		}
	},

	onDestryEvent: function() {
		this.title = null;
		this.font = null;
		me.input.unbindKey(me.input.KEY.ESC);
	}
});
