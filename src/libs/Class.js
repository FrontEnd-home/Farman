;(function(win) {
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;
    // The base Class implementation (does nothing)
    win.Class = function() {};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
                typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function(name, fn) {
                return function() {
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
            })(name, prop[name]) :
                prop[name];
        }


        function Class() {
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }
        Class.newInstance = function(paramArr) {
            initializing = true;
            var obj = new Class();
            initializing = false;
            obj.init.apply(obj, paramArr);
            return obj;
        };

        Class.__Intance = null;
        Class.getReadyIntance = function(paramArr) {
            if(mui.os.plus){
                mui.plusReady(function(){
                    Class.__Intance = Class.newInstance(paramArr);
                });
                return Class.__Intance;
            } else{
                return Class.newInstance(paramArr);
            }
        };

        Class.prototype = prototype;

        Class.prototype.constructor = Class;

        Class.extend = arguments.callee;
        return Class;
    };
    win.ClassFactory = {
        classDef: {},
        CLASSIDX: 0,
        regClass: function(className, fn) {
            this.classDef[className] = {
                "idx": this.CLASSIDX,
                "creator": fn
            };
            this.CLASSIDX++;
        },
        newInstance: function(className, classArgs) {
            var cs = this.classDef[className];
            if (cs == null) {
                throw Error("Class:" + className + " Not Exist!")
            }
            var obj = cs.creator.newInstance(classArgs);
            return obj;
        }
    };
})(window);