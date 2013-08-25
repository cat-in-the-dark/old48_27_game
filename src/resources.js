game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	{name: "maptile1",  type:"image", src: "resources/img/maptile1.png"},
	{name: "sam", type: "image", src: "resources/img/sam.png"},

    {name: "panel-top", type: "image", src: "resources/img/panel.png"},
    {name: "panel-left", type: "image", src: "resources/img/panel-left.png"},

	{name: "welcome_screen", type: "image", src: "resources/img/welcome_screen.png"},
	{name: "gameover_screen", type: "image", src: "resources/img/gameover_screen.png"},
	{name: "game_end_screen", type: "image", src: "resources/img/game_end_screen.png"},
	{name: "dialog", type: "image", src: "resources/img/dialog_background.png"},
	{name: "test_character", type: "image", src: "resources/img/character1.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	{name: "area1", type: "tmx", src: "resources/map/area1.tmx"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
	
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */

	/* Game fonts.
	 * @example
	 * {name: "example_font", type: "image", src: "/resources/img/example_font.png"}
	 */
	{name: "32x32_font", type: "image", src: "resources/img/32x32_font.png"},
    {name: "16x16_font", type: "image", src: "resources/img/16x16_font.png"}

];
game.ScoreObject = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
    },


    /* -----

     draw our score

     ------ */
    draw: function(context, x, y) {
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);

    }

});
game.SecondsRemainsHUD = me.HUD_Item.extend({
    init: function(x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("16x16_font", 16);
        this.font.set("right");
    },

    /* -----

     draw our score

     ------ */
    draw: function(context, x, y) {
        this.font.draw(context, parseFloat(this.value), this.pos.x + x, this.pos.y + y);
    }
});

game.DialogHUD = me.HUD_Item.extend({
	init: function(x, y, character_name, message_string) {
		this.parent(x, y);
		this.background = null;
		this.character = null;
		this.message = null;
		this.x_pos = x;
		this.y_pos = y;
		this.character_name = character_name;
		this.message_string = message_string;
		game.dialog = this;
	},

	draw: function(context, x, y) {
		this.background = me.loader.getImage("dialog");
		context.drawImage(this.background, this.x_pos, this.y_pos);
		this.character = me.loader.getImage(this.character_name);
		var character_y = this.y_pos+this.background.height-this.character.height;
		context.drawImage(this.character, this.x_pos, character_y);
		this.message = new me.BitmapFont("16x16_font", 16);
		this.message.draw(context, this.message_string, this.x_pos, this.y_pos)
	}
});
