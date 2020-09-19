import { Injectable } from '@angular/core';
import { PermissionMainMenu } from '../../share/service/permission.service';
import { Constants } from '../../share/service/constants';

@Injectable()
export abstract class GenerateMenuList {
    private routerData;
    public abstract menuLogin;
    public abstract setMenuList();

    constructor(public permissionMainMenu: PermissionMainMenu) {
    }

    public mainMenuObj(arr, parent) {
        let out = [];

        for (let i in arr) {
            if (arr[i].parentCode == parent) {
                let children = this.mainMenuObj(arr, arr[i].menuCode);
                if (children.length) {
                    arr[i].children = children;
                }

                out.push(arr[i]);
            }
        }

        return out;
    }

    public allDescendants(node, allItemAttray) {
        var mainMenuRibWebService = this;
        let children = node.children;
        let parent = node;
        let itemArray = [];

        if (children != undefined) {
            children.forEach(function (item) {
                delete item["component"];
                item.path = parent.path + "/" + item.path
                //
                mainMenuRibWebService.allDescendants(item, allItemAttray);
            });

            allItemAttray.push(node);
        } else {
            if (node != undefined) {
                allItemAttray.push(node);
            }
        }

        return itemArray;
    }

    public setRouterData(r) {
        this.routerData = r;
    }
    public getRouterData() {
        return this.routerData;
    }

    // This function stored recurive menu with children;
    public setMenuListFromRoute(routerList) {
        this.permissionMainMenu.setMenuListFromRoute(routerList);
    }
}

@Injectable()
export class MainMenuRibWebService extends GenerateMenuList {
    private beforeLoginMenu;
    public menuLogin;
    public menuListFromRoute;
    // public tmpObjsss: Object[];

    constructor(public _PermissionMainMenu: PermissionMainMenu,
    public _Constants: Constants) {
        super(_PermissionMainMenu)
        // this.tmpObjsss = [];
    }

    public setMenuList() {
        let tmpMenuObj = this.getRouterData();
        let newObj = [];
        var mainMenuRibWebService = this;
        let allItemAttray = [];
        let keyItemArray = [];

        tmpMenuObj.forEach(function (item, index) {
            delete item["component"];
            if (item.children != undefined) {
                mainMenuRibWebService.allDescendants(item, allItemAttray);
            }

            allItemAttray.push(item);
        });

        allItemAttray.forEach(function (item, index) {
            let menuCodes = item.data

            if (menuCodes != undefined) {
                newObj[menuCodes.menuCode] = [];
                newObj[menuCodes.menuCode] = item.path
            }
        });

        keyItemArray.push(newObj);

        this.setMenuListFromRoute(keyItemArray);
    }

    getMainMenuList(promotionUrl) {
        return this.beforeLoginMenu = [
            {
                "menuCode": "account-activate-refcode1",
                "menuEn": "Account Activation",
                "menuTh": "สร้างบัญชีผู้ใช้งาน",
                "icon": "demo-icon icon-menu-accountactivation"
            },
            {
                "menuCode": "forgotResetPassword",
                "menuEn": "Forgot/Reset Password",
                "menuTh": "ลืม/รีเซ็ทรหัสผ่าน",
                "icon": "demo-icon icon-menu-forgotresetpassword2"
            },
            {
                "menuCode": "forgotUserName-refcode1",
                "menuEn": "Forgot Username",
                "menuTh": "ลืมชื่อผู้ใช้งาน",
                "icon": "demo-icon icon-menu-forgotusername2"
            },
            {
                "menuCode": promotionUrl,
                "menuEn": "Promotions",
                "menuTh": "ส่งเสริมการขาย",
                "icon": "demo-icon icon-menu-promotion"
            },
            {
                "menuCode": "SERVICES",
                "menuEn": "Services",
                "menuTh": "รายละเอียดบริการ",
                "icon": "demo-icon icon-menu-services"
            },
            {
                "menuCode": "FAQ",
                "menuEn": "FAQ",
                "menuTh": "คำถามที่พบบ่อย",
                "icon": "demo-icon icon-menu-faq"
            },
            {
                "menuCode": "Terms",
                "menuEn": "Terms and Conditions",
                "menuTh": "ข้อตกลงการใช้บริการ",
                "icon": "demo-icon icon-menu-termsandconditions"
            },
            {
                "menuCode": "LOCATEUS",
                "menuEn": "Locate Us",
                "menuTh": "สาขา/ช่องทาง",
                "icon": "demo-icon icon-menu-locate-us"
            },
            {
                "menuCode": "CONTRACTUS",
                "menuEn": "Contact Us",
                "menuTh": "ติดต่อเรา",
                "icon": "demo-icon icon-menu-contact-us2"
            }
        ];
    }

    getMainMenuAfterLogin() {
        let permissionMenu = this._PermissionMainMenu.getMainMenuList();
        let generateMenuList = this;
      
    //     permissionMenu.push({icon:"fa fa-barcode",menuCode:"MANAGE_BILLER_PROMTPAY",menuEn:"Manage Biller PromptPay"
    //    ,menuId:18,menuTh:"จัดการผู็รับชำระพร้อมเพย์",parentCode:"BILL_PAYMENT"});
    //
        let mainmenuObjs = [];
        permissionMenu.forEach(function (item, index) {
            if (item.parentCode == undefined) {
                item.children = generateMenuList.mainMenuObj(permissionMenu, item.menuCode);
                mainmenuObjs.push(item);
            }
        });

        this.menuLogin = permissionMenu;
        return mainmenuObjs;
    }
}

@Injectable()
export class MainMenuPibWebService extends GenerateMenuList {
    public menuLogin;
    private beforeLoginMenu;

    constructor(public permissionMainMenu: PermissionMainMenu) {
        super(permissionMainMenu);
        //  this.setMenuList();
    }

    getMainMenuList() {
        return this.beforeLoginMenu = [
            /* {
               "menuCode": "login",
               "menuEn": "Login",
               "menuTh": 'lbl.myAccount',
           },
           {
               label: 'lbl.myAccount',
               href: '/myaccount/summary',
               active_on_url: ["menu.activation"],
               icon: ''
           },
           {
               label: 'lbl.transfer',
               href: '/transfer',
               active_on_url: ["menu.activation"],
               icon: ''
           },
           {
               label: 'lbl.newsAndUpdate',
               href: 'http://www.kiatnakin.co.th/news-events.php',
               active_on_url: ["menu.activation"],
               icon: ''
           },
           {
               label: 'lbl.KKPromptPay',
               href: '/promptpay/prompt-pay-register',
               active_on_url: ["menu.activation"],
               icon: ''
           }*/
        ];
    }

    public setMenuList() {
        let tmpMenuObj = this.getRouterData();

        let newObj = [];
        var MainMenuPibWebService = this;
        let allItemAttray = [];
        let keyItemArray = [];

        tmpMenuObj.forEach(function (item, index) {
            delete item["component"];
            if (item.children != undefined) {
                MainMenuPibWebService.allDescendants(item, allItemAttray);
            }
            allItemAttray.push(item);
        });

        allItemAttray.forEach(function (item, index) {
            let menuCodes = item.data
            if (menuCodes != undefined) {
                newObj[menuCodes.menuCode] = [];
                newObj[menuCodes.menuCode] = item.path
            }
        });

        keyItemArray.push(newObj);

        this.setMenuListFromRoute(keyItemArray);
    }

    getMainMenuAfterLogin() {
        let permissionMenu = this.permissionMainMenu.getMainMenuList();
    //       permissionMenu.push({icon:"fa fa-barcode",menuCode:"MANAGE_BILLER_PROMTPAY",menuEn:"Manage Biller PromptPay"
    //    ,menuId:18,menuTh:"จัดการผู็รับชำระพร้อมเพย์",parentCode:"BILL_PAYMENT"});
    //
        let generateMenuList = this;
        let mainmenuObjs = [];

        permissionMenu.forEach(function (item, index) {
            if (item.parentCode == undefined) {
                item.children = generateMenuList.mainMenuObj(permissionMenu, item.menuCode);
                mainmenuObjs.push(item);
            }
        });

        this.menuLogin = permissionMenu;
        return mainmenuObjs;
    }
}

@Injectable()
export class MainMenuPibMobileService extends GenerateMenuList {
    public menuLogin;
    private beforeLoginMenu;

    constructor(public _PermissionMainMenu: PermissionMainMenu) {
        super(_PermissionMainMenu);
        // this.setMenuList();
    }

    getMainMenuList() {
        return this.beforeLoginMenu = [];
    }

    public setMenuList() {
    }

    // Render mobile menu after login (1 level of menu only)
    getMainMenuAfterLogin() {
        let route = this.getRouterData();
        let generateMenuList = this;
        this.setMenuListFromRoute(route);
        let permissionMenu = this._PermissionMainMenu.getMainMenuList();
      
        let mainmenuObjs = [];
        permissionMenu.forEach(function (item, index) {
            if (item.parentCode == undefined) {
                    item.children = generateMenuList.mainMenuObj(permissionMenu, item.menuCode);
                    mainmenuObjs.push(item);
                }
        });
        

        this.menuLogin = permissionMenu;
        return mainmenuObjs;
    }
}