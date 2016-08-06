
Fashion.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    //this.game;      //  a reference to the currently running game (Phaser.Game)
    //this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    //this.camera;    //  a reference to the game camera (Phaser.Camera)
    //this.cache;     //  the game cache (Phaser.Cache)
    //this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    //this.load;      //  for preloading assets (Phaser.Loader)
    //this.math;      //  lots of useful common math operations (Phaser.Math)
    //this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    //this.stage;     //  the game stage (Phaser.Stage)
    //this.time;      //  the clock (Phaser.Time)
    //this.tweens;    //  the tween manager (Phaser.TweenManager)
    //this.state;     //  the state manager (Phaser.StateManager)
    //this.world;     //  the game world (Phaser.World)
    //this.particles; //  the particle manager (Phaser.Particles)
    //this.physics;   //  the physics manager (Phaser.Physics)
    //this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    /**
     * @property {Phaser.Group} gameLayer - Group containing all game objects.
     * @default null
     */
    this.gameLayer = null;
    /**
     * @property {string} screen - The ID of the currently visible screen.
     * @private
     */
    this.screenID = null;
    /**
     * @property {Phaser.Group} currentScreen - points to the currently visible game screen.
     * @private
     */
    this.currentScreen = null;
    /**
     * @property {Fashion.StartScreen} menu - The main menu letting the player chose between game continuation or starting anew.
     * @private
     */
    this.menu = null;
    /**
     * @property {Fashion.Intro} intro - Animated Intro-sequence introducing the game to the player.
     * @private
     */
    //this.intro = null;
    /**
     * @property {Fashion.Overlay} overlayAlert - Overlay for hiding the background when an alert is shown.
     * @private
     */
    //this.overlayAlert = null;
};

Fashion.Game.prototype = {

    create: function () {
        //-----------------------------------
        // create
        //-----------------------------------
        this.gameLayer = this.game.add.group();
        this.gameLayer.name = "GameLayer";
        //-----------------------------------
        // Menu
        //-----------------------------------
        this.menu = new Fashion.StartScreen(this.game);
        this.menu.onNewGame.add(this.startNewGame, this);
        this.menu.onShowCredits.add(this.showCredits, this);
        this.gameLayer.add(this.menu);
        this.menu.hide();
        //-----------------------------------
        // Phone
        //-----------------------------------
        this.phone = new Fashion.Phone(this.game);
        this.gameLayer.add(this.phone);

        //-----------------------------------
        // Alert (& Overlay)
        //-----------------------------------
        //this.overlayAlert = new Fashion.Overlay(this.game, 0, 0);
        //this.overlayAlert.hide(true);
        //this.gameLayer.add(this.overlayAlert);

        //Fashion.alert = new Fashion.AlertPopUp(this.game);
        //Fashion.alert.hide(true);
        //Fashion.alert.onShow.add(this.showAlertOverlay, this);
        //Fashion.alert.onHide.add(this.hideAlertOverlay, this);
        //this.gameLayer.add(Fashion.alert);
        //-----------------------------------
        // Prepare audio
        //-----------------------------------
        if (this.game.device.webAudio)
        {
            Fashion.game = this.game;
            // TODO add all loaded sounds to the system for playback
            // TODO check addSound signature for details: soundName, volume, loop
            // Buttons
            Fashion.addSound(Fashion.Asset.Sound.BTN_CLICK, 1.5);
        }
        //-----------------------------------
        // Kickoff
        //-----------------------------------
        //this.showScreen(Fashion.Game.Screen.MENU);
    },


    update: function ()
    {

    },

    //quitGame: function (pointer)
    //{
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    //},
    //-----------------------------------
    // Screen-Manager
    //-----------------------------------
    /**
     * Shows the specified screen.
     *
     * @method Fashion.Game#showScreen
     * @memberof Fashion.Game
     * @param {string} id - ID of the screen to show.
     */
    showScreen: function (id, param)
    {
        // do nothing if screen is already set
        if (this.screenID === id)
        {
            return;
        }

        if (this.currentScreen) this.currentScreen.hide();
        
        switch (id)
        {
            //-----------------------------------
            // Welcome screen
            //-----------------------------------
            case Fashion.Game.Screen.MENU:
                this.currentScreen = this.menu;
                break;
            //-----------------------------------
            // Style choice screen
            //-----------------------------------
            case Fashion.Game.Screen.INTRO:
                this.currentScreen = this.intro;
                break;
            //-----------------------------------
            // Milestones screen
            //-----------------------------------
            case Fashion.Game.Screen.GAME_OVER:
                // lazy create milestone screen.
                if (!this.milestonesScreen)
                {
                    this.createMilestoneScreen();
                }
                this.currentScreen = this.milestonesScreen;
                break;
            //-----------------------------------
            // Desktop screen
            //-----------------------------------
            case Fashion.Game.Screen.CREDITS:
                // TODO
                //this.currentScreen = this.desktop;
                break;

            default:
                throw new Error("Failed to show invalid screen '" + id + "' in Game!");

        }

        this.screenID = id;

        if (this.currentScreen) this.currentScreen.show(param);

    },
    /**
     *
     *
     * @method Fashion.Game#showAlertOverlay
     * @memberof Fashion.Game
     * @private
     */
    showAlertOverlay: function ()
    {
        this.overlayAlert.show();
    },
    /**
     *
     *
     * @method Fashion.Game#hideAlertOverlay
     * @memberof Fashion.Game
     * @private
     */
    hideAlertOverlay: function ()
    {
        this.overlayAlert.hide();
    },
    //-----------------------------------
    // Menu Screen
    //-----------------------------------
    /**
     * When the NewGame-Button in the menu has been clicked, start a new game.
     *
     * @method Fashion.Game#startNewGame
     * @memberof Fashion.Game
     * @private
     */
    startNewGame: function ()
    {
        this.showScreen(Fashion.Game.Screen.INTRO);
    },


    showCredits: function ()
    {
        this.showScreen(Fashion.Game.Screen.CREDITS);
    }
};
/**
 *
 *
 * @namespace Fashion.Game.Screen
 */
Fashion.Game.Screen = {};
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.Screen.MENU = 'menu';
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.Screen.INTRO = 'intro';
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.Screen.GAME_OVER = 'gameOver';
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.Screen.CREDITS = 'credits';
/**
 *
 *
 * @namespace Fashion.Game.GameOverEvent
 */
Fashion.Game.GameOverEvent = {};
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.GameOverEvent.ARRESTED = 'arrested';
/**
 *
 *
 * @constant
 * @type {string}
 */
Fashion.Game.GameOverEvent.ARRIVED = 'arrived';
