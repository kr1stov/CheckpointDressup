/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Message
 *
 * @classdesc Create a new 'Message' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
 * @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
Fashion.Message = function (game, parent, name, addToStage, enableBody, physicsBodyType) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);

    /**
     * @property {string } mainText - second part of message text
     * @private
     */
    this.text = "";

    /**
     * @property {Fashion.MessageType} type - type of message (incoming, outgoing)
     * @private
     */
    this.type = null;

};

// extend class Phaser.Group
Fashion.Message.prototype = Object.create(Phaser.Group.prototype);
Fashion.Message.prototype.constructor = Fashion.Message;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.Message#destroy
 * @memberof Fashion.Message
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.Message.prototype.destroy = function (destroyChildren, soft) {

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};

/**
 * sete message type
 *
 * @method Fashion.Message#setType
 * @memberof Fashion.Message
 */
Fashion.Message.prototype.setType = function (type) {
    this.type = type;

};

/**
 * sets preText of message
 *
 * @method Fashion.Message#setText
 * @memberof Fashion.Message
 */
Fashion.Message.prototype.setText = function (preText, mainText) {
    this.text = preText + ": "  + mainText;
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

