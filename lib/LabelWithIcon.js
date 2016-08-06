/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.LabelWithIcon
 * @classdesc Create a new 'LabelWithIcon' object.
 * @constructor
 * @extends GTLib.IconWithLabel
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
GTLib.LabelWithIcon = function (game, x, y, key, frame, style, paddingX, paddingY, formatingMethod)
{
    // call super constructor
    GTLib.IconWithLabel.call(this, game, x, y, key, frame, style, paddingX, paddingY, formatingMethod);


};

// extend class GTLib.IconWithLabel
GTLib.LabelWithIcon.prototype = Object.create(GTLib.IconWithLabel.prototype);
GTLib.LabelWithIcon.prototype.constructor = GTLib.LabelWithIcon;

//============================================================
// Public interface
//============================================================

/**
 * Resets the Image. This places the Image at the given x/y world coordinates and then sets alive, exists, visible and renderable all to true.
 *
 * @method GTLib.LabelWithIcon#reset
 * @memberof GTLib.LabelWithIcon
 * @param {number} x - The x coordinate (in world space) to position the Image at.
 * @param {number} y - The y coordinate (in world space) to position the Image at.
 * @return (GTLib.LabelWithIcon) This instance.
 */
GTLib.LabelWithIcon.prototype.reset = function (x, y)
{
    GTLib.IconWithLabel.prototype.reset.call(this, x, y);

    return this;
};
/**
 * Destroys the Image. This removes it from its parent group, destroys the input, event and animation handlers if present
 * and nulls its reference to game, freeing it up for garbage collection.
 *
 * @method GTLib.LabelWithIcon#destroy
 * @memberof GTLib.LabelWithIcon
 * @param {boolean} [destroyChildren=true] - Should every child of this object have its destroy method called?
 */
GTLib.LabelWithIcon.prototype.destroy = function (destroyChildren)
{

    GTLib.IconWithLabel.prototype.destroy.call(this, destroyChildren);
};
//============================================================
// Private methods
//============================================================
/**
 * Positions the label in relation to the icon.
 *
 * @override
 * @method GTLib.LabelWithIcon#positionLabel
 * @memberof GTLib.LabelWithIcon
 * @private
 */
GTLib.LabelWithIcon.prototype.positionLabel = function ()
{
    this.label.x = - this.label.width - this.paddingX - this.anchor.x * this.width;
    this.label.y = this.paddingY;
};
//============================================================
// Implicit getters and setters
//============================================================

