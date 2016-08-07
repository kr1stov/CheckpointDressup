/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Fashion.BodyPart
 */
Fashion.BodyPart = {
    EYES : 'eyes',
    FACE : 'face',
    HAIR : 'hair',
    TORSO : 'torso',
    ARMS : 'arms',
    HANDS : 'hands',
    THIGHS : 'thighs',
    CALVES : 'calves',
    FEET : 'feet'
};

Fashion.BodyPart.Parts = [
    Fashion.BodyPart.EYES,
    Fashion.BodyPart.FACE,
    Fashion.BodyPart.HAIR,
    Fashion.BodyPart.TORSO,
    Fashion.BodyPart.ARMS,
    Fashion.BodyPart.HANDS,
    Fashion.BodyPart.THIGHS,
    Fashion.BodyPart.CALVES,
    Fashion.BodyPart.FEET
];
/**
 *
 *
 * @method Fashion#DropZone.validate
 * @memberof Fashion
 * @static
 */
Fashion.BodyPart.validate = function (part)
{
    var n = Fashion.BodyPart.Parts.length;
    var i;
    for (i = n; --i >= 0;)
    {
        if (Fashion.BodyPart.Parts[i] == part)
        {
            return true;
        }
    }
    return false;
};
/**
 *
 *
 * @method Fashion.BodyPart#validateParts
 * @memberof Fashion.BodyPart
 * @static
 */
Fashion.BodyPart.validateParts = function (parts, callee)
{
    var n = parts.length;
    var i;
    var part;
    for (i = n; --i >= 0;)
    {
        part = parts[i];
        if (!Fashion.BodyPart.validate(part))
        {
            Log.error("Invalid body part detected in '" + callee + "': " + part);
            return null;
        }
    }
    return parts;
};