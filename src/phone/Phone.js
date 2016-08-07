/**
 * Created by Christoph on 06.08.2016.
 */
/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Phone
 *
 * @classdesc Create a new 'phone' object.
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
Fashion.Phone = function (game, key, parent, name, addToStage, enableBody, physicsBodyType) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    /**
     * @property {Phaser.Image} bg -
     */
    this.bg = this.game.make.image(0, 0, key, Fashion.Asset.Image.PHONE_BG);
    /**
     * @property {Phaser.Image} frame -
     */
    this.frame = this.game.make.image(0, 0, key, Fashion.Asset.Image.PHONE_FRAME);
    /**
     * @property {Phaser.Group} messageContainer -
     * @private
     */
    this.messageContainer = this.game.make.group();
    /**
     * @property {Phaser.Graphics} messageMask - The message mask.
     * @private
     */
    this.messageMask = this.game.make.graphics(0, 0);

    this.messageArray = new Array();


    //-----------------------------------
    // Init
    //-----------------------------------
    this.add(this.bg);
    this.add(this.frame);
    this.add(this.messageContainer);

    this.frame.x = Math.round((this.bg.width - this.frame.width) / 2);
    this.frame.y = Math.round((this.bg.height - this.frame.height) / 2);

    this.messageMask.beginFill(0xffffff);
    this.messageMask.drawRect(this.frame.x + 16, this.frame.y + 117, 205, 336);

    this.messageContainer.add(this.messageMask);
    this.messageContainer.mask = this.messageMask;

    /*this.addMessage(key, Fashion.MessageType.INCOMING, "1 your brother read a message that might be relevant for you. " + "the international community is protesting against atrocities commited in a nearby town.");
    this.addMessage(key, Fashion.MessageType.OUTGOING, "2 your brother read a message that might be relevant for you. " + "the international community is protesting against atrocities commited in a nearby town.");
    this.addMessage(key, Fashion.MessageType.INCOMING, "3 your brother read a message that might be relevant for you. " + "the international community is protesting against atrocities commited in a nearby town.");
    this.addMessage(key, Fashion.MessageType.OUTGOING, "4 your brother read a message that might be relevant for you. " + "the international community is protesting against atrocities commited in a nearby town.");
    this.addMessage(key, Fashion.MessageType.INCOMING, "5 your brother read a message that might be relevant for you. " + "the international community is protesting against atrocities commited in a nearby town.");*/

};



// extend class Phaser.Group
Fashion.Phone.prototype = Object.create(Phaser.Group.prototype);
Fashion.Phone.prototype.constructor = Fashion.Phone;

//============================================================
// Public interface
//============================================================
/**
 *
 *
 * @method Fashion.Phone#addMessage
 * @memberof Fashion.Phone
 */
Fashion.Phone.prototype.addMessage = function (key, type, text)
{
    var mTemp = this.game.make.group();
    var aTemp;
    var tTemp;

    if(type == Fashion.MessageType.INCOMING) {
        aTemp = this.game.make.image(this.frame.x + 20, this.frame.height - 170, key, Fashion.Asset.Image.MESSAGE_INCOMING);
        //aTemp.scale.y = 1;
        tTemp = this.game.add.text(aTemp.x+25, aTemp.y+5, text, {fontSize: '10px', fill: '#000', wordWrap: true, wordWrapWidth: aTemp.width-30});
    }
    else {
        aTemp = this.game.make.image(this.frame.x + 50, this.frame.height - 170, key, Fashion.Asset.Image.MESSAGE_OUTGOING);
        //aTemp.scale.y = 0.5;
        tTemp = this.game.add.text(aTemp.x+10, aTemp.y+5, text, {fontSize: '10px', fill: '#000', wordWrap: true, wordWrapWidth: aTemp.width-25});


    }

    aTemp.scale.y = tTemp.height/aTemp.height;
    aTemp.y = this.frame.height-40-aTemp.height;
    tTemp.y = aTemp.y +5;

    mTemp.add(aTemp);
    mTemp.add(tTemp);

    var addedHeights = 0;


    this.messageArray.forEach(function(item)
    {
        item.y -= (aTemp.height +10);
        addedHeights += item.height;

    });


    //console.log("frame height: " + this.frame.height + " | mTemp y: "+ mTemp.y + " | mTemp height:" + mTemp.height);
    while(addedHeights+mTemp.height > this.frame.height)
    {
        addedHeights-=this.messageArray[0].height;
        this.messageArray[0].destroy();
    }

    this.messageArray.push(mTemp);
    this.messageContainer.add(mTemp);

    console.log("addedHeights: " + addedHeights + " | frame height: " + this.frame.height + " | mTemp y: "+ mTemp.y + " | mTemp height:" + mTemp.height);

};
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.phone#destroy
 * @memberof Fashion.phone
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.Phone.prototype.destroy = function (destroyChildren, soft) {

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

