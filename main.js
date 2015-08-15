/**
 * Created by Douglas on 15/08/2015.
 */

//This will initiate Phaser and creates a game with the specified dimensions
var game = new Phaser.Game(400,490, Phaser.AUTO, 'gameDiv');

//This is the main state and it will contain the game.
var mainState = {

    preload: function() {

        //Change the background colour
       game.stage.backgroundColor = '#71c5cf';

        //This loads the image for character
       game.load.image('bird', 'assets/bird.png');

    },

    create: function(){

        game.physics.startSystem(Phaser.Physics.Arcade);

        this.bird = this.game.add.sprite(100, 245, 'bird');

        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
    },

    update: function(){

        if(this.bird.inWorld == false)
           this.restartGame();

    },

    jump: function(){
        this.bird.body.velocity.y = -350;
    },

    restartGame: function(){
        game.state.start('main');

    }

};

//This will add and start the main state and will then start the game
game.state.add('main', mainState);
game.state.start('main');