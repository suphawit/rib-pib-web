import { Idle } from '@ng-idle/core';
import { IsLoginService } from './islogin.service';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { MfpApi } from '../mfp/mfp-api.service';

declare var KKPES;

@Injectable()
export class PermissionMainMenu {
    private listAction;
    private listMenu: any;
    private keyMenu: Object[];
    private menuListFromRoute;
    private listProduct;

    constructor() {
        this.menuListFromRoute = "";
    }

    setMainMenuList(list: any) {
        this.listMenu = list;
    }

    // This function return list of menu set by RBAC(Afterlogin)
    getMainMenuList() {
        let listmenu = this.listMenu;
        return listmenu;
    }
    setMenuActionList(list: any) {
        this.listAction = list;
    }

    getMenuActionList() {
        return this.listAction;
    }

    getMainMenuKey() {
        let keymenu = this.keyMenu;

        if (keymenu == undefined && this.getMainMenuList() != undefined) {
            keymenu = [];

            this.getMainMenuList().forEach(function (item, index) {
                keymenu[item.menuCode] = true;
            });
        }

        this.keyMenu = keymenu;
        return this.keyMenu;
    }

    getMenuListFromRoute() {
        if (this.menuListFromRoute != undefined || this.menuListFromRoute != "") {
            return this.menuListFromRoute[0];
        }

        return false;
    }

    setMenuListFromRoute(routerList) {
        this.menuListFromRoute = routerList;
    }

    //set rbac product allow list and set product id to key obj;
    setProductAllowList(list: any): void {
        this.listProduct = list;
    }

    getProductAllowList() {
        return this.listProduct;
    }



}
import { Constants } from './constants';
import { Subject } from "rxjs/Rx";

@Injectable()
export class PermissionService {
    private isLogin: boolean;
    private menuName: string;
    private currentActionCode;
    private userData: any = null;
    private isTermAndCon: boolean;
    private isChallenged: boolean;
    private isChallengeSuccess: boolean;
    private isFailChallengeStream = new Subject<any>();
    public preparedLogout: boolean;

    private _tokenId: string;

    @Output() PermssionChangeEvent: EventEmitter<any> = new EventEmitter(true);
    @Output() logoutEvent: EventEmitter<any> = new EventEmitter(true);

    constructor(private isLoginService: IsLoginService, private idle: Idle,
        private permissionMainMenu: PermissionMainMenu, private constants: Constants,
        private mfpApi: MfpApi,
    ) {
        this.isLogin = false;
        this.isChallenged = false;
        this.isChallengeSuccess = false;
    }

    getIsFailChallenge() {
        return this.isFailChallengeStream;
    }

    setIsFailChallenge(returnChallenge) {
        this.isFailChallengeStream.next(returnChallenge);
    }

    setIsTermAndCon(status: boolean) {
        this.isTermAndCon = status;
    }
    getIsTermAndCon() {
        return this.isTermAndCon;
    }

    setIsChallenged(status: boolean) {
        this.isChallenged = status;
    }
    getIsChallenged() {
        return this.isChallenged;
    }

    setIsChallengedSuccess(status: boolean) {
        this.isChallengeSuccess = status;
    }
    getIsChallengedSuccess() {
        return this.isChallengeSuccess;
    }

    getShortcutPermission(menuCode) {
        let allMenuCode = this.permissionMainMenu.getMainMenuKey()[menuCode];

        if (allMenuCode === undefined || allMenuCode === "undefined") {
            allMenuCode = false;
        }

        return allMenuCode;
    }

    /**Method: isProductAllow
     * Note: This method using for check product are allow typye
     */
    isProductAllow(productID: any, allowType: any) {
        //productid = 0 (case externalBank) 

        if (productID == 0 || productID == null || productID == "") {
            return true;
        }

        try {
            let productAllowList = this.permissionMainMenu.getProductAllowList();
            let allowListName = productAllowList[allowType];
            let isAllow = allowListName.indexOf(Number(productID))
            if (isAllow === -1) {
                return false
            }
            return true
        }
        catch (e) {
            console.error((<Error>e).message);//conversion to Error type
            return false
        }
    }

    getIsLogin() {
        return this.isLogin;
    }
    setIsLogin(status: boolean) {
        this.PermssionChangeEvent.emit(status);
        this.isLogin = status;
        this.isLoginService.setIsLogin(this.isLogin);
        this.preparedLogout = status;
        
    }



    setIsPrivate(status: boolean) {
        this.isLoginService.setIsPrivate(status);
    }

    setActionCode(actionCode) {
        this.currentActionCode = JSON.parse(JSON.stringify(actionCode));
    }
    getActionCode() {
        if (this.currentActionCode) {
            return this.currentActionCode;
        }
        return false;
    }

    setUserData(value) {
        this.userData = value;
    }
    getUserData() {

        return this.userData;
    }

    setMenuName(menuName: string) {
        this.menuName = menuName;
    }
    getMenuName() {
        return this.menuName;
    }

    destroyActionCode() {
        this.currentActionCode = "";
    }

    destroySession() {
        this.idle.stop();
        this.setIsLogin(false);
        this.setIsChallenged(false);
        this.setIsChallengedSuccess(false);
        this.setIsPrivate(false);
    }

    logoutSession() {

        let that = this;
        var promise = new Promise((resolve, reject) => {
            this.logoutEvent.emit(true);
            this.preparedLogout = false;
            this.logOffNotification().then((result) => {
                KKPES.Client.logout(this.constants.Auth_REALM_LOGIN).then(function () {
                    that.destroySession();
                    
                    resolve(true);
                }, function (response) {
                    reject(response);
                });
                //    return promise;
            }, function (error) {
                resolve(true);
            });
        });
        //  alert("eee==="+this.isLoginService.getIsLongPollingKick());
        return promise;

    }

    private logOffNotification(): any {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'act_notification_logoff',
                params: {},
                procedure: "logOffNotification"
            }

            if (!this.isLoginService.getIsLongPollingKick()) {
                this.mfpApi.invokeNotiProcedure(obj).then((result) => {
                    resolve(true);
                }, function (error) {

                    reject(error);
                });
            } else {
                resolve(true);
            }
        });
        return promise;
    }

    logoutPIB(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                },
                actionCode: 'ACT_RBAC_LOGOUT_BY_TOKEN',
                procedure: 'logoutByTokenProcedure'
            }
            this.mfpApi.invokeProcedure(obj, { isHideLoader: true }).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    timeoutSession() {
        this.destroySession();
        // this.permissionChangeRoute.changeRoute("HOME")
    }

    removeTermAndCondFromMenuList() {
        let menuList = this.permissionMainMenu.getMainMenuList();
        let acceptTermAndCondMenuCode = this.constants.BREAD_CRUMB_FIX_NAME.menuCode;
        let iTarget = menuList.findIndex(x => x.menuCode === acceptTermAndCondMenuCode);

        if (iTarget > -1) {
            this.permissionMainMenu.setMainMenuList(menuList.splice(0, iTarget));
        }
    }

    getShortcutActionCodePermission(menuCode, actionCode) {
        let permission = this.permissionMainMenu.getMenuActionList();
        let isPermission = false;
        try {
            isPermission = permission[menuCode][actionCode];
            if (isPermission == undefined) {
                isPermission = false;
            }
        }
        catch (e) {
            // console.error((<Error>e).message);//conversion to Error type
            isPermission = false;
        }
        return isPermission;

    }

    private _activeMenuName: string;
    get activeMenuName(){
        return this._activeMenuName;
    }
    set activeMenuName(menuName){
        this._activeMenuName = menuName;
    }
    get tokenId(): string {
        return this._tokenId;
    }

    set tokenId(value: string) {
        this._tokenId = value;
    }
}

@Injectable()
export class PermissionAction {
    constructor(public mfpApi: MfpApi) { }

    getActionListByMenu(menuName: string) {
        let p = new Promise((resolve, reject) => {
            let objResquest = {
                actionCode: "action",
                params: {
                    menuName: menuName
                },
                procedure: "getMenuList"
            };

            this.mfpApi.invokeProcedure(objResquest).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return p;
    }
}

import { Router } from '@angular/router';

@Injectable()
export class PermissionChangeRoute {
    public prevUrl: string;
    private styleRoute: any;
    public targetAction: string;
    private channelRoute: string;
    public storeActionPermission: any;

    @Output() ChangeMenuEvent: EventEmitter<string> = new EventEmitter();

    constructor(public router: Router,
        private permissionMainMenu: PermissionMainMenu,
        public permissionService: PermissionService,
        public constants: Constants) {

        this.storeActionPermission = [];

    };

    public getActionListByMenu(menuName: string) {
        // Clear ActionCode
        let menuActionList = this.permissionMainMenu.getMenuActionList();
        this.permissionService.destroyActionCode();

        let p = new Promise((resolve, reject) => {
            if (!this.permissionService.getIsLogin()) {

                resolve(true);
            } else {
                let menuNameSplit: any;
                menuNameSplit = menuName.split('.')[0];
                this.permissionService.setActionCode(menuActionList[menuNameSplit] || false);
                resolve(menuActionList[menuNameSplit]);
            }
        });

        return p;
    }

    changeRoute(menuName: string, opt?: any) {
        this.permissionService.setMenuName(menuName);

        this.getActionListByMenu(menuName).then((result) => {
            if (this.channelRoute === this.constants.MENU_MOBILE) {
                this.pushNaviGate(menuName);
            } else {
                this.routerNaviGate(menuName, opt);
            }

            this.ChangeMenuEvent.emit(menuName);
        }, function (error) {
            // alert("changeRoute fail");
        });
    }

    getMenuCodeByPath(path: string): string {
        let menuListFromRoute = this.permissionMainMenu.getMenuListFromRoute();

        if (path !== "") {
            // path =  path.replace('/', '');
            path = path.substring(1);
            let pathSplit = path.split('/');
            path = pathSplit[0];
            for (var value in menuListFromRoute) {

                if (menuListFromRoute[value] == path) {

                    return value;
                }
            }

            return "";
        }
    }

    private routerNaviGate(navigateName, navagateOption) {
        let menuListFromRoute = this.permissionMainMenu.getMenuListFromRoute();

        if (menuListFromRoute == undefined) {
            return false;
        }
        let href: string = menuListFromRoute[navigateName];

        if (href == undefined) {
            href = "login";
        }
        
        // @180418 reload current route(same url)
        let navigationExtras = navagateOption || {};

        this.router.navigate([href], navigationExtras);
    }

    pushRoute(menuName: string) {
        this.getActionListByMenu(menuName).then((result) => {

            this.pushNaviGate(menuName);
        }, function (error) {
   
        });
    }

    private pushNaviGate(navigateName) {
        let menuListFromRoute = this.permissionMainMenu.getMenuListFromRoute();
        let href: string = menuListFromRoute[navigateName].component;

        this.styleRoute.push(href);
    }

    setChannelRoute(channelRoute: string) {
        this.channelRoute = channelRoute;
    }

    setRouteStyle(style) {
        this.styleRoute = style;
    }


}
