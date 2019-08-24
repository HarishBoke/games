var keys = require('../utils/utils.keysDown.js'),
    mathHelpers = require('../utils/utils.math.js');

/** Player Module
 * Main player entity module.
 */
function Player(scope, x, y) {
    var player = this;

    // Create the initial state
    player.state = {
        position: {
            x: x,
            y: y
        },
        moveSpeed: 1.5
    };
  

    // Set up any other constants
    var height = 100,
        width = 50;


    // Draw the player on the canvas
    player.render = function playerRender() {
        //opt 3


        // opt 2: img
        var adiman = new Image();
        //adiman.setAttribute('id','admenImg');
        adiman.src = "../../assets/adiman.png";
        scope.context.drawImage(adiman, player.state.position.x, player.state.position.y, width, height);

        //opt 1
        // scope.context.fillRect(
        //     player.state.position.x,
        //     player.state.position.y,
        //     width, height
        // );

        
    };

    // Fired via the global update method.
    // Mutates state as needed for proper rendering next state
    player.update = function playerUpdate() {
        // Check if keys are pressed, if so, update the players position.
        if (keys.isPressed.left) {
            player.state.position.x -= player.state.moveSpeed;
        }

        if (keys.isPressed.right) {
            player.state.position.x += player.state.moveSpeed;
        }

        if (keys.isPressed.up) {
            player.state.position.y -= player.state.moveSpeed;
        }

        if (keys.isPressed.down) {
            player.state.position.y += player.state.moveSpeed;
        }

        // Bind the player to the boundary
        player.state.position.x = player.state.position.x.boundary(0, (scope.constants.width - width));
        player.state.position.y = player.state.position.y.boundary(0, (scope.constants.height - height));
    };

    return player;
}

module.exports = Player;