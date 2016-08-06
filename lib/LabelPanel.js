/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.LabelPanel
 *
 * @classdesc Create a new 'LabelPanel' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.LabelPanel = function (game, key, frame, caption, style, parent)
{
    // call super constructor
    Phaser.Group.call(this, game, parent);
    /**
     * @property {string} _caption - Caption written on the panel.
     * @default " "
     * @private
     */
    this._caption = caption || " ";
    /**
     * @property {Phaser.Image} panel - Background "panel" image.
     * @private
     */
    this.panel = this.game.make.image(0, 0, key, frame);
    /**
     * @property {Phaser.Text} label - Label on the panel.
     * @private
     */
    this.label = this.game.make.text(0, 0, " ", style);
    /**
     * @property {Phaser.Tween} tween - Optional tween object.
     * @private
     */
    this.tween = null;
    //-----------------------------------
    // Init
    //-----------------------------------
    this.panel.smoothed = this.game.device.desktop;
    this.add(this.panel);

    this.label.wordWrap = true;
    this.label.wordWrapWidth = Math.round(this.panel.width * 0.9);
    this.label.align = 'center';
    this.add(this.label);

    if (caption)
    {
        this.render();
    }
};

// extend class Phaser.Group
GTLib.LabelPanel.prototype = Object.create(Phaser.Group.prototype);
GTLib.LabelPanel.prototype.constructor = GTLib.LabelPanel;

//============================================================
// Public interface
//============================================================
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.LabelPanel#destroy
 * @memberof GTLib.LabelPanel
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.LabelPanel.prototype.destroy = function (destroyChildren, soft)
{
    this.panel = null;
    this.label = null;
    this.tween = null;

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
/**
 *
 *
 * @method GTLib.LabelPanel#show
 * @memberof GTLib.LabelPanel
 */
GTLib.LabelPanel.prototype.show = function ()
{
    this.visible = true;
};
/**
 *
 *
 * @method GTLib.LabelPanel#hide
 * @memberof GTLib.LabelPanel
 */
GTLib.LabelPanel.prototype.hide = function ()
{
    this.visible = false;
};
/**
 * Use tween object to move to target destination.
 *
 * @method GTLib.LabelPanel#tweenMoveTo
 * @memberof GTLib.LabelPanel
 */
GTLib.LabelPanel.prototype.tweenMoveTo = function (x, y, tweenData, hideAfterTween)
{
    this.stopTweening();
    this.tween = Money.Tween.create(this.game, this, { 'x': x, 'y': y }, tweenData);
    if (hideAfterTween)
    {
        this.tween.onComplete.addOnce(this.hide, this);
    }
    this.tween.start();
};
//============================================================
// Private methods
//============================================================
/**
 * Renders and arranges panel and label.
 *
 * @method GTLib.LabelPanel#render
 * @memberof GTLib.LabelPanel
 * @private
 */
GTLib.LabelPanel.prototype.render = function ()
{
    this.label.text = this.caption;
    this.label.x = Math.round((this.panel.width - this.label.width) / 2) - Math.round(this.anchor.x * this.panel.width);
    this.label.y = Math.round(this.panel.height / 2) - Math.round(this.anchor.y * this.panel.height);
};
/**
 *
 *
 * @method GTLib.LabelPanel#stopTweening
 * @memberof GTLib.LabelPanel
 * @private
 */
GTLib.LabelPanel.prototype.stopTweening = function ()
{
    if (this.tween && this.tween.isRunning)
    {
        this.tween.stop();
    }
};
//============================================================
// Implicit getters and setters
//============================================================
/**
 * @name GTLib.LabelPanel#caption
 * @property {string} caption - Caption written on the panel.
 */
Object.defineProperty(GTLib.LabelPanel.prototype, "caption", {

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
/**
 * @name GTLib.LabelPanel#anchor
 * @property {Phaser.Point} anchor -
 */
Object.defineProperty(GTLib.LabelPanel.prototype, "anchor", {

    get: function ()
    {
        return this.panel.anchor;
    },

    set: function (value)
    {
        this.panel.anchor.set(value.x, value.y);
        this.render();
    }

});
