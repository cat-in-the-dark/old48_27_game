game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	{name: "maptile1",  type: "image", src: "resources/img/maptile1.png"},
	{name: "sam", type: "image", src: "resources/img/sam.png"},
  {name: "comrad", type: "image", src: "resources/img/comrad.png"},
  {name: "panel-top", type: "image", src: "resources/img/panel.png"},
	{name: "welcome_screen", type: "image", src: "resources/img/welcome_screen.png"},
	{name: "gameover_screen", type: "image", src: "resources/img/gameover_screen.png"},
	//enemies
	{name: "tempenemy", type: "image", src: "resources/img/tempenemy.png" },
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
