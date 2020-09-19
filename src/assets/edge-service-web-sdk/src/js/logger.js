__KKPESLogger = function() {
    isEnable = true;
    this.setLogStatus = function(status) {
        isEnable = status;
    };

    this.getLogStatus = function() {
        return isEnable;
    };
};

KKPES.Logger = new __KKPESLogger();
