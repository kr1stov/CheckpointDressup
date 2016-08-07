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

    GAME: 'gameAtlas',
    MENU: 'gameAtlas'

};
/**
 * @namespace Fashion.Asset.AtlasPath
 */
Fashion.Asset.AtlasPath = {

    UI: 'ui/',
    GARMENTS : 'truck/garments/',
    PHONE: 'phone/',
    ROAD: 'road/',
    TRUCK: 'truck/',
    DRESS_UP_SPACE: 'dress-up-space/',
    CHARACTER: 'truck/character/',
    GARMENTS: 'truck/garments/'

};
/**
 * @namespace Fashion.Asset.Image
 */
Fashion.Asset.Image = {
    //-----------------------------------
    // Menu
    //-----------------------------------
    MENU_BG : 'splash-bg',
    CREDITS_BG : 'creditsBG',
    INTRO_BG : 'introBG',
    GAME_OVER : 'gameOverBG',
    MENU_BTN : Fashion.Asset.AtlasPath.UI + 'menu-btn-up.png',
    MENU_BTN_DISABLED : Fashion.Asset.AtlasPath.UI + 'menu-btn-disabled.png',
    //-----------------------------------
    // Phones
    //-----------------------------------
    PHONE_BG: Fashion.Asset.AtlasPath.PHONE + 'bg.png',
    PHONE_FRAME: Fashion.Asset.AtlasPath.PHONE + 'frame.png',
    MESSAGE_INCOMING: Fashion.Asset.AtlasPath.PHONE + 'message-incoming.png',
    MESSAGE_OUTGOING: Fashion.Asset.AtlasPath.PHONE + 'message-outgoing.png',
    //-----------------------------------
    // ROAD
    //-----------------------------------
    ROAD_BG: Fashion.Asset.AtlasPath.ROAD  + 'bg.png',
    MAIN_CHAR_VEHICLE: Fashion.Asset.AtlasPath.ROAD  + 'maincharacter.png',
    //-----------------------------------
    // Dress up space
    //-----------------------------------
    DRESS_UP_BG: Fashion.Asset.AtlasPath.DRESS_UP_SPACE + 'bg.png',
    //-----------------------------------
    // Truck
    //-----------------------------------
    TRUCK_BG: Fashion.Asset.AtlasPath.TRUCK + 'bg.png',
    //-----------------------------------
    // Character
    //-----------------------------------
    CHARACTER_BASE: Fashion.Asset.AtlasPath.CHARACTER + 'heroine.png'
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
    BTN_CLICK: 'sndButtonDefault',
    CLOTHES_DROP_CHAR: 'sndClothesDropChar';
    CLOTHES_DROP_FLOOR: 'sndClothesDropFloor';
    CLOTHES_ERROR: 'sndClothesError';
    CLOTHES_PICKUP: 'sndClothesPickup';
    MINE_EXPLOSION: 'sndMineExplosion';
    MONEY_LOSE: 'sndMoneyLose';
    MUSIC: 'sndMusic';
    TRUCK_CRASH: 'sndTruckCrash';
    TRUCK_IDLE: 'sndTruckIdle';
    TRUCK_START: 'sndTruckStart';
    TRUCK: 'sndTruck';
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

    MENU_BTN_ACTIVE: "menuBtnActive",
    MENU_BTN_DISABLED: "menuBtnActive",
    PHONE_MESSAGE: "phoneMessage"
};
