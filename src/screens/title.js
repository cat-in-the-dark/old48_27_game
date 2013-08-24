game.TitleScreen = me.ScreenObject.extend({
	init: function() {
		this.parent(true);
		this.title = null;
		this.font = null;
	},

	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		if (this.title == null) {
			this.title = me.loader.getImage("welcome_screen");
			this.font = new me.BitmapFont("32x32_font", 32);
		}
		me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
	
	draw: function(context) {
		context.drawImage(this.title, 0, 0);
		this.font.draw(context, "PRESS ENTER TO PLAY", 0, 0);
	},
	
	// update function
	update: function() {
		// enter pressed ?
		if (me.input.isKeyPressed('enter')) {
			me.state.change(me.state.PLAY);
		}
		return true;
	},

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		this.font = null;
		this.title = null;
		me.input.unbindKey(me.input.KEY.ENTER);
	}
});
