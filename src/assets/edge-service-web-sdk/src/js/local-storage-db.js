__KKPESLocalStorageDB = function() {
    var appNamePrefix;

    var storage = window.localStorage;

    this.init = function() {
        appNamePrefix = KKPES.Config.getApplicationID();
    };

    /**
     * Sets an item in the database
     * @param key
     * @param value
     * @param options {{session : boolean, global : boolean}}
     * @returns {*}
     */
    this.setItem = function(key, value, options) {
        var finalOptions = initOptions(options);
        var finalKey = buildKey(key, finalOptions);
        var finalValue = value ? JSON.stringify(value) : null;
        storage.setItem(finalKey, finalValue);
    };

    /**
     * Gets an item in the database
     * @param key
     * @param options {{session : boolean, global : boolean}}
     * @returns {string - JSON representation of value for given key}
     */
    this.getItem = function(key, options) {
        var finalOptions = initOptions(options);
        var finalKey = buildKey(key, finalOptions);
        var value = storage.getItem(finalKey);
        return value ? JSON.parse(value) : null;
    };

    /**
     * Removes an item in the database
     * @param key
     * @param options {{session : boolean, global : boolean}}
     * @returns {*}
     */
    this.removeItem = function(key, options) {
        var finalOptions = initOptions(options);
        var finalKey = buildKey(key, finalOptions);
        storage.removeItem(finalKey);
    };

    /**
     * Takes the options the user entered (if any) and appends them to the default
     * options, overriding the default values
     * @param userOptions
     * @returns {{global: boolean, session: boolean}}
     */
    function initOptions(userOptions) {
        var options = {
            session: false,
            global: false
        };
        for (var property in userOptions) {
            options[property] = userOptions[property];
        }

        // Init the storage
        storage = options.session ? window.sessionStorage : window.localStorage;

        return options;
    }

    function buildKey(key, options) {
        return options.global ? key : appNamePrefix + "." + key;
    }
};

KKPES.LocalStorageDB = new __KKPESLocalStorageDB();
