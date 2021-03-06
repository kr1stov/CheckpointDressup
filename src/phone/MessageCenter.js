/**
 * Created by Christoph on 06.08.2016.
 */
/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.MessageCenter
 *
 * @classdesc Create a new 'MessageCenter' object.
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
Fashion.MessageCenter = function (game, parent, name, addToStage, enableBody, physicsBodyType) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);

    /**
     * @property {Array} mainTextPool - pool of main text elements
     * @private
     */
    this.mainTextPool = [];

    /**
     * @property {Array} preTextPool - pool of pre text elements
     * @private
     */
    this.preTextPool = [];

    /**
     * @property {Array} hintTextPool - pool of hint text elements
     * @private
     */
    this.hintTextPool = [];

    /**
     * @property {Fashion.Faction} currentFaction - current faction in the area
     * @private
     */
    this.currentFaction = null;

    /**
     * @property {int} certainty - certainty with which message will occur
     * @private
     */
    this.certainty = 100;

    this.buildPool();

};

// extend class Phaser.Group
Fashion.MessageCenter.prototype = Object.create(Phaser.Group.prototype);
Fashion.MessageCenter.prototype.constructor = Fashion.MessageCenter;


//=============================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.MessageCenter#destroy
 * @memberof Fashion.MessageCenter
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.MessageCenter.prototype.destroy = function (destroyChildren, soft) {

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};

/**
 *
 *
 * @method Fashion.MessageCenter#getCheckMessages
 * @memberof Fashion.MessageCenter
 */
Fashion.MessageCenter.prototype.getCheckMessages = function (checkpoint) {

    var messages = [];
    /*"duration": 60,
        "numHelpMessages": 2,
        "numFactionMessages": 4,
        "precisionFactionMessages":
    {
        "min": 60,
        "max": 100
    }*/

    for(var i=0; i<checkpoint.numHelpMessages; i++)
    {
        var r = this.game.rnd.integerInRange(0, this.hintTextPool.length);
        var mTemp = this.hintTextPool[r];
        if (mTemp)
        {
            messages.push(mTemp.text);
        }
    }

    for(var i=0; i<checkpoint.numFactionsMessages; i++)
    {
        var r = this.game.rnd.integerInRange(0, this.mainTextPool.length);
        var mTemp = this.mainTextPool[r];

        r = this.game.rnd.integerInRange(0, this.preTextPool.length);
        var mTemp2 = this.preTextPool[r];
        if (mTemp && mTemp2)
        {
            messages.push(mTemp2.text + mTemp.text);
        }
    }

    var n = messages.length;
    var i;
    var obj;
    for (i = 0; i < n; i++)
    {
        obj = messages[i];
        Log.debug(obj.text);
    }
    return messages;
};

/**
 * creates message
 *
 * @method Fashion.MessageCenter#createMessage
 * @memberof Fashion.MessageCenter
 */
Fashion.MessageCenter.prototype.createMessage = function (currentFactions) {

};

/**
 * builds message pool
 *
 * @method Fashion.MessageCenter#generatePool
 * @memberof Fashion.MessageCenter
 */
Fashion.MessageCenter.prototype.buildPool = function () {

    var messages = Fashion.messages;

    var preMessages = messages['preMessages'];
    var mainMessages = messages['messages'];
    var hintMessages = messages['hintMessages'];

    var data;

    for(var key in preMessages)
    {
        data = preMessages[key];
        var temp = new Fashion.PreMessage(data.message);
        this.preTextPool.push(temp);
    }

    for(var key in mainMessages)
    {
        data = mainMessages[key];
        var temp = new Fashion.MainMessage(data.factions, data.message, data.certainty);
        this.mainTextPool.push(temp);
    }

    for(var key in hintMessages)
    {
        data = hintMessages[key];
        var temp = new Fashion.HintMessage(data.factions, data.message);
        this.hintTextPool.push(temp);
    }


};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

