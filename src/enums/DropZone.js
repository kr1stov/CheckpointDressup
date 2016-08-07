/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Fashion.DropZone
 */
Fashion.DropZone = {
    HEAD : 'head',
    UPPER_BODY : 'upperBody',
    LOWER_BODY : 'lowerBody',
    HANDS : 'hands',
    FEET : 'feet'
};

Fashion.DropZone.Zones = [
    Fashion.DropZone.HEAD,
    Fashion.DropZone.UPPER_BODY,
    Fashion.DropZone.LOWER_BODY,
    Fashion.DropZone.HANDS,
    Fashion.DropZone.FEET
];
/**
 *
 *
 * @method Fashion#DropZone.validate
 * @memberof Fashion
 * @static
 */
Fashion.DropZone.validate = function (zone)
{
    var n = Fashion.DropZone.Zones.length;
    var i;
    for (i = n; --i >= 0;)
    {
        if (Fashion.DropZone.Zones[i] == zone)
        {
            return true;
        }
    }
    return false;
};