Fashion = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Fashion.orientated in internal loops to know if it should pause or not */
    orientated: false,

    smoothed: false,
    showAnimations: false,
    runsOnMobile: false,
    runsOnDesktop: false,

    config: null,

    content: null,

    translationPath: null,

    initTranslations: function(content) {
        GTLib.LangUtil.setTranslationContent(content);
    },

    translate: function(token) {
        return GTLib.LangUtil.getTranslation(token);
    },

    alert: null,

    //-----------------------------------
    // All things sounds
    //-----------------------------------
    /**
     *
     */
    sounds: {},
    /**
     *
     */
    game: null,
    /**
     *
     */
    addSound: function(name, volume, loop, connect){
        if (this.game && !this.sounds[name])
        {
            this.sounds[name] = this.game.add.audio(name, volume, loop, connect);
            return this.sounds[name];
        }
        return null;
    },
    /**
     *
     */
    addMarkerTo: function(audioName, name, position, duration, volume, loop){
        if (this.sounds[audioName])
        {
            this.sounds[audioName].addMarker(name, position, duration, volume, loop);
        }
    },
    /**
     *
     */
    playSound: function(name, volume, loop){

        if (this.sounds[name])
        {
            this.sounds[name].stop();
            this.sounds[name].play('', 0, volume, loop);
        }
        else
        {
            for (var key in this.sounds)
            {
                if (this.sounds[key].markers[name])
                {
                    this.sounds[key].play(name);
                    break;
                }
            }
        }
    },
    /**
     *
     */
    stopSound: function(name){

        if (this.sounds[name])
        {
            this.sounds[name].stop();
        }
        else
        {
            for (var key in this.sounds)
            {
                if (this.sounds[key].markers[name])
                {
                    this.sounds[key].stop();
                    break;
                }
            }
        }
    },
    /**
     *
     */
    destroySounds: function(){

        for (var key in this.sounds)
        {
            if (this.sounds[key])
            {
                this.sounds[key].destroy();
            }
            delete this.sounds[key];
        }
        this.sounds = null;
        this.game = null;
    }
};
//============================================================
// Boot state
//============================================================
Fashion.Boot = function (game) {

    Log.initialize(true);

    GTLib.LangUtil.setValidLanguages([
        GTLib.LangUtil.Language.EN
    ]);
};

Fashion.Boot.prototype = {

    init: function (params) {
        // FIXME fallback if params are not set. maybe throw error here later
        if (!params)
        {
            params = {
                assetsPath: 'assets/',
                translations: 'assets/translations_en.json'
            };
        }
        //-----------------------------------
        // Validate external params
        //-----------------------------------
        //var lang = (params.hasOwnProperty("langID")) ? params.langID : GTLib.LangUtil.Language.DE;
        //GTLib.LangUtil.setLanguage(params.lang);
        // check if remote calls are supposed to be simulated by client
        Fashion.translationPath = (params.hasOwnProperty("translations") && typeof params.translations == 'string') ? params.translations : 'assets/translations.json';
       //-----------------------------------
        // Configure game
        //-----------------------------------
        // Only apply smoothing to images and sprites on desktop. Save power on mobile.
        Fashion.runsOnDesktop = this.game.device.desktop;
        Fashion.runsOnMobile = !Fashion.runsOnDesktop;
        Fashion.smoothed = Fashion.runsOnDesktop;
        Fashion.showAnimations = Fashion.runsOnDesktop;

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

        // pick asset set depending on game width
        Fashion.PATH_ASSETS = params.assetsPath;
    },

    preload: function () {
        this.game.stage.backgroundColor = 0xcccccc;
        //-----------------------------------
        // Define paths
        //-----------------------------------
        Fashion.PATH_ATLASES = Fashion.PATH_ASSETS + "atlases/";//  + this.game.world.width + "/";

        // set path constants with resolution dependent asset path
        Fashion.PATH_CONTENT = Fashion.PATH_GFX + "game/";
        Fashion.PATH_PRELOADER = Fashion.PATH_ASSETS + "preloader/";
        Fashion.PATH_FONTS = Fashion.PATH_ASSETS + "fonts/";
        Fashion.PATH_IMAGES = Fashion.PATH_ASSETS + "images/";
        //-----------------------------------
        // Select audio format
        //-----------------------------------
        Log.debug("web audio supported? " + this.game.device.webAudio);
        if (this.game.device.webAudio)
        {
            Fashion.PATH_AUDIO = Fashion.PATH_ASSETS + "audio/";
            Fashion.PATH_SFX = Fashion.PATH_AUDIO;

            // FIXME force WAV for testing
            if (true)
            {
                Fashion.PATH_SFX += "wav/";
                Fashion.AUDIO_FORMAT = ".wav";
            } else
            // FIXME uncomment this code once all formats are available
            // native m4a on iOS
            if (this.game.device.safari || this.game.device.mobileSafari)
            {
                Fashion.PATH_SFX += "wav/";
                Fashion.AUDIO_FORMAT = ".wav";
            }
            // ogg for which that support it
            else if (this.game.device.ogg)
            {
                Fashion.PATH_SFX += "ogg/";
                Fashion.AUDIO_FORMAT = ".ogg";
            }
            // ...and WAV on all other browsers (also Chrome on iOS)
            else
            {
                Fashion.PATH_SFX += "wav/";
                Fashion.AUDIO_FORMAT = ".wav";
            }

        }

        //  Here we load the assets required for our preloader
        this.load.image('splash-bg', Fashion.PATH_IMAGES + "splash-bg.png");
        this.load.image('preloaderBar', Fashion.PATH_PRELOADER + "load-bar-background.png");
        this.load.image('preloaderFill', Fashion.PATH_PRELOADER + "load-bar-overlay.png");
    },

    create: function () {

        Fashion.config = new Fashion.Config();

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        Fashion.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        Fashion.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};