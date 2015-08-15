/**
 * Created by Douglas on 15/08/2015.
 */

//This will initiate Phaser and creates a game with the specified dimensions
var game = new Phaser.Game(400,490, Phaser.AUTO, 'gameDiv');

//This is the main state and it will contain the game.
var mainState = {

    preload: function(){

    },

    create: function(){

    },

    update: function(){

    },
};

//This will add and start the main state and will then start the game
game.state.add('main', mainState);
game.state.start('main');