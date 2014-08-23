/* Simple JavaScript Inheritance for ES 5.1 ( includes polyfill for IE < 9 )
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 *  (inspired by base2 and Prototype)
 * MIT Licensed.
 */
(function (global) {
    "use strict";

    if (!Object.create) {
        Object.create = (function () {
            function F() {
            }

            return function (o) {
                if (arguments.length != 1) {
                    throw new Error("Object.create implementation only accepts one parameter.");
                }
                F.prototype = o;
                return new F();
            };
        })();
    }

    var fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    function BaseClass() {
    }

    // Create a new Class that inherits from this class
    BaseClass.extend = function (props) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        var proto = Object.create(_super);

        // Copy the properties over onto the new prototype
        for (var name in props) {
            // Check if we're overwriting an existing function
            proto[name] = typeof props[name] === "function" &&
                typeof _super[name] === "function" && fnTest.test(props[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, props[name]) :
                props[name];
        }

        // The new constructor
        var newClass = typeof proto.init === "function" ?
            proto.init : // All construction is actually done in the init method
            function () {
            };

        // Populate our constructed prototype object
        newClass.prototype = proto;

        // Enforce the constructor to be what we expect
        proto.constructor = newClass;

        // And make this class extendable
        newClass.extend = BaseClass.extend;

        return newClass;
    };

    // export
    global.Class = BaseClass;
})(this);
(function (global) {
    global.Model = Class.extend({
        init: function (obj) {
            if(!obj) return; // support of an empty constructor
            if(typeof obj != 'object' || obj instanceof Array)
                throw new Error('The given data is not an object');
            for (var name in obj) {
                if (typeof obj[name] === 'function') {
                    // Ignore functions, we are only focusing on data
                    continue;
                }
                var clazz;
                var model = this['_' + name];

                if (typeof model === 'undefined') {
                    // Data type has not been declared
                    this[name] = obj[name];
                } else if (model instanceof Array && typeof model[0] === 'function' && model.length == 1) {
                    // _A: [B]
                    clazz = model[0];
                    var arr = obj[name];
                    if (!(arr instanceof Array))
                        throw new Error('Data object given for the field ' + name + ' is not an object though it\'s declared like one');

                    var result = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        result[i] = new clazz(arr[i]);
                    }
                    this[name] = result;
                } else if (typeof model === 'function') {
                    clazz = model;
                    this[name] = new clazz(obj[name]);
                } else {
                    throw new Error('Invalid model declaration for field ' + name);
                }
            }
        }
    });
})(this);