/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.DressUpSpace
 *
 * @classdesc Create a new 'DressUpSpace' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
 * @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
Fashion.DressUpSpace = function (game, key, dropZones, parent, name, addToStage, enableBody, physicsBodyType)
{
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    /**
     * @property {Phaser.Image} bg -
     */
    this.bg = this.game.make.image(0, 0, key, Fashion.Asset.Image.DRESS_UP_BG);
    /**
     * @property {Fashion.Truck} truck -
     * @private
     */
    this.truck = new Fashion.Truck(game, key, dropZones);
    //-----------------------------------
    // Init
    //-----------------------------------
    this.add(this.bg);
    this.add(this.truck);

    this.truck.x = Math.round((this.bg.width - this.truck.width) / 2);
    this.truck.y = Math.round((this.bg.height - this.truck.height) / 2);
};

// extend class Phaser.Group
Fashion.DressUpSpace.prototype = Object.create(Phaser.Group.prototype);
Fashion.DressUpSpace.prototype.constructor = Fashion.DressUpSpace;

//============================================================
// Public interface
//============================================================
/**
 * 
 *
 * @method Fashion.DressUpSpace#initialize
 * @memberof Fashion.DressUpSpace
 */
Fashion.DressUpSpace.prototype.setup = function (garments)
{
    this.truck.setup(garments);
};
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.DressUpSpace#destroy
 * @memberof Fashion.DressUpSpace
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.DressUpSpace.prototype.destroy = function (destroyChildren, soft)
{

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

