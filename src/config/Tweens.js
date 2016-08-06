/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @copyright    2015 Gentle Troll Entertainment GmbH
 */
/**
 * @namespace Fashion.Tween
 */
Fashion.Tween = {};
/**
 * @namespace Fashion.Tween.Card
 */
Fashion.Tween.ExampleObject = {

    FADE_IN_AFTER_USE: {
        duration: 400,
        easing: Phaser.Easing.Quadratic.Out
    }
};



/**
 * Validates a given tween configuration.
 *
 * @method Fashion.Tween#validate
 * @memberof Fashion.Tween
 * @static
 * @param {object} data - The tween data to validate.
 * @returns {object} The original object with validated values.
 */
Fashion.Tween.validate = function (data)
{
    data.duration = data.duration || 600;
    data.easing = data.easing || Phaser.Easing.Quadratic.Out;
    data.delay = data.delay || 0;

    return data;
};
/**
 * Creates a new tween from a given data object.
 *
 * @method Fashion.Tween#create
 * @memberof Fashion.Tween
 * @param {Phaser.}
 * @returns {Phaser.Tween} The created tween object
 */
Fashion.Tween.create = function (game, target, props, data)
{
    data = Fashion.Tween.validate(data);
    // start the tween
    return game.add.tween(target).to(
        props,
        data.duration,
        data.easing,
        false,
        data.delay
    );
};

