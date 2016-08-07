/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Truck
 *
 * @classdesc Create a new 'Truck' object.
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
Fashion.Truck = function (game, key, dropZones, garments, parent, name, addToStage, enableBody, physicsBodyType)
{
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    /**
     * @property {Phaser.BitmapText} bg - Background
     */
    this.bg = this.game.make.image(0, 0, key, Fashion.Asset.Image.TRUCK_BG);
    /**
     * @property {Fashion.Character} character -
     * @private
     */
    this.character = new Fashion.Character(game, 0, 0, key, dropZones);
    /**
     * @property {array} garments - All of the garments
     * @private
     */
    this.garments = {};
    //-----------------------------------
    // Init
    //-----------------------------------
    this.add(this.bg);
    this.add(this.character);

    this.character.anchor.setTo(0.5, 0);

    this.character.x = this.bg.width / 2;
    this.character.y = this.bg.height * 0.1;

    // render all of the garments
    this.renderGarments(garments);
};

// extend class Phaser.Group
Fashion.Truck.prototype = Object.create(Phaser.Group.prototype);
Fashion.Truck.prototype.constructor = Fashion.Truck;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.Truck#destroy
 * @memberof Fashion.Truck
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.Truck.prototype.destroy = function (destroyChildren, soft)
{

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 *
 *
 * @method Fashion.Truck#renderGarments
 * @memberof Fashion.Truck
 * @private
 */
Fashion.Truck.prototype.renderGarments = function (garments)
{
    var garment, data;
    for (var key in garments)
    {
        data = garments[key];
        garment = new Fashion.Garment(
            this.game,
            0,0,
            Fashion.Asset.TextureAtlas.GAME,
            key,
            data.dropZones,
            data.coverage,
            data.bodyPartsBlocked
        );
        this.garments[key] = garment;
        this.addChild(garment);
        // make garments dragable
        garment.inputEnabled = true;
        garment.input.enableDrag();
        garment.events.onDragStart.add(this.startGarmentDrag, this);
        garment.events.onDragStop.add(this.stopGarmentDrag, this);
        // TODO limit drag bounds to truck
    }
    this.character.bringToTop();
};
/**
 *
 *
 * @method Fashion.Truck#starGarmentDrag
 * @memberof Fashion.Truck
 * @private
 */
Fashion.Truck.prototype.startGarmentDrag = function (target)
{
    Log.debug(target.garmentName);
    target.bringToTop();
};
/**
 *
 *
 * @method Fashion.Truck#stopGarmentDrag
 * @memberof Fashion.Truck
 * @private
 */
Fashion.Truck.prototype.stopGarmentDrag = function (target, pointer)
{
    // TODO make hit tests
    //Log.debug(pointer.x, pointer.y);
    //this.character.hitsDropZone(pointer.x, pointer.y, Fashion.DropZone.UPPER_BODY);
    //Log.debug(p.x, p.y);

};
//============================================================
// Implicit getters and setters
//============================================================
