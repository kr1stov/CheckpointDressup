/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Screen
 *
 * @classdesc Create a new 'Screen' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 */
Fashion.Screen = function (game, parent)
{
    // call super constructor
    Phaser.Group.call(this, game, parent);


};

// extend class Phaser.Group
Fashion.Screen.prototype = Object.create(Phaser.Group.prototype);
Fashion.Screen.prototype.constructor = Fashion.Screen;

//============================================================
// Public interface
//============================================================
/**
 * Show this screen.
 *
 * @method Fashion.Screen#show
 * @memberof Fashion.Screen
 */
Fashion.Screen.prototype.show = function ()
{
    this.visible = true;
};
/**
 * Hides this screen.
 *
 * @method Fashion.Screen#hide
 * @memberof Fashion.Screen
 */
Fashion.Screen.prototype.hide = function ()
{
    this.visible = false;
};
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.Screen#destroy
 * @memberof Fashion.Screen
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.Screen.prototype.destroy = function (destroyChildren, soft)
{

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

