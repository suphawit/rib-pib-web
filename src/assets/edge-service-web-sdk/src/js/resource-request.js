KKPES.ResourceRequest = function (_url, _method, _options) {
    var queryParameters = {};

    function ErrorHandler(msg, callerName) {
        if (KKPES.Logger.getLogStatus()) {
            if (callerName) {
                msg = "Invalid invocation of method " + callerName + "; " + msg;
            }
        }
        throw new Error(msg);
    }

    function extractQueryParamFromUrl(_url) {
        var vars = _url.split("?");
        if (vars.length > 1) {
            var tmp = vars[1].split("&");
            for (var i = 0; i < tmp.length; i++) {
                if (true) {
                    var pair = tmp[i].split("=");
                    var values = queryParameters[pair[0]];

                    if (values === null || typeof values === "undefined") {
                        values = [];
                        queryParameters[pair[0]] = values;
                    }
                    values[values.length] = pair[1];
                }
            }
        }
        return vars[0];
    }

    function isAllowRequestMethod(method) {
        return (method === "GET" || method === "POST" || method === "PUT" || method === "DELETE");
    }

    function isUndefinedOrNull(value) {
        return typeof value === "undefined" || value === null;
    }

    var url = _url === null || typeof _url === "undefined" ? ErrorHandler("Request URL must be specified.", "KKPES.ResourceRequest") : extractQueryParamFromUrl(_url.trim());
    var method = typeof _method === "undefined" || !isAllowRequestMethod(_method) ? ErrorHandler("Request method is invalid or not specified. (KKPES support only : get post put delete)", "KKPES.ResourceRequest") : _method;
    var timeout;
    var headers = {};

    this.getHeader = function (name) {
        if (name === null || typeof name === "undefined") {
            ErrorHandler("Header name is undefined", "KKPES.ResourceRequest.getHeader");
        }

        var headerValue = headers[name];
        if (typeof headerValue === "undefined") {
            headerValue = __getFirstHeaderByNameNoCase(name).value;
        }

        if (KKPES.Validators.isArray(headerValue)) {
            return headerValue[0];
        }

        return headerValue;
    };

    this.getTimeout = function () {
        return timeout;
    };

    this.setTimeout = function (requestTimeout) {
        timeout = requestTimeout;
    };

    this.addHeader = function (name, value) {
        if (typeof value === "undefined" || value === null) {
            ErrorHandler("Error to add header is empty", "KKPES.ResourceRequest.addHeader");
        }

        var header = __getFirstHeaderByNameNoCase(name);
        var existingHeaderName = header.name;
        var existingHeaderValue = header.value;

        if (existingHeaderValue === null) {
            headers[name] = value;
        } else {
            if (KKPES.Validators.isArray(existingHeaderValue)) {
                for (var idx in existingHeaderValue) {
                    if (existingHeaderValue[idx].toString() === value.toString()) {
                        return;
                    }
                }
                existingHeaderValue.push(value);
            } else {
                var array = [];
                array.push(existingHeaderValue);
                array.push(value);
                headers[existingHeaderName] = array;
            }
        }
    };

    this.sendFormParameters = function (json, method) {
        if (typeof json !== "object") {
            json = {};
        }

        this.addHeader("Content-Type", "application/json");
        this.addHeader(KKPES.Constant.HEADER_ANALYTIC, JSON.stringify(this.setAnalyticHeader(json)));
        this.addHeader(KKPES.Constant.HEADER_APPLICATION_ID, KKPES.Config.getApplicationID());
        this.addHeader(KKPES.Constant.HEADER_APPLICATION_VERSION, KKPES.Config.getApplicationVersion());

        if (KKPES.KKPESTokenStore.getAccessToken() && method != "GET") {

            var bearerToken = "Bearer " + KKPES.KKPESTokenStore.getAccessToken()
            this.addHeader(KKPES.Constant.HEADER_AUTHORIZATION, bearerToken);
        }
        contentString = JSON.stringify(json);

        return sendRequestAsync(contentString, 0, 0, json.language);
    };

    this.setAnalyticHeader = function (json) {
        var analyticsHeader = {};
        analyticsHeader.type = "analytic";
        analyticsHeader.uuid = KKPES.Config.getUUID();
        analyticsHeader.appID = KKPES.Config.getApplicationID();
        analyticsHeader.appVersion = KKPES.Config.getApplicationVersion();
        analyticsHeader.clientLang = KKPES.Client.getLocalization();
        analyticsHeader.browser = KKPES.Client.getBrowserName();
        analyticsHeader.clientDateTime = new Date();

        // set action code

        analyticsHeader.trackingObj = {};
        if (typeof json.header === "object" || json.header !== "") {
            analyticsHeader.trackingObj = json.header;
        }

        if (json.actionCode !== "" || json.actionCode != "undefined") {
            analyticsHeader.trackingObj.actionCode = json.actionCode;
        }

        return analyticsHeader;
    };

    function sendRequestAsync(contentString, attempt, conflictAttemptCounter, reqLang) {

        var dfd = KKJQ.Deferred();
        __sendToXHR(url, contentString, attempt, conflictAttemptCounter).then(
            function (response) {

                if (response.responseJSON.result.responseStatus != undefined) {
                    response.responseJSON.result.responseStatus.errorMessage = translateErrorMessage(response, reqLang)
                }
                dfd.resolve(response);
            },
            function (error) {
                if (error.responseJSON.result.responseStatus != undefined) {
                    error.responseJSON.result.responseStatus.errorMessage = translateErrorMessage(error, reqLang)
                }
                dfd.reject(error);
            }
        );

        return dfd.promise();
    }

    function translateErrorMessage(response, reqLang) {
        if (reqLang != ""){
            if (reqLang.toLowerCase() == "th") {
                return response.responseJSON.result.responseStatus.errorMessageTh
            }
        }
    
        return response.responseJSON.result.responseStatus.errorMessageEn
    }



    function encodeFormParameters(json) {
        if (json === null || typeof json === "undefined") {
            return "";
        }

        var result = "";
        for (var key in json) {
            var value = json[key];
            result += encodeURIComponent(key) + "=" + encodeURIComponent(value);
            result += "&";
        }

        if (result.length > 0 && result[result.length - 1] === "&") {
            result = result.substring(0, result.length - 1);
        }

        return result;
    }

    function __sendToXHR(serverUrl, contentString, attempt, conflictAttemptCounter) {
        var dfd = KKJQ.Deferred();
        var xhr = new XMLHttpRequest();
        var serverUrl = KKPES.Config.getContext() + serverUrl;
        xhr.open(method, serverUrl, true);

        if (typeof timeout !== "undefined") {
            xhr.timeout = timeout;
        }

        addRequestHeaders(xhr);

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                var transport = this;
      
                // timeout state
                if (this.status === 0 || this.status === 504 || this.status === 404) {
                    // var errorCode = KKPES.Constant.ERR_REQUEST_TIMEOUT;
                    // handle errors - timeout, unresponsive host and unexpected error
                    transport.status = 0;
                    //  transport = {}
                    transport.responseJSON = {};

                    transport.responseJSON.result = {};
                    transport.responseJSON.result.responseStatus = {};
                    transport.responseJSON.result.responseStatus = {
                        responseCode: "RIB-E-REQ408",
                        responseMessage: "Call backend timeout",
                        responseNamespace: null

                    };
               
                    dfd.reject(transport);
                    return dfd.promise();
                }


                if (this.status === 204 ) {
                 
                    transport.status = 204;
                    //  transport = {}
                    transport.responseJSON = {};

                    transport.responseJSON.result = {};
                    transport.responseJSON.result.statusCode = this.status
                    transport.responseJSON.result.responseStatus = {};
                    transport.responseJSON.result.responseStatus = {
                        responseCode: "RIB-I-SCC000",
                        responseMessage: "NO CONTENT",
                        responseNamespace: null

                    };
          
                    dfd.resolve(transport);
                    return dfd.promise();
                }
             
                if (!checkHttpStatus(this.status)) {
              
                    var newStatus = "ERR_" + this.status;
                    transport.response = {
                        errorCode: KKPES.Constant[newStatus],
                        errorMsg: this.responseText,
                        isSuccessful: isSuccess()
                    };
                    dfd.reject(transport);
                    // return dfd.promise();
                }
        
                // Convert to json
                if (this.status != 0 && this.status != 504 && this.status != 404) {
                    transport.responseJSON = transport.response;
                }

               
                if (typeof transport.response !== "object" && this.status != 0) {
                
                    transport.responseJSON = JSON.parse(transport.response);
                }
            
                transport.responseJSON.isSuccessful = isSuccess();
            
                var exposeResponse = {
                    responseJSON: transport.responseJSON
                };
               
                if (this.status >= 200 && this.status <= 299) {
                    exposeResponse.responseJSON.result.statusCode = this.status
                    if (isSuccess()) {
                        dfd.resolve(exposeResponse);
                    } else {
                        // transfrom error
                        exposeResponse.responseJSON = __errorBackendResponse(transport.responseJSON);
                        dfd.resolve(exposeResponse);
                    }
                } else if (this.status == 401) {
                   
                    exposeResponse.responseJSON = __errorCAAResponse(transport.responseJSON);
                    dfd.reject(exposeResponse);
                } else {
                    exposeResponse.responseJSON = __errorEdgeResponse(transport.responseJSON);
                    dfd.reject(exposeResponse);
                }
            }

            function isSuccess() {
                if (transport.getResponseHeader(KKPES.Constant.HEADER_COMPLETE_STATUS) == "true") {
                    return true;
                }

                return false;
            }
        };

        // xhr.ontimeout = function (e) {
        //     console.log("285")
        //     console.log(e)

        //     console.log("288")
        //     console.log(dfd)
        //     dfd.resolve(e);

        // };


        sendRequest();

        function sendRequest() {
            xhr.send(method === "GET" ? null : contentString, true);
        }

        return dfd.promise();
    }

    function checkHttpStatus(resp) {
        if (resp === 404 || resp === 500) {
            return false;
        }
        return true;
    }

    function isCallSuccess() {
        return;
    }

    function isJSON(str) {
        return KKPES.Validators.isJSON(str);
    }

    function addRequestHeaders(xhr) {
        for (var headerName in headers) {
            var headerValue = headers[headerName];
            xhr.setRequestHeader(headerName, headerValue.toString());
        }
    }

    function __errorBackendResponse(errResponse) {
        var http_body = errResponse.error_response;
        var error_respone = { result: http_body };
        return error_respone;
    }

    function __errorCAAResponse(errResponse) {
        var http_body = errResponse.error_response;
        var error_respone = { result: http_body };

        return error_respone;
    }

    function __errorEdgeResponse(errResponse) {
        var error_respone = { result: errResponse.error_response };
        return error_respone;
    }

    function __getFirstHeaderByNameNoCase(name) {
        for (var headerName in headers) {
            if (headerName.toLowerCase() === name.toLowerCase()) {
                return { name: headerName, value: headers[headerName] };
            }
        }

        return { name: null, value: null };
    }
};

window.KKPESResourceRequest = KKPES.ResourceRequest;
