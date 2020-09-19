function __KKPES() {}
var KKPES = KKPES ? KKPES : {};

//KKPESClient
__KKPESClient = function() {
    var initOptions = {};
    var sessionUUID = "";

    function ErrorHandler(msg, callerName) {
        if (KKPES.Logger.getLogStatus()) {
            if (callerName) {
                msg = "Invalid invocation of method " + callerName + "; " + msg;
            }
        }
        throw new Error(msg);
    }

    this.getEnvironment = function() {
        return "web";
    };

    this.init = function(initOptions) {
        var dfd = KKJQ.Deferred();
        setInitParams(initOptions);

        //initcsrf
        if (initOptions.csrfEnable || initOptions.csrfEnable == undefined) {
            this.initCSRF(initOptions).then(
                function(response) {
                    dfd.resolve(response.responseJSON);
                },
                function(error) {
                    //ErrorHandler(JSON.stringify(error.responseText), 'Get csrf token');
                    dfd.reject(error);
                }
            );
        } else {
            dfd.resolve(true);
        }

        return dfd.promise();
    };

    this.initCSRF = function(initOptions) {
        var dfd = KKJQ.Deferred();

        var initCSRF = new KKPES.ResourceRequest(KKPES.Config.getCSRFUri(), "GET", "");
        initCSRF.setTimeout(initOptions.csrfTimeout);

        initCSRF.sendFormParameters("").then(
            function(response) {
                __KKPESTokenStore.setCSRF(response);
                dfd.resolve(response);
            },
            function(error) {
                dfd.reject(error);
            }
        );

        return dfd.promise();
    };

    this.getLocalization = function() {
        if (navigator.languages != undefined) return navigator.languages[0];
        else return navigator.language;
    };

 

    //todo mock
    //get access token and send to CAAWS
    this.logout = function(realm) {
        var dfd = KKJQ.Deferred();

        var logout = new KKPESResourceRequest("/v1/auth/" + "RevokeToken" , "POST", {});
        logout.setTimeout(100000);

        obj = {}
        obj.params =   {
            "sessionToken": KKPES.KKPESTokenStore.getSessionToken() ,
            "header": {
              "referenceNo": getReferenceNo(),
              "transactionDateTime": "2019-04-27T09:48:56.998Z",
              "systemCode": "RIB",
              "channelId": "RIBWeb"
            },
           
          }
        if( KKPES.KKPESTokenStore.getSessionToken() != ""){
            logout.sendFormParameters(obj.params).then(
                function (response) {
                
                
                    dfd.resolve(true);
                },
                function (error) {
    
                    dfd.reject(true);
                });
          
        }

            KKPES.KKPESTokenStore.clearAll();
            dfd.resolve(true);
      //  dfd.resolve(true);
        return dfd.promise();
    };

    this.obtainAccessToken = function() {
        var dfd = KKJQ.Deferred();
        dfd.resolve(true);
        return dfd.promise();
    };

    this.login = function(obj) {
        var dfd = KKJQ.Deferred();
  
        var optionWLResource = {};
        var url = '/' + obj.actionCode + '/' + obj.procedure;
        
        var submitLogin = new KKPESResourceRequest(url, "POST", optionWLResource);
        // let errorMsg = this.translateService.instant("error.system");
        submitLogin.setTimeout(60000);

        submitLogin.sendFormParameters(obj.params).then(
            function(response) {
         
                if(response.responseJSON.result.value.accessToken != ""){
                    KKPES.KKPESTokenStore.setAccessToken(response.responseJSON.result.value.accessToken)
                    KKPES.KKPESTokenStore.setSessionToken(response.responseJSON.result.value.sessionToken)
                }
                //set access token
                dfd.resolve(response);
            },
            function(error) {
                dfd.reject(error);
            }
        );
        return dfd.promise();
    };


    this.loginByToken = function(obj) {
        var dfd = KKJQ.Deferred();
  
        var optionWLResource = {};
        var url = '/' + obj.actionCode + '/' + obj.procedure;
        
        var submitLogin = new KKPESResourceRequest(url, "POST", optionWLResource);
        // let errorMsg = this.translateService.instant("error.system");
        submitLogin.setTimeout(60000);

        submitLogin.sendFormParameters(obj.params).then(
            function(response) {
         
                if(response.responseJSON.result.value.accessToken != ""){
                    KKPES.KKPESTokenStore.setAccessToken(response.responseJSON.result.value.accessToken)
                    KKPES.KKPESTokenStore.setSessionToken("")
                }
                //set access token
                dfd.resolve(response);
            },
            function(error) {
                dfd.reject(error);
            }
        );
        return dfd.promise();
    };

    function padnum(digit, size) {
        var s = String(digit);
        while (s.length < (size || 2)) { s = "0" + s; }
        return s;
    }


    function getReferenceNo() {
        let tsdate = getTransactionDate();
        let random = (Math.floor((Math.random() * 998) + 1)).toString();
        let padrandom = padnum(random, 3);
        return tsdate + padrandom;
    }


    function getTransactionDate() {
        let today = new Date();
        let curYear = today.getFullYear().toString();
        let curMonth = (today.getMonth() + 1).toString();
        curMonth = padnum(curMonth, 2);
        let curDate = today.getDate().toString();
        curDate = padnum(curDate, 2);
        let curHour = today.getHours().toString();
        curHour = padnum(curHour, 2);
        let curMin = today.getMinutes().toString();
        curMin = padnum(curMin, 2);
        let curSec = today.getSeconds().toString();
        curSec = padnum(curSec, 2);

        let transationdate = curYear + curMonth + curDate + curHour + curMin + curSec;
        return transationdate;
    }

    function generateUUID() {
        "use strict";

        var d = new Date().getTime();
        var uuid = "";
        var generate = function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        };

        uuid = "xxxyxkkp-xx-xxxxxyyyxxxx".replace(/[xy]/g, generate);

        return uuid;
    }

    function setInitParams(params) {
        // assign params to initOptions inside WL.Client class
        initOptions = params;

        var contextRoot = params["contextRoot"];
        KKPES.Validators.validateDefined(contextRoot, "__KKPESClient.init");

        var appID = params["applicationID"];
        KKPES.Validators.validateDefined(appID, "__KKPESClient.init");

        var appVersion = params["applicationVersion"];

        // Pass to config
        KKPES.Config.setContext(contextRoot);
        KKPES.Config.setApplicationID(appID);
        KKPES.Config.setApplicationVersion(appVersion);


 
        if(storageON()) {
            KKPES.LocalStorageDB.init();
            sessionUUID = KKPES.LocalStorageDB.getItem("UUID");
            if (sessionUUID === null || sessionUUID === "") {
                sessionUUID = generateUUID();
                KKPES.LocalStorageDB.setItem("UUID", sessionUUID);
            }
        } else {
            sessionUUID = generateUUID();
        }

 
        KKPES.Config.setUUID(sessionUUID);
    }

    this.getBrowserName = function() {
        var browserName = navigator.appName;
        var nAgt = navigator.userAgent;
        var nameOffset, verOffset, ix;

        if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browserName = "Opera";
        } else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
        } else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
        } else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
        } else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
        } else if (
            (nameOffset = nAgt.lastIndexOf(" ") + 1) <
            (verOffset = nAgt.lastIndexOf("/"))
        ) {
            browserName = nAgt.substring(nameOffset, verOffset);
        }
        return browserName;
    };
};


// Init LocalStorageDB
function storageON() {
    try {
        localStorage.setItem("__chk", "success");
        localStorage.removeItem("__chk")
    } catch (e) {
        return false;
    } 
    return true;
}

__KKPES.prototype.Client = new __KKPESClient();
KKPES.Client = new __KKPESClient();
