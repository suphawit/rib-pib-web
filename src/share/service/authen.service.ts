import { Constants } from './constants';
import { UtilService } from './util.service';
import { Dateservice } from './date.service';
import { MfpApi } from '../mfp/mfp-api.service';
import { PermissionService, PermissionMainMenu } from './permission.service';
import { TranslateService } from 'ng2-translate/src/translate.service';

// Declare worklight function
//declare var WL;
declare var KKPES;

export abstract class AuthenticationService {

    private authRealm: string;
    private systemCode: string;
    private channelID: string;
    private isLoginWithform: boolean;
    private isHandleSuccess: boolean;
    private isFirstCallAuthen: boolean;
    private userLoginChallengeHandler: any;

    private credential: any;

    constructor(
        public dateservice: Dateservice,
        public constants: Constants,
        public permissionService: PermissionService,
        public utilService: UtilService,
        public permissionMainMenu: PermissionMainMenu,
        public mfpApi: MfpApi,
        public translateService: TranslateService,
    ) {
        this.systemCode = mfpApi.systemCode;
        this.channelID = mfpApi.channelID;
        this.authRealm = this.constants.Auth_REALM_LOGIN;
        this.isLoginWithform = false;
        this.isHandleSuccess = false;
        this.isFirstCallAuthen = false;
    }

    public abstract failChallenge(result);
    public abstract successChallenge(result);
    public abstract timeoutChallenge();

    init() {
        let permisService = this.permissionService;
        let authenticationService = this;
        //   //  this.userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(this.authRealm);

        //     // Check and clear user session
        //     this.userLoginChallengeHandler.handleChallenge = function (challenge) {



        //         if (authenticationService.isLoginWithform === true) {
        //             let response = challenge.responseStatus;

        //             if (response != undefined) {
        //                 let responseCode = response.responseCode;
        //                 // this.valueChange.emit(challenge);

        //                 if (responseCode !== authenticationService.constants.RESP_CODE_SUCCESS) {
        //                     authenticationService.failChallenge(response);
        //                 }
        //             }

        //             if (Object.keys(challenge).length === 0) {
        //                 authenticationService.timeoutChallenge();
        //             }
        //         } 

        //         permisService.setIsChallenged(true);
        //         return challenge;
        //     };

        //     this.userLoginChallengeHandler.handleSuccess = function (data) {
        //         permisService.setIsChallenged(false);
        //         if (authenticationService.isLoginWithform === true) {
        //             console.info("userLoginChallengeHandler : handleSuccess")

        //             permisService.setIsChallengedSuccess(true);
        //             if (!authenticationService.isFirstCallAuthen) {
        //                 authenticationService.isFirstCallAuthen = true;
        //                 authenticationService.getMenuList(data);
        //             }
        //         } else {
        //             KKPES.Client.logout(authenticationService.authRealm).then(
        //                 function () {

        //                 },
        //                 function (response) {

        //                 });
        //         }
        //     };

        //     this.userLoginChallengeHandler.handleFailure = function (error) {

        //         permisService.setIsChallenged(false);

        //         if (error.failure !== null) {
        //             if (error.failure == "Account blocked") {

        //             }
        //             alert(error.failure);
        //         } else {
        //             alert("Failed to login.");
        //         }
        //     };
    }

    clearSessionLogin() {

        let permisService = this.permissionService;
        let authenticationService = this;
        KKPES.Client.obtainAccessToken()
            .then(
                function (accessToken) {
                    // alert("token")
                    if (permisService.getIsChallengedSuccess() !== true) {
                        KKPES.Client.logout().then(
                            function () {
                                // alert("logout success")
                            },
                            function (response) {
                                // failed
                            });
                    }
                });
    }

    clearSessionToken(token, language) {
        let permisService = this.permissionService;
        let authenticationService = this;
        this.credential = {
            'token': token,
            'language': language
        }



        KKPES.Client.logout(authenticationService.authRealm).then(
            function () {
                //    alert("logout success")
                permisService.setIsChallenged(false);
                authenticationService.loginByToken(token, language)
            },
            function (response) {
                //   alert("logout fail")
                permisService.setIsChallenged(false);
                authenticationService.loginByToken(token, language)
                // failed
            });

    }

    clearSessionTokenMobile(token, language) {
        let permisService = this.permissionService;
        let authenticationService = this;

        KKPES.Client.obtainAccessToken(authenticationService.authRealm)
            .then(
                function (accessToken) {

                    if (permisService.getIsChallengedSuccess() !== true) {
                        KKPES.Client.logout(authenticationService.authRealm).then(
                            function () {
                                permisService.setIsChallenged(false);
                                authenticationService.loginByToken(token, language)
                            },
                            function (response) {
                                //             permisService.setIsChallenged(false);
                                //  authenticationService.loginByToken(token, language)
                                //failed
                            });
                    }
                },
                function (error) {


                });
        permisService.setIsChallenged(false);
        authenticationService.loginByToken(token, language)
    }

 //get userinfo after authentication success
 getPIBUserInfo(lang, token) {
    let authenticationService = this;
    let utilService = this.utilService;
    let adapter = {adapter:'authenticationAdapter'};
    let currentDateTime = new Date();
    let objRequest = {
        actionCode: "ACT_GET_CUST_INFO",
        params: {
            platform: {
                deviceType: 'WEB',
                deviceToken: utilService.getDeviceUUID(),
                deviceName: utilService.getBrowserVersion().name,
                deviceModel: utilService.getBrowserVersion().name,
                osname: utilService.getBrowserVersion().name,
                osversion: utilService.getBrowserVersion().version,
                deviceUUID: utilService.getDeviceUUID(),
            },

            appVersion: this.constants.VER_PIB_WEB,
            language: lang,
            token: token,
            header: {
                transactionDateTime: currentDateTime.toISOString(),
                transactionDate: this.dateservice.getTransactionDate(),
                serviceName: "ACT_CODE_GET_CUST_INFO",
                systemCode: this.systemCode,
                referenceNo: this.dateservice.getReferenceNo(),
                channelId: this.channelID
            }

        },
        procedure: "getMenuListProcedure"
    }
    this.mfpApi.invokeProcedure(objRequest,adapter).then((result) => {
        let responseResult = result.responseJSON.result;
        if (responseResult.responseStatus.responseCode === authenticationService.constants.RESP_CODE_SUCCESS) {
            authenticationService.getMenuList(responseResult.value);
        } else {

            authenticationService.failChallenge(responseResult.responseStatus);
        }
    }, function (error) {
        authenticationService.failChallenge(error);
    });
}


    //get userinfo after authentication success
    getUserInfo(lang) {
        let authenticationService = this;
        let utilService = this.utilService;
        let adapter = {adapter:'authenticationAdapter'};
        let currentDateTime = new Date();
        let objRequest = {
            actionCode: "ACT_GET_CUST_INFO",
            params: {
                platform: {
                    deviceType: 'WEB',
                    deviceToken: utilService.getDeviceUUID(),
                    deviceName: utilService.getBrowserVersion().name,
                    deviceModel: utilService.getBrowserVersion().name,
                    osname: utilService.getBrowserVersion().name,
                    osversion: utilService.getBrowserVersion().version,
                    deviceUUID: utilService.getDeviceUUID(),
                },


                appVersion: this.constants.VER_RIB_WEB,
                language: lang,
                header: {
                    transactionDateTime: currentDateTime.toISOString(),
                    transactionDate: this.dateservice.getTransactionDate(),
                    serviceName: "ACT_CODE_GET_CUST_INFO",
                    systemCode: this.systemCode,
                    referenceNo: this.dateservice.getReferenceNo(),
                    channelId: this.channelID
                }

            },
            procedure: "getMenuListProcedure"
        }
        this.mfpApi.invokeProcedure(objRequest, adapter).then((result) => {
            let responseResult = result.responseJSON.result;
            if (responseResult.responseStatus.responseCode === authenticationService.constants.RESP_CODE_SUCCESS) {
                authenticationService.getMenuList(responseResult.value);
            } else {

                authenticationService.failChallenge(responseResult.responseStatus);
            }
        }, function (error) {
            authenticationService.failChallenge(error);
        });
    }




    // Get list from RBAC Process after login success
    getMenuList(data) {
        let permisService = this.permissionService;
        permisService.setIsPrivate(true);
        let permissionMainMenu = this.permissionMainMenu;
        let authenticationService = this;

        let objRequest = {
            actionCode: "ACT_RBAC_GET_MENU_ACTION",
            params: {

            },
            procedure: "getMenuListProcedure"
        }
        this.mfpApi.invokeProcedure(objRequest).then((result) => {
            let responseResult = result.responseJSON.result;
            if (responseResult.responseStatus.responseCode === authenticationService.constants.RESP_CODE_SUCCESS) {
                permisService.setIsLogin(true);


                let MenuList = result.responseJSON.result.value.rbacMenus;
                let actionCodeList = result.responseJSON.result.value.rbacActions;
                let productAllowList = result.responseJSON.result.value.rbacAllowAction;

                permissionMainMenu.setMainMenuList(MenuList);
                permissionMainMenu.setMenuActionList(actionCodeList);
                permissionMainMenu.setProductAllowList(productAllowList);

                permisService.setIsChallenged(true);
                console.log("-----------------")
                console.log(data)
                console.log("-----------------")
                permisService.setUserData(data)

                this.successChallenge(data);
            } else {

                authenticationService.failChallenge(responseResult.responseStatus);
            }
        }, function (error) {
            authenticationService.failChallenge(error);
        });
    }

    loginByUserNamePassword(user, pass, language) {
        let errorMsg = this.translateService.instant('error.system');
        let utilService = this.utilService;
        let permisService = this.permissionService;
        let authenticationService = this;
        let curLang = language;
        let currentDateTime = new Date();
        let objRequest = {
            actionCode: 'v1/login',
            procedure: 'verifyUser',
            params: {
                username: user,
                password: pass,
                realmId: "kkb_pwd",
                segmentId: "retail",
                platform: {
                    deviceType: 'WEB',
                    deviceToken: utilService.getDeviceUUID(),
                    deviceName: utilService.getBrowserVersion().name,
                    deviceModel: utilService.getBrowserVersion().name,
                    osname: utilService.getBrowserVersion().name,
                    osversion: utilService.getBrowserVersion().version,
                    deviceUUID: utilService.getDeviceUUID(),
                },

                appVersion: this.constants.VER_RIB_WEB,
                language: language,
                header: {
                    transactionDateTime: currentDateTime.toISOString(),
                    transactionDate: this.dateservice.getTransactionDate(),
                    serviceName: "RetailLoginByUsernameAndPassword",
                    systemCode: this.systemCode,
                    referenceNo: this.dateservice.getReferenceNo(),
                    channelID: this.channelID
                }
            }
        };


        this.isLoginWithform = true;
        this.isFirstCallAuthen = false;
       
            //   this.permissionService.setIsChallenged(true);
            KKPES.Client.login(objRequest).then(
                function (data) {
                    console.log("------data-----")
                    permisService.setIsChallengedSuccess(true);
                    authenticationService.getUserInfo(objRequest.params.language);
                },
                function (err) {

                    let responseCode = err.responseJSON.result.responseStatus.responseCode

                    if (responseCode == "RIB-E-REQ408") {
                        err.responseJSON.result.responseStatus.errorMessage = errorMsg
                        authenticationService.failChallenge(err.responseJSON.result.responseStatus);

                      }

                    if (responseCode !== authenticationService.constants.RESP_CODE_SUCCESS ) {
    
                        authenticationService.failChallenge(err.responseJSON.result.responseStatus);
                    }
                });
        
    }


    loginByToken(token, language): void {
        console.info('loginByToken working...');
      
        let utilService = this.utilService;
        let permisService = this.permissionService;
        let authenticationService = this;
        let curLang = language;
        let currentDateTime = new Date();
        let objRequest = {
            actionCode: 'v1/authenticationAdapter',
            procedure: 'ACT_LOGIN_BY_TOKEN',
            params: {
                token: token,
                cisID: token,
                platform: {
                    deviceType: 'WEB',
                    deviceToken: utilService.getDeviceUUID(),
                    deviceName: utilService.getBrowserVersion().name,
                    deviceModel: utilService.getBrowserVersion().name,
                    osname: utilService.getBrowserVersion().name,
                    osversion: utilService.getBrowserVersion().version,
                    deviceUUID: utilService.getDeviceUUID(),
                },
                appVersion: this.constants.VER_PIB_WEB,
                language: language,
                header: {
                    transactionDateTime: currentDateTime.toISOString(),
                    transactionDate: this.dateservice.getTransactionDate(),
                    serviceName: "RetailLoginByUsernameAndPassword",
                    systemCode: this.systemCode,
                    referenceNo: this.dateservice.getReferenceNo(),
                    channelID: this.channelID
                }
            }
        };


        this.isLoginWithform = true;
        this.isFirstCallAuthen = false;
       
            //   this.permissionService.setIsChallenged(true);
            KKPES.Client.loginByToken(objRequest).then(
                function (data) {
                    
                    // permisService.setIsChallengedSuccess(true);
                    // authenticationService.getMenuList(data.value);
                    // authenticationService.getPIBUserInfo(objRequest.params.language, token);
                    let responseResult = data.responseJSON.result;
                    if (responseResult.responseStatus.responseCode === authenticationService.constants.RESP_CODE_SUCCESS) {
                        permisService.setIsChallengedSuccess(true);
                        authenticationService.getPIBUserInfo(objRequest.params.language, token);
                    } else {

                        authenticationService.failChallenge(responseResult.responseStatus);
                    }
                },
                function (err) {
                    let responseCode = err.responseJSON.result.responseStatus.responseCode
                    if (responseCode !== authenticationService.constants.RESP_CODE_SUCCESS) {
                        authenticationService.failChallenge(err.responseJSON.result.responseStatus);
                    }
                });
    }


    // loginByToken(token, language): void {
    //     console.info('loginByToken working...');
    //     let utilService = this.utilService;
    //     //  let authenticationService = this;

    //     let obj = {
    //         actionCode: 'v1/authenticationAdapter',
    //         procedure: 'ACT_LOGIN_BY_TOKEN',
    //         params: {
    //             token: token,
    //             cisID: token,
    //             platform: {
    //                 deviceType: 'WEB',
    //                 deviceToken: utilService.getDeviceUUID(),
    //                 deviceName: utilService.getBrowserVersion().name,
    //                 deviceModel: utilService.getBrowserVersion().name,
    //                 osname: utilService.getBrowserVersion().name,
    //                 osversion: utilService.getBrowserVersion().version,
    //                 deviceUUID: utilService.getDeviceUUID(),
    //             },
    //             appVersion: this.constants.VER_PIB_WEB,
    //             language: language,
    //             header: {
    //                 transactionDate: this.dateservice.getTransactionDate(),
    //                 serviceName: "loginByUsernameAndPasswordProcedure",
    //                 systemCode: this.systemCode,
    //                 referenceNo: this.dateservice.getReferenceNo(),
    //                 channelID: this.channelID
    //             }
    //         }
    //     };

    //     this.isFirstCallAuthen = false;
    //     this.isLoginWithform = true;

    //     if (this.permissionService.getIsChallenged()) {
    //         this.userLoginChallengeHandler.submitChallengeAnswer(obj);
    //     } else {

    //         this.permissionService.setIsChallenged(true);
    //         KKPES.Client.login(this.authRealm, obj).then(
    //             function (data) {


    //                 //authenticationService.getMenuList(data);
    //             },
    //             function (response) {

    //             });
    //     }
    // }

    logout(): void {
  
        let permissionService = this.permissionService;

        KKPES.Client.logout(this.authRealm).then(
            function () {
                this.isHandleSuccess = false;
                permissionService.setIsChallenged(false);
                permissionService.setIsLogin(false);
                permissionService.setIsPrivate(false);
                location.reload();
            },
            function (response) {
                //   WL.Logger.debug("logout onFailure: " + JSON.stringify(response));
            });
    }
}
