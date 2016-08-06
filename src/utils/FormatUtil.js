/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Fashion.FormatUtil
 */
Fashion.FormatUtil = Fashion.FormatUtil || {};
/**
 * Formats a numeric value into a string depending on whether it's larger or smaller than 0;
 *
 * @method Fashion.FormatUtil#formatValue
 * @memberof Fashion.FormatUtil
 * @param {number} value - Numeric value to be formatted.
 * @return {string} The formatted string value.
 */
Fashion.FormatUtil.formatValue = function (value)
{
    var s = Fashion.FormatUtil.convertNumToString(value);

    return (value > 0) ? "+" + s : s;
};
/**
 * Converts a number into a string and inserts a dot if four digits long or more.
 *
 * @method Fashion.FormatUtil#convertNumToString
 * @memberof Fashion.FormatUtil
 * @param {number} num - The number to convert.
 * @return {string} - The converted string.
 * @static
 */
Fashion.FormatUtil.convertNumToString = function (num)
{
    var negative = (num < 0);
    num = Math.abs(num);
    var strParts = num.toString().split("");
    var n = strParts.length;
    var dotsCount = (n % 3 === 0)? n / 3 - 1 : Math.floor(n / 3);
    var i = 0;
    for (dotsCount; dotsCount > 0; dotsCount--)
    {
        strParts.splice(n - 3 * dotsCount + i, 0, "'");
        i++;
    }
    if (negative)
    {
        strParts.unshift("-");
    }
    return strParts.join("");
};
/**
 * Puts to numbers together as a string and divides them with a slash.
 *
 * @method Fashion.FormatUtil.FormatUtil#convertTwoValuesToStringWithSlash
 * @memberof Fashion.FormatUtil.FormatUtil
 * @param {number} num1 - The number left to the slash
 * @param {number} num2 - The number on the right of the slash
 * @return {string} - The converted string.
 * @static
 */
Fashion.FormatUtil.convertTwoNumbersToStringWithSlash = function (num1, num2)
{
    return Fashion.FormatUtil.convertNumToString(num1) + " / " + Fashion.FormatUtil.convertNumToString(num2);
};
/**
 * Converts number to string and adds %-sign to it.
 *
 * @method Fashion.FormatUtil.#convertNumberToPercentageString
 * @memberof Fashion.FormatUtil
 * @param {number} num
 * @static
 */
Fashion.FormatUtil.convertNumberToPercentageString = function (num)
{
    return num + " %";
};
/**
 * Converts number to string and adds a +-sign before it (if positive) and a %-sign after it.
 *
 * @method Fashion.FormatUtil.#convertNumberToPlusPercentageString
 * @memberof Fashion.FormatUtil
 * @param {number} num
 * @static
 */
Fashion.FormatUtil.convertNumberToPlusPercentageString = function (num)
{
    var s = Fashion.FormatUtil.formatValue(num);
    return Fashion.FormatUtil.convertNumberToPercentageString(s);
};
/**
 * Converts a number to a string and adds '%'-sign to it.
 *
 * @method Fashion.FormatUtil#convertNumberToPercentageString
 * @memberof Fashion.FormatUtil
 * @param {number} num
 * @return {string}
 * @static
 */
Fashion.FormatUtil.convertNumberToPercentageString = function (num)
{
    return num + " %";
};
/**
 * Calculates percentage of num1 from num2 and adds '%'-sign.
 *
 * @method Fashion.FormatUtil.FormatUtil#convertTwoNumbersToPercentageString
 * @memberof Fashion.FormatUtil.FormatUtil
 * @param {number} num1
 * @param {number} num2
 * @return {string} - The converted string.
 * @static
 */
Fashion.FormatUtil.convertTwoNumbersToPercentageString = function (num1, num2)
{
    return Math.round((num1 / num2) * 100) + " %";
};
/**
 * Makes sure a number is two digits long.
 *
 * @method Fashion.FormatUtil#makeNumberATwoDigitString
 * @memberof Fashion.FormatUtil
 * @param {number} num
 * @return {string}
 * @static
 */
Fashion.FormatUtil.makeNumberATwoDigitString = function (num)
{
    num = num.toString();
    if (num.length === 1)
    {
        num = "0" + num;
    }
    else if (num.length > 2)
    {
        num = num.slice(0, 2);
    }
    return num;
};
/**
 * Adds ",00" to the converted number.
 *
 * @method Fashion.FormatUtil#convertNumberToPriceString
 * @memberof Fashion.FormatUtil
 * @param {number} num
 * @return {string}
 * @static
 */
Fashion.FormatUtil.convertNumberToPriceString = function (num)
{
    num = Fashion.FormatUtil.convertNumToString(num);
    num += ",00"; //TODO build a real conversion of partial quantities
    return num;
};