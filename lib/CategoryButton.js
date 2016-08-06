/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.CategoryButton
 *
 * @classdesc Create a new 'CategoryButton' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.CategoryButton = function (game, key, upFrame, downFrame, icon, newIcon, style, caption, active, parent)
{
    // call super constructor
    Phaser.Group.call(this, game, parent);
    /**
     * @property {Phaser.Signal} onDown - Dispatched when the button receives an input down event.
     */
    this.onDown = new Phaser.Signal();
    /**
     * @property {Phaser.Image} upState - Button-frame shown when button is not selected.
     */
    this.upState = this.game.make.image(0, 0, key, upFrame);
    /**
     * @property {Phaser.Image} downState - Button-frame shown when button is selected.
     */
    this.downState = this.game.make.image(0, 0, key, downFrame);
    /**
     * @property {Phaser.Image} icon - The icon shown on this button.
     */
    this.icon = (icon)? this.game.make.image(0, 0, key, icon) : null;
    /**
     * @property {Phaser.Image} icon - The icon shown on this button.
     */
    this.newIcon = (newIcon)? this.game.make.image(0, 0, key, newIcon) : null;
    /**
     * @property {Phaser.Text} label - Label shown on button.
     */
    this.label = (style)? this.game.make.text(0, 0, " ", style) : null;
    /**
     * @property {string} _text -
     * @default ''
     * @private
     */
    this._text = '';
    /**
     * @property {boolean} _selected - If this button is currently in "selected" downState.
     * @default false
     * @private
     */
    this._selected = false;
    /**
     * @property {boolean} _active - If this button is active or not.
     * @default true
     * @private
     */
    this._active = active !== false;
    //-----------------------------------
    // Init
    //-----------------------------------
    // disable smoothing on mobile
    var smoothed = this.game.device.desktop;
    this.downState.smoothed = smoothed;
    this.upState.smoothed = smoothed;

    this.add(this.upState);
    this.upState.inputEnabled = true;
    this.upState.events.onInputDown.add(this.onButtonDown, this);
    this.upState.input.useHandCursor = true;

    this.add(this.downState);
    this.downState.inputEnabled = true;
    this.downState.events.onInputDown.add(this.onButtonDown, this);
    this.downState.visible = false;
    this.downState.input.useHandCursor = true;

    if (icon)
    {
        this.icon.smoothed = smoothed;
        this.icon.anchor.set(0.5, 0.5);
        this.add(this.icon);
    }
    if (newIcon)
    {
        this.newIcon.smoothed = smoothed;
        this.newIcon.anchor.set(1, 0);
        this.newIcon.visible = false;
        this.add(this.newIcon);
    }
    if (caption)
    {
        this.text = caption;
    }
    if (style)
    {
        this.add(this.label);
    }

    this.arrangeChildren();
};

// extend class Phaser.Group
GTLib.CategoryButton.prototype = Object.create(Phaser.Group.prototype);
GTLib.CategoryButton.prototype.constructor = GTLib.CategoryButton;

//============================================================
// Public interface
//============================================================
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.CategoryButton#destroy
 * @memberof GTLib.CategoryButton
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.CategoryButton.prototype.destroy = function (destroyChildren, soft)
{
    this.onDown.dispose();
    this.onDown = null;

    this.upState = null;
    this.downState = null;
    this.icon = null;
    this.newIcon = null;
    this.label = null;

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
/**
 * Sets the icon to another image.
 *
 * @method GTLib.CategoryButton#setIcon
 * @memberof GTLib.CategoryButton
 * @param {string} frameName - The frame to set the icon to.
 */
GTLib.CategoryButton.prototype.setIcon = function (frameName)
{
    if (this.icon.frameName !== frameName)
        this.icon.frameName = frameName;
};
/**
 *
 * @method GTLib.CategoryButton#setNew
 * @memberof GTLib.CategoryButton
 */
GTLib.CategoryButton.prototype.setNew = function (value)
{
    if (this.newIcon) this.newIcon.visible = value;
};
//============================================================
// Private methods
//============================================================
/**
 * When the button has been pressed..
 *
 * @method GTLib.CategoryButton#onButtonDown
 * @memberof GTLib.CategoryButton
 * @protected
 */
GTLib.CategoryButton.prototype.onButtonDown = function()
{
    if (this.active)
    {
        this.selected = true;
        this.onDown.dispatch(this);
    }
};
/**
 * Arranges the children of this button.
 *
 * @method GTLib.CategoryButton#arrangeChildren
 * @memberof GTLib.CategoryButton
 * @private
 */
GTLib.CategoryButton.prototype.arrangeChildren = function ()
{
    if (this.icon)
    {
        this.icon.x = (this.label)? Math.round(this.upState.width * 0.2) : Math.round(this.upState.width / 2);
        this.icon.y = Math.round(this.upState.height * 0.4);
    }

    if (this.newIcon)
        this.newIcon.x = Math.round(this.upState.width);

    if (this.label)
    {
        this.label.x = this.icon.x + Math.round(this.icon.width * 0.5);
        this.label.y = this.icon.y - Math.round(this.label.height * 0.4);
    }
};

//============================================================
// Implicit getters and setters
//============================================================
/**
 * @name GTLib.CategoryButton#text
 * @property {string} text -
 */
Object.defineProperty(GTLib.CategoryButton.prototype, "text", {

    get: function () {
        return this._text;
    },

    set: function (value) {
        if (this.label)
        {
            this.label.text = value;
        }
        this._text = value;
    }
});
/**
 * @name GTLib.CategoryButton#width
 * @property {number} width -
 * @readonly
 */
Object.defineProperty(GTLib.CategoryButton.prototype, "width", {

    get: function () {
        return (this.upState) ? this.upState.width : 0;
    }

});
/**
 * @name GTLib.CategoryButton#height
 * @property {number} height -
 * @readonly
 */
Object.defineProperty(GTLib.CategoryButton.prototype, "height", {

    get: function () {
        return (this.upState) ? this.upState.height : 0;
    }

});
/**
 * @name GTLib.CategoryButton#selected
 * @property {boolean} selected - If this button is currently in "selected" downState.
 */
Object.defineProperty(GTLib.CategoryButton.prototype, "selected", {

    get: function ()
    {
        return this._selected;
    },

    set: function (value)
    {
        this.downState.visible = value;
        this._selected = value;
    }

});
/**
 * @name GTLib.CategoryButton#active
 * @property {boolean} active - If this button is active or not.
 */
Object.defineProperty(GTLib.CategoryButton.prototype, "active", {

    get: function ()
    {
        return this._active;
    },

    set: function (value)
    {

        if (this._active !== value)
        {
            if (this.icon) this.icon.visible = value;
            if (this.label) this.label.visible = value;

            this.upState.input.useHandCursor = value && this.game.device.desktop;
            this.downState.input.useHandCursor = value && this.game.device.desktop;

            this._active = value;
        }

    }

});