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

        //Initiate the Phaser Physics system
        game.physics.startSystem(Phaser.Physics.Arcade);

        //Creates the bird and starts the fall effect
        this.bird = this.game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        //Anchor position to keep bird upright.
        this.bird.anchor.setTo(-0.2, 0.5);

        //Control for the game (spacebar on keyboard)
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        //Creates the pipes and and gets rid of dead ones of world screen
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        //Where the score will be
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});
    },

    update: function () {

        //Check for bird on screen
        if (this.bird.inWorld == false)
            this.restartGame();

        //Collision with pipe check
        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        //Rotates bird downwards towards the right and up to a certain point
        if (this.bird.angle < 20) this.bird.angle += 1;

    },

    jump: function () {

        //Check to see if bird is dead, if so no jump
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        //Jump animation for the bird
        var animation = game.add.tween(this.bird);
        animation.to({angle: -20}, 100);
        animation.start();
    },


    hitPipe: function () {

        //Check to see if bird has hit pipe if so then do nothing
        if (this.bird.alive == false)
            return;

        //Sets the alive property of the bird to false
        this.bird.alive = false;

        //Prevents new pipes from spawning
        game.time.events.remove(this.timer);

        //Go through all the pipes and stops their movement
        this.pipes.forEachAlive(function (p) {
            p.body.velocity.x = 0;
        }, this);
    },


    restartGame: function () {
        //Start main state to restart the game
        game.state.start('main');
    },

    addOnePipe: function (x, y) {

        //Gets the first dead pipe from out of bounds
        var pipe = this.pipes.getFirstDead();

        //Sets the new position for the pipe
        pipe.reset(x, y);

       //Makes it move to the left
        pipe.body.velocity.x = -200;

        //Kill The pipe when it has went out of bounds
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function () {

        //Adds a row of 6 pipes with a hole appearing somewhere in the middle
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