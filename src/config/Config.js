/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Config
 *
 * @classdesc Create a new 'Config' object.
 * @constructor
 */
Fashion.Config = function ()
{

};

Fashion.Config.prototype = {
    //============================================================
    // Public interface
    //============================================================
    /**
     * Parses a given config.
     *
     * @method Fashion.Config#parseConfig
     * @memberof Fashion.Config
     */
    parseConfig: function (config)
    {
        if (!config)
        {
            throw "Failed to parse invalid config!";
        }

        // dynamically copy all attributes into this object
        for (var key in config)
        {
          this[key] = config[key];
        }
    },
    /**
     * Returns a font style object with two fields "font" and "size" for a given key, null if it wasn't found.
     *
     * @method Fashion.Config#getFontStyle
     * @memberof Fashion.Config
     */
    getFontStyle: function (key)
    {
        if (!this.fonts || !this.fonts[key])
        {
            throw "Failed to access font style in config: not found!";
        }
        return this.fonts[key];
    }
    //============================================================
    // Private methods
    //============================================================

};
//============================================================
// Implicit getters and setters
//============================================================
