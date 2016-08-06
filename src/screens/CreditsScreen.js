/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.CreditsScreen
 *
 * @classdesc Create a new 'Credits' object.
 * @constructor
 * @extends Fashion.ClickableScreen
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
 * @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
Fashion.CreditsScreen = function (game, parent, name, addToStage, enableBody, physicsBodyType)
{
    // call super constructor
    Fashion.ClickableScreen.call(this, game, Fashion.Asset.Image.CREDITS_BG, parent, name, addToStage, enableBody, physicsBodyType);

};

// extend class Fashion.ClickableScreen
Fashion.CreditsScreen.prototype = Object.create(Fashion.ClickableScreen.prototype);
Fashion.CreditsScreen.prototype.constructor = Fashion.CreditsScreen;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.Credits#destroy
 * @memberof Fashion.Credits
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.CreditsScreen.prototype.destroy = function (destroyChildren, soft)
{

    Fashion.ClickableScreen.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

/**
 * Created by mwacker on 06.08.16.
 */
