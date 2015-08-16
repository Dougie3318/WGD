/**
 * Created by Douglas on 15/08/2015.
 */

//This will initiate Phaser and creates a game with the specified dimensions
var game = new Phaser.Game(400,490, Phaser.AUTO, 'gameDiv');

//This is the main state and it will contain the game.
var mainState = {

    preload: function () {

        //Change the background colour
        game.stage.backgroundColor = '#71c5cf';

        //This loads the image for character
        game.load.image('bird', 'Web-Game-Development/assets/bird.png');
        game.load.image('pipe', 'Web-Game-Development/assets/pipe.png');

    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.Arcade);

        this.bird = this.game.add.sprite(100, 245, 'bird');

        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        this.bird.anchor.setTo(-0.2, 0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');

        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});
    },

    update: function () {

        if (this.bird.inWorld == false)
            this.restartGame();

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        if (this.bird.angle < 20) this.bird.angle += 1;

    },

    jump: function () {

        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        var animation = game.add.tween(this.bird);

        animation.to({angle: -20}, 100);

        animation.start();
    },


    hitPipe: function () {

        if (this.bird.alive == false)
            return;

        this.bird.alive = false;

        game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function () {

        game.state.start('main');

    },

    addOnePipe: function (x, y) {

        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);

        pipe.body.velocity.x = -200;

        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {

        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) this.addOnePipe(400, i * 60 + 10);

        this.score += 1;
        this.labelScore.text = this.score;


    },


};

//This will add and start the main state and will then start the game
game.state.add('main', mainState);
game.state.start('main');