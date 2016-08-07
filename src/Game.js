
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
     * @property {Fashion.Intro} introScreen - Animated Intro-sequence introducing the game to the player.
     * @private
     */
    this.introScreen = null;
    /**
     * @property {Fashion.CreditsScreen} credits - The credits screen.
     * @private
     */
    this.creditsScreen = null;
    /**
     * @property {Fashion.GameOverScreen} gameOverScreen - The game over screen.
     * @private
     */
    this.gameOverScreen = null;
    /**
     * @property {Fashion.Phone} phone - An instance of the phone.
     * @private
     */
    this.phone = null;
    /**
     * @property {Fashion.Overlay} overlayAlert - Overlay for hiding the background when an alert is shown.
     * @private
     */
    //this.overlayAlert = null;
    /**
     * @property {number} checkPointIndex -
     * @private
     */
    this.checkPointIndex = 0;
};

Fashion.Game.prototype = {

    create: function () {
        //-----------------------------------
        // create
        //-----------------------------------
        this.gameLayer = this.game.add.group();
        this.gameLayer.name = "GameLayer";
        this.menuLayer = this.game.add.group();
        this.menuLayer.name = "MenuLayer";
        //-----------------------------------
        // Menu
        //-----------------------------------
        this.menu = new Fashion.StartScreen(this.game);
        this.menu.onNewGame.add(this.handleNewGameClick, this);
        this.menu.onShowCredits.add(this.handleShowCredits, this);
        this.menuLayer.add(this.menu);
        this.menu.hide();
        //-----------------------------------
        // Credits
        //-----------------------------------
        this.creditsScreen = new Fashion.CreditsScreen(this.game);
        this.creditsScreen.onInputDown.add(this.handleCreditsClose, this);
        this.menuLayer.add(this.creditsScreen);
        this.creditsScreen.hide();
        //-----------------------------------
        // Intro
        //-----------------------------------
        this.introScreen = new Fashion.IntroScreen(this.game);
        this.introScreen.onInputDown.add(this.handleIntroClose, this);
        this.menuLayer.add(this.introScreen);
        this.introScreen.hide();
        //-----------------------------------
        // GameOverScreen
        //-----------------------------------
        this.gameOverScreen = new Fashion.GameOverScreen(this.game);
        this.gameOverScreen.onInputDown.add(this.handleGameOverClose, this);
        this.menuLayer.add(this.gameOverScreen);
        this.gameOverScreen.hide();
        //-----------------------------------
        // Phone
        //-----------------------------------
        this.phone = new Fashion.Phone(this.game, Fashion.Asset.TextureAtlas.GAME);
        this.gameLayer.add(this.phone);

        this.phone.x = this.game.world.width - this.phone.width;
        this.phone.y = this.game.world.height - this.phone.height;
        //-----------------------------------
        // Road
        //-----------------------------------
        this.road = new Fashion.Road(this.game, Fashion.Asset.TextureAtlas.GAME);
        this.gameLayer.add(this.road);
        //-----------------------------------
        // Truck
        //-----------------------------------
        this.dressUpSpace = new Fashion.DressUpSpace(
            this.game,
            Fashion.Asset.TextureAtlas.GAME,
            Fashion.content.dropZones,
            Fashion.content.dressCodes
        );
        this.gameLayer.add(this.dressUpSpace);
        this.dressUpSpace.y = this.game.world.height - this.dressUpSpace.height;
        this.dressUpSpace.setup(Fashion.content.garments);

        this.guard = this.game.add.image(100, 0, Fashion.Asset.TextureAtlas.GAME, Fashion.Asset.AtlasPath.DRESS_UP_SPACE + "guard-right.png");
        this.guard.y = this.game.world.height;

        this.bubble = this.game.add.image(100, 0, Fashion.Asset.TextureAtlas.GAME, Fashion.Asset.AtlasPath.DRESS_UP_SPACE + "menu-speechbubble.png");
        this.bubble.inputEnabled = true;
        this.bubble.events.onInputDown.add(this.handleBubbleClick, this);
        this.bubble.x = 100;
        this.bubble.y = 100;
        this.bubble.visible = false;

        var style = Fashion.config.getFontStyle(Fashion.Asset.FontStyle.GUARD_ANSWER);
        this.bubbleLabel = this.game.add.text(0, 0, "Hello there!", style);
        this.bubbleLabel.x = this.bubble.x + 100;
        this.bubbleLabel.y = this.bubble.y + 30;
        this.bubbleLabel.visible = false;

        // test button
        //var btn = this.game.add.image(-80,80, Fashion.Asset.TextureAtlas.MENU, Fashion.Asset.Image.MENU_BTN);
        //btn.inputEnabled = true;
        //btn.events.onInputDown.add(this.performDressCheck, this);
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
            Fashion.addSound(Fashion.Asset.Sound.CLOTHES_DROP_CHAR, 1);
            Fashion.addSound(Fashion.Asset.Sound.CLOTHES_DROP_FLOOR, 1);
            Fashion.addSound(Fashion.Asset.Sound.CLOTHES_ERROR, 1);
            Fashion.addSound(Fashion.Asset.Sound.CLOTHES_PICKUP, 1);
            Fashion.addSound(Fashion.Asset.Sound.MINE_EXPLOSION, 1);
            Fashion.addSound(Fashion.Asset.Sound.MONEY_LOSE, 1);
            Fashion.addSound(Fashion.Asset.Sound.MUSIC, 1);
            Fashion.addSound(Fashion.Asset.Sound.TRUCK_CRASH, 1);
            Fashion.addSound(Fashion.Asset.Sound.TRUCK_IDLE, 1);
            Fashion.addSound(Fashion.Asset.Sound.TRUCK_START, 1);
            Fashion.addSound(Fashion.Asset.Sound.TRUCK, 1);
        }
        //-----------------------------------
        // Kickoff
        //-----------------------------------
        //this.showScreen(Fashion.Game.Screen.MENU); // FIXME
        this.startNewGame();
    },


    update: function ()
    {

    },
    /**
     *
     *
     * @method Fashion.Game#performDressCheck
     * @memberof Fashion.Game
     * @private
     */
    performDressCheck: function ()
    {
        this.road.stopRolling();

        var faction = (Fashion.debug) ? Fashion.content.gameConfig.dressTest.faction : Fashion.Faction.All[Math.round(this.game.rnd.frac() * (Fashion.Faction.All.length - 1))];
        Log.debug(" ");
        Log.debug("DRESS CODE CHECK BY: " + faction);

        var coverage = this.dressUpSpace.getCharacterCoverage();
        if (Fashion.debug)
        {
            Fashion.Character.dumpCoverage(coverage);
        }

        var dressCode = Fashion.content.dressCodes[faction];
        Log.debug(dressCode);
        var errorsCoverage = 0;

        var styleCount = {};
        styleCount[Fashion.ClothingStyle.EXPOSED] = 0;
        styleCount[Fashion.ClothingStyle.MILITARY] = 0;
        styleCount[Fashion.ClothingStyle.MODERATE] = 0;
        styleCount[Fashion.ClothingStyle.RELAXED] = 0;
        styleCount[Fashion.ClothingStyle.STRICT] = 0;

        for (var part in coverage)
        {
            styleCount[coverage[part]]++;

            if (dressCode.must[part] && dressCode.must[part] != coverage[part])
            {
                errorsCoverage++;
            }
            if (dressCode.mustNot[part] && dressCode.mustNot[part] == coverage[part])
            {
                errorsCoverage++;
            }
        }
        Log.debug(styleCount);
        Log.debug("Errors coverage: "+ errorsCoverage);
        Log.debug(" ");
        var num;
        var errorsLimits = 0;
        for (var style in styleCount)
        {
            if (!isNaN(dressCode.maxStyle[style]))
            {
                num = styleCount[style] - dressCode.maxStyle[style];
                Log.debug("max Style: " + style + ": " + num);
                errorsLimits += (num < 0) ? 0 : num;
            }
            if (!isNaN(dressCode.minStyle[style]))
            {
                num = dressCode.minStyle[style] - styleCount[style];
                Log.debug("min Style: " + style + ": " + num);
                errorsLimits += (num < 0) ? 0 : num;
            }
        }
        Log.debug("Errors limits: "+ errorsLimits);

        var errors = Math.max(errorsCoverage, errorsLimits);
        Log.debug("Max error: " + errors);
        errors -= dressCode.failTolerance;
        errors = (errors < 0 ) ? 0 : errors;
        Log.debug("Max error after tolerance: " + errors);

        var penalty = errors * dressCode.penaltyPerFail;
        Log.debug("Penalty: " + penalty);

        if (penalty > dressCode.penaltyLimit)
        {
            this.bubbleLabel.text = "You may not pass!";
            //Log.debug("YOU SHALL NOT PASS!!");
        }
        else
        {
            Log.debug("YOU SHALL PASS");
            if (penalty > 0)
            {
                this.bubbleLabel.text = "You may pass!\nBut you must pay " + penalty + ".";
                //Log.debug("... IF YOU GIVE ME " + penalty + " MONEY!");
            }
            else
            {

                this.bubbleLabel.text = "Save journey!";
            }
        }

        this.sendInTheClowns();
    },
    /**
     *
     *
     * @method Fashion.Game#sendInTheClowns
     * @memberof Fashion.Game
     * @private
     */
    sendInTheClowns: function ()
    {
        var t = Fashion.Tween.create(this.game, this.guard,
            { y:  this.game.world.height - this.guard.height},
            Fashion.Tween.Guard.WALK_IN
        );
        t.onComplete.add(this.onSendInComplete, this);
        t.start();
    },
    /**
     *
     *
     * @method Fashion.Game#onSendInComplete
     * @memberof Fashion.Game
     * @private
     */
    onSendInComplete: function ()
    {
        Log.debug("onSendInComplete");
        this.bubble.visible = true;
        this.bubbleLabel.visible = true;
    },
    /**
     *
     *
     * @method Fashion.Game#handleBubbleClick
     * @memberof Fashion.Game
     * @private
     */
    handleBubbleClick: function ()
    {
        this.bubble.visible = false;
        this.bubbleLabel.visible = false;

        var t = Fashion.Tween.create(this.game, this.guard,
            { y: this.game.world.height},
            Fashion.Tween.Guard.WALK_OUT
        );
        t.onComplete.add(this.onSendOutComplete, this);
        t.start();
    },
    /**
     *
     *
     * @method Fashion.Game#onSendOutComplete
     * @memberof Fashion.Game
     * @private
     */
    onSendOutComplete: function ()
    {
        this.continueJourney();
    },
    /**
     *
     *
     * @method Fashion.Game#continueJourney
     * @memberof Fashion.Game
     * @private
     */
    continueJourney: function ()
    {
        // continue
        this.loadNextCheckpoint();
        this.road.startRolling();
    },
    /**
     *
     *
     * @method Fashion.Game#gameOver
     * @memberof Fashion.Game
     * @private
     */
    gameOver: function (type)
    {
        switch (type)
        {
            case Fashion.Game.GameOverEvent.ARRESTED:
            {
                Log.debug("Player was arrested!");
                break;
            }
            case Fashion.Game.GameOverEvent.ARRIVED:
            {
                Log.debug("Player has arrived!");
                break;
            }
            default:
            {
                Log.error("Invalid game over type received: " + type);
                break;
            }
        }

        this.showScreen(Fashion.Game.Screen.GAME_OVER);
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
                this.currentScreen = this.introScreen;
                break;
            //-----------------------------------
            // Milestones screen
            //-----------------------------------
            case Fashion.Game.Screen.GAME_OVER:
                this.currentScreen = this.gameOverScreen;
                break;
            //-----------------------------------
            // Desktop screen
            //-----------------------------------
            case Fashion.Game.Screen.CREDITS:
                this.currentScreen = this.creditsScreen;
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
        //this.showScreen(Fashion.Game.Screen.INTRO); // FIXME uncomment this and comment handleIntroClose
        Fashion.playSound(Fashion.Asset.Sound.MUSIC, 0.5, true);
        var roadConfig = Fashion.content.gameConfig.road;
        this.road.startRolling(roadConfig.scrollSpeed);
        this.loadNextCheckpoint();

        this.startNewMessageTimer(1, "My dearest child, the situation here is getting too dangerous for you. Your uncle agreed to bring you to safety with his truck.", this.postNewIncomingMessage, this);
        this.startNewMessageTimer(3, "I gave him a bag of clothes for you. There will be many different checkpoints on the road. Each one will require different clothes!", this.postNewIncomingMessage, this);
        this.startNewMessageTimer(5, "I will try to send you as many helpful messages as possible! Lots of love, your mother.", this.postNewIncomingMessage, this);

        this.game.time.events.repeat(7, 1, this.startNewGameDelayed, this);
    },

    /**
     *
     *
     * @method Fashion.Game#startNewGameDelayed
     * @memberof Fashion.Game
     * @private
     */
    startNewGameDelayed: function (data)
    {
       this.road.startRolling(roadConfig.scrollSpeed);
       this.loadNextCheckpoint();
       Fashion.playSound(Fashion.Asset.Sound.TRUCK_START);
       Fashion.playSound(Fashion.Asset.Sound.TRUCK, 0.5);
    },



    /**
     *
     *
     * @method Fashion.Game#loadNextCheckpoint
     * @memberof Fashion.Game
     * @private
     */
    loadNextCheckpoint: function ()
    {
        var checks = Fashion.content.checks;
        if (this.checkPointIndex >= checks.length) return;

        var checkPoint = checks[this.checkPointIndex];
        this.checkPointIndex++;

        var duration = checkPoint.duration * 1000;
        this.startCheckPointTimer(duration);
        this.road.spawnCheckpoint(duration, Fashion.content.gameConfig.road.scrollSpeed);



        var messageTexts = this.phone.messageCenter.getCheckMessages(checkPoint);
        var totalMessages = checkPoint.numHelpMessages + checkPoint.numFactionMessages;
        var timePerSegment = Math.round(duration / ( totalMessages + 2 ));
        Log.debug(totalMessages);
        Log.debug(messageTexts.length);
        var n = messageTexts.length;
        var i;
        for (i = 0; i < n; i++)
        {
            msgTime = (i + 1 + this.game.rnd.frac()) * timePerSegment;
            this.startNewMessageTimer(msgTime, messageTexts[i], this.postNewIncomingMessage, this);
        }
    },

    /**
     *
     *
     * @method Fashion.Game#startNewMessageTimer
     * @memberof Fashion.Game
     * @private
     */
    startNewMessageTimer: function (duration, data, handler, context)
    {
        this.game.time.events.repeat(duration, 1, handler, context, data);
    },
    /**
     *
     *
     * @method Fashion.Game#postNewMessage
     * @memberof Fashion.Game
     * @private
     */
    postNewOutgoingMessage: function (data)
    {
        Log.debug("OUTGOING MESSAGE: " + data);
        this.phone.addMessage(Fashion.MessageType.OUTGOING, data);
    },
    /**
     *
     *
     * @method Fashion.Game#postNewMessage
     * @memberof Fashion.Game
     * @private
     */
    postNewIncomingMessage: function (data)
    {
        Log.debug("INCOMING MESSAGE: " + data);
        this.phone.addMessage(Fashion.MessageType.INCOMING, data);
    },
    /**
     *
     *
     * @method Fashion.Game#startCheckPointTimer
     * @memberof Fashion.Game
     * @private
     */
    startCheckPointTimer: function (duration)
    {
        Log.debug("New checkpoint in " + duration /1000 + " seconds!");
        this.game.time.events.repeat(duration, 1, this.performDressCheck, this);
    },
    //-----------------------------------
    // Screen handler
    //-----------------------------------
    /**
     *
     *
     * @method Fashion.Game#handleNewGameClick
     * @memberof Fashion.Game
     * @private
     */
    handleNewGameClick: function ()
    {
        this.startNewGame();
    },
    /**
     *
     *
     * @method Fashion.Game#handleIntroClose
     * @memberof Fashion.Game
     * @private
     */
    handleIntroClose: function ()
    {
        this.currentScreen.hide();

        // TODO this is where the game starts.
    },
    /**
     *
     *
     * @method Fashion.Game#handleShowCredits
     * @memberof Fashion.Game
     * @private
     */
    handleShowCredits: function ()
    {
        this.showScreen(Fashion.Game.Screen.CREDITS);
    },
    /**
     *
     *
     * @method Fashion.Game#handleCreditsClose
     * @memberof Fashion.Game
     * @private
     */
    handleCreditsClose: function ()
    {
        this.showScreen(Fashion.Game.Screen.MENU);
    },
    /**
     *
     *
     * @method Fashion.Game#handleGameOverClose
     * @memberof Fashion.Game
     * @private
     */
    handleGameOverClose: function ()
    {
        this.showScreen(Fashion.Game.Screen.MENU);
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
