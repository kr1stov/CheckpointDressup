/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace GTLib
 */
GTLib = GTLib || {};
/**
 * @namespace GTLib.FontUtil
 */
GTLib.FontUtil = GTLib.FontUtil || {}; // FIXME this should be named LabelUtil
/**
 * Sets the text of a given Phaser.BitmapText instance.
 *
 * @method GTLib.FontUtil#setLabel
 * @memberof GTLib.FontUtil
 * @param {Phaser.BitmapText} label - The label to set.
 * @param {string} text - The text to set the label with.
 * @static
 */
GTLib.FontUtil.setLabel = function (label, text)
{
    if (!label)
    {
        throw "Failed to set invalid label!";
    }
    // turn text into string if it isn't already
    text = (typeof text !== "string") ? text.toString() : text;
    // update the text field content and trigger rendering
    label.setText(text);
    // update transform is necessary to instantly have new text dimensions
    label.updateTransform();
};
/**
 * Positions an icon with a label.
 *
 * @method GTLib.FontUtil#positionIconWithLabel
 * @memberof GTLib.FontUtil
 * @param {Phaser.BitmapText} label - The label to position.
 * @param {Phaser.Image} icon - The icon to position with the label.
 * @param {number} xPos - The new x position.
 * @param {number} yPos - The new y position.
 * @param {number} paddingX - The padding to add after the label. A fraction of this will be used in between.
 */
GTLib.FontUtil.positionIconWithLabel = function (label, icon, xPos, yPos, paddingX)
{
    if (label.visible)
    {
        icon.x = xPos;
        icon.y = yPos;

        label.x = icon.x + icon.width + paddingX * 0.25;
        label.y = icon.y - icon.height / 2; // FIXME font info must be adjusted and this removed
        //return label.x + label.textWidth + paddingX;
    }
    //return xPos; // FIXME check if this is still needed
};
/**
 * Positions a label with an icon.
 *
 * @method GTLib.FontUtil#positionLabelWithIcon
 * @memberof GTLib.FontUtil
 * @param {Phaser.BitmapText} label - The label to position.
 * @param {Phaser.Image} icon - The icon to position with the label.
 * @param {number} xPos - The new x position.
 * @param {number} yPos - The new y position.
 * @param {number} paddingX - The padding to add after the label. A fraction of this will be used in between.
 */
GTLib.FontUtil.positionLabelWithIcon = function (label, icon, xPos, yPos, paddingX)
{
    if (label.visible)
    {
        label.x = xPos;
        label.y = yPos;

        icon.x = label.x + label.width + paddingX * 0.25;
        icon.y = label.y - label.height / 2; // FIXME font info must be adjusted and this removed
        //return label.x + label.textWidth + paddingX;
    }
    //return xPos; // FIXME check if this is still needed
};