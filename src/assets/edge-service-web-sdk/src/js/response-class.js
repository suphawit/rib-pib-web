__KKPES.Response = KKPESClass.create({
    invocationContext: null,
    status: -1,
    errorCode: null,
    errorMsg: null,
    responseText: "",
    responseJSON: "",
    initialize: function(transport, invocationContext) {
        console.log("-------------------");
        /*jshint strict:false*/
        this.responseHeaders = {};
        if (transport !== null && typeof transport.status !== "undefined") {
            this.status = transport.status || 200;
            this.responseHeaders = {};

            try {
                this.responseText = WLJSX.String.interpret(
                    transport.responseText
                );
            } catch (e) {}

            try {
                this.responseJSON = WLJSX.String.evalJSON(
                    transport.responseText,
                    true
                );
            } catch (e) {}

            if (
                typeof transport.responseJSON !== "undefined" &&
                transport.responseJSON !== null
            ) {
                this.errorCode = transport.responseJSON.errorCode;
                if (
                    typeof transport.responseJSON.error !== "undefined" &&
                    transport.responseJSON.error !== null
                ) {
                    this.errorMsg = transport.responseJSON.error;
                } else {
                    this.errorMsg = transport.responseJSON.errorMsg;
                }
            }

            if (typeof transport.getAllResponseHeaders === "function") {
                var responseHeadersString = transport.getAllResponseHeaders();
                this.responseHeaders = WLJSX.String.parseResponseHeaders(responseHeadersString);
            }
        }
        this.invocationContext = invocationContext;
    },

    getHeaderNames: function() {
        /*jshint strict:false*/

        var headerNames = [];
        for (var headerName in this.responseHeaders) {
            if (true) {
                // thanks jshint
                headerNames.push(headerName);
            }
        }
        return headerNames;
    },

    getAllHeaders: function() {
        /*jshint strict:false*/

        return this.responseHeaders;
    },

    getHeader: function(name) {
        /*jshint strict:false*/
        if (name === null || typeof name === "undefined") {
            return null;
        }

        return this.responseHeaders[name];
    }
});
