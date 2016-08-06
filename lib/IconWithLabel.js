/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.IconWithLabel
 * @classdesc Create a new 'IconWithLabel' object.
 * @constructor
 * @extends Phaser.Image
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {number} x - The x coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {number} y - The y coordinate of the Image. The coordinate is relative to any parent container this Image may be in.
 * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key - The texture used by the Image during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture, BitmapData or PIXI.Texture.
 * @param {string|number} frame - If this Image is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 * @param {object} style - FontStyle-definition for the label.
 * @param {number} paddingX - The padding between icon and label.
 * @param {number} paddingY - The padding between icon and label.
 * @param {function} formatingMethod - Method to apply to label when a value is set.
 */
GTLib.IconWithLabel = function (game, x, y, key, frame, style, paddingX, paddingY, formatingMethod)
{
    // call super constructor
    Phaser.Image.call(this, game, x, y, key, frame);
    /**
     * @property {Phaser.Text} label - The test-object related to the icon.
     * @private
     */
    this.label = this.game.add.text(0, 0, " ", style);
    /**
     * @property {number} paddingX - The padding between icon and label.
     * @private
     */
    this._paddingX = paddingX || 0;
    /**
     * @property {number} paddingY - The padding between icon and label.
     * @private
     */
    this._paddingY = paddingY || 0;
    /**
     * @property {function} formatingMethod - Method to apply to label when a value is set.
     * @default FormatUtil.formatValue()
     * @private
     */
    this.formatingMethod = formatingMethod || Money.FormatUtil.formatValue;
    //-----------------------------------
    // Init
    //-----------------------------------
    this.addChild(this.label);
    // disable smoothing on mobile
    this.smoothed = this.game.device.desktop;

    this.label.padding = new Phaser.Point(1, 0);
};

// extend class Phaser.Image
GTLib.IconWithLabel.prototype = Object.create(Phaser.Image.prototype);
GTLib.IconWithLabel.prototype.constructor = GTLib.IconWithLabel;

//============================================================
// Public interface
//============================================================

/**
 * Resets the Image. This places the Image at the given x/y world coordinates and then sets alive, exists, visible and renderable all to true.
 *
 * @method GTLib.IconWithLabel#reset
 * @memberof GTLib.IconWithLabel
 * @param {number} x - The x coordinate (in world space) to position the Image at.
 * @param {number} y - The y coordinate (in world space) to position the Image at.
 * @return (GTLib.IconWithLabel) This instance.
 */
GTLib.IconWithLabel.prototype.reset = function (x, y)
{
    Phaser.Image.prototype.reset.call(this, x, y);

    return this;
};
/**
 * Destroys the Image. This removes it from its parent group, destroys the input, event and animation handlers if present
 * and nulls its reference to game, freeing it up for garbage collection.
 *
 * @method GTLib.IconWithLabel#destroy
 * @memberof GTLib.IconWithLabel
 * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
 */
GTLib.IconWithLabel.prototype.destroy = function (destroyChildren)
{
    this.label = null;
    this.formatingMethod = null;

    Phaser.Image.prototype.destroy.call(this, destroyChildren);
};
/**
 * Sets the fontstyle of the label.
 *
 * @method GTLib.IconWithLabel#setStyle
 * @memberof GTLib.IconWithLabel
 */
GTLib.IconWithLabel.prototype.setStyle = function (style)
{
    this.label.setStyle(style);
};
//============================================================
// Private methods
//============================================================
/**
 * Positions the label in relation to the icon.
 *
 * @method GTLib.IconWithLabel#positionLabel
 * @memberof GTLib.IconWithLabel
 * @private
 */
GTLib.IconWithLabel.prototype.positionLabel = function ()
{
    this.label.x = (1 - this.anchor.x) * this.width + this.paddingX;
    this.label.y = this.paddingY;
};
/**
 *
 *
 * @method GTLib.IconWithLabel#formatText
 * @memberof GTLib.IconWithLabel
 * @param {string} text
 * @return {string}
 * @private
 */
GTLib.IconWithLabel.prototype.formatText = function (text)
{
    return this.formatingMethod(text);
};
//============================================================
// Implicit getters and setters
//============================================================
/**
 * @name GTLib.IconWithLabel#paddingX
 * @property {number} paddingX - The padding between icon and label.
 */
Object.defineProperty(GTLib.IconWithLabel.prototype, "paddingX", {

    get: function ()
    {
        return this._paddingX;
    },

    set: function (value)
    {
        this._paddingX = value;
        this.positionLabel();
    }

});
/**
 * @name GTLib.IconWithLabel#paddingY
 * @property {number} paddingY - The padding between icon and label.
 */
Object.defineProperty(GTLib.IconWithLabel.prototype, "paddingY", {

    get: function ()
    {
        return this._paddingY;
    },

    set: function (value)
    {
        this._paddingY = value;
        this.positionLabel();
    }

});
/**
 * @name GTLib.IconWithLabel#text
 * @property {string} text - Text displayed by the label.
 */
Object.defineProperty(GTLib.IconWithLabel.prototype, "text", {

    get: function ()
    {
        return this.label.text;
    },

    set: function (value)
    {
        this.label.text = this.formatText(value);
        this.positionLabel();
    }

});
/**
 * @name GTLib.IconWithLabel#fullWidth
 * @property {number} fullWidth -
 * @readonly
 */
Object.defineProperty(GTLib.IconWithLabel.prototype, "fullWidth", {

    get: function ()
    {
        return this.label.width + this.width + this.paddingX;
    }

});
/**
 * @name GTLib.IconWithLabel#labelWidth
 * @property {number} labelWidth -
 * @readonly
 */
Object.defineProperty(GTLib.IconWithLabel.prototype, "labelWidth", {

    get: function ()
    {
        return this.label.width;
    }

});