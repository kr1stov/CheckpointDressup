/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace GTLib
 */
GTLib = GTLib || {};
/**
 * @namespace GTLib.ArrayUtil
 */
GTLib.ArrayUtil = GTLib.ArrayUtil || {};
/**
 * Disposes of a given array. If callDestroy is set, this function attempts to call 'destroy()' on each element disposed.
 *
 * @method GTLib.ArrayUtil#disposeArray
 * @memberof GTLib.ArrayUtil
 * @param {array} array - The array to dispose.
 * @param {boolean} callDestroy - Whether destroy() should be called on each array element.
 * @static
 */
GTLib.ArrayUtil.disposeArray = function(array, callDestroy)
{
    if (typeof array == 'object')
    {
        var n = array.length,
            i, element;
        for (i = n; --i >= 0;)
        {
            element = array.pop();

            if (callDestroy && element && element.destroy)
            {
                element.destroy();
            }
        }
    }
};
/**
 * Adds all elements of an array to another one.
 *
 * @method GTLib.ArrayUtil#merge
 * @memberof GTLib.ArrayUtil
 * @param {array} arrayToReturn - The array that are added elements to.
 * @param {array} arrayToAdd - The array provides the elements to add.
 * @return {array}
 * @static
 */
GTLib.ArrayUtil.merge = function (arrayToReturn, arrayToAdd)
{
    var n = arrayToAdd.length;
    var i;
    var obj;
    for (i = 0; i < n; i++)
    {
        obj = arrayToAdd[i];
        arrayToReturn.push(obj);
    }
    return arrayToReturn;
};