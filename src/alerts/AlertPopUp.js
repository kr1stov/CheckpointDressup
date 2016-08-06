/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class Money.AlertPopUp
 *
 * @classdesc Create a new 'AlertPopUp' object.
 * @constructor
 * @extends Money.PopUp
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
*/
Money.AlertPopUp = function (game, parent)
{
    // call super constructor
    Money.PopUp.call(this, game, parent);
    /**
     * @property {function} affirmHandler - Function to call when affirm-button has been clicked.
     * @private
     */
    this.affirmHandler = null;
    /**
     * @property {function} cancelHandler - Function to call when cancel-button has been clicked.
     * @private
     */
    this.cancelHandler = null;
    /**
     * @property {object} context - Context to call affirm- and cancel-handlers in.
     * @private
     */
    this.context = null;


};


// extend class Money.PopUp
Money.AlertPopUp.prototype = Object.create(Money.PopUp.prototype);
Money.AlertPopUp.prototype.constructor = Money.AlertPopUp;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Money.AlertPopUp#destroy
 * @memberof Money.AlertPopUp
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Money.AlertPopUp.prototype.destroy = function (destroyChildren, soft)
{
    this.affirmHandler = null;
    this.cancelHandler = null;
    this.context = null;

    Money.PopUp.prototype.destroy.call(this, destroyChildren, soft);
};
/**
 * displays this event's popup
 *
 * @override
 * @method Money.AlertPopUp#renderPopUp
 * @memberof Money.AlertPopUp
 * @param {function} affirmHandler
 * @param {function} cancelHandler
 * @param {object} context
 * @param {boolean} instantly - if true, use tweens
 */
Money.AlertPopUp.prototype.show = function (affirmHandler, cancelHandler, context, instantly)
{
    // super()
    Money.PopUp.prototype.show.call(this, instantly);

    this.affirmHandler = affirmHandler;
    this.cancelHandler = cancelHandler;
    this.context = context;
};

//============================================================
// Private methods
//============================================================
/**
 * dispatch onAffirm signal if affirm button is clicked
 *
 * @method Money.AlertPopUp#handleOnBtnAffirmDown
 * @memberof Money.AlertPopUp
 * @protected
 */
Money.AlertPopUp.prototype.handleOnBtnAffirmDown = function ()
{

    Money.PopUp.prototype.handleOnBtnAffirmDown.call(this);

    if (this.affirmHandler)
    {
        this.affirmHandler.call(this.context);
    }
};
/**
 * dispatch onCancel signal if cancel button is clicked
 *
 * @method Money.AlertPopUp#handleOnBtnCancelDown
 * @memberof Money.AlertPopUp
 * @protected
 */
Money.AlertPopUp.prototype.handleOnBtnCancelDown = function ()
{
    Money.PopUp.prototype.handleOnBtnCancelDown.call(this);

    if (this.cancelHandler)
    {
        this.cancelHandler.call(this.context);
    }
};
/**
 * Plays a click sound for the button.
 *
 * @method Money.AlertPopUp#playButtonSound
 * @memberof Money.AlertPopUp
 * @private
 */
Money.AlertPopUp.prototype.playButtonSound = function ()
{
    Money.playSound(Money.Asset.Sound.BTN_CLICK);
};
//============================================================
// Implicit getters and setters
//============================================================
