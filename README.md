# Model-js

Light weight model management for javascript based on John Resig's implementation of Class.

## Simple usage
Allows the creation of custom model classes that can be initialized with a plain object. For instance:
```javascript
var Something = Model.extend({
    doStuff: function() {
        return this.id;
    }
});
var smthg = new Something({id:1});
smthg.doStuff() // returns 1
```

## Data Type declaration
The model supports instantiation based on annotations on the prototype.
```javascript
var Other = Model.extend(...);
var Something = Model.extend({
    _other: Other,
    _arrayOfOther = [Other]
});
var smthg = new Something({
    other: {id:1}
    arrayOfOther: [{id:5}, {id:6}]
});
smthg.other instanceof Other // true!
smthg.other.id // 1
smthg.arrayOfOther.length // 2
smthg.arrayOfOther[1] instanceof Other // true
smthg.arrayOfOther[1].id // 6
```

## Overriding the constructor
If you would like to create other stuff on the object constructor. As any extension of Class, you can just call _super.
```javascript
var Something = Model.extend({
    init: function(obj) {
        this._super(obj);

        // do stuff
    }
});
```

## About Resig's class
The original class implementation has been provided by John Resig
    here http://ejohn.org/blog/simple-javascript-inheritance/

However it has been updated to support ECMA 5.1 by the community, the updated version can be found on a gist
    here https://gist.github.com/shakyShane/5944153

This is included directly in this library in ```src/Class.js```.