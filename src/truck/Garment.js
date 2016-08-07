/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Garment
 * @classdesc Create a new 'Garment' object.
 * @constructor
 * @extends Phaser.Image
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} x - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {number} y - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - The texture used by the Image during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture, BitmapData or PIXI.Texture.
 * @param {string|number} frame - If this Image is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
Fashion.Garment = function (game, x, y, key, garmentName, imageOffsetX, imageOffsetY, dropZones, coverage, bodyPartsToBlock)
{
    // call super constructor
    Phaser.Image.call(this, game, x, y, key, Fashion.Asset.AtlasPath.GARMENTS + garmentName + ".png");
    /**
     * @property {string} garmentName - The name of the garment.
     */
    this.garmentName = garmentName;
    /**
     * @property {array} targetDropZones - Array of Fashion.DropZone
     */
    this.targetDropZones = Fashion.DropZone.validateZones(dropZones, "Garment");
    /**
     * @property {object} coverage -
     */
    this.coverage = coverage;
    /**
     * @property {boolean} isTopLayer -
     */
    this.isTopLayer = (bodyPartsToBlock.length > 0);

    /**
     * @property {number} imageOffsetX -
     * @private
     */
    this.imageOffsetX = imageOffsetX || 0;
    /**
     * @property {number} imageOffsetY - 
     * @private
     */
    this.imageOffsetY = imageOffsetY || 0;
    /**
     * @property {boolean} isWorn -
     * @private
     */
    this.isWorn = false;

    // ? DressDuration
    // ? UndressDuration

    //-----------------------------------
    // Init
    //-----------------------------------
};

// extend class Phaser.Image
Fashion.Garment.prototype = Object.create(Phaser.Image.prototype);
Fashion.Garment.prototype.constructor = Fashion.Garment;

//============================================================
// Public interface
//============================================================

/**
 * Resets the Image. This places the Image at the given x/y world coordinates and then sets alive, exists, visible and renderable all to true.
 *
 * @method Fashion.Garment#reset
 * @memberof Fashion.Garment
 * @param {number} x - The x coordinate (in world space) to position the Image at.
 * @param {number} y - The y coordinate (in world space) to position the Image at.
 * @return (Fashion.Garment) This instance.
 */
Fashion.Garment.prototype.reset = function (x, y)
{
    Phaser.Image.prototype.reset.call(this, x, y);

    return this;
};
/**
 * Destroys the Image. This removes it from its parent group, destroys the input, event and animation handlers if present
 * and nulls its reference to game, freeing it up for garbage collection.
 *
 * @method Fashion.Garment#destroy
 * @memberof Fashion.Garment
 * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
 */
Fashion.Garment.prototype.destroy = function (destroyChildren)
{

    Phaser.Image.prototype.destroy.call(this, destroyChildren);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================
