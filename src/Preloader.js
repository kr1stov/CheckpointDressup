
Fashion.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.preloadFill = null;
	this.preloadLabel = null;

	this.ready = false;

};

Fashion.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		//	+ lots of other required assets here


        //-----------------------------------
        // Setup visual preloader
        //-----------------------------------
        this.background = this.game.add.image(0, 0, "splash-bg");
        this.background.x = Math.round((this.game.world.width - this.background.width) / 2);
        this.background.y = Math.round((this.game.world.height - this.background.height) / 2);

        this.preloadBar = this.game.add.image(0, 0, "preloaderBar");
        this.preloadBar.x = Math.round((this.game.world.width - this.preloadBar.width) / 2);
        this.preloadBar.y = Math.round((this.game.world.height - this.preloadBar.height) * 0.6);

        this.preloadFill = this.game.add.image(0, 0, "preloaderFill");
        this.preloadFill.x = this.preloadBar.x;
        this.preloadFill.y = this.preloadBar.y;
        this.load.setPreloadSprite(this.preloadFill);

        this.preloadLabel = this.game.add.text(0, 0, "0%", { "font": "Lato-Regular", "fill": "#004d5b", "fontSize": 30 });
        this.preloadLabel.x = this.preloadBar.x + Math.round((this.preloadBar.width - this.preloadLabel.width) / 2);
        this.preloadLabel.y = this.preloadBar.y + this.preloadBar.height * 2;
        this.load.onFileComplete.add(this.updatePreloadLabel, this);


        //-----------------------------------
        // Fonts
        //-----------------------------------
        /*var key, font;
        for (key in Fashion.Asset.Font)
        {
            if (Fashion.Asset.Font.hasOwnProperty(key))
            {
                font = Fashion.Asset.Font[key];

                this.loadBitmapFont(font, Fashion.PATH_FONTS + font + "-hd");
            }
        }*/

        //-----------------------------------
        // Webfont (Test)
        //-----------------------------------
        WebFontConfig = { google: { families: ['Muli'] } };
        // FIXME external URL calls are prohibited in the final setup. This is for testing only
        //this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //-----------------------------------
        // Data
        //-----------------------------------
        this.load.json('config', Fashion.PATH_ASSETS + 'config.json');
        this.load.json('content', Fashion.PATH_ASSETS + 'content.json');
        this.load.json('translations', Fashion.translationPath);
        this.load.json('messages', Fashion.PATH_ASSETS + 'messages.json');
        //-----------------------------------
        // Atlases
        //-----------------------------------
        this.load.atlas('gameAtlas', Fashion.PATH_ATLASES + 'game.png', Fashion.PATH_ATLASES + 'game.json');
        //-----------------------------------
        // Large Images
        //-----------------------------------
        this.load.image('creditsBG', Fashion.PATH_IMAGES + 'credits-bg.png');
        this.load.image('gameOverBG', Fashion.PATH_IMAGES + 'game-over-bg.png');
        this.load.image('introBG', Fashion.PATH_IMAGES + 'intro-bg.png');
        //-----------------------------------
        // Audio
        //-----------------------------------
        if (this.game.device.webAudio)
        {
            this.load.audio(Fashion.Asset.Sound.BTN_CLICK, [Fashion.PATH_SFX + 'btn-default' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.CLOTHES_DROP_CHAR, [Fashion.PATH_SFX + 'clothes-drop-char' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.CLOTHES_DROP_FLOOR, [Fashion.PATH_SFX + 'clothes-drop-floor' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.CLOTHES_ERROR, [Fashion.PATH_SFX + 'clothes-error' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.CLOTHES_PICKUP, [Fashion.PATH_SFX + 'clothes-pickup' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.MINE_EXPLOSION, [Fashion.PATH_SFX + 'mine-explosion' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.MONEY_LOSE, [Fashion.PATH_SFX + 'money-lose' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.MUSIC, [Fashion.PATH_SFX + 'music' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.TRUCK_CRASH, [Fashion.PATH_SFX + 'truck-crash' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.TRUCK_IDLE, [Fashion.PATH_SFX + 'truck-idle' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.TRUCK_START, [Fashion.PATH_SFX + 'truck-start' + Fashion.AUDIO_FORMAT]);
            this.load.audio(Fashion.Asset.Sound.TRUCK, [Fashion.PATH_SFX + 'truck' + Fashion.AUDIO_FORMAT]);
        }
    },

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        //-----------------------------------
        // Init config and content
        //-----------------------------------
        // extract loaded JSON data
        Fashion.config.parseConfig(this.cache.getJSON('config'));

        Fashion.content = this.cache.getJSON('content');
        if (!Fashion.content)
            throw "Failed to initialize game: Invalid content data!";

        Fashion.initTranslations(this.cache.getJSON('translations'));

        Fashion.messages = this.cache.getJSON('messages');

    },

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.

		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		//
		//if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		//{
		//	this.ready = true;
		//	this.state.start('Game');
		//}
        // start the game if the game data object is already initialized.
        if (Fashion.content)
        {
            this.state.start('Game');
        }
	},

    destroy: function() {
        this.background = null;
        this.preloadBar = null;
        this.preloadFill = null;
        this.preloadLabel = null;
    },

    loadBitmapFont: function(key, pathAndName)
    {
        this.load.bitmapFont(key, pathAndName + ".png", pathAndName + ".fnt");
    },

    updatePreloadLabel: function()
    {
        this.preloadLabel.text = this.load.progress + "%";
        this.preloadLabel.x = this.preloadBar.x + Math.round((this.preloadBar.width - this.preloadLabel.width) / 2);
    }


};
