import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Constants } from '../../../share/service/constants';
import { TranslateService } from 'ng2-translate';
//require("!style-loader!css-loader!sass-loader!./pib-base.scss");
import { PreloadService, ILoader } from '../../../share/service/preload.service';
import { Breadcrumb } from '../../../share/component/breadcrumb/breadcrumb.component';
import { PermissionService, PermissionMainMenu, PermissionChangeRoute } from '../../../share/service/permission.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { GetinformationService } from "../../../share/service/getInformation.service";
import { Subscription } from 'rxjs/Subscription';
import { IsLoginService } from '../../../share/service/islogin.service';
declare var ENV

if (ENV === 'development') {
    require("!style-loader!css-loader!sass-loader!./scss/dev.scss");
} else {
    require("!style-loader!css-loader!sass-loader!./scss/prod.scss");
}

@Component({
    selector: 'main-app',
    template: `
                <userAgentInfo (info)="thisUserAgent($event)"></userAgentInfo>
                <main-menu-pib></main-menu-pib>
                <div class="container-fluid content-top">
                    <router-outlet></router-outlet>
                </div>
                <footer-pib></footer-pib>
            `
})
export class PIBWebComponent {

    loader: ILoader;
    public currentLink: string;
    private breadCrumbData = [];
    private breadcrumb: Breadcrumb;
    private breadcrumbShow: boolean = false;
    private subscription: Subscription;

    constructor(private preload: PreloadService, private router: Router,
        private permissionService: PermissionService, private Constants: Constants,
        private permissionMainMenu: PermissionMainMenu,
        private permissionChangeRoute: PermissionChangeRoute,
        private translate:TranslateService,
        private location: Location,
        private idle: Idle, private keepalive: Keepalive,
        private getinformationService: GetinformationService,
        private isLoginService:IsLoginService
    ) {


         // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(1140);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(60);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        //idle.onIdleEnd.subscribe(() => { this.messageModal.hide(); });
        idle.onTimeout.subscribe(() => {
            //donot remove use alert
            alert(this.translate.instant('label.sessionTimeout'));

            this.permissionService.logoutPIB().then((result)=>{
                this.permissionService.logoutSession().then((result) => {
                }, (error) => { });
                top.location.href = this.Constants.PIB_LOGOUT_URL;
            }, (error)=>{
                top.location.href = this.Constants.PIB_LOGOUT_URL;
            })
        });
        idle.onIdleStart.subscribe(() => { /*donoting*/ });
        idle.onTimeoutWarning.subscribe((countdown) => { /*donoting*/ });




        this.loader = this.preload.loader;

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        this.breadcrumb = {
            input: {
                data: [
                    { name: 'lbl.banking', menuCode: "MY_ACCOUNTS" },
                    { name: 'lbl.fundTransfer', menuCode: 'FUND_TRANSFER' }
                ],
                style: this.Constants.STYLE_PIB_WEB,
                selected: ""
            }
        };
    }

    ngOnInit(): void {
        this.currentLink = this.permissionChangeRoute.getMenuCodeByPath(this.location.path());
        this.permissionChangeRoute.ChangeMenuEvent.subscribe(menuCode => this.menuCodeChanged(menuCode));
        this.isLoginService.multipleLoginEvent.subscribe(status => this.logOutMultipleLogin(status));
        this.menuCodeChanged(this.currentLink);
        this.breadcrumShowInit();
    }

    ngOndestroy() {
        this.subscription.unsubscribe();
    }

    private breadcrumShowInit(){
        this.subscription = this.permissionService.PermssionChangeEvent
            .subscribe((islogin)=>{
                if(islogin){
                    this.breadcrumbShow = true;
                }
            })
    }

    private logOutMultipleLogin(status){
        if(status){
            //donot remove use alert
            alert(this.translate.instant('label.sessionTimeout'));

            this.permissionService.logoutSession().then((result) => {
            }, (error) => { });
            top.location.href = this.Constants.PIB_LOGOUT_URL;
       }
        
    }


    // menuCodeChanged(menuCode) {
    //     if (menuCode === undefined) {
    //         menuCode = "HOME";
    //     }

    //     let prefix;

    //     let whitelist = {
    //         'FUND_TRANSFER':true,
    //         'account-activate':true,
    //         'forgotUserName':true,
    //         'PAY_BILL':true
    //     }

    //     let menuCodeSplit = menuCode.split('.')[0];
    //     let menuCodeSplitSub = menuCode.split('.')[1];

    //     //using for clear data in breadcrumb
    //     this.breadCrumbData = [];
    //     this.breadCrumbData = this.checkParentCode(menuCodeSplit, this.breadCrumbData);

    //     if (this.permissionService.getIsLogin()) {
    //         if (this.Constants.FIRST_PAGE_CODE_AF_LGN != menuCodeSplit) {
    //             prefix = { name: { en: "Banking", th: "ธนาคาร" }, menuCode: this.Constants.FIRST_PAGE_CODE_AF_LGN_PIB_W };
    //             this.breadCrumbData.push(prefix);
    //         }

    //     } else {
    //         prefix = { name: { en: "Banking", th: "ธนาคาร" }, menuCode: this.Constants.FIRST_PAGE_CODE_BF_LGN_PIB_W };
    //         this.breadCrumbData.push(prefix);

    //     }

    //     this.breadcrumb.input.data = this.breadCrumbData.reverse();
    // }


  menuCodeChanged(menuCode) {

        if(menuCode === undefined){
            menuCode = "HOME"
        }
        let prefix;
        
        let whitelist = {
            'FUND_TRANSFER':true,
            'account-activate':true,
            'forgotUserName':true,
            'PAY_BILL':true,
            'QR_GENERATOR': true
        }
           
       
        let menuCodeSplit = menuCode.split('.')[0];
        let menuCodeSplitSub = menuCode.split('.')[1];

        //using for clear data in breadcrumb
        this.breadCrumbData = [];
        this.breadCrumbData = this.checkParentCode(menuCodeSplit, this.breadCrumbData);
        if (this.permissionService.getIsLogin()) {
  
            if(this.Constants.FIRST_PAGE_CODE_AF_LGN != menuCodeSplit){
                      prefix = { name: { en: "Banking", th: "ธนาคาร" }, menuCode: this.Constants.FIRST_PAGE_CODE_AF_LGN_PIB_W, 'isClick':true};
                this.breadCrumbData.push(prefix);
            }
        } else {
                prefix = { name: { en: "Banking", th: "ธนาคาร" }, menuCode: this.Constants.FIRST_PAGE_CODE_BF_LGN_PIB_W,'isClick':true };
                this.breadCrumbData.push(prefix);
     
        }
        let breadcrumbReverse = [];
            breadcrumbReverse =  [...this.breadCrumbData].reverse();
        if(menuCodeSplitSub !== undefined && !whitelist[menuCodeSplit]){ 
            prefix = { name: {en:this.translate.instant(this.Constants.BREAD_CRUMB_MAPPING[menuCode]),th:this.translate.instant(this.Constants.BREAD_CRUMB_MAPPING[menuCode])}, 'menuCode': menuCodeSplitSub ,'isClick':false  };
           breadcrumbReverse.push(prefix);
     
        }
        
        //force isClick = false for last order list in breadcrumb, because no need to click
        breadcrumbReverse[breadcrumbReverse.length - 1]['isClick'] = false;
        this.breadcrumb.input.data = breadcrumbReverse;

    }


    checkParentCode(menuCode, datatmp) {
        menuCode = menuCode.split('.')[0];
        

        let allMenuList;
        let pushData;
        let RIBWebComponent = this;
        let data = datatmp;

        if (this.permissionService.getIsLogin()) {
            allMenuList = this.permissionMainMenu.getMainMenuList();
            if(!this.permissionService.getIsTermAndCon()){
                allMenuList.push(this.Constants.BREAD_CRUMB_FIX_NAME);
            }
            
        } else {
            allMenuList = [];
        }

        allMenuList.forEach(function (item, index) {
            
            if (item.menuCode === menuCode) {

                    pushData = RIBWebComponent.checkIsPage(menuCode,item);// { name: {en:item.menuEn,th:item.menuTh}, menuCode: menuCode};
                    data.push(pushData);
                if (item.parentCode != null) {
                    return RIBWebComponent.checkParentCode(item.parentCode, data)
                
                }
            }
       });

        return data;
    }


        //check can click in Breadcrumb
    checkIsPage(menuCode, item){
        let isPage = false;
        let  pathFromRoute = this.permissionMainMenu.getMenuListFromRoute()[menuCode];
        if(pathFromRoute !== undefined){
            isPage = true;
        }
        
        return { name: {en:item.menuEn,th:item.menuTh}, menuCode: menuCode, 'isClick':isPage};   
    
    }

    thisUserAgent(event){
        this.getinformationService.userAgentInfo = event;
        
        
    }

}