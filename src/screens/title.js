game.TitleScreen = me.ScreenObject.extend({
	init: function() {
		this.parent(true);
		this.font = null;
	},

	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
        me.audio.playTrack("track1");
		if (this.title == null) {
			this.title = me.loader.getImage("welcome_screen");
		}
		//me.input.bindKey(me.input.KEY.ENTER, "enter", true);
	},
	
	draw: function(context) {
		context.drawImage(this.title, 0, 0);
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
		this.title = null;
		//me.input.unbindKey(me.input.KEY.ENTER);
	}
});
