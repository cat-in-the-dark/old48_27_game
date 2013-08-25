function PlayerStat(name) {
    this.name = name;
    this.alive = true;
}
game.panel = {
    // Run on page load.

    "init": function () {
        this.onResize = (function (that) {
            return function (scale) {

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

                if (that.font) {
                    //alert('scale font');
                    that.font.resize(scale);
                }
                if (that.fontCrossed) {
                    //alert('scale font');
                    that.fontCrossed.resize(scale);
                }
//                 alert(this.titleSize);
                if (that.resourceLoaded != null && that.resourceLoaded) {
                    //alert('draw');
                    that.draw();
                }

            }
        })(this);

        this.titleSize = 32;
        this.fontSize = 16;
        this.font = null;
        this.context2d = me.video.createCanvasSurface(200, 480);

        document.getElementById('screen2').appendChild(this.context2d.canvas);
    },
    "resourceLoad": function (deathList) {
        this.font = new me.BitmapFont('16x16_font', 16);
        this.font.set('left');
        this.font.resize(this.fontSize / 16);

        this.fontCrossed = new me.BitmapFont('16x16_font_crossed', 16);
        this.fontCrossed.set('left');
        this.fontCrossed.resize(this.fontSize / 16);

        this.panelImage = (me.loader.getImage("panel-left"));

        this.resourceLoaded = true;
    },
    "draw": function () {
        //alert('ts:' + this.titleSize);
        //нарисовали background
        this.context2d.drawImage(this.panelImage,
            0, 0,
            200, 480,
            0, 0,
            this.titleSize * 200 / 32, this.titleSize * 480 / 32);

        //написали comrade
        this.font.draw(this.context2d, 'COMRADES', this.titleSize / 32 * 30, this.titleSize / 32 * 8);

        var currentY = 50;
        var x = 20;
        var lineInterval = 30;

        if (!this.deathNote)
            return;

        for (var i = 0; i < this.deathNote.length; i++) {
            var note = this.deathNote[i];
            if (note.alive == true)
                this.font.draw(this.context2d, note.name, this.titleSize / 32 * x, this.titleSize / 32 * currentY);
            else
                this.fontCrossed.draw(this.context2d, note.name, this.titleSize / 32 * x, this.titleSize / 32 * currentY);
            currentY += lineInterval;
        }
    },
    "setPayload": function (deathList) {
        this.deathNote = [];

        for (var i = 0; i < deathList.length; i++)
            this.deathNote.push(new PlayerStat(deathList[i]));
    },
    "kill": function (name) {
        name = name.toUpperCase();
        for (var i = 0; i < this.deathNote.length; i++) {
            var note = this.deathNote[i];
            if (note.name == name)
                note.alive = false;
        }
    }
    clear: function(){
        this.deathNote = [];
        this.draw();
    }
};
