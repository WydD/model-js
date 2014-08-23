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