game.PlayScreen = me.ScreenObject.extend({
    init: function() {
        this.parent(true);
    },
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        me.game.addHUD(0, 0, 960, 480);
        // add a new HUD item
        me.game.HUD.addItem("secondToDie", new game.SecondsRemainsHUD(900,10));
        var message_intro = "WELCOME, COMMRAD! PREPARE TO HELL! PRESS ENTER TO HIDE THIS MESSAGE." +
            " TRATATA TRATATA MY VEZEM S SOBOJ KOTA!!!";
        this.dialogHUD = new game.DialogHUD(0, 320, "character_general", message_intro)
        me.game.HUD.addItem("dialogHUD", this.dialogHUD);
        me.game.HUD.addItem("panel-top", new me.SpriteObject(0, 0, me.loader.getImage("panel-top")));
       //me.game.HUD.addItem("lol", new game.panel());
        //me.game.HUD.addItem("score2", new game.ScoreObject(300, 10));
        me.game.HUD.updateItemValue("secondToDie", 8.8);

        //me.game.HUD.addItem("ui", new game.UI());
        //me.game.HUD.add(new game.HUD_Heart(0,0));

        // make sure everything is in the right order
        me.game.sort();
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.levelDirector.loadLevel("area1");
    },

    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.game.HUD.removeItem("dialogHUD");
        }
        return true;
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function () {
        ; // TODO
        // remove the HUD
        me.game.disableHUD();
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});
