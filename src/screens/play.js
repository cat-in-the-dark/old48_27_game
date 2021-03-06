function Task(role, text){
    this.role = role;
    this.text = text;
}
game.PlayScreen = me.ScreenObject.extend({

    stack : [],

    init: function () {
        this.parent(true);
        game.playScreen = this;
    },
    pushMessage: function(role, text){
        this.stack.push(new Task(role, text));
    },
    iterate : function(){

        this.iterating = true;
        game.timerPaused = true;

        var task = this.stack.shift();
        if(task == undefined || task == null){
            this.iterating = false;
            game.timerPaused = false;
            return;
        }
        var image;
        switch (task.role){
            case game.config.roles.General : image = "character_general";   break;
            case game.config.roles.Girl : image = "character_girl";   break;
        }
        //alert(task.text);
        me.game.HUD.addItem("dialogHUD", new game.DialogHUD(0, 320, image, task.text));
    },
    clear: function (){
        this.stack.clear();
        me.game.HUD.removeItem("dialogHUD");
    }
    ,
    /**
     *  action to perform on state change
     */
    onResetEvent: function () {
        game.nGranades = 10;

        me.game.addHUD(0, 0, 960, 480);
        // add a new HUD item
        me.game.HUD.addItem("secondsToDie", new game.SecondsRemainsHUD(600, 10));
        me.game.HUD.setItemValue("secondsToDie", 10);

        me.game.HUD.addItem("grenadesRemains", new game.GranadesRemainsHUD(500, 10));
        me.game.HUD.setItemValue("grenadesRemains", game.nGranades);

//        me.game.HUD.addItem("grenadesRemainsIcon", new game.GranadesRemainsHUD(450,10));





        //me.game.HUD.addItem("lol", new game.panel());
        //me.game.HUD.addItem("score2", new game.ScoreObject(300, 10));
        //me.game.HUD.updateItemValue("secondToDie", 8.8);

        //me.game.HUD.addItem("ui", new game.UI());
        //me.game.HUD.add(new game.HUD_Heart(0,0));

        // make sure everything is in the right order
        me.game.sort();
       // me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.levelDirector.loadLevel("area1");

        var names = [];
        //alert(game.comrads[0]);
        for (var i = 0; i < game.comrads.length; i++) {
            names.push(game.comrads[i].nickname.toUpperCase());
        }
        //alert(names);
        game.panel.setPayload(game.comrads.map(function(el){
            return el.nickname;
        }));
        //panel.kill('PABLO');
        game.panel.draw();

        //push first message
        this.pushMessage(game.config.roles.General, "Hello Sam! Congrats on landing in target square! Clear this site, comrade!".toUpperCase());
        this.pushMessage(game.config.roles.Girl, "Ohh.. My Gen, bad news for you! Mr, Prapor ".toUpperCase() +
            "stole 300 gallons of fuel again!".toUpperCase());
        this.pushMessage(game.config.roles.General, "Arrrgh! I cant believe it! That was the".toUpperCase()  +
            " last drop! Where is my RED_BUTTON? I need relaxation".toUpperCase());
        this.pushMessage(game.config.roles.Girl, "But I can...".toUpperCase());
        this.pushMessage(game.config.roles.General, "NO!".toUpperCase());
        this.pushMessage(game.config.roles.Girl, "Sammy, be careful! He is going crazy! ".toUpperCase()  +
            "Nobody knows what he will do with RED_BUTTON!".toUpperCase());
        this.pushMessage(game.config.roles.General, "Nice to meet you again, Sammy! I see you still alive!".toUpperCase()  +
            " I'm curious how fast you can run! I have 30 rockets and you have 10 seconds! Good luck, Save the comrades".toUpperCase());


        this.iterate();
        var shadow = new game.ShadowEntity();
        me.game.add(shadow,game.config.SHADOW_LEVEL);
        me.game.sort();//MAGICK
        if (game.interval){
            clearTimeout(game.interval);
        }
        game.interval = setInterval(function () {
            if(game.timerPaused)
                return;
            var remains = parseFloat(me.game.HUD.getItemValue("secondsToDie"));
            remains -= 1;
            if (remains <= 0) {
                // call timeToDie!;
                game.nGranades--;
                me.game.HUD.setItemValue("grenadesRemains", game.nGranades);
                if (game.nGranades <= 0){
                    me.state.change(me.state.GAME_END);
                    return;
                }
                remains = 10;
                shadow.bum();
            }
        
            me.game.HUD.setItemValue("secondsToDie", remains);
            //me.game.HUD.updateItemValue("secondsToDie", -0.1);
        }, 1000);
    },
    next : function(){
        me.game.HUD.removeItem("dialogHUD");
        this.iterate();

    },

    update: function () {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
           // console.log("press");
            if(this.iterating){
             //   console.log("next");
                this.next();
            }
        }
        if (!game.shadow.inViewport){
            game.shadow.update();
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
        //me.input.unbindKey(me.input.KEY.ENTER);
    }
});
