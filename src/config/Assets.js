/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Fashion.Asset
 */
Fashion.Asset = {};
/**
 * @namespace Fashion.Asset.TextureAtlas
 */
Fashion.Asset.TextureAtlas = {

    GAME: 'gameAtlas'

};
/**
 * @namespace Fashion.Asset.AtlasPath
 */
Fashion.Asset.AtlasPath = {

    SOME_PATH : 'somePath/'

};
/**
 * @namespace Fashion.Asset.Image
 */
Fashion.Asset.Image = {
    //-----------------------------------
    // Calendar
    //-----------------------------------
    SOME_IMAGE: Fashion.Asset.AtlasPath.SOME_PATH + 'some-image.png'
};
/**
 * @namespace Fashion.Asset.Animation
 */
Fashion.Asset.Animation = {

    SOME_ANIMATION: [
        Fashion.Asset.AtlasPath.SOME_ATLAS + "some-anim-01.png",
        Fashion.Asset.AtlasPath.SOME_ATLAS + "some-anim-02.png",
        Fashion.Asset.AtlasPath.SOME_ATLAS + "some-anim-03.png"
    ]
};
/**
 * @namespace Fashion.Asset.Graphics
 */
Fashion.Asset.Graphics = {

    SOME_GRAPHIC: {
        color: 0x00cc00,
        alpha: 0.3
    }

};
/**
 * All sounds available in the game
 *
 * @namespace Fashion.Asset.Sound
 */
Fashion.Asset.Sound = {

    BTN_CLICK: 'sndButtonDefault'
};

/**
 * All fonts listed in this object will be loaded automatically on game start.
 *
 * @namespace Fashion.Asset.Font
 */
Fashion.Asset.Font = {

    LATO_BOLD: 'Lato-Bold',
    LATO_LIGHT: 'Lato-Light',
    LATO_REGULAR: 'Lato-Regular'
};


/**
 * All styles listed here must also be declared in config.json with their specific font's as listed under
 * Fashion.Asset.Font and the desired size to display them in.
 *
 * @namespace Fashion.Asset.FontStyle
 */
Fashion.Asset.FontStyle = {

    SOME_STYLE: "someFontStyle"
};