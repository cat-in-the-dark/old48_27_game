// Base person.
game.Comrad = me.ObjectEntity.extend({
    init: function (x, y, settings) {
        settings.image = "comrad";
        this.parent(x, y, settings);
        this.nickname = settings.nickname || "Charly";

        this.gravity = 0.0;
        this.origVelocity = new me.Vector2d(5.0, 5.0);
        this.setVelocity(this.origVelocity.x, this.origVelocity.y);
        this.setFriction(0.55, 0.55);

        this.range = Math.random() * game.config.circleDist + game.config.minDist;
        // this.updateColRect(-1, 0, 4, 30);

        this.directionString = "up";
        var directions = [ "up", "right", "down", "left" ];

        for (var i = 0; i < directions.length; i++) {
            var index = i * 3;
            this.renderable.addAnimation(directions[ i ] + "idle", [ index + 2 ]);
            this.renderable.addAnimation(directions[ i ] + "run",
                [ index + 1, index ]);
        }
        this.renderable.setCurrentAnimation(this.directionString + "idle");
        this.renderable.animationspeed = 5;

        this.type = me.game.COMRADE_OBJECT;
        game.comrads.push(this);
        this.index = game.comrads.indexOf(this);
        this.posX = (this.index % game.config.rowLength + 1) * 48;
        this.posY = Math.floor(this.index / game.config.rowLength + 1) * 48;
    },

    checkMovement: function () {
        var dist = this.distanceTo(game.sam);
        var distX = Math.cos(this.angleTo(game.sam)) * dist;
        var distY = Math.sin(this.angleTo(game.sam)) * dist;
        if (Math.abs(distX) > this.posX) {
            this.vel.x += (distX > 0.0) ? this.accel.x * me.timer.tick : -this.accel.x * me.timer.tick;
        }
        if (Math.abs(distY) > this.posY) {
            this.vel.y += (distY > 0.0) ? this.accel.y * me.timer.tick : -this.accel.y * me.timer.tick;
        }
        this.directionString = game.sam.directionString;
    },

    updateAnimation: function () {
        if (this.vel.x != 0.0 || this.vel.y != 0.0) {
            this.renderable.setCurrentAnimation(this.directionString + "run");
        } else {
            this.renderable.setCurrentAnimation(this.directionString + "idle");
        }
    },

    update: function () {
        this.checkMovement();
        this.updateAnimation();

        this.updateMovement();

        this.parent(this);
        return true;
    }
});