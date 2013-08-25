game.GameOverScreen = me.ScreenObject.extend({
	init: function() {
		this.parent(true);
		this.title = null;
	},

	onResetEvent: function() {

		if (this.title == null) {
			this.title = me.loader.getImage("gameover_screen");
		}
		me.input.bindKey(me.input.KEY.ESC, "esc", true);


		game.timerPaused = true;
		game.comrads = [];
		game.panel.clear();
		game.panel.resetBackground();
	},

	draw: function(context) {
		context.drawImage(this.title, 0, 0);
	},

	update: function() {
		if (me.input.isKeyPressed('esc')) {
			me.state.change(me.state.MENU);
		}
	},

	onDestryEvent: function() {
		this.title = null;
		me.input.unbindKey(me.input.KEY.ESC);
	}
});
