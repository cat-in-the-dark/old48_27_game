/* Game namespace */
var game = {
    // Run on page load.
    comrads: [],
    sam: null,
    other_canvas: null,
    nGranades: 30,
    bomb: null,
    timerPaused: true,


    onload: function () {

        //registry panel resize callback to video engine
        game.panel.init();
        me.video.panelResize = game.panel.onResize;

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

        me.entityPool.add("bomb", game.BombEntity);
        me.entityPool.add("sam", game.Sam);
        me.entityPool.add("comrad", game.Comrad);

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
        game.panel.resourceLoad();
        //panel.kill('PABLO');

        //покрасим панель
        //game.panel.draw();
        game.panel.resetBackround();

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAMEOVER, new game.GameOverScreen());
        me.state.set(me.state.GAME_END, new game.GameEndScreen());

        // Start the game.
        //me.state.change(me.state.MENU);
        me.state.change(me.state.PLAY);
    }
};
