var __KKPESErrorCode = {
    UNEXPECTED_ERROR: "UNEXPECTED_ERROR",
    API_INVOCATION_FAILURE: "API_INVOCATION_FAILURE",
    USER_INSTANCE_ACCESS_VIOLATION: "USER_INSTANCE_ACCESS_VIOLATION",
    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED",
    DOMAIN_ACCESS_FORBIDDEN: "DOMAIN_ACCESS_FORBIDDEN",

    // Client Side Errors
    UNRESPONSIVE_HOST: "UNRESPONSIVE_HOST",
    LOGIN_FAILURE: "LOGIN_FAILURE",
    REQUEST_TIMEOUT: "REQUEST_TIMEOUT",
    PROCEDURE_ERROR: "PROCEDURE_ERROR",
    UNSUPPORTED_VERSION: "UNSUPPORTED_VERSION",
    UNSUPPORTED_BROWSER: "UNSUPPORTED_BROWSER",
    DISABLED_COOKIES: "DISABLED_COOKIES",
    CONNECTION_IN_PROGRESS: "CONNECTION_IN_PROGRESS",
    AUTHORIZATION_FAILURE: "AUTHORIZATION_FAILURE",
    CHALLENGE_HANDLING_CANCELED: "CHALLENGE_HANDLING_CANCELED",
    MINIMUM_SERVER: "MINIMUM_SERVER"
};

__KKPES.prototype.ErrorCode = __KKPESErrorCode;
KKPES.ErrorCode = __KKPESErrorCode;