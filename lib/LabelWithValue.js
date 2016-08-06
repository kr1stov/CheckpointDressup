/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.LabelWithValue
 *
 * @classdesc Create a new 'LabelWithValue' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {object} style - fontstyle of both the labels.
 * @param {string} caption - Caption of the label.
 * @param {number} value - Set initial value.
 * @param {function} formatingMethod - Method to format number-values with.
 * @param {number} fixedWidth - If set, number will be aligned to fit this specified width.
 * @param {string} key - Texture-atlas-key for an optional icon
 * @param {string} frame - Frame-key for an optional icon
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.LabelWithValue = function (game, style, caption, value, formatingMethod, fixedWidth, key, frame, parent)
{
    // call super constructor
    Phaser.Group.call(this, game, parent);
    /**
     * @property {string} _caption - Caption of the label.
     * @default " "
     * @private
     */
    this._caption = caption || " ";
    /**
     * @property {number} _value - Value to render.
     * @default 0
     * @private
     */
    this._value = value || 0;
    /**
     * @property {Phaser.Text} label - The label describing the number to follow.
     * @private
     */
    this.labelCaption = this.game.make.text(0, 0, " ", style);
    /**
     * @property {Phaser.Text} labelValue - The label of the number.
     * @private
     */
    this.labelValue = this.game.make.text(0, 0, " ", style);
    /**
     * @property {function} formatingMethod - Method to format number-values with.
     * @private
     */
    this.formatingMethod = formatingMethod || Money.FormatUtil.convertNumToString;
    /**
     * @property {number} fixedWidth - If set, number will be aligned to fit this specified width.
     * @private
     */
    this.fixedWidth = fixedWidth;
    /**
     * @property {Phaser.Image} icon - Optional Icon image.
     * @private
     */
    this.icon = null;
    //-----------------------------------
    // Init
    //-----------------------------------
    this.caption = this._caption;
    this.value = this._value;

    this.add(this.labelCaption);
    this.add(this.labelValue);

    if (key && frame)
    {
        this.icon = this.game.make.image(0, 0, key, frame);
        this.icon.smoothed = this.game.device.desktop;
        this.add(this.icon);
    }

};

// extend class Phaser.Group
GTLib.LabelWithValue.prototype = Object.create(Phaser.Group.prototype);
GTLib.LabelWithValue.prototype.constructor = GTLib.LabelWithValue;

//============================================================
// Public interface
//============================================================
/**
 * Sets the fontstyle of label and value.
 *
 * @method GTLib.LabelWithValue#setStyle
 * @memberof GTLib.LabelWithValue
 * @param {object} style
 */
GTLib.LabelWithValue.prototype.setStyle = function (style)
{
    this.labelCaption.setStyle(style);
    this.labelValue.setStyle(style);
};
/**
 * Sets another icon-frame.
 *
 * @method GTLib.LabelWithValue#setIcon
 * @memberof GTLib.LabelWithValue
 */
GTLib.LabelWithValue.prototype.setIcon = function (frame)
{
    if (this.icon)
    {
        this.icon.frameName = frame;
    }
};
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.LabelWithValue#destroy
 * @memberof GTLib.LabelWithValue
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.LabelWithValue.prototype.destroy = function (destroyChildren, soft)
{
    this.labelCaption = null;
    this.labelValue = null;
    this.icon = null;

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 * Arranges and aligns caption and number to each other.
 *
 * @method GTLib.LabelWithValue#arrange
 * @memberof GTLib.LabelWithValue
 * @private
 */
GTLib.LabelWithValue.prototype.arrange = function ()
{
    this.labelValue.x = (this.fixedWidth)? this.fixedWidth - this.labelValue.width : this.labelCaption.width + 5;

    if (this.icon)
    {
        this.icon.x = this.labelValue.x + this.labelValue.width + 5;
    }
};
//============================================================
// Implicit getters and setters
//============================================================
/**
 * @name GTLib.LabelWithValue#caption
 * @property {string} caption - Caption of the label.
 */
Object.defineProperty(GTLib.LabelWithValue.prototype, "caption", {

    get: function ()
    {
        return this._caption;
    },

    set: function (value)
    {
        this._caption = value;
        this.labelCaption.text = value;
        this.arrange();
    }

});
/**
 * @name GTLib.LabelWithValue#value
 * @property {number} value - 
 */
Object.defineProperty(GTLib.LabelWithValue.prototype, "value", {

    get: function ()
    {
        return this._value;
    },

    set: function (value)
    {
        this._value = value;
        this.labelValue.text = this.formatingMethod(value);
        this.arrange();
    }

});
