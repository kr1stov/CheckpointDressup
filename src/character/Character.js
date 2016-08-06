/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Character
 * @classdesc Create a new 'Character' object.
 * @constructor
 * @extends Phaser.Sprite
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} x - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {number} y - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - The texture used by the Image during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture, BitmapData or PIXI.Texture.
 * @param {string|number} frame - If this Image is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
Fashion.Character = function (game, x, y, key, dropZones)
{
    // call super constructor
    Phaser.Sprite.call(this, game, x, y, key, Fashion.Asset.Image.CHARACTER_BASE);
    /**
     * @property {Object} dropZones -
     * @private
     */
    this.dropZones = dropZones;

    if (Fashion.debug)
    {
        this.drawDropZones();
    }
};

// extend class Phaser.Sprite
Fashion.Character.prototype = Object.create(Phaser.Sprite.prototype);
Fashion.Character.prototype.constructor = Fashion.Character;

//============================================================
// Public interface
//============================================================

/**
 * Resets the Image. This places the Image at the given x/y world coordinates and then sets alive, exists, visible and renderable all to true.
 *
 * @method Fashion.Character#reset
 * @memberof Fashion.Character
 * @param {number} x - The x coordinate (in world space) to position the Image at.
 * @param {number} y - The y coordinate (in world space) to position the Image at.
 * @return (Fashion.Character) This instance.
 */
Fashion.Character.prototype.reset = function (x, y)
{
    Phaser.Sprite.prototype.reset.call(this, x, y);

    return this;
};
/**
 * Destroys the Image. This removes it from its parent group, destroys the input, event and animation handlers if present
 * and nulls its reference to game, freeing it up for garbage collection.
 *
 * @method Fashion.Character#destroy
 * @memberof Fashion.Character
 * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
 */
Fashion.Character.prototype.destroy = function (destroyChildren)
{

    Phaser.Sprite.prototype.destroy.call(this, destroyChildren);
};
//============================================================
// Private methods
//============================================================
/**
 *
 *
 * @method Fashion.Character#drawDropZones
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.drawDropZones = function ()
{
    var rect;
    var zone;
    for (var key in this.dropZones)
    {
        rect = this.dropZones[key];
        zone = this.game.make.graphics(rect.x, rect.y);
        Log.debug("zone key: " + key, rect.x, rect.y, rect.width, rect.height);

        zone.beginFill(0xff0000, 0.5);
        zone.drawRect(0, 0, rect.width, rect.height);

        this.addChild(zone);
    }
};
//============================================================
// Implicit getters and setters
//============================================================

