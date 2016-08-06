/**
* @author       Michel Wacker <mw@gentletroll.com>
* @copyright    2014 Gentle Troll Entertainment GmbH
*/
/**
* @namespace GTLib
*/
GTLib = {};
/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'Overlay' object.
* 
* @class GTLib.Overlay
* @constructor
*/
GTLib.Overlay = function (game, x, y, color, width, height) {
    /**
    * @property {Phaser.BitmapData} bitmap - BitmapData to draw overlay into.
    * @private
    */
    this.bitmap = game.add.bitmapData(width || game.world.width, height || game.world.height);
    // call super constructor
    Phaser.Sprite.call(this, game, x, y, this.bitmap);
    /**
    * @property {string} _color - A CSS hexa or rgba value to define the color and or opacity of the overlay.
    * @default "rgba(0, 0, 0, 0.8);"
    * @private
    */
    this._color = "rgba(0, 0, 0, 0.8);";
    //-----------------------------------
    // init
    //-----------------------------------
    // set the current color
    this.color = color || this._color;
};

// extend class Phaser.Sprite
GTLib.Overlay.prototype = Object.create(Phaser.Sprite.prototype);
GTLib.Overlay.prototype.constructor = GTLib.Overlay;

//============================================================
// Public interface
//============================================================
/**
* Shows the overlay. Instantly if desired.
* 
* @method GTLib.Overlay#show
*/
GTLib.Overlay.prototype.show = function(instantly) {
    
    this.visible = true;
    this.inputEnabled = true;

    if (instantly)
    {
        this.alpha = 1;
    }
    else
    {
        this.alpha = 0;

        this.game.add.tween(this).to(
            {alpha: 1},
            800,
            Phaser.Easing.Quintic.Out,
            true
        );
    }
};
/**
* Hides the overlay. Instantly if desired.
* 
* @method GTLib.Overlay#hide
*/
GTLib.Overlay.prototype.hide = function(instantly) {
    
    if (instantly)
    {
        this.inputEnabled = false;
        this.visible = false;
    }
    else
    {
        this.game.add.tween(this).to(
            {alpha: 0},
            1000,
            Phaser.Easing.Quintic.Out,
            true
        )
        .onComplete.addOnce(this.onHidden, this);
    }
};
/**
* Destroys the Sprite. This removes it from its parent group, destroys the input, event and animation handlers if present and nulls its reference to game, freeing it up for garbage collection.
* 
* @method GTLib.Overlay#destroy
*/
GTLib.Overlay.prototype.destroy = function() {
    
    this.bitmap.destroy();
    this.bitmap = null;

    this._color = null;

    Phaser.Sprite.prototype.destroy.call(this);
};
//============================================================
// Private methods
//============================================================
/**
* Called when the overlay is fully hidden.
* 
* @method GTLib.Overlay#onHidden
* @protected
*/
GTLib.Overlay.prototype.onHidden = function() {
    this.inputEnabled = false;
    this.visible = false;
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.Overlay#color
* @property {string} color - A CSS hexa or rgba value to define the color and or opacity of the overlay.
*/
Object.defineProperty(GTLib.Overlay.prototype, "color", {
    
    get: function () {
        return this._color;
    },
  
    set: function (value) {

        this.bitmap.clear();
        this.bitmap.beginFill(value);
        this.bitmap.fillRect(0, 0, this.bitmap.width, this.bitmap.height);

        this._color = value;
    }
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'UIGroup' object.
* 
* @class GTLib.UIGroup
* @constructor
*/
GTLib.UIGroup = function (game, key, parent, name, useStage) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);
    /**
    * @property {string} key - The cache key for the atlas the children are on.
    */
    this.key = key;
    /**
    * @property {string} _alignment - Defines the way the children are supposed to be aligned.
    * @default GTLib.UIGroup.Alignment.HORIZONTAL
    * @private
    */
    this._alignment = GTLib.UIGroup.Alignment.HORIZONTAL;
    /**
    * @property {number} _padding - The padding between the children
    * @default 5
    * @private
    */
    this._padding = 5;
    /**
    * @property {number} _width - The width of this group.
    * @default 0
    * @private
    */
    this._width = 0;
    /**
    * @property {number} _height - The height of this group.
    * @default 0
    * @private
    */
    this._height = 0;
};

// extend class Phaser.Group
GTLib.UIGroup.prototype = Object.create(Phaser.Group.prototype);
GTLib.UIGroup.prototype.constructor = GTLib.UIGroup;

//============================================================
// Public interface
//============================================================
/**
* Arranges all existing and visible children.
* 
* @method GTLib.UIGroup#arrange
* @param {string} [alignment] - Defines the way the children are supposed to be aligned.
*/
GTLib.UIGroup.prototype.arrange = function(alignment) {
    this._alignment = alignment || this._alignment;
    
    var xPos = 0,
        yPos = 0,
        child;
    
    if (this.length > 1)
    {
        var n = this.length,
            i;

        for (i = 0; i < n; i++)
        {
            child = this.getAt(i);

            if (child.visible)
            {
                child.x = xPos;
                child.y = yPos;

                if (this._alignment == GTLib.UIGroup.Alignment.VERTICAL)
                    yPos += child.height + this._padding;
                else
                    xPos += child.width + this._padding;
            }
        }
    }
    
    if (this.length > 0)
    {
        child = this.getAt(0);
        this._width = (xPos > 0) ? xPos - this._padding : child.width;
        this._height = (yPos > 0) ? yPos - this._padding : child.height;
    }
    else
    {
        this._width = 0;
        this._height = 0;
    }
};
/**
* Destroys the whole group.
* 
* @method GTLib.UIGroup#destroy
*/
GTLib.UIGroup.prototype.destroy = function() {
    this.key = null;
    this._alignment = null;

    Phaser.Group.prototype.destroy.call(this, true);
};
//============================================================
// Private methods
//============================================================
/**
* @name GTLib.UIGroup#alignment
* @property {string} alignment - Defines the way the children are supposed to be aligned.
*/
Object.defineProperty(GTLib.UIGroup.prototype, "alignment", {
    
    get: function () {
        return this._alignment;
    },
  
    set: function (value) {
        
        this.arrange(value);

        //this._alignment = value;
    }
});
/**
* @name GTLib.UIGroup#padding
* @property {number} padding - The padding between the children
*/
Object.defineProperty(GTLib.UIGroup.prototype, "padding", {
    
    get: function () {
        return this._padding;
    },
  
    set: function (value) {
        this._padding = value;

        this.arrange();
    }
});
/**
* @name GTLib.UIGroup#width
* @property {number} width - The width of this group.
* @readonly
*/
Object.defineProperty(GTLib.UIGroup.prototype, "width", {
    
    get: function () {
        return this._width;
    }
});
/**
* @name GTLib.UIGroup#height
* @property {number} height - The height of this group.
* @readonly
*/
Object.defineProperty(GTLib.UIGroup.prototype, "height", {
    
    get: function () {
        return this._height;
    }
});
/**
 * @namespace GTLib.UIGroup.Alignment
 */
GTLib.UIGroup.Alignment = {};
/**
* @constant
* @type {string}
*/
GTLib.UIGroup.Alignment.HORIZONTAL = "horizontal";
/**
* @constant
* @type {string}
*/
GTLib.UIGroup.Alignment.VERTICAL = "vertical";/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'LifeCounter' object.
* 
* @class GTLib.LifeCounter
* @constructor
*/
GTLib.LifeCounter = function (game, key, parent, name, useStage) {
    // call super constructor
    GTLib.UIGroup.call(this, game, key, parent, name, useStage);
    /**
    * @property {Phaser.Signal} onLivesDepleted - Dispatched when all lives have been depleted.
    * @private
    */
    this.onLivesDepleted = new Phaser.Signal();
    /**
    * @property {object} frames - An array holding the frames to display in each state.
    * The frame for the filled state is stored under index 0.
    * The frame for the empty state (if any) is stored under index 1.
    * 
    * @private
    */
    this.frames = [];
    /**
    * @property {number} _lives - The amount of lives displayed.
    * @default 0
    * @private
    */
    this._lives = 0;
};

// extend class GTLib.UIGroup
GTLib.LifeCounter.prototype = Object.create(GTLib.UIGroup.prototype);
GTLib.LifeCounter.prototype.constructor = GTLib.LifeCounter;

//============================================================
// Public interface
//============================================================
/**
* Create a certain amount of counters to be displayed.
* 
* @method GTLib.LifeCounter#createCounter
*/
GTLib.LifeCounter.prototype.createCounter = function(amount, frameFull, frameEmpty) {

    if (frameFull)
        this.frames.push(frameFull);

    if (frameEmpty)
        this.frames.push(frameEmpty);

    var n = amount - this.length,
        i, counter;
    
    for (i = n; --i >= 0;)
    {
        counter = this.game.add.sprite(0, 0, this.key, frameFull);
        counter.anchor.x = counter.anchor.y = 0.5;
        this.add(counter);
        
        this.initCounter(counter, i);
    }

    this.arrange();
};
/**
* Set the amount of lives to display.
* Use this function over the <em>lives</em> property if you want to avoid animations or signals to be triggered.
* 
* @method GTLib.LifeCounter#setLives
*/
GTLib.LifeCounter.prototype.setLives = function(amount, animate, triggerSignal) {
    // validate amount
    amount = (amount > this.length) ? this.length : parseInt(amount);
    amount = (amount < 0) ? 0 : amount;

    // only apply if amount hasn't changed
    if (this._lives !== amount)
    {
        // TODO only update the ones that actually change. Take difference between this._lives and amount
        // TODO trigger animation only and separately if a counter actually changed.
        
        // run through counter and update the icons
        var n = this.length,
            m = n - amount,
            i, counter;

        for (i = n; --i >= 0;)
        {
            counter = this.getAt(i);

            if (i >= m)
                this.fillCounter(counter, i, animate);
            else
                this.depleteCounter(counter, i, animate);
        }
        this._lives = amount;
        // dispatch the signal if all lives are gone
        if (this._lives === 0 && triggerSignal)
        {
            this.onLivesDepleted.dispatch(this);
        }
    }
};
/**
* Destroys the whole group.
* 
* @method GTLib.LifeCounter#destroy
*/
GTLib.LifeCounter.prototype.destroy = function() {

    this.onLivesDepleted.dispose();
    this.onLivesDepleted = null;

    var n = this.frames.length,
        i;
    for (i = n; --i >= 0;)
    {
        this.frames.pop();
    }
    this.frames = null;

    GTLib.UIGroup.prototype.destroy.call(this);
};
//============================================================
// Private methods
//============================================================
/**
* Called when a counter is being initialized. Override this function to do additional configuration.
* 
* @method GTLib.LifeCounter#initCounter
* @protected
*/
GTLib.LifeCounter.prototype.initCounter = function(counter, index) {
    //counter.scale.x = counter.scale.y = 1 - index * 0.15;
};
/**
* Called when a counter has to depleted.
* Override if you want to change this effect.
* 
* @method GTLib.LifeCounter#depleteCounter
* @protected
*/
GTLib.LifeCounter.prototype.depleteCounter = function(counter, index, animate) {
    if (this.frames.length > 1)
    {
        var frame = this.frames[1];
        if (!this.hasFrameSet(counter, frame))
        {
            this.setCounterFrame(counter, frame);
            // FIXME split this off in a separate function
            if (animate)
            {
                var x = counter.scale.x * 0.7,
                    y = counter.scale.y * 0.7;
                
                counter.scale.setTo(x * 2, y * 2);

                this.game.add.tween(counter.scale).to(
                    {x: x, y: y},
                    1000,
                    Phaser.Easing.Elastic.Out,
                    true
                );
            }
        }
    }
};
/**
* Called when a counter has to be filled up again.
* Override if you want to change this effect.
* 
* @method GTLib.LifeCounter#fillCounter
* @protected
*/
GTLib.LifeCounter.prototype.fillCounter = function(counter, index, animate) {
    if (this.frames.length > 0)
    {
        var frame = this.frames[0];
        if (!this.hasFrameSet(counter, frame))
        {
            this.setCounterFrame(counter, frame);
            counter.scale.setTo(1, 1);
        }
    }
};
//-----------------------------------
// Helpers
//-----------------------------------
/**
* Tells whether a given frame is already set on a given counter.
* 
* @method GTLib.LifeCounter#hasFrameSet
* @protected
*/
GTLib.LifeCounter.prototype.hasFrameSet = function(counter, frame) {
    if (typeof frame == 'string')
        return counter.frameName == frame;
    else
        return counter.frame == frame;
};
/**
* Sets the frame in a given counter.
* 
* @method GTLib.LifeCounter#setCounterFrame
* @protected
*/
GTLib.LifeCounter.prototype.setCounterFrame = function(counter, frame) {
    if (typeof frame == 'string')
        counter.frameName = frame;
    else
        counter.frame = frame;
};
//============================================================
// Getters & Setters
//============================================================
/**
* @name GTLib.LifeCounter#lives
* @property {number} lives - The amount of lives displayed.
*/
Object.defineProperty(GTLib.LifeCounter.prototype, "lives", {
    
    get: function () {
        return this._lives;
    },
  
    set: function (value) {

        this.setLives(value, true, true);

    }
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'GameButtons' object.
* 
* @class GTLib.GameButtons
* @constructor
*/
GTLib.GameButtons = function (game, key, parent, name, useStage) {
    // call super constructor
    GTLib.UIGroup.call(this, game, key, parent, name, useStage);
    /**
    * @property {Phaser.Signal} onHighscoreShow - Fired when the highscore button was pressed.
    */
    this.onHighscoreShow = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onMuteToggled - Fired when the mute button was pressed. Passed the current mute state as parameter.
    */
    this.onMuteToggled = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onQuit - Fired when the quit button was pressed.
    */
    this.onQuit = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onRestart - Fired when the restart button was pressed.
    */
    this.onRestart = new Phaser.Signal();
    /**
    * @property {Phaser.Sprite} btnHighscore - The highscore button.
    */
    this.btnHighscore = null;
    /**
    * @property {Phaser.Sprite} btnMute - The mute button.
    */
    this.btnMute = null;
    /**
    * @property {Phaser.Sprite} btnQuit - The quit button.
    */
    this.btnQuit = null;
    /**
    * @property {Phaser.Sprite} btnRestart - The restart button.
    */
    this.btnRestart = null;
    /**
    * @property {object} frames - A hash keeping track of all frames.
    * @private
    */
    this.frames = {};
};
// extend class GTLib.UIGroup
GTLib.GameButtons.prototype = Object.create(GTLib.UIGroup.prototype);
GTLib.GameButtons.prototype.constructor = GTLib.GameButtons;
//============================================================
// Public interface
//============================================================
/**
* Creates a highscore button and adds it to the button group. Arranges the buttons afterwards.
* 
* @method GTLib.GameButtons#createHighscoreButton
* @param {string | number} frame - Specify the exact frame to use by giving a string or numeric index.
*/
GTLib.GameButtons.prototype.createHighscoreButton = function(frame) {
    if (this.btnHighscore)
    {
        throw "Attempting to recreate restart button!";
    }
    this.btnHighscore = this.createButton(frame, this.onHighscorePressed);

    this.arrange();
};
/**
* Creates a mute button and adds it to the button group. Arranges the buttons afterwards.
* 
* @method GTLib.GameButtons#createMuteButton
* @param {string | number} frame - Specify the exact frame to use for the unmuted state by giving a string or numeric index.
* @param {string | number} frame - Specify the exact frame to use for the muted state by giving a string or numeric index.
*/
GTLib.GameButtons.prototype.createMuteButton = function(frame, frameMuted) {
    if (this.btnMute)
    {
        throw "Attempting to recreate mute button!";
    }
    // store frames
    this.frames.muteUp = frame;
    this.frames.muteMuted = frameMuted;

    this.btnMute = this.createButton(frame, this.onMutePressed);

    this.updateMuteState();
    
    this.arrange();
};
/**
* Creates a quit button and adds it to the button group. Arranges the buttons afterwards.
*
* @method GTLib.GameButtons#createQuitButton
* @param {string | number} frame - Specify the exact frame to use by giving a string or numeric index.
*/
GTLib.GameButtons.prototype.createQuitButton = function(frame) {
    if (this.btnQuit)
    {
        throw "Attempting to recreate quit button!";
    }
    this.btnQuit = this.createButton(frame, this.onQuitPressed);

    this.arrange();
};
/**
* Creates a restart button and adds it to the button group. Arranges the buttons afterwards.
* 
* @method GTLib.GameButtons#createRestartButton
* @param {string | number} frame - Specify the exact frame to use by giving a string or numeric index.
*/
GTLib.GameButtons.prototype.createRestartButton = function(frame) {
    if (this.btnRestart)
    {
        throw "Attempting to recreate restart button!";
    }
    this.btnRestart = this.createButton(frame, this.onRestartPressed);

    this.arrange();
};
/**
* Destroys the whole group.
* 
* @method GTLib.GameButtons#destroy
*/
GTLib.GameButtons.prototype.destroy = function() {
    this.onHighscoreShow.dispose();
    this.onHighscoreShow = null;

    this.onMuteToggled.dispose();
    this.onMuteToggled = null;

    this.onQuit.dispose();
    this.onQuit = null;

    this.onRestart.dispose();
    this.onRestart = null;

    this.btnHighscore = null;
    this.btnMute = null;
    this.btnRestart = null;
    this.btnQuit = null;
    
    for (var i in this.frames)
    {
        delete this.frames[i];
    }
    this.frames = null;

    GTLib.UIGroup.prototype.destroy.call(this);
};
//============================================================
// Private methods
//============================================================
/**
* Creates a new button.
* 
* @method GTLib.GameButtons#createButton
* @param {string | number} [frame] - The frame do display. Can be a number or string.
* @param {function} [callback] - The function to trigger when the button is clicked. Scope is always the GameButtons instance.
* @protected
*/
GTLib.GameButtons.prototype.createButton = function(frame, callback) {
    var b = this.game.add.sprite(0, 0, this.key, frame);
    if (callback)
    {
        b.inputEnabled = true;
        b.input.useHandCursor = false;
        b.events.onInputDown.add(callback, this);
    }
    
    this.add(b);

    return b;
};
/**
* Called when the mute button was pressed
* 
* @method GTLib.GameButtons#onMutePressed
* @param {Phaser.Sprite} button - The button that triggered the signal.
* @protected
*/
GTLib.GameButtons.prototype.onMutePressed = function(button) {
    this.game.sound.mute = !this.game.sound.mute;
    // extract according frame
    this.updateMuteState();
};
/**
* Updates the mute button state to display depending on whether sound is currently muted or not.
* 
* @method GTLib.GameButtons#updateMuteState
* @protected
*/
GTLib.GameButtons.prototype.updateMuteState = function() {
    var frame = (this.game.sound.mute) ? this.frames.muteMuted : this.frames.muteUp;
    // set frameName or frame depending on whether an atlas or a sprite sheet was used.
    if (typeof frame == 'string')
        this.btnMute.frameName = frame;
    else
        this.btnMute.frame = frame;
    // dispatch the muted signal
    this.onMuteToggled.dispatch(this.game.sound.mute);
};
/**
* Called when the highscore button was pressed.
* 
* @method GTLib.GameButtons#onHighscorePressed
* @param {Phaser.Sprite} button - The button that triggered the signal.
* @protected
*/
GTLib.GameButtons.prototype.onHighscorePressed = function(button) {
    this.onHighscoreShow.dispatch();
};
/**
* Called when the quit button was pressed.
* 
* @method GTLib.GameButtons#onQuitPressed
* @param {Phaser.Sprite} button - The button that triggered the signal.
* @protected
*/
GTLib.GameButtons.prototype.onQuitPressed = function(button) {
    this.onQuit.dispatch();
};
/**
* Called when the restart button was pressed.
* 
* @method GTLib.GameButtons#onRestartPressed
* @param {Phaser.Sprite} button - The button that triggered the signal.
* @protected
*/
GTLib.GameButtons.prototype.onRestartPressed = function(button) {
    this.onRestart.dispatch();
};/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'Key' object.
* 
* @class GTLib.Key
* @constructor
*/
GTLib.Key = function (game, type, font, parent, name, useStage) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);
    /**
    * @property {string} keyType - Key can be of type letter, space, backspace, enter, cancel...
    * @default 'letter'
    */
    this.keyType = type || 'letter';
    /**
    * @property {object} font - Contains font style information.
    * @default null
    */
    this.font = font || null;
    /**
    * @property {Phaser.Signal} onKeyDown - Fired when the button is being pressed.
    */
    this.onKeyDown = new Phaser.Signal();
    /**
    * @property {Phaser.Sprite} shape - The shape sprite of the key.
    * @private
    */
    this.shape = this.game.add.sprite(0, 0, 'content', 'keyboard/' + this.keyType + '.png');
    /**
    * @property {Phaser.BitmapText} label - A label displaying the letter of the key, if it's a standard key.
    * @default null
    * @private
    */
    this.label = null;
    /**
    * @property {boolean} _enabled - Tell whether the button is currently enabled.
    * @default true
    * @private
    */
    this._enabled = true;
    /**
    * @property {string} _letter - The letter to display on the key.
    * @default null
    * @private
    */
    this._letter = null;
    // add the shape to this group
    this.shape.inputEnabled = true;
    this.shape.input.useHandCursor = false;
    this.shape.events.onInputDown.add(this.onInputDown, this);
    this.add(this.shape);
};

// extend class Phaser.Group
GTLib.Key.prototype = Object.create(Phaser.Group.prototype);
GTLib.Key.prototype.constructor = GTLib.Key;

//============================================================
// Public interface
//============================================================
/**
* 
* 
* @method GTLib.Key#setVisible
*/
GTLib.Key.prototype.setVisible = function(visible) {
    
    this.shape.visible = visible;
    
    if (this.label)
    {
        this.label.visible = visible;
    }

    this.visible = visible;
};
/**
* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
* 
* @method GTLib.Key#destroy
*/
GTLib.Key.prototype.destroy = function() {
    this.onKeyDown.dispose();
    this.onKeyDown = null;

    this.keyType = null;

    this.shape.events.onInputDown.remove(this.onInputDown, this);
    this.shape.inputEnabled = false;
    this.shape = null;

    this.font = null;
    this.label = null;
    this._letter = null;

    this.stopTween();

    Phaser.Group.prototype.destroy.call(this, true);
};
//============================================================
// Private methods
//============================================================
/**
* Called when the shape of this key has been clicked/touched. Dispatches this key's letter if it has one, otherwise it's type.
* 
* @method GTLib.Key#onInputDown
* @protected
*/
GTLib.Key.prototype.onInputDown = function() {
    
    // dispatch the signal
    this.onKeyDown.dispatch((this._letter) ? this._letter : this.keyType);
    
    if (this._enabled)
    {
        // 
        this.stopTween();
        // give visual click feedback
        this.alpha = 0.5;
        this.tween = this.game.add.tween(this).to(
            {alpha: 1},
            200,
            Phaser.Easing.Quadratic.In,
            true
        );
    }
};
/**
* Stops the current tween if it's running.
* 
* @method GTLib.Key#stopTween
* @protected
*/
GTLib.Key.prototype.stopTween = function() {
    if (this.tween)
    {
        this.tween.stop();
        this.tween = null;
    }
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.Key#enabled
* @property {boolean} enabled - Tell whether the button is currently enabled.
*/
Object.defineProperty(GTLib.Key.prototype, "enabled", {
    
    get: function () {
        return this._enabled;
    },
  
    set: function (value) {

        this.stopTween();

        this.shape.inputEnabled = value;
        this.shape.input.useHandCursor = false;
        this.alpha = (value) ? 1 : 0.5;

        this._enabled = value;
    }
});
/**
* @name GTLib.Key#letter
* @property {string} letter - The letter to display on the key.
*/
Object.defineProperty(GTLib.Key.prototype, "letter", {
    
    get: function () {
        return this._letter;
    },
  
    set: function (value) {
        if (!this.font)
        {
            throw "Failed to set letter in GTLib.Key instance: set font property first.";
        }
        if (!this.label)
        {
            this.label = this.game.add.bitmapText(this.shape.width / 2, this.shape.height / 2, value, this.font);
            this.label.anchor.x = 0.5;
            this.label.anchor.y = 0.4;
            
            this.add(this.label);
        }
        else
        {
            this.label.setText(value);
        }
        this._letter = value;
    }
});
/**
* @name GTLib.Key#width
* @property {number} width - The key's width.
* @readonly
*/
Object.defineProperty(GTLib.Key.prototype, "width", {
    
    get: function () {
        return this.shape.width;
    }
    
});
/**
* @name GTLib.Key#height
* @property {number} height - The key's height.
* @readonly
*/
Object.defineProperty(GTLib.Key.prototype, "height", {
    
    get: function () {
        return this.shape.height;
    }
    
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'Keyboard' object.
* 
* @class GTLib.Keyboard
* @constructor
*/
GTLib.Keyboard = function (game, font, maxlength, parent, name, useStage) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);
    /**
    * @property {object} font - Contains font information for all letter keys.
    * @default null
    */
    this.font = font || null;
    /**
    * @property {number} maxlength - The maximum length of the keyboards
    * @default -1
    */
    this.maxlength = maxlength || 0;
    /**
    * @property {Phaser.Signal} onShown - Fired when keyboard is fully visible.
    */
    this.onShown = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onHidden - Fired when keyboard has been fully hidden.
    */
    this.onHidden = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onAffirm - Fired when the user has completed keyboard input and pressed the enter button.
    */
    this.onAffirm = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onCancel - Fired when the keyboard input has been cancelled by the user.
    */
    this.onCancel = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onChange - Fired when the keyboard's character buffer changed.
    */
    this.onChange = new Phaser.Signal();
    /**
    * @property {array} keys - The list of keys on the keyboard.
    * @private
    */
    this.keys = [];
    /**
    * @property {GTLib.Key} enterKey - A reference to the enter key.
    * @default null
    * @private
    */
    this.enterKey = null;
    /**
    * @property {GTLib.Key} backspaceKey - A reference to the backspace key.
    * @default null
    * @private
    */
    this.backspaceKey = null;
    /**
    * @property {Phaser.BitmapText} output - An output label to write the keyboard's buffer into.
    * @default null
    * @private
    */
    this.output = null;
    /**
    * @property {Phaser.Sound} sound - 
    * @private
    */
    this.sound = null;
    /**
    * @property {string} _buffer - The character buffer generated by key input.
    * @default ''
    * @private
    */
    this._buffer = '';
    /**
    * @property {number} _height - The height of the keyboard.
    * @default 0
    * @private
    */
    this._height = 0;
    /**
    * @property {number} _width - The width of the keyboard
    * @default 0
    * @private
    */
    this._width = 0;
};

// extend class Phaser.Group
GTLib.Keyboard.prototype = Object.create(Phaser.Group.prototype);
GTLib.Keyboard.prototype.constructor = GTLib.Keyboard;

//============================================================
// Public interface
//============================================================
/**
* Generates the key board from a given array set of keys.
* 
* @method GTLib.Keyboard#create
*/
GTLib.Keyboard.prototype.create = function(keys, upperCase) {
    // Log.debug("Keyboard.create");
    
    this.destroyKeys();
    this.clearBuffer();

    var n = keys.length,
        xPos = 0,
        yPos = 0,
        key, w, h, paddingX, paddingY,
        m, i, j;
    for (i = 0; i < n; i++)
    {
        m = keys[i].length;
        for (j = 0; j < m; j++)
        {
            key = this.createKey(keys[i][j], upperCase);
            key.x = xPos;
            key.y = yPos;
            key.onKeyDown.add(this.onKeyDown, this);
            this.add(key);
            this.keys.push(key);

            if (!w) w = key.width;
            if (!h) h = key.height;
            if (!paddingX) paddingX = Math.round(w * 0.12);
            if (!paddingY) paddingY = Math.round(h * 0.12);
            
            xPos += key.width + paddingX;
        }
        
        this._width = (xPos - paddingX > this._width) ? xPos - paddingX : this._width;

        xPos = Math.round(w * (i + 1) * 0.3);
        yPos += h + paddingY;
    }
    this._height = yPos - paddingY;
    
    this.updateKeyStates();

    this.sound = this.game.add.audio('sfx-key', 1);
};
/**
* Allows setting a Phaser.BitmapText output label to write the buffer into on each update.
* 
* @method GTLib.Keyboard#setOutput
*/
GTLib.Keyboard.prototype.setOutput = function(label) {
    this.output = label;

    this.updateOutput();
};
/**
* Shows the keyboard.
* 
* @method GTLib.Keyboard#show
*/
GTLib.Keyboard.prototype.show = function(instantly) {
    if (!this.visible)
    {
        var y = Math.round(this.game.world.height * 0.85 - this.height);

        this.setVisible(true);

        this.enableKeys();

        if (instantly)
        {
            this.y = y;

            this.onShown.dispatch(this);
        }
        else
        {
            this.game.add.tween(this).to(
                {y: y},
                800,
                Phaser.Easing.Quintic.Out,
                true
            )
            .onComplete.addOnce(this.onShowComplete, this);
        }
    }
};
/**
* Hides the keyboard.
* 
* @method GTLib.Keyboard#hide
*/
GTLib.Keyboard.prototype.hide = function(instantly) {
    if (this.visible)
    {
        var y = this.game.world.height;

        this.enableKeys(false);

        if (instantly)
        {
            this.y = y;

            this.setVisible(false);
        }
        else
        {
            this.game.add.tween(this).to(
                {y: y},
                1000,
                Phaser.Easing.Quintic.Out,
                true
            )
            .onComplete.addOnce(this.onHideComplete, this);
        }
    }
};
/**
* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
* 
* @method GTLib.Keyboard#destroy
* @param {boolean} [destroyChildren=false] - Should every child of this Group have its destroy method called?
*/
GTLib.Keyboard.prototype.destroy = function() {

    this.sound.stop();
    this.sound = null;

    this.destroyKeys();
    this.keys = null;
    
    this.clearBuffer();

    this.onShown.dispose();
    this.onShown = null;

    this.onHidden.dispose();
    this.onHidden = null;

    this.onAffirm.dispose();
    this.onAffirm = null;

    this.onCancel.dispose();
    this.onCancel = null;

    this.onChange.dispose();
    this.onChange = null;

    this.font = null;

    this.enterKey = null;
    this.backspaceKey = null;

    this.output = null;

    Phaser.Group.prototype.destroy.call(this, true);
};
/**
* Clears the keyboards character buffer.
* 
* @method GTLib.Keyboard#clearBuffer
*/
GTLib.Keyboard.prototype.clearBuffer = function() {
    this._buffer = '';

    this.updateKeyStates();

    this.updateOutput();
};
//============================================================
// Private methods
//============================================================
/**
* 
* 
* @method GTLib.Keyboard#enableKeys
* @protected
*/
GTLib.Keyboard.prototype.enableKeys = function(enable) {
    enable = (enable === false) ? enable : true;

    var n = this.keys.length,
        i;
    for (i = n; --i >= 0;)
    {
        this.keys[i].enabled = enable;
    }

    if (enable)
    {
        this.updateKeyStates();
    }
};
/**
* 
* 
* @method GTLib.Keyboard#setVisible
* @protected
*/
GTLib.Keyboard.prototype.setVisible = function(visible) {
    visible = (visible === false) ? visible : true;

    var n = this.keys.length,
        i;
    for (i = n; --i >= 0;)
    {
        this.keys[i].setVisible(visible);
    }

    this.visible = visible;
};
/**
* Creates a key and adds it to the keyboard.
* 
* @method GTLib.Keyboard#createKey
* @protected
*/
GTLib.Keyboard.prototype.createKey = function(type, upperCase) {
    // Log.debug("Keyboard.createKey", type);
    var key;
    if (type.length > 1)
    {
        key = new GTLib.Key(this.game, type);
        switch (type)
        {
            case 'enter':
            {
                this.enterKey = key;
                break;
            }
            case 'backspace':
            {
                this.backspaceKey = key;
                break;
            }
        }
    }
    else
    {
        key = new GTLib.Key(this.game, 'letter', this.font);
        key.letter = (upperCase) ? type.toUpperCase() : type;
    }
    return key;
};
/**
* Destroys all of the keys and removes all listeners.
* 
* @method GTLib.Keyboard#destroyKeys
* @protected
*/
GTLib.Keyboard.prototype.destroyKeys = function() {
    while (this.keys.length)
    {
        this.keys.pop();
    }

    var n = this.length,
        i, key;
    for (i = n; --i >= 0;)
    {
        key = this.getAt(i);
        if (key)
        {
            this.remove(key);
            key.onKeyDown.remove(this.onKeyDown, this);
            key.destroy();
        }
    }
};
/**
* Called whenever a key is pressed.
* 
* @method GTLib.Keyboard#onKeyDown
* @protected
*/
GTLib.Keyboard.prototype.onKeyDown = function(value) {
    
    this.sound.play('', 0, 1, false, true);

    switch (value)
    {
        case 'space':
        {
            // avoid leading and multiple spaces
            var n = this._buffer.length;
            if (n > 0 && this._buffer.substr(n - 1, 1) != ' ')
            {
                this.addToBuffer(' ');
            }
            break;
        }
        case 'backspace':
        {
            if (this._buffer.length > 0)
            {
                this._buffer = this._buffer.substr(0, this._buffer.length - 1);
            }
            break;
        }
        case 'enter':
        {

            this.onAffirm.dispatch(this._buffer);

            this.clearBuffer();

            return;
        }
        case 'cancel':
        {
            this.clearBuffer();

            this.onCancel.dispatch();

            return;
        }
        default:
        {
            this.addToBuffer(value);
        }
    }
    
    this.updateKeyStates();

    this.updateOutput();

    this.onChange.dispatch(this._buffer);
};
/**
* Adds a string to the keyboard's buffer.
* 
* @method GTLib.Keyboard#addToBuffer
* @protected
*/
GTLib.Keyboard.prototype.addToBuffer = function(char) {
    if (this.maxlength === 0 || this._buffer.length < this.maxlength)
    {
        this._buffer += char;
    }
};
/**
* Checks whether the enter key is active or not.
* 
* @method GTLib.Keyboard#updateKeyStates
* @protected
*/
GTLib.Keyboard.prototype.updateKeyStates = function() {
    if (this.enterKey)
    {
        this.enterKey.enabled = this._buffer.length > 0;
    }
    if (this.backspaceKey)
    {
        this.backspaceKey.enabled = this.enterKey.enabled;
    }
};
/**
* Updates the output label if set.
* 
* @method GTLib.Keyboard#updateOutput
* @protected
*/
GTLib.Keyboard.prototype.updateOutput = function() {
    if (this.output)
    {
        this.output.setText(this._buffer);
    }
};
/**
* Called when hide tween is complete.
* 
* @method GTLib.Keyboard#onHideComplete
* @protected
*/
GTLib.Keyboard.prototype.onHideComplete = function() {
    
    this.onHidden.dispatch(this);

    this.setVisible(false);
};
/**
* Called when show tween is complete.
* 
* @method GTLib.Keyboard#onShowComplete
* @protected
*/
GTLib.Keyboard.prototype.onShowComplete = function() {
    this.onShown.dispatch(this);
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.Keyboard#buffer
* @property {string} buffer - The character buffer generated by key input.
* @readonly
*/
Object.defineProperty(GTLib.Keyboard.prototype, "buffer", {
    
    get: function () {
        return this._buffer;
    }
});
/**
* @name GTLib.Keyboard#width
* @property {number} width - The width of the keyboard
* @readonly
*/
Object.defineProperty(GTLib.Keyboard.prototype, "width", {
       
    get: function () {
        return this._width;
    }
});
/**
* @name GTLib.Keyboard#height
* @property {number} height - The height of the keyboard.
* @readonly
*/
Object.defineProperty(GTLib.Keyboard.prototype, "height", {
    
    get: function () {
        return this._height;
    }
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'KeyboardScreen' object.
* 
* @class GTLib.KeyboardScreen
* @constructor
*/
GTLib.KeyboardScreen = function (game, title, titleFont, nameFont, keyFont, keys, maxlength, upperCase) {
    /**
    * @property {Phaser.Game} game - A reference to the game instance.
    */
    this.game = game;
    /**
    * @property {Phaser.Sprite} overlay - A semi transparent overlay and click blocker.
    * @private
    */
    this.overlay = new GTLib.Overlay(game, 0, 0);
    this.game.add.existing(this.overlay);
    /**
    * @property {Phaser.BitmapText} title - Title of the screen.
    * @private
    */
    this.title = this.game.add.bitmapText(0, 0, title, titleFont);
    /**
    * @property {Phaser.Sprite} nameBG - A background sprite for the name.
    * @private
    */
    this.nameBG = this.game.add.sprite(0, 0, 'content', 'bg-name.png');
    /**
    * @property {Phaser.BitmapText} nameInput - A text label the player can enter her name into.
    * @private
    */
    this.nameInput = this.game.add.bitmapText(0, 0, '', nameFont);
    /**
    * @property {GTLib.Keyboard} keyboard - A reference to the virtual keyboard.
    * @private
    */
    this.keyboard = new GTLib.Keyboard(
        this.game,
        keyFont,
        maxlength
    );
    /**
    * @property {Phaser.Signal} onAffirm - Fires when the affirm button was hit.
    */
    this.onAffirm = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onCancel - Fires when the cancel button was hit.
    */
    this.onCancel = new Phaser.Signal();
    //-----------------------------------
    // Create
    //-----------------------------------

    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0.5;
    this.title.x = this.game.world.centerX;
    this.title.y = Math.round(this.game.world.centerY * 0.25);

    this.nameInput.anchor.x = 0.5;
    this.nameInput.anchor.y = 0.5;
    this.nameInput.x = this.game.world.centerX;
    this.nameInput.y = Math.round(this.game.world.centerY * 0.7);

    this.nameBG.anchor.x = this.nameBG.anchor.y = 0.5;
    this.nameBG.x = this.nameInput.x;
    this.nameBG.y = Math.round(this.nameInput.y * 0.95);

    // init the keyboard
    this.keyboard.create(keys, upperCase);
    this.keyboard.x = Math.round((this.game.world.width - this.keyboard.width) / 2);
    this.keyboard.y = this.game.world.height;
    this.keyboard.setOutput(this.nameInput);
    // this.keyboard.onShown.add(this.onKeyboardShown, this);
    this.keyboard.onHidden.add(this.onKeyboardHidden, this);
    this.keyboard.onAffirm.add(this.onKeyboardAffirm, this);
    this.keyboard.onCancel.add(this.onKeyboardCancel, this);
};

GTLib.KeyboardScreen.prototype = {
    //============================================================
    // Public interface
    //============================================================
    /**
    * 
    * 
    * @method GTLib.KeyboardScreen#show
    */
    show: function(instantly) {

        this.keyboard.show(instantly);
        this.overlay.show(instantly);

        this.title.visible = true;
        this.nameInput.visible = true;
        
        this.nameBG.visible = true;
        
        if (instantly)
        {
            this.nameBG.alpha = 1;
            this.title.alpha = 1;
        }
        else
        {
            this.nameBG.alpha = 0;

            this.game.add.tween(this.nameBG).to(
                {alpha: 1},
                800,
                Phaser.Easing.Quintic.Out,
                true
            );

            this.title.alpha = 0;

            this.game.add.tween(this.title).to(
                {alpha: 1},
                800,
                Phaser.Easing.Quintic.Out,
                true
            );
        }   
    },
    /**
    * 
    * 
    * @method GTLib.KeyboardScreen#hide
    */
    hide: function(instantly) {

        this.keyboard.hide(instantly);
        this.overlay.hide(instantly);

        this.nameInput.visible = false;

        if (instantly)
        {
            this.nameBG.visible = false;
            this.title.visible = false;
        }
        else
        {
            this.game.add.tween(this.nameBG).to(
                {alpha: 0},
                800,
                Phaser.Easing.Quintic.Out,
                true
            );
            this.game.add.tween(this.title).to(
                {alpha: 0},
                800,
                Phaser.Easing.Quintic.Out,
                true
            );
        }
    },
    /**
    * 
    * 
    * @method GTLib.KeyboardScreen#destroy
    */
    destroy: function() {
        this.onAffirm.dispose();
        this.onAffirm = null;

        this.onCancel.dispose();
        this.onCancel = null;

        this.title.destroy();
        this.title = null;

        this.nameInput.destroy();
        this.nameInput = null;

        this.overlay.destroy();
        this.overlay = null;

        this.keyboard.destroy();
        this.keyboard = null;

        this.game = null;
    },
    //============================================================
    // Private methods
    //============================================================
    //-----------------------------------
    // Keyboard input
    //-----------------------------------
    /**
    * 
    * 
    * @method GTLib.Game#onKeyboardShown
    * @protected
    */
    // onKeyboardShown: function() {

    // },
    /**
    * 
    * 
    * @method GTLib.Game#onKeyboardHidden
    * @protected
    */
    onKeyboardHidden: function() {
        this.nameBG.visible = false;
        this.title.visible = false;
    },
    /**
    * 
    * 
    * @method GTLib.Game#onKeyboardAffirm
    * @protected
    */
    onKeyboardAffirm: function(buffer) {
        Log.debug("Input affirmed:", buffer);

        this.onAffirm.dispatch(buffer, this);
    },
    /**
    * 
    * 
    * @method GTLib.Game#onKeyboardCancel
    * @protected
    */
    onKeyboardCancel: function() {
        Log.debug("Input cancelled.");

        this.onCancel.dispatch(this);
    }
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'HighscoreEntry' object.
* 
* @class GTLib.HighscoreEntry
* @constructor
*/
GTLib.HighscoreEntry = function (game, font, width, height, parent, name, useStage) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);
    /**
    * @property {number} _width - The width of this entry.
    * @default 0
    * @private
    */
    this._width = width || 0;
    /**
    * @property {number} _height - The height of this entry.
    * @default 0
    * @private
    */
    this._height = height || 0;
    /**
    * @property {GTLib.Overlay} background - a plain colored background for the highscore list.
    * @private
    */
    this.background = new GTLib.Overlay(
        game,
        0, 0,
        '#ffdd44', this._width, this._height
    );
    /**
    * @property {Phaser.BitmapText} rankLabel - Displays the player's rank.
    * @private
    */
    this.rankLabel = this.game.add.bitmapText(0, 0, "88", font);
    /**
    * @property {Phaser.BitmapText} nameLabel - Displays the player name.
    * @private
    */
    this.nameLabel = this.game.add.bitmapText(0, 0, "wwwwwwww", font);
    /**
    * @property {Phaser.BitmapText} scoreLabel - Displays the player name.
    * @private
    */
    this.scoreLabel = this.game.add.bitmapText(0, 0, "888 888", font);
    /**
    * @property {number} _rank - The player's rank displayed in this entry.
    * @default 0
    * @private
    */
    this._rank = 0;
    /**
    * @property {string} playerName - The player's name displayed in this entry.
    * @default ''
    * @private
    */
    this._playerName = '';
    /**
    * @property {number} _score - The player's score displayed in this entry.
    * @default 0
    * @private
    */
    this._score = 0;
    //-----------------------------------
    // Create
    //-----------------------------------
    var padding = this._width * 0.02,
        h = Math.round(this._height / 2) + 2;

    this.rankLabel.anchor.x = 1;
    this.rankLabel.anchor.y = 0.5;
    this.rankLabel.x = this.rankLabel.width + padding;
    this.rankLabel.y = h;

    this.nameLabel.anchor.y = 0.5;
    this.nameLabel.x = this.rankLabel.x + padding;
    this.nameLabel.y = h;

    this.scoreLabel.anchor.x = 1;
    this.scoreLabel.anchor.y = 0.5;
    this.scoreLabel.x = this._width - padding;
    this.scoreLabel.y = h;

    this.add(this.background);
    this.add(this.rankLabel);
    this.add(this.nameLabel);
    this.add(this.scoreLabel);
};

// extend class Phaser.Group
GTLib.HighscoreEntry.prototype = Object.create(Phaser.Group.prototype);
GTLib.HighscoreEntry.prototype.constructor = GTLib.HighscoreEntry;

//============================================================
// Public interface
//============================================================
/**
* 
* 
* @method GTLib.HighscoreList#setVisible
*/
GTLib.HighscoreEntry.prototype.setVisible = function(visible) {
    
    this.background.visible = visible;
    this.rankLabel.visible = visible;
    this.nameLabel.visible = visible;
    this.scoreLabel.visible = visible;

    this.visible = visible;
};
/**
* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
* 
* @method GTLib.HighscoreEntry#destroy
* @param {boolean} [destroyChildren=false] - Should every child of this Group have its destroy method called?
*/
GTLib.HighscoreEntry.prototype.destroy = function(destroyChildren) {
    
    Phaser.Group.prototype.destroy.call(this, destroyChildren);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.HighscoreEntry#width
* @property {number} width - The width of this entry.
* @readonly
*/
Object.defineProperty(GTLib.HighscoreEntry.prototype, "width", {
    
    get: function () {
        return this._width;
    }
});
/**
* @name GTLib.HighscoreEntry#height
* @property {number} height - The height of this entry.
* @readonly
*/
Object.defineProperty(GTLib.HighscoreEntry.prototype, "height", {
    
    get: function () {
        return this._height;
    }
});
/**
* @name GTLib.HighscoreEntry#rank
* @property {number} rank - The player's rank displayed in this entry.
*/
Object.defineProperty(GTLib.HighscoreEntry.prototype, "rank", {
    
    get: function () {
        return this._rank;
    },
  
    set: function (value) {
        
        this.rankLabel.setText(value.toString());

        this._rank = value;
    }
});
/**
* @name GTLib.HighscoreEntry#playerName
* @property {string} playerName - The player's name displayed in this entry.
*/
Object.defineProperty(GTLib.HighscoreEntry.prototype, "playerName", {
    
    get: function () {
        return this._playerName;
    },
  
    set: function (value) {
        
        this.nameLabel.setText(value);

        this._playerName = value;
    }
});
/**
* @name GTLib.HighscoreEntry#score
* @property {number} score - The player's score displayed in this entry.
*/
Object.defineProperty(GTLib.HighscoreEntry.prototype, "score", {
    
    get: function () {
        return this._score;
    },
  
    set: function (value) {
        
        this.scoreLabel.setText(ScoreUtil.formatScore(value));

        this._score = value;
    }
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'HighscoreList' object.
* 
* @class GTLib.HighscoreList
* @constructor
*/
GTLib.HighscoreList = function (game, numEntries, font, width, parent, name, useStage) {
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);
    /**
    * @property {number} _width - The width of this list.
    * @default 0
    * @private
    */
    this._width = width || 0;
    /**
    * @property {array} entries - Another list of all entries.
    * @private
    */
    this.entries = [];
    //-----------------------------------
    // Create
    //-----------------------------------
    var n = numEntries || 10,
        yPos = 0,
        i, entry;

    for (i = 0; i < n; i++)
    {
        entry = new GTLib.HighscoreEntry(game, font, this._width, Math.round(this.game.world.height * 0.055));
        entry.y = yPos;
        entry.rank = i + 1;
        entry.playerName = '';
        entry.score = 0;

        this.add(entry);
        this.entries.push(entry);

        yPos += Math.round(entry.height + entry.height * 0.15);
    }
};

// extend class Phaser.Group
GTLib.HighscoreList.prototype = Object.create(Phaser.Group.prototype);
GTLib.HighscoreList.prototype.constructor = GTLib.HighscoreList;

//============================================================
// Public interface
//============================================================
/**
* 
* 
* @method GTLib.HighscoreList#setVisible
*/
GTLib.HighscoreList.prototype.setVisible = function(visible) {
    visible = (visible === false) ? visible : true;

    var n = this.entries.length,
        i;
    for (i = n; --i >= 0;)
    {
        this.entries[i].setVisible(visible);
    }

    this.visible = visible;
};
/**
* Returns true if the given score would make it into this list.
* 
* @method GTLib.HighscoreList#isHighscore
*/
GTLib.HighscoreList.prototype.isHighscore = function(score) {
    // is the score higher than the last one in the list?
    return (score > this.entries[this.entries.length - 1].score);
};
/**
* Sets the entry of a given rank.
* 
* @method GTLib.HighscoreList#setEntry
*/
GTLib.HighscoreList.prototype.setEntry = function(index, name, score) {
    // Log.debug("HighscoreList.setEntry", index, name, score);

    if (index >= 0 && index < this.entries.length)
    {
        var entry = this.entries[index];
        entry.playerName = name;
        entry.score = score;
    }
};
/**
* Parse a given highscore list and updates the entries accordingly.
* 
* @method GTLib.HighscoreList#parse
*/
GTLib.HighscoreList.prototype.parse = function(list) {
    var n = this.entries.length,
        i, item;
    for (i = 0; i < n; i++)
    {
        item = (i < list.length) ? list[i] : null;
        if (item)
        {
            this.setEntry(i, item.name, item.score);
        }
        else
        {
            this.setEntry(i, '', 0);
        }
    }
};
/**
* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
* 
* @method GTLib.HighscoreList#destroy
* @param {boolean} [destroyChildren=false] - Should every child of this Group have its destroy method called?
*/
GTLib.HighscoreList.prototype.destroy = function(destroyChildren) {
    
    Phaser.Group.prototype.destroy.call(this, destroyChildren);
};
//============================================================
// Private methods
//============================================================

//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.HighscoreList#width
* @property {number} width - The width of this list.
* @readonly
*/
Object.defineProperty(GTLib.HighscoreList.prototype, "width", {
    
    get: function () {
        return this._width;
    }
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'HighscoreScreen' object.
* 
* @class GTLib.HighscoreScreen
* @constructor
*/
GTLib.HighscoreScreen = function (game, title, titleFont, scoreFont, numEntries, remote, parent, name, useStage) {
    /**
    * @property {Phaser.Sprite} overlay - A semi transparent overlay and click blocker.
    * @private
    */
    this.overlay = new GTLib.Overlay(game, 0, 0);
    game.add.existing(this.overlay);
    // call super constructor
    Phaser.Group.call(this, game, parent, name, useStage);

    /**
    * @property {Phaser.Signal} onClose - Fires when the close button in the highscore was clicked.
    */
    this.onClose = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onHidden - Fires when the screen has been fully removed.
    */
    this.onHidden = new Phaser.Signal();
    /**
    * @property {Phaser.Signal} onUpdate - Fires when the screen has been updated after a score has been sent.
    */
    this.onUpdate = new Phaser.Signal();
    /**
    * @property {GTLib.Overlay} background - a plain colored background for the highscore list.
    * @private
    */
    this.background = new GTLib.Overlay(
        game,
        game.world.width * 0.15, 0,
        '#ffcc33', Math.round(game.world.width * 0.7), game.world.height
    );
    /**
    * @property {Phaser.BitmapText} title - Title of the screen.
    * @private
    */
    this.title = this.game.add.bitmapText(0, 0, title, titleFont);
    /**
    * @property {GTLib.HighscoreList} listDaily - A list with todays highscores.
    * @private
    */
    this.listDaily = new GTLib.HighscoreList(game, numEntries || 10, scoreFont, Math.round(this.background.width * 0.7));
    /**
    * @property {GTLib.HighscoreList} listOverall - A list with the top highscores of all time.
    * @private
    */
    this.listOverall = new GTLib.HighscoreList(game, numEntries || 10, scoreFont, Math.round(this.background.width * 0.7));
    /**
    * @property {Phaser.Sprite} btnDaily - 
    * @private
    */
    this.btnDaily = this.game.add.sprite(0, 0, 'content', 'buttons/btn-reiter.png');
    /**
    * @property {Phaser.Sprite} btnOverall - 
    * @private
    */
    this.btnOverall = this.game.add.sprite(0, 0, 'content', 'buttons/btn-reiter.png');
    /**
    * @property {Phaser.Sprite} btnClose - 
    * @private
    */
    this.btnClose = this.game.add.sprite(0, 0, 'content', 'buttons/btn-quit.png');
    /**
    * @property {Phaser.BitmapText} labelOverall - 
    * @private
    */
    this.labelOverall = this.game.add.bitmapText(0, 0, 'Gesamt', scoreFont);
    /**
    * @property {Phaser.BitmapText} labelDaily - 
    * @private
    */
    this.labelDaily = this.game.add.bitmapText(0, 0, 'Tages', scoreFont);
    /**
    * @property {string} remote - The remote adress of the highscore service.
    * @default null
    * @private
    */
    this.remote = remote || null;
    /**
    * @property {string} currentList - Holds the identifier string for the currently visible list.'daily'
    * @default 'overall'
    * @private
    */
    this.currentList = "overall";

    this.s1 = "!ek6TG<S07u^?x@fd85[#eDNFDh`P-J;";
    this.s2 = "THQaA21|ptj[0|fHpi^;l!}%gV%Iw|qE";
    //-----------------------------------
    // Create
    //-----------------------------------
    this.add(this.background);
    this.add(this.listDaily);
    this.add(this.listOverall);
    this.add(this.btnDaily);
    this.add(this.btnOverall);
    this.add(this.btnClose);
    this.add(this.labelDaily);
    this.add(this.labelOverall);
    this.add(this.title);

    var paddingX = Math.round(this.background.width * 0.02),
        paddingY = Math.round(this.background.height * 0.02);

    this.title.anchor.x = 0.5;
    this.title.anchor.y = 0.5;
    this.title.x = this.game.world.centerX;
    this.title.y = Math.round(this.game.world.centerY * 0.25);

    this.listDaily.x = this.background.x + Math.round((this.background.width - this.listDaily.width) / 2);
    this.listDaily.y = this.title.y + this.game.height * 0.15;

    this.listOverall.x = this.listDaily.x;
    this.listOverall.y = this.listDaily.y;

    this.btnClose.x = this.background.x + this.background.width - paddingX;
    this.btnClose.y = (this.game.device.desktop) ? paddingY : Math.round(this.background.height * 0.2);
    this.btnClose.anchor.x = 1;
    this.btnClose.inputEnabled = true;
    this.btnClose.input.useHandCursor = false;
    this.btnClose.events.onInputDown.add(this.onCloseDown, this);

    this.btnDaily.x = Math.round(this.listDaily.x + this.btnDaily.width / 2);
    this.btnDaily.y = Math.round(this.listDaily.y - this.btnDaily.height / 2);
    this.btnDaily.anchor.setTo(0.5, 0.5);
    this.btnDaily.inputEnabled = true;
    this.btnDaily.input.useHandCursor = false;
    this.btnDaily.events.onInputDown.add(this.onDailyDown, this);

    this.btnOverall.x = Math.round(this.btnDaily.x + this.btnDaily.width);
    this.btnOverall.y = this.btnDaily.y;
    this.btnOverall.anchor.setTo(0.5, 0.5);
    this.btnOverall.inputEnabled = true;
    this.btnOverall.input.useHandCursor = false;
    this.btnOverall.events.onInputDown.add(this.onAllDown, this);

    this.labelDaily.anchor.setTo(0.5, 0.5);
    this.labelDaily.x = this.btnDaily.x;
    this.labelDaily.y = this.btnDaily.y + 2;

    this.labelOverall.anchor.setTo(0.5, 0.5);
    this.labelOverall.x = this.btnOverall.x;
    this.labelOverall.y = this.labelDaily.y;
};

// extend class Phaser.Group
GTLib.HighscoreScreen.prototype = Object.create(Phaser.Group.prototype);
GTLib.HighscoreScreen.prototype.constructor = GTLib.HighscoreScreen;

//============================================================
// Public interface
//============================================================
/**
* Calls to the server to refresh the list.
* 
* @method GTLib.HighscoreScreen#refresh
*/
GTLib.HighscoreScreen.prototype.refresh = function() {
    if (!this.remote)
    {
        return;
    }

    var that = this;

    $.post(
        this.remote
    )
    .success(function(data) {
        that.parseRemoteResponse(data);
    })
    .error(function(data) { Log.debug("REMOTE answer: An error occured! "); })
    .complete(function() { Log.debug("REMOTE answer: Request complete! "); });
};
/**
* Sends a new score to the server.
* 
* @method GTLib.HighscoreScreen#send
*/
GTLib.HighscoreScreen.prototype.send = function(score, name) {
    if (!this.remote)
    {
        return;
    }

    var that = this,
        check = CryptoJS.MD5(this.game.time.now.toString()).toString();
        Log.debug(check);
    $.post(
        this.remote,
        {
            score: score,
            name: name,
            token: CryptoJS.MD5(this.s1 + score + name + check + this.s2).toString(),
            check: check
        }
    )
    .success(function(data) {
        that.parseRemoteResponse(data, true);
    })
    .error(function(data) { Log.debug("REMOTE answer: An error occured! "); })
    .complete(function() { Log.debug("REMOTE answer: Request complete! "); });
};
/**
* 
* 
* @method GTLib.HighscoreScreen#parse
*/
GTLib.HighscoreScreen.prototype.parse = function(content, update) {
    var list = 'daily';
    if (content)
    {
        if (content.all)
        {
            Log.debug("Highscore: updating overall");
            this.listOverall.parse(content.all);
            // if this is an update after a send call the user made it into the high score
            if (update)
            {
                // show over all list instead because it's an awesome score.
                list = 'overall';
            }
        }
        if (content.daily)
        {
            Log.debug("Highscore: updating daily");
            this.listDaily.parse(content.daily);
        }
    }

    this.showList(list);

    if (update)
    {
        this.onUpdate.dispatch(this);
    }
};
/**
* Shows the highscore. Instantly if desired.
* 
* @method GTLib.HighscoreScreen#show
*/
GTLib.HighscoreScreen.prototype.show = function(instantly) {
    if (this.visible)
    {
        return;
    }

    this.overlay.show(instantly);

    this.setVisible(true);
    
    if (instantly)
    {
        this.y = 0;
        this.alpha = 1;
    }
    else
    {
        this.y = -this.height;
        this.alpha = 0;

        this.game.add.tween(this).to(
            {alpha: 1, y: 0},
            1200,
            Phaser.Easing.Quintic.Out,
            true
        );
    }
};
/**
* Hides the highscore. Instantly if desired.
* 
* @method GTLib.HighscoreScreen#hide
*/
GTLib.HighscoreScreen.prototype.hide = function(instantly) {
    if (!this.visible)
    {
        return;
    }

    this.overlay.hide(instantly);

    if (instantly)
    {
        this.y = -this.height;

        this.setVisible(false);
    }
    else
    {
        this.game.add.tween(this).to(
            {alpha: 0, y: -this.height},
            1200,
            Phaser.Easing.Quintic.Out,
            true
        )
        .onComplete.addOnce(this.onHideTweenComplete, this);
    }
};
/**
* Shows a specific highscore list.
* 
* @method GTLib.HighscoreScreen#showList
*/
GTLib.HighscoreScreen.prototype.showList = function(list) {
    if (list == "daily")
    {
        this.listDaily.setVisible(true);
        this.btnDaily.alpha = 1;

        this.listOverall.setVisible(false);
        this.btnOverall.alpha = 0.5;
    }
    else if (list == "overall")
    {
        this.listDaily.setVisible(false);
        this.btnDaily.alpha = 0.5;

        this.listOverall.setVisible(true);
        this.btnOverall.alpha = 1;
    }

    this.labelDaily.alpha = this.btnDaily.alpha;
    this.labelOverall.alpha = this.btnOverall.alpha;

    this.currentList = list;
};
/**
* Returns true if the given score would be in either highscore list.
* 
* @method GTLib.HighscoreScreen#isHighscore
*/
GTLib.HighscoreScreen.prototype.isHighscore = function(score) {
    if (!this.listOverall.isHighscore(score))
    {
        return this.listDaily.isHighscore(score);
    }
    return true;
};
/**
* Destroys this Group. Removes all children, then removes the container from the display list and nulls references.
* 
* @method GTLib.HighscoreScreen#destroy
* @param {boolean} [destroyChildren=false] - Should every child of this Group have its destroy method called?
*/
GTLib.HighscoreScreen.prototype.destroy = function() {
    
    this.overlay.destroy();
    this.overlay = null;

    this.background.destroy();
    this.background = null;

    this.title.destroy();
    this.title = null;

    this.listDaily.destroy();
    this.listDaily = null;

    this.listOverall.destroy();
    this.listOverall = null;

    Phaser.Group.prototype.destroy.call(this, true);
};
//============================================================
// Private methods
//============================================================
/**
* 
* 
* @method GTLib.Keyboard#setVisible
* @protected
*/
GTLib.HighscoreScreen.prototype.setVisible = function(visible) {
    visible = (visible === false) ? visible : true;

    if (visible)
    {
        this.showList(this.currentList);
    }
    else
    {
        this.listDaily.setVisible(visible);
        this.listOverall.setVisible(visible);
    }

    this.btnDaily.visible = visible;
    this.btnOverall.visible = visible;
    this.btnClose.visible = visible;

    this.visible = visible;
};
/**
* Parses a remote response.
* 
* @method GTLib.HighscoreScreen#parseRemoteResponse
* @protected
*/
GTLib.HighscoreScreen.prototype.parseRemoteResponse = function(data, update) {
    //Log.debug(data);
    switch( data.response.result ) {
        case 'ok':
            Log.debug("REMOTE: Highscore received.");
            this.parse(data.response.content, update);
            break;
        case 'error':
            Log.debug("REMOTE answer: ", data.error);
            break;
        default:
            Log.debug("REMOTE answer: ", data);
            break;
    }
};
/**
* Called when the list has been fully hidden.
* 
* @method GTLib.HighscoreScreen#onHideTweenComplete
* @protected
*/
GTLib.HighscoreScreen.prototype.onHideTweenComplete = function() {

    this.setVisible(false);

    this.onHidden.dispatch(this);
};
/**
* Called when the close button was clicked.
* 
* @method GTLib.HighscoreScreen#onCloseDown
* @protected
*/
GTLib.HighscoreScreen.prototype.onCloseDown = function() {
    this.onClose.dispatch(this);

    this.hide();
};
/**
* Called when the daily button was clicked.
* 
* @method GTLib.HighscoreScreen#onDailyDown
* @protected
*/
GTLib.HighscoreScreen.prototype.onDailyDown = function() {
    this.showList("daily");
};
/**
* Called when the overall button was clicked.
* 
* @method GTLib.HighscoreScreen#onAllDown
* @protected
*/
GTLib.HighscoreScreen.prototype.onAllDown = function() {
    this.showList("overall");
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.HighscoreScreen#height
* @property {number} height - The height of this highscore.
* @readonly
*/
Object.defineProperty(GTLib.HighscoreScreen.prototype, "height", {
    
    get: function () {
        return this.background.height;
    }
    
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'ScoreCounter' object.
* 
* @class GTLib.ScoreCounter
* @constructor
*/
GTLib.ScoreCounter = function (game, x, y, text, style) {
    // call super constructor
    Phaser.BitmapText.call(this, game, x, y, text, style);

    /**
    * @property {Phaser.Signal} onComplete - Fired when the target score to count to has been achieved.
    */
    this.onComplete = new Phaser.Signal();
    /**
    * @property {number} step - The number in which the counter will increase on every interval
    * @default 100
    * @private
    */
    this.step = 100;
    /**
    * @property {number} targetScore - The target number to count up to.
    * @default 0
    * @private
    */
    this.targetScore = 0;
    /**
    * @property {number} score - The score value currently displayed.
    * @default 0
    * @private
    */
    this.score = 0;
    /**
    * @property {Phaser.Timer} timer - The timer that triggers the intervals.
    * @default null
    * @private
    */
    this.timer = this.game.time.create(false);
};

// extend class Phaser.BitmapText
GTLib.ScoreCounter.prototype = Object.create(Phaser.BitmapText.prototype);
GTLib.ScoreCounter.prototype.constructor = GTLib.ScoreCounter;

//============================================================
// Public interface
//============================================================
/**
* Lets the score count to a given number.
* 
* @method GTLib.ScoreCounter#countTo
*/
GTLib.ScoreCounter.prototype.countTo = function(number, step, delay) {

    this.stop();    

    this.targetScore = number;
    this.step = step || this.step;

    this.timer.loop(delay || 60, this.onTimer, this);
    this.timer.start();
};
/**
* Resets the counter.
* 
* @method GTLib.ScoreCounter#reset
*/
GTLib.ScoreCounter.prototype.reset = function() {

    this.stop();

    this.score = 0;
    this.targetScore = 0;
    this.setScore(this.score);
};
/**
* Stops the counter. Does not reset it to 0.
* 
* @method GTLib.ScoreCounter#stop
*/
GTLib.ScoreCounter.prototype.stop = function() {
    if (this.timer.running)
    {
        this.timer.stop();
    }
};
/**
* @method GTLib.ScoreCounter#destroy
*/
GTLib.ScoreCounter.prototype.destroy = function() {
    this.stop();
    
    this.timer = null;

    Phaser.BitmapText.prototype.destroy.call(this);
};
//============================================================
// Private methods
//============================================================
/**
* Called each time the timer has completed an interval.
* 
* @method GTLib.ScoreCounter#onTimer
* @protected
*/
GTLib.ScoreCounter.prototype.onTimer = function() {
    // update the current score
    this.score = (this.score + this.step >= this.targetScore) ? this.targetScore : this.score + this.step;
    // set the text in this BitmapText
    this.setScore(this.score);
    //
    if (this.score === this.targetScore)
    {
        this.timer.stop();
        this.onComplete.dispatch(this);
    }
};
/**
* Sets the score in the text field.
* 
* @method GTLib.ScoreCounter#setScore
* @protected
*/
GTLib.ScoreCounter.prototype.setScore = function(score) {
    this.setText(ScoreUtil.formatScore(this.score));
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'CountDown' object.
* 
* @class GTLib.CountDown
* @constructor
*/
GTLib.CountDown = function (game, startNumber, textComplete, fontObject) {
    // FIXME this should extend Phaser.Group

    /**
    * @property {Phaser.Game} game - A reference to the game instance.game
    * @protected
    */
    this.game = game;
    /**
    * @property {number} startNumber - The number to start counting down from.
    * @default 3
    */
    this.startNumber = startNumber || 3;
    /**
    * @property {string} textComplete - The text to display when the counter is complete. 0 if empty.
    * @default null
    */
    this.textComplete = textComplete || null;
    /**
    * @property {Phaser.Signal} onComplete - Fired when the count down is complete.
    */
    this.onComplete = new Phaser.Signal();
    /**
    * @property {boolean} playEffect - Tells whether a effect will be played on each number displayed.
    * @default true
    */
    this.playEffect = true;
    /**
    * @property {number} currentStep - The current count down number.
    * @default 0
    */
    this.currentStep = 0;
    /**
    * @property {Phaser.BitmapText} label - The label displaying the count down.
    * @default null
    * @private
    */
    this.label = null;
    /**
    * @property {Phaser.Timer} timer - Timing down the counter.
    * @private
    */
    this.timer = this.game.time.create(false);
    /**
    * @property {Phaser.Tween} tween - A reference to the currently running tween.
    * @private
    */
    this.tween = null;
    /**
    * @property {Phaser.Sound} sound - 
    * @private
    */
    this.sound = this.game.add.audio('sfx-count-down', 1);
    // init
    this.label = this.game.add.bitmapText(0, 0, this.startNumber.toString(), fontObject);
    this.label.anchor.x = this.label.anchor.y = 0.5;
    this.label.visible = false;
    this.game.add.existing(this.label);
};

GTLib.CountDown.prototype = {
    //============================================================
    // Public interface
    //============================================================
    /**
    * Resets and starts the count down.
    * 
    * @method GTLib.CountDown#start
    */
    start: function(count) {
        if (!this.timer.running)
        {
            if (count >= 0)
                this.display(count);
            else
                this.display(this.startNumber);

            this.label.visible = true;

            this.timer.loop(1000, this.onStep, this);
            this.timer.start();
        }
    },
    /**
    * Stops the count down and hides it.
    * 
    * @method GTLib.CountDown#stop
    */
    stop: function() {
        // hide the label
        this.label.visible = false;
        // clear label to avoid big jumps on updates
        this.label.setText(this.startNumber.toString());
        // stop the timer
        this.timer.stop();

        this.sound.stop();
    },
    //============================================================
    // Private methods
    //============================================================
    /**
    * Displays a given number to the screen and then triggers a display effect if set.
    * 
    * @method GTLib.CountDown#display
    * @param (number) number - The number to display.
    * @protected
    */
    display: function(number) {
        if (number === 0 && this.textComplete)
        {
            this.label.setText(this.textComplete);
        }
        else
        {
            this.label.setText(number.toString());
        }
       
        this.currentStep = number;
        if (this.playEffect)
        {
            this.startDisplayEffect();
        }
        this.sound.play('', 0, 1, false, true);
    },
    /**
    * Plays an effect right after the display updated. Default is a tween fade out. Override this function to change the effect.
    * 
    * @method GTLib.CountDown#startDisplayEffect
    * @protected
    */
    startDisplayEffect: function() {
        this.stopDisplayEffect();

        this.tween = this.game.add.tween(this.label).to(
            {alpha: 0},
            1000,
            Phaser.Easing.Quintic.In,
            true
        );
    },
    /**
    * Stops any currently running display effect.
    * 
    * @method GTLib.CountDown#stopDisplayEffect
    * @protected
    */
    stopDisplayEffect: function() {
        // stop the current tween
        if (this.tween && this.tween.isRunning)
        {
            this.tween.stop();
        }
        this.label.alpha = 1;
    },
    /**
    * Displays the next number and tweens it out.
    * 
    * @method GTLib.CountDown#onStep
    * @protected
    */
    onStep: function() {
        if (this.currentStep > 0)
        {
            this.display(this.currentStep - 1);
        }
        else
        {
            this.stop();

            this.onComplete.dispatch(this);
        }
    },
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @name GTLib.CountDown#x
* @property {number} x - The x position of the count down.
*/
Object.defineProperty(GTLib.CountDown.prototype, "x", {
    
    get: function () {
        return this.label.x;
    },
  
    set: function (value) {
        this.label.x = value;
    }
});
/**
* @name GTLib.CountDown#y
* @property {number} y - The y position of the count down.
*/
Object.defineProperty(GTLib.CountDown.prototype, "y", {
    
    get: function () {
        return this.label.y;
    },
  
    set: function (value) {
        this.label.y = value;
    }
});
/**
* @name GTLib.CountDown#running
* @property {boolean} running - True if the countdown is currently running.
* @readonly
*/
Object.defineProperty(GTLib.CountDown.prototype, "running", {
    
    get: function () {
        return this.timer.running;
    }
    
});/**
* @author       Michel Wacker <info@starnut.com>
* @copyright    2014 Starnut
*/

/**
* Create a new 'Hand' object.
* 
* @class GTLib.Hand
* @constructor
*/
GTLib.Hand = function (game, x, y) {
    // call super constructor
    Phaser.Sprite.call(this, game, x, y, 'content', 'hand.png');
    
    this.anchor.x = 0.65;
    this.angle = -45;
};

// extend class Phaser.Sprite
GTLib.Hand.prototype = Object.create(Phaser.Sprite.prototype);
GTLib.Hand.prototype.constructor = GTLib.Hand;

//============================================================
// Public interface
//============================================================
/**
* Animates the hand
* 
* @method GTLib.Hand#swipe
*/
GTLib.Hand.prototype.swipe = function(x, y) {
    
    this.visible = true;
    this.alpha = 0;

    var w = Math.round(this.width / 2),
        h = Math.round(this.height / 4);

    this.x = x - w;
    this.y = y + h;

    var t1, t2, t3;
    t1 = this.game.add.tween(this).to(
        {alpha: 1},
        200,
        Phaser.Easing.Linear.In
    );

    t2 = this.game.add.tween(this).to(
        {x: x + w * 2, y: y - h * 2},
        800,
        Phaser.Easing.Quartic.Out
    );
    // t1.delay(1000);

    t3 = this.game.add.tween(this).to(
        {alpha: 0},
        400,
        Phaser.Easing.Linear.In
    );
    t3.onComplete.addOnce(this.onTweenComplete, this);

    t1.chain(t2);
    t2.chain(t3);
    t1.start();
};
//============================================================
// Private methods
//============================================================
/**
* 
* 
* @method GTLib.Hand#onTweenComplete
* @protected
*/
GTLib.Hand.prototype.onTweenComplete = function() {
    this.visible = false;
};
//============================================================
// Implicit getters and setters
//============================================================
/**
* @author       Michel Wacker <michel.wacker@gentletroll.com>
* @copyright    2014 Gentle Troll Entertainment GmbH
*/

/**
* @namespace GTLib.GroupUtil
*/
GTLib.GroupUtil = {

    /**
    * Finds all children that match a given property with a given value and returns it as an Array.
    * 
    * @method GTLib.GroupUtil#findMatchingInGroup
    * @memberof GTLib.GroupUtil
    * @param {string} property - The property to check.
    * @param {*} value - The value to check the property against.
    * @param {Phaser.Group} - The group to perform the check on.
    */
    findMatchingInGroup: function(property, value, group) {
        var matches = [],
            child;

        for (var i = 0; i < group.length; i++)
        {
            child = group.getAt(i);

            if (child[property] === value)
            {
                matches.push(child);
            }
        }

        return matches;
    }

};
/**
* @author       Michel Wacker <m.wacker@starnut.com>
* @copyright    2013 Starnut
*/
/**
* @namespace Log
*/
Log = {
    /**
    * @property {boolean} enabled - Defining whether debug statements are logged to the console.
    * @default
    */
    enabled: false,
    /**
    * @property {function} console - A pointer to the console.log function (if available) used to apply multiple arguments.
    * @default
    */
    console: null,
    /**
    * Initialize logger and define whether debug calls are supposed to be logged to the console.
    * @method Log#initialize
    * @param {boolean} [debuggerEnabled=false] - Defines if debug calls should be logged to the console.
    */
    initialize: function (debuggerEnabled) {
        this.enabled = debuggerEnabled || false;
        // attempt to access the javascript console
        if (!this.console && console)
            this.console = console.log;
    },
    /**
    * Logs an blank line.
    * @method Log#separator
    */
    separator: function() {
        if (this.console)
            console.log("");//.apply(console, [""]);
    },
    /**
    * Logs all passed arguments to the browser console (if available) only if the debugger is enabled.
    * @method Log#debug
    * @param {...*} parameter - Content to be logged.
    */
    debug: function() {
        // if debugging is turned on, generate the output
        if (this.enabled && this.console)
            this.console.apply(console, arguments);
    },
    /**
    * Logs all passed arguments to the browser console (if available) even if the debugger is disabled.
    * @method Log#info
    * @param {...*} parameter - Content to be logged.
    */
    info: function() {
        if (this.console)
            this.console.apply(console, arguments);
    },
    /**
    * Logs all passed arguments to the console with an error flag preceeding them.
    * @method Log#error
    * @param {...*} parameter - Content to be logged.
    */
    error: function() {
        // add an error flag
        //arguments[0] = "ERROR: " + arguments[0];
        if (this.console)
            this.console.apply(console, arguments);
    }
};
/**
* @author       Michel Wacker <michel.wacker@gentletroll.com>
* @copyright    2014 Gentle Troll Entertainment GmbH
*/

/**
* @namespace GTLib.ScoreFormatter
*/
GTLib.ScoreFormatter = {
    /**
    * Formats a given score adding given separators to make it more readable.
    * 
    * @method GTLib.ScoreFormatter#formatScore
    * @memberof GTLib.ScoreFormatter
    */
    formatScore: function(score, separator) {
        separator = separator || ' ';

        var s = score.toString(),
            r = '',
            i = 1,
            j, k;
        
        if (score === 0)
        {
            return s;
        }
        
        while (score > 0)
        {
            j = s.length - i * 3;
            k = 3;

            if (j < 0)
            {
                k += j;
                j = 0;
            }
            
            if (r === '')
                r = s.substr(j, k);
            else
                r = s.substr(j, k) + separator + r;

            score = Math.floor(score / 1000);
            i++;
        }

        return r;
    }
};
