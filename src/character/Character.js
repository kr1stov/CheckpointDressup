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
    this.scale.setTo(Fashion.scaleFactorCharacter);
    /**
     * @property {Object} dropZones -
     * @private
     */
    this.dropZones = {};
    /**
     * @property {array} blockedBodyParts -
     * @private
     */
    this.blockedBodyParts = [];
    /**
     * @property {array} garments -
     * @private
     */
    this.garments = [];
    /**
     * @property {object} coverage -
     */
    this.coverage = {};
    //-----------------------------------
    // Init
    //-----------------------------------

    // translate objects into rectangles
    var zone;
    for (var key in dropZones)
    {
        zone = dropZones[key];
        this.dropZones[key] = new Phaser.Rectangle(zone.x, zone.y, zone.width, zone.height);
    }
    this.initCoverage();

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

/**
 *
 *
 * @method Fashion.Character#hitsDropZone
 * @memberof Fashion.Character
 */
Fashion.Character.prototype.hitsDropZone = function (point, zone)
{
    for (var key in this.dropZones)
    {
        if (key == zone && Phaser.Rectangle.containsPoint(this.dropZones[key], point))
        {
            return true;
        }
    }
    return false;
};
/**
 *
 *
 * @method Fashion.Character#wearGarment
 * @memberof Fashion.Character
 */
Fashion.Character.prototype.wearGarment = function (garment)
{
    if (this.isCoveragePossible(garment))
    {
        garment.isWorn = true;
        this.positionGarment(garment);
        this.stackGarment(garment);
        this.updateCoverage();
        if (garment.isTopLayer)
        {
            this.blockBodyParts(garment);
        }
        return true;
    }
    return false;
};
/**
 *
 *
 * @method Fashion.Character#takeOffGarment
 * @memberof Fashion.Character
 */
Fashion.Character.prototype.takeOffGarment = function (garment)
{
    garment.isWorn = false;

    this.removeGarment(garment);
    this.updateCoverage();

    this.unblockBodyParts(garment);
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
        //Log.debug("zone key: " + key, rect.x, rect.y, rect.width, rect.height);

        zone.beginFill(0xff0000, 0.5);
        zone.drawRect(0, 0, rect.width, rect.height);

        this.addChild(zone);
    }
};
/**
 *
 *
 * @method Fashion.Character#positionGarment
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.positionGarment = function (garment)
{
    if (garment)
    {
        garment.x = this.x + (garment.imageOffsetX) * Fashion.scaleFactorCharacter;
        garment.y = this.y + (garment.imageOffsetY) * Fashion.scaleFactorCharacter + garment.height / 2;
    }
};
/**
 *
 *
 * @method Fashion.Character#blockBodyParts
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.blockBodyParts = function (garment)
{
    for (var key in garment.coverage)
    {
        this.blockedBodyParts.push(key);
    }
};
/**
 *
 *
 * @method Fashion.Character#unblockBodyParts
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.unblockBodyParts = function (garment)
{
    for (var key in garment.coverage)
    {
        var n = this.blockedBodyParts.length;
        var i;
        var part;
        for (i = n; --i >= 0;)
        {
            part = this.blockedBodyParts[i];
            if (this.blockedBodyParts[i] == key)
            {
                this.blockedBodyParts.splice(i,1);
            }
        }
    }
};
/**
 *
 *
 * @method Fashion.Character#isCoveragePossible
 * @memberof Fashion.Character
 */
Fashion.Character.prototype.isCoveragePossible = function (garment)
{
    for (var key in garment.coverage)
    {
        var n = this.blockedBodyParts.length;
        var i;
        for (i = n; --i >= 0;)
        {
            if (key == this.blockedBodyParts[i])
            {
                Log.error("Cannot place garment '" + garment.garmentName + "' becuase body part " + key + " is already blocked.");
                return false;
            }
        }
    }
    return true;
};

/**
 * 
 *
 * @method Fashion.Character#stackGarment
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.stackGarment = function (garment)
{
    var n = this.garments.length;
    var i;
    for (i = 0; i < n; i++)
    {
        if (garment == this.garments[i])
        {
            return;
        }
    }
    this.garments.push(garment);
};
/**
 *
 *
 * @method Fashion.Character#removeGarment
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.removeGarment = function (garment)
{
    var n = this.garments.length;
    var i;
    for (i = n; --i >= 0;)
    {
        if (garment == this.garments[i])
        {
            this.garments.splice(i,1);
            return true;
        }
    }
    return false;
};
/**
 *
 *
 * @method Fashion.Character#initCoverage
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.initCoverage = function ()
{
    // init coverage
    var n = Fashion.BodyPart.Parts.length;
    var i;
    for (i = n; --i >= 0;)
    {
        this.coverage[Fashion.BodyPart.Parts[i]] = Fashion.ClothingStyle.EXPOSED;
    }
};
/**
 *
 *
 * @method Fashion.Character#updateCoverage
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.updateCoverage = function ()
{
    this.initCoverage();

    var n = this.garments.length;
    var i;
    var coverage;
    for (i = 0; i < n; i++)
    {
        coverage = this.garments[i].coverage;
        for (var key in coverage)
        {
            this.coverage[key] = coverage[key];
        }
    }

    if (Fashion.debug)
    {
        this.dumpCoverage();
    }
};

/**
 *
 *
 * @method Fashion.Character#dumpCoverage
 * @memberof Fashion.Character
 * @private
 */
Fashion.Character.prototype.dumpCoverage = function ()
{
    Log.debug("-------");
    Log.debug("Current coverage is: ");
    for (var key in this.coverage)
    {
        Log.debug(key + ": " + this.coverage[key]);
    }
    Log.debug("-------");
};
//============================================================
// Implicit getters and setters
//============================================================

