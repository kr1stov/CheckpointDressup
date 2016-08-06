/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.SpeechBubble
 *
 * @classdesc Create a new 'SpeechBubble' object.
 * @constructor
 * @extends GTLib.DynamicToolTip
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {string} key - TextureAtlas-key.
 * @param {string} frameLeft - The left ("beginning") side of the tooltip.
 * @param {string} frameMiddle - The middle ("duplicatable") part of the tooltip.
 * @param {string} frameRight - The right ("ending") part of the tooltip.
 * @param {string} frameArrow - The arrow pointing to the speaker.
 * @param {string} caption - initial caption displayed in the tooltip.
 * @param {object} style - The fontstyle of this tooltip's label.
 * @param {number} maxWidth - The maximum width of the tooltip, after which caption would be word-wrapped.
 * @param {number} arrowOffsetX - The x-position of the arrow.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.SpeechBubble = function (game, key, frameLeft, frameMiddle, frameRight, frameArrow, caption, style, maxWidth, arrowOffsetX, parent)
{
    // call super constructor
    GTLib.DynamicToolTip.call(this, game, key, frameLeft, frameMiddle, frameRight, caption, style, maxWidth, parent);
    /**
     * @property {Phaser.Image} arrow - Arrow pointing to speaker.
     * @private
     */
    this.arrow = this.game.make.image(0, 0, key, frameArrow);
    //-----------------------------------
    // Init
    //-----------------------------------
    this.arrow.smoothed = this.game.device.desktop;
    this.arrow.x = arrowOffsetX || 0;
    this.arrow.y = this.height - 1;
    this.add(this.arrow);
};

// extend class GTLib.DynamicToolTip
GTLib.SpeechBubble.prototype = Object.create(GTLib.DynamicToolTip.prototype);
GTLib.SpeechBubble.prototype.constructor = GTLib.SpeechBubble;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.SpeechBubble#destroy
 * @memberof GTLib.SpeechBubble
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.SpeechBubble.prototype.destroy = function (destroyChildren, soft)
{
    this.arrow = null;

    GTLib.DynamicToolTip.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 * Renders this tooltip according to its caption.
 *
 * @override
 * @method GTLib.SpeechBubble#render
 * @memberof GTLib.SpeechBubble
 * @protected
 */
GTLib.SpeechBubble.prototype.render = function ()
{
    // super()
    GTLib.DynamicToolTip.prototype.render.call(this);
    // center label
    var arrowHeight = (this.arrow)? this.arrow.height : 0;
    this.label.x = Math.round((this.width - this.label.width) / 2);
    this.label.y = Math.round((this.height - arrowHeight - this.label.height) / 2);
};
//============================================================
// Implicit getters and setters
//============================================================

