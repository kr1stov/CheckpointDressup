/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Money.LabelUtil
 */
Money.LabelUtil = Money.LabelUtil || {};

/**
 * Sets a given label with a given value, font and style. Checks visibility of label and icon.
 *
 * @method Money.LabelUtil#setLabelWithStyle
 * @memberof Money.LabelUtil
 * @param {Phaser.BitmapText} label - The label to update.
 * @param {object} value - Will be turned into a string.
 * @param {string} styleID - ID of the style to set for this font.
 */
Money.LabelUtil.setLabelWithStyle = function (label, value, styleID)
{
    if (!Money.config)
    {
        throw "Money.config is not set!";
    }

    // access style
    var style = Money.config.getFontStyle(styleID);
    // update font face and size
    label.font = style.font;
    label.fontSize = style.size;
    // use font util to set the label
    GTLib.FontUtil.setLabel(label, value);
};