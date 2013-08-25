game.GameEndScreen = me.ScreenObject.extend({
	init: function() {
		this.parent(true);
		this.title = null;
		this.font = null;
	},

	onResetEvent: function() {
//        game.panel.clear();
//        game.panel.resetBackround();

		if (this.title == null) {
			this.title = me.loader.getImage("game_end_screen");
			this.font = new me.BitmapFont("32x32_font", 32);
		}
		me.input.bindKey(me.input.KEY.ESC, "esc", true);
	},

	draw: function(context) {
		context.drawImage(this.title, 0, 0);
		var lineHeight = 1.1;
		this.font.lineHeight = lineHeight;
		this.font.draw(context, "UNBELIEVABLE, BUT\n YOU WIN!", 0, 0);
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
