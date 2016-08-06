/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.DynamicToolTip
 *
 * @classdesc Create a new 'DynamicToolTip' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {string} key - TextureAtlas-key.
 * @param {string} frameLeft - The left ("beginning") side of the tooltip.
 * @param {string} frameMiddle - The middle ("duplicatable") part of the tooltip.
 * @param {string} frameRight - The right ("ending") part of the tooltip.
 * @param {string} caption - initial caption displayed in the tooltip.
 * @param {object} style - The fontstyle of this tooltip's label.
 * @param {number} maxWidth - The maximum width of the tooltip, after which caption would be word-wrapped.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.DynamicToolTip = function (game, key, frameLeft, frameMiddle, frameRight, caption, style, maxWidth, parent)
{
    // call super constructor
    Phaser.Group.call(this, game, parent);
    /**
     * @property {string} _caption - The caption of this tooltip's label.
     * @private
     */
    this._caption = " ";
    /**
     * @property {Phaser.Image} leftSide - The left ("beginning") side of the tooltip.
     * @private
     */
    this.leftSide = this.game.make.image(0, 0, key, frameLeft);
    /**
     * @property {Phaser.Image} rightSide - The right ("ending") side of the tooltip.
     * @private
     */
    this.rightSide = this.game.make.image(0, 0, key, frameRight);
    /**
     * @property {Phaser.Image} midPart - The middle part of the tooltip.
     * @private
     */
    this.midPart = this.game.make.image(0, 0, key, frameMiddle);
    /**
     * @property {Phaser.Text} label - The label text-field of this tooltip.
     * @private
     */
    this.label = this.game.make.text(0, 0, " ", style);
    /**
     * @property {number} maxWidth - The maximum width of the tooltip, after which caption would be word-wrapped.
     * @private
     */
    this.maxWidth = maxWidth;
    //-----------------------------------
    // Init
    //-----------------------------------
    var smoothed = this.game.device.desktop;
    this.leftSide.smoothed = smoothed;
    this.midPart.smoothed = false; // always false to avoid glitches
    this.rightSide.smoothed = smoothed;

    this.add(this.leftSide);

    this.add(this.rightSide);
    this.add(this.midPart);

    this.label.wordWrap = true;
    this.label.wordWrapWidth = maxWidth;
    this.add(this.label);

    if (caption)
    {
        this.caption = caption;
    }

};

// extend class Phaser.Group
GTLib.DynamicToolTip.prototype = Object.create(Phaser.Group.prototype);
GTLib.DynamicToolTip.prototype.constructor = GTLib.DynamicToolTip;

//============================================================
// Public interface
//============================================================
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.DynamicToolTip#destroy
 * @memberof GTLib.DynamicToolTip
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.DynamicToolTip.prototype.destroy = function (destroyChildren, soft)
{
    this.leftSide = null;
    this.rightSide = null;
    this.midPart = null;
    this.label = null;

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
/**
 * Shows this tooltip.
 *
 * @method GTLib.DynamicToolTip#show
 * @memberof GTLib.DynamicToolTip
 */
GTLib.DynamicToolTip.prototype.show = function ()
{
    this.visible = true;
};
/**
 * Hides this tooltip.
 *
 * @method GTLib.DynamicToolTip#hide
 * @memberof GTLib.DynamicToolTip
 */
GTLib.DynamicToolTip.prototype.hide = function ()
{
    this.visible = false;
};
/**
 * Sets the style of the tooltip's label.
 *
 * @method GTLib.DynamicToolTip#setStyle
 * @memberof GTLib.DynamicToolTip
 * @param {string} styleKey - Key of the style, as found in Assets/config.
 */
GTLib.DynamicToolTip.prototype.setStyle = function (styleKey)
{
    this.label.setStyle(Money.config.getFontStyle(styleKey));
};
/**
 * Replaces old graphics with new ones.
 *
 * @method GTLib.DynamicToolTip#setNewGraphics
 * @memberof GTLib.DynamicToolTip
 * @param {string} frameLeft - The left ("beginning") side of the tooltip.
 * @param {string} frameMiddle - The middle ("duplicatable") part of the tooltip.
 * @param {string} frameRight - The right ("ending") part of the tooltip.
 */
GTLib.DynamicToolTip.prototype.setNewGraphics = function (frameLeft, frameMiddle, frameRight)
{
    this.leftSide.frameName = frameLeft;
    this.rightSide.frameName = frameRight;
    this.midPart.frameName = frameMiddle;

    this.render();
};
//============================================================
// Private methods
//============================================================
/**
 * Renders this tooltip according to its caption.
 *
 * @method GTLib.DynamicToolTip#render
 * @memberof GTLib.DynamicToolTip
 * @protected
 */
GTLib.DynamicToolTip.prototype.render = function ()
{
    this.label.text = this.caption;

    this.midPart.x = this.leftSide.width;
    var maxMidPartWidth = this.maxWidth - this.leftSide.width - this.rightSide.width;
    this.midPart.width = (this.label.width <= maxMidPartWidth)? this.label.width : maxMidPartWidth;

    this.rightSide.x = this.midPart.x + this.midPart.width;

    // center label
    this.label.x = Math.round((this.width - this.label.width) / 2);
    this.label.y = Math.round((this.height - this.label.height) / 2);
};
//============================================================
// Implicit getters and setters
//============================================================
/**
 * @name GTLib.DynamicToolTip#caption
 * @property {string} caption - The caption of this tooltip's label.
 */
Object.defineProperty(GTLib.DynamicToolTip.prototype, "caption", {

    get: function ()
    {
        return this._caption;
    },

    set: function (value)
    {
        this._caption = value;
        this.render();
    }

});
