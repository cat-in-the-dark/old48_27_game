/* Game namespace */
function PlayerStat(name){
    this.name = name;
    this.alive = true;
}
var panel = {
    // Run on page load.

    "init": function () {
        this.onResize = (function(that){
            return function(scale){

                var baseWidth = 200;
                var baseHeight = 480;
                var baseFontSize = 16;
//                console.log('videHeight:' + me.video.getWidth());
//                console.log('videoWidth:' + me.video.getHeight());
//                console.log('window width:' + window.innerWidth);
//                console.log('window height:' + window.innerHeight);
;
                console.log('scale:' + scale);

                that.titleSize = 32 * scale;
                that.context2d.canvas.width = baseWidth * scale;
                that.context2d.canvas.height = baseHeight * scale;
                that.fontSize = baseFontSize * scale;

                if(that.font){
                    //alert('scale font');
                    that.font.resize(scale);
                }
                if(that.fontCrossed){
                    //alert('scale font');
                    that.fontCrossed.resize(scale);
                }
//                 alert(this.titleSize);
                if(that.resourceLoaded != null && that.resourceLoaded){
                    //alert('draw');
                    that.draw();
            }

            }
        })(this);

        this.titleSize = 32;
        this.fontSize = 16;
        this.font = null;
        this.context2d = me.video.createCanvasSurface(200,480);

        document.getElementById('screen2').appendChild(this.context2d.canvas);
    },
    "resourceLoad" : function(deathList){
        this.font = new me.BitmapFont('16x16_font',16);
        this.font.set('left');
        this.font.resize(this.fontSize / 16);

        this.fontCrossed = new me.BitmapFont('16x16_font_crossed',16);
        this.fontCrossed.set('left');
        this.fontCrossed.resize(this.fontSize / 16);

        this.panelImage = (me.loader.getImage("panel-left"));

        this.resourceLoaded = true;
    },
    "draw" : function(){
        //alert('ts:' + this.titleSize);
        //нарисовали background
        this.context2d.drawImage(this.panelImage,
            0, 0,
            200, 480,
            0, 0,
            this.titleSize * 200 / 32, this.titleSize * 480 /32);

        //написали comrade
        this.font.draw(this.context2d, 'COMRADES', this.titleSize / 32 * 30, this.titleSize / 32 *8 );

        var currentY = 50;
        var x = 20;
        var lineInterval = 30;

        if(!this.deathNote)
            return;

        for(var i =0; i < this.deathNote.length; i++){
            var note = this.deathNote[i];
            if(note.alive == true)
                this.font.draw(this.context2d, note.name, this.titleSize / 32 * x, this.titleSize / 32 *currentY );
            else
                this.fontCrossed.draw(this.context2d,note.name, this.titleSize / 32 * x, this.titleSize / 32 *currentY );
            currentY +=  lineInterval;
        }
    },
    "setPayload" : function(deathList){
        this.deathNote = [];

        for(var  i=0; i< deathList.length; i++)
            this.deathNote.push( new PlayerStat(deathList[i]));
    },
    "kill" : function(name){
        for(var i =0; i < this.deathNote.length; i++){
            var note = this.deathNote[i];
            if(note.name == name)
                note.alive = false;
        }
    }
};
me.game.COMRADE_OBJECT = 10;
var game = {
    // Run on page load.
    comrads: [],
    sam: null,
    bomb: null,
    other_canvas : null,      

    onload: function () {

        //registry panel resize callback to video engine
        panel.init();
        me.video.panelResize = panel.onResize;

        // Initialize the video.
        if (!me.video.init("screen", 640, 480, true, 'auto')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        if (document.location.hash === "#debug") {
            window.onReady(function () {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }
        me.debug.renderHitBox = true;
        // Initialize the audio.
        me.audio.init("mp3,ogg");
        //Import entities

        me.entityPool.add("bomb",game.BombEntity);
        me.entityPool.add("sam",game.Sam);
        me.entityPool.add("comrad",game.Comrad);

        // bind keys
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded: function () {
      panel.resourceLoad();
      //panel.kill('PABLO');

      //покрасим панель
      panel.draw();

      me.state.set(me.state.MENU, new game.TitleScreen());
      me.state.set(me.state.PLAY, new game.PlayScreen());
      me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
      me.state.set(me.state.GAME_END, new game.GameEndScreen());

      // Start the game.
      //me.state.change(me.state.MENU);
      me.state.change(me.state.PLAY);
    }
};
