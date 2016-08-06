/**
 * @author       Michel Wacker <info@starnut.com>
 * @copyright    2014 Starnut
 */

/**
 * @class GTLib.TextButton
 *
 * @classdesc Create a new 'TextButton' object.
 *
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {Phaser.Group|Phaser.Sprite|null} parent - The parent Group, DisplayObject or DisplayObjectContainer that this Group will be added to. If undefined it will use game.world. If null it won't be added to anything.
 * @param {string} [name=group] - A name for this Group. Not used internally but useful for debugging.
 */
GTLib.TextButton = function (game, key, upFrame, disabledFrame, style, parent, name) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name);
    /**
     * @property {Phaser.Signal} onDown - Dispatched when the button receives an input down event.
     */
    this.onDown = new Phaser.Signal();
    /**
     * @property {Phaser.Image} upState -
     */
    this.upState = this.game.make.image(0, 0, key, upFrame);
    /**
     * @property {Phaser.Image} disabledState -
     */
    this.disabledState = (disabledFrame) ? this.game.make.image(0, 0, key, disabledFrame) : null;
    /**
     * @property {Phaser.Text} label -
     */
    this.label = this.game.make.text(0, 0, "", style);
    /**
     * @property {boolean} _enabled -
     * @default true
     * @private
     */
    this._enabled = true;
    /**
     * @property {string} _text -
     * @default ''
     * @private
     */
    this._text = '';
    //-----------------------------------
    // Init
    //-----------------------------------
    this.upState.smoothed = this.game.device.desktop;
    if (this.disabledState)
        this.disabledState.smoothed = this.game.device.desktop;

    this.upState.inputEnabled = true;
    this.upState.events.onInputDown.add(this.onButtonDown, this);

    this.add(this.upState);
    if (this.disabledState)
    {
        this.add(this.disabledState);
    }
    this.add(this.label);

    this.enabled = true;
};

// extend class Phaser.Group
GTLib.TextButton.prototype = Object.create(Phaser.Group.prototype);
GTLib.TextButton.prototype.constructor = GTLib.TextButton;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
 *
 * @method GTLib.TextButton#destroy
 * @memberof GTLib.TextButton
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.TextButton.prototype.destroy = function (destroyChildren, soft) {
    this.onDown.dispose();
    this.onDown = null;

    this.upState.events.onInputDown.remove(this.onButtonDown, this);
    this.upState.inputEnabled = null;
    this.upState = null;

    this.disabledState = null;

    this.label = null;

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 *
 *
 * @method GTLib.TextButton#onButtonDown
 * @memberof GTLib.TextButton
 * @protected
 */
GTLib.TextButton.prototype.onButtonDown = function() {
    if (this._enabled)
    {
        this.onDown.dispatch(this);
    }
};
//============================================================
// Implicit getters and setters
//============================================================

/**
 * @name GTLib.TextButton#enabled
 * @property {boolean} enabled -
 */
Object.defineProperty(GTLib.TextButton.prototype, "enabled", {

    get: function () {
        return this._enabled;
    },

    set: function (value) {
        if (this.disabledState)
        {
            this.disabledState.visible = !value;
            this.upState.visible = value;
        }
        this.upState.input.useHandCursor = (this.game.device.desktop && value);
        this._enabled = value;
    }
});
/**
 * @name GTLib.TextButton#text
 * @property {string} text -
 */
Object.defineProperty(GTLib.TextButton.prototype, "text", {

    get: function () {
        return this._text;
    },

    set: function (value) {
        if (this.label)
        {
            //GTLib.FontUtil.setLabel(this.label, value);
            this.label.text = value;

            this.label.x = Math.round((this.width - this.label./*textW*/width) / 2);
            this.label.y = Math.round((this.height - this.label./*textH*/height) / 2);
        }
        this._text = value;
    }
});
/**
 * @name GTLib.TextButton#width
 * @property {number} width -
 * @readonly
 */
Object.defineProperty(GTLib.TextButton.prototype, "width", {

    get: function () {
        return (this.upState) ? this.upState.width : 0;
    }

});
/**
 * @name GTLib.TextButton#height
 * @property {number} height -
 * @readonly
 */
Object.defineProperty(GTLib.TextButton.prototype, "height", {

    get: function () {
        return (this.upState) ? this.upState.height : 0;
    }

});