/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.ClickableScreen
 *
 * @classdesc Create a new 'ClickableScreen' object.
 * @constructor
 * @extends Fashion.Screen
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
 * @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
Fashion.ClickableScreen = function (game, key, parent, name, addToStage, enableBody, physicsBodyType)
{
    // call super constructor
    Fashion.Screen.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    /**
     * @property {Phaser.Image} bg - Background, temporarily as Graphics-object.
     * @private
     */
    this.bg = this.game.make.image(0, 0, key);
    /**
     * @property {Phaser.Signal} onInputDown - Fires when the screen was clicked.
     */
    this.onInputDown = new Phaser.Signal();
    //-----------------------------------
    // Init
    //-----------------------------------
    // add background & stretch it to screen size
    this.add(this.bg);

    this.bg.inputEnabled = true;
    this.bg.events.onInputDown.add(this.handleInputDown, this);
};

// extend class Fashion.Screen
Fashion.ClickableScreen.prototype = Object.create(Fashion.Screen.prototype);
Fashion.ClickableScreen.prototype.constructor = Fashion.ClickableScreen;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.ClickableScreen#destroy
 * @memberof Fashion.ClickableScreen
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.ClickableScreen.prototype.destroy = function (destroyChildren, soft)
{

    Fashion.Screen.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 *
 *
 * @method Fashion.ClickableScreen#handleInputDown
 * @memberof Fashion.ClickableScreen
 * @private
 */
Fashion.ClickableScreen.prototype.handleInputDown = function ()
{
    this.onInputDown.dispatch();

    Fashion.playSound(Fashion.Asset.Sound.BTN_CLICK);
};
//============================================================
// Implicit getters and setters
//============================================================

