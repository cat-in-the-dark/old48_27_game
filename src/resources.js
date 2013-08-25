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
	{name: "character_general", type: "image", src: "resources/img/character_general.png"},
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
		var background_offset = 100; //px
		var background_x = this.x_pos + background_offset;
		var background_y = this.y_pos;
		context.drawImage(this.background, background_x, background_y);
		this.message = new me.BitmapFont("16x16_font", 16);
		this.character = me.loader.getImage(this.character_name);
		var character_x = this.x_pos;
		var character_y = this.y_pos+this.background.height-this.character.height;
		
		// operations with text
		var available_width = (background_x + this.background.width) - (character_x+this.character.width);
		this.message_string = this.insertNewlines(context, this.message_string, available_width);
		var offset_text_x = 5;
		var space_between_strings = 1.1; //default: 1.0 - without spaces
		this.message.lineHeight = space_between_strings;
		var text_height = this.message.measureText(context, this.message_string).height;
		var text_width = this.message.measureText(context, this.message_string).width;
		var text_x = this.x_pos + this.character.width;
		var text_y = this.y_pos + (this.background.height - text_height)/2;
		console.log(text_height, this.background.height);
		context.drawImage(this.character, character_x, character_y);
		this.message.draw(context, this.message_string, text_x, text_y);

	},

	insertNewlines: function(context, message_string, available_width) {
		function insert(index, source_string, string) {
			if (index > 0){
				return source_string.substring(0, index) + string + source_string.substring(index, source_string.length);
			} else {
				return string + source_string;
			}
		}
		var words = message_string.split(' ');
		var preserve_newline = new Array();

		for(var i=0; i < words.length; i++) {
			var lastchar = words[i].charAt(words[i].length-1);
			if (lastchar != '\n') {
				preserve_newline[i] = false;
				words[i] += '\n';
			} else {
				preserve_newline[i] = true;
			}
		}

		var str = "";
		for(var i=0; i< words.length; i++) {
			str = "";
			if (preserve_newline[i])
				continue;
			words[i] = words[i].substring(0, words[i].length-1);
			
			for (var j=0; j< words.length; j++) {
				if ((j >0) && (words[j-1].charAt(words[j-1].length-1) != '\n'))
					str += ' ';
				str += words[j];
			}

			var message_width = this.message.measureText(context, str).width;
			if (message_width > available_width) {
				words[i] += '\n';
			}
		}

		console.log(str);
		return str;
	}
});
