/**
 * @author       Michel Wacker <mw@gentletroll.com>
 * @author       Claudius Häcker <info@chaecker.de>
 * @copyright    2016 Gentle Troll Entertainment GmbH
 */

/**
 * @class Fashion.Road
 *
 * @classdesc Create a new 'Road' object.
 * @constructor
 * @extends Phaser.Group
 * @param {Phaser.Game} game - A reference to the currently running game.
 * @param {DisplayObject|null} [parent=(game world)] - The parent Group (or other {@link DisplayObject}) that this group will be added to.
 *     If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} [name='group'] - A name for this group. Not used internally but useful for debugging.
 * @param {boolean} [addToStage=false] - If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} [enableBody=false] - If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {integer} [physicsBodyType=0] - The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
Fashion.Road = function (game, key, parent, name, addToStage, enableBody, physicsBodyType)
{
    // call super constructor
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);

    /**
     * @property {Phaser.BitmapText} bg - Background
     */
    //this.bg = this.game.make.image(0, 0, key, Fashion.Asset.Image.ROAD_BG);
    this.bg = this.game.make.tileSprite(0, 0, this.game.world.width, 75, key, Fashion.Asset.Image.ROAD_BG);

    this.vehicle = new Fashion.Vehicle(game, 0, 0, Fashion.Asset.TextureAtlas.GAME, Fashion.Asset.Image.MAIN_CHAR_VEHICLE);
    /**
     * @property {number} speed -
     * @private
     */
    this.speed = 0;
    /**
     * @property {boolean} _rolling - 
     * @private
     */
    this.rolling = false;
    /**
     * @property {array} checkPoints -
     * @private
     */
    this.checkPoints = [];
    //-----------------------------------
    // Init
    //-----------------------------------
    this.add(this.bg);

    this.add(this.vehicle);
    this.vehicle.anchor.setTo(1,0);
    this.vehicle.x = this.vehicle.width + 30;
};

// extend class Phaser.Group
Fashion.Road.prototype = Object.create(Phaser.Group.prototype);
Fashion.Road.prototype.constructor = Fashion.Road;

//============================================================
// Public interface
//============================================================

/**
 * 
 *
 * @method Fashion.Road#spawnCheckpoint
 * @memberof Fashion.Road
 */
Fashion.Road.prototype.spawnCheckpoint = function (duration, speed)
{
    Log.debug("spawn " );
    var dist = this.vehicle.x + (duration / 1000) * speed;
    Log.debug("dist: " + dist);
    var frameName = Fashion.Asset.Image.CHECK_POINT_PREFIX + (Math.round(this.game.rnd.frac() * 3) + 1) + '.png';
    var point = this.game.make.image(dist, 0, Fashion.Asset.TextureAtlas.GAME, frameName);
    point.anchor.setTo(0,0);
    this.add(point);
    this.checkPoints.push(point);
    this.vehicle.bringToTop();
};
/**
 *
 *
 * @method Fashion.Road#roll
 * @memberof Fashion.Road
 */
Fashion.Road.prototype.startRolling = function (speed)
{
    if (this.rolling) return;

    this.speed = speed || this.speed;
    this.rolling = true;
};

/**
 *
 *
 * @method Fashion.Road#stopRolling
 * @memberof Fashion.Road
 */
Fashion.Road.prototype.stopRolling = function ()
{
    if (!this.rolling) return;

    this.rolling = false;
};

Fashion.Road.prototype.update = function ()
{
    Phaser.Group.prototype.update.call(this);


    if (this.rolling)
    {
        var deltaSpeed = this.speed * this.game.time.elapsed / 1000;
        this.bg.tilePosition.x -= deltaSpeed;

        var n = this.checkPoints.length;
        var i;
        var point;
        for (i = n; --i >= 0;)
        {
            point = this.checkPoints[i];
            if (point.x < -point.width)
            {
                this.checkPoints.splice(i,1);
                this.remove(point);
            }
            else
            {
                point.x -= deltaSpeed;
            }
        }
    }
};
/**
 * Destroys this group.
 *
 * Removes all children, then removes this group from its parent and nulls references.
 *
 * @method Fashion.Road#destroy
 * @memberof Fashion.Road
 * @param {boolean} [destroyChildren=true] - If true `destroy` will be invoked on each removed child.
 * @param {boolean} [soft=false] - A 'soft destroy' (set to true) doesn't remove this group from its parent or null the game reference. Set to false and it does.
 */
Fashion.Road.prototype.destroy = function (destroyChildren, soft)
{

    Phaser.Group.prototype.destroy.call(this, destroyChildren, soft);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================

