/**
 * @author       Moritz Krohn <mk@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.StartScreen
 *
 * @classdesc Create a new 'Menu' object.
 * @constructor
 * @extends Fashion.Screen
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 */
Fashion.StartScreen = function (game, parent)
{
    // call super constructor
    Fashion.Screen.call(this, game, parent);
    var style = Fashion.config.getFontStyle(Fashion.Asset.FontStyle.MENU_BTN_ACTIVE);
    /**
     * @property {Phaser.Signal} onNewGame - Fires when the player clicks the "New Game"-button.
     */
    this.onNewGame = new Phaser.Signal();
    /**
     * @property {Phaser.Signal} onShowCredits - Fires when the credits button has been clicked.
     */
    this.onShowCredits = new Phaser.Signal();
    /**
     * @property {Phaser.Image} bg - Background, temporarily as Graphics-object.
     * @private
     */
    this.bg = this.game.make.image(0, 0, Fashion.Asset.Image.MENU_BG);
    /**
     * @property {GTLib.TextButton} btnNewGame - Button to start a new game.
     * @private
     */
    this.btnNewGame = new GTLib.TextButton(
        this.game,
        Fashion.Asset.TextureAtlas.MENU,
        Fashion.Asset.Image.MENU_BTN,
        Fashion.Asset.Image.MENU_BTN_DISABLED,
        style
    );
    /**
     * @property {GTLib.TextButton} btnContinueGame - Button to continue an existing (save-)game.
     * @private
     */
    this.btnShowCredits = new GTLib.TextButton(
        this.game,
        Fashion.Asset.TextureAtlas.MENU,
        Fashion.Asset.Image.MENU_BTN,
        Fashion.Asset.Image.MENU_BTN_DISABLED,
        style
    );
    //-----------------------------------
    // Init
    //-----------------------------------
    // add background & stretch it to screen size
    this.add(this.bg);
    this.bg.scale.set(this.game.world.width / this.bg.width, this.game.world.height / this.bg.height);
    // new game button
    this.add(this.btnNewGame);
    this.btnNewGame.text = Fashion.translate(Fashion.LangTokens.MENU_BTN_NEW);
    this.btnNewGame.onDown.add(this.handleBtnNewGameDown, this);
    // continue game button
    this.add(this.btnShowCredits);
    this.btnShowCredits.text = Fashion.translate(Fashion.LangTokens.MENU_BTN_SHOW_CREDITS);
    this.btnShowCredits.onDown.add(this.handleBtnContinueGameDown, this);
    this.btnShowCredits.enabled = Fashion.savegameExists;

    this.arrangeChildren();
};

// extend class Fashion.Screen
Fashion.StartScreen.prototype = Object.create(Fashion.Screen.prototype);
Fashion.StartScreen.prototype.constructor = Fashion.StartScreen;

//============================================================
// Public interface
//============================================================

/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.StartScreen#destroy
 * @memberof Fashion.StartScreen
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.StartScreen.prototype.destroy = function (destroyChildren, soft)
{
    this.onNewGame.dispose();
    this.onNewGame = null;

    this.onShowCredits.dispose();
    this.onShowCredits = null;

    this.bg = null;

    this.btnNewGame.onDown.remove(this.handleBtnNewGameDown, this);
    this.btnNewGame = null;

    this.btnShowCredits.onDown.remove(this.handleBtnContinueGameDown, this);
    this.btnShowCredits = null;

    Fashion.Screen.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================
/**
 * Arranges the children of this screen.
 *
 * @method Fashion.StartScreen#arrangeChildren
 * @memberof Fashion.StartScreen
 * @private
 */
Fashion.StartScreen.prototype.arrangeChildren = function ()
{
    // position buttons
    this.btnNewGame.x = Math.round(this.game.world.width - this.btnNewGame.width * 1.2);
    this.btnNewGame.y = Math.round(this.game.world.height * 0.66);
    this.btnShowCredits.x = this.btnNewGame.x;
    this.btnShowCredits.y = Math.round(this.game.world.height * 0.8);
};
/**
 * Starts a new game, after showing an alert if there is already an existing savegame.
 *
 * @method Fashion.StartScreen#handleBtnNewGameDown
 * @memberof Fashion.StartScreen
 * @private
 */
Fashion.StartScreen.prototype.handleBtnNewGameDown = function ()
{
    this.onNewGame.dispatch();

    Fashion.playSound(Fashion.Asset.Sound.BTN_CLICK);
};
/**
 * Goes to MilestonesScreen to let player chose where to continue from.
 *
 * @method Fashion.StartScreen#handleBtnContinueGameDown
 * @memberof Fashion.StartScreen
 * @private
 */
Fashion.StartScreen.prototype.handleBtnContinueGameDown = function ()
{
    this.onShowCredits.dispatch();

    Fashion.playSound(Fashion.Asset.Sound.BTN_CLICK);
};
//============================================================
// Implicit getters and setters
//============================================================

