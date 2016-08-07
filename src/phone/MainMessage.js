/**
 * Created by Christoph on 07.08.2016.
 */
/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.MainMessage
 *
 * @classdesc Create a new 'MainMessage' object.
 * @constructor
 */
Fashion.MainMessage = function (factions, text, certainty) {
    /**
     * @property {Array} factions -
     * @private
     */
    this.factions = factions.split(',');

    /**
     * @property {string} text -
     * @private
     */
    this.text = text;

    /**
     * @property {string} certainty -
     * @private
     */
    this.certainty = certainty;

};

Fashion.MainMessage.prototype = {
    //============================================================
    // Public interface
    //============================================================

    //============================================================
    // Private methods
    //============================================================

};
//============================================================
// Implicit getters and setters
//============================================================
