KKPES.Validators = {
    logAndThrow: function(msg, callerName) {
        // Logger is not be available in public resources (welcome page).

        if (KKPES.Logger.getLogStatus()) {
            if (callerName) {
                msg = "Invalid invocation of method " + callerName + "; " + msg;
            }
            if (this.verbose) {
                console.error(msg);
                //WL.Logger.error(msg);
            }
        }
        alert("log and throw" + msg);
        throw new Error(msg);
    },

    validateDefined: function(arg, callerName) {
        if (typeof arg === "undefined" || arg === null) {
            this.logAndThrow("Invalid argument value '" + arg + "', expected not empty string.", callerName);
        }
    },

    isArray: function(object) {
        return Array.isArray(object);
    },

    isJSON: function(str) {
        if (str === "") {
            return false;
        }
        str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@");
        str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        return /^[\],:{}\s]*$/.test(str);
    },

    isBlank: function(str) {
        alert("isblank");
        return /^\s*$/.test(str);
    }
};
