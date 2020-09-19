__KKPESConfig = function() {
    var contextRoot = "";
    var applicationID = "";
    var applicationVersion = "";
    var clientUUID = "";
    var csrfUri = KKPES.Constant.URI_CSRF_INIT;
    this.setContext = function(path) {
        contextRoot = path;
    };

    this.getContext = function() {
        // if (contextRoot === "") {
        //     contextRoot = "/api";
        // }
        return contextRoot;
    };

    this.setApplicationID = function(appID) {
        applicationID = appID;
    };

    this.getApplicationID = function() {
        return applicationID;
    };

    this.setApplicationVersion = function(appVersion) {
        applicationVersion = appVersion;
    };

    this.getApplicationVersion = function() {
        return applicationVersion;
    };

    this.setUUID = function(uuid) {
        clientUUID = uuid;
    };

    this.getUUID = function() {
        return clientUUID;
    };

    this.setCSRFUri = function(uri) {
        csrfUri = KKPES.Constant.URI_CSRF_INIT;
        if (uri !== "") {
            csrfUri = uri;
        }
    };

    this.getCSRFUri = function() {
        return csrfUri;
    };
};

__KKPESTokenStore = function() {
    var session_token = "";
    var csrf_token = "";
    var access_token = "";
    this.setCSRF = function(csrf) {
        csrf_token = csrf;
    };
    this.getCSRF = function() {
        return csrf_token;
    };

    this.setSessionToken = function(token) {
        session_token = token;
    };

    this.getSessionToken = function() {
        return session_token;
    };


    this.setAccessToken = function(token) {
        access_token = token;
    };

    this.getAccessToken = function() {
        return access_token;
    };



    this.clearAll = function() {
        session_token = "";
        csrf_token = "";
        access_token = "";
    };
};

__KKPES.prototype.KKPESTokenStore = new __KKPESTokenStore();
KKPES.KKPESTokenStore = new __KKPESTokenStore();

__KKPES.prototype.Config = new __KKPESConfig();
KKPES.Config = new __KKPESConfig();
