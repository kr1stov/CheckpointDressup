/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class GTLib.ShiningCategoryButton
 *
 * @classdesc Create a new 'ShiningCategoryButton' object.
 * @constructor
 * @extends GTLib.CategoryButton
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
GTLib.ShiningCategoryButton = function (game, key, upFrame, downFrame, shineFrames, icon, newIcon, style, caption, parent)
{
    // call super constructor
    GTLib.CategoryButton.call(this, game, key, upFrame, downFrame, icon, newIcon, style, caption, parent);
    /**
     * @property {Phaser.Sprite} shine - Shine animation sprite.
     * @private
     */
    this.shine = this.game.make.sprite(0, 0, key, shineFrames[0]);
    //-----------------------------------
    // Init
    //-----------------------------------
    this.shine.animations.add("shine", shineFrames, 18, true);
    this.shine.smoothed = this.game.device.desktop; // no smoothing on mobile
    this.shine.visible = false;

    this.add(this.shine);


};

// extend class GTLib.CategoryButton
GTLib.ShiningCategoryButton.prototype = Object.create(GTLib.CategoryButton.prototype);
GTLib.ShiningCategoryButton.prototype.constructor = GTLib.ShiningCategoryButton;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method GTLib.ShiningCategoryButton#destroy
 * @memberof GTLib.ShiningCategoryButton
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
GTLib.ShiningCategoryButton.prototype.destroy = function (destroyChildren, soft)
{
    this.shine = null;

    GTLib.CategoryButton.prototype.destroy.call(this, destroyChildren, soft);
};

/**
 *
 * @method GTLib.CategoryButton#setNew
 * @memberof GTLib.CategoryButton
 */
GTLib.ShiningCategoryButton.prototype.setNew = function (value)
{
    if (value)
    {
        this.shine.visible = true;
        this.shine.play("shine");
    }
    else
    {
        this.shine.animations.stop();
        this.shine.visible = false;
    }
    GTLib.CategoryButton.prototype.setNew.call(this, value);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================
