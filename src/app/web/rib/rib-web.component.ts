import { Component, ViewChild, OnInit } from '@angular/core';
import { PreloadService, ILoader } from '../../../share/service/preload.service';
import { Constants } from '../../../share/service/constants';
import { Router, NavigationEnd } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { TranslateService } from 'ng2-translate';
import { MessageModalComponent } from '../../../share/component/modal-messages.component';
import { PermissionService, PermissionChangeRoute, PermissionMainMenu } from '../../../share/service/permission.service';
import { Breadcrumb } from '../../../share/component/breadcrumb/breadcrumb.component';
import { MainMenuRibWebService } from '../../../share/service/main-menu.service';
import { IsLoginService } from '../../../share/service/islogin.service';
import { Location } from '@angular/common';
import { GetinformationService } from "../../../share/service/getInformation.service";
declare var WLAuthorizationManager;
declare var ENV;


  if(ENV === 'development'){
    require("!style-loader!css-loader!sass-loader!./scss/dev.scss");
  }else{
    require("!style-loader!css-loader!sass-loader!./scss/prod.scss");
  }
    


@Component({
    selector: 'main-app',
    templateUrl: 'rib-web.template.html',
    providers: [MainMenuRibWebService]
})
export class RIBWebComponent implements OnInit {

    private breadcrumb: Breadcrumb;
    private breadCrumbData = [];
    public currentLink: string;


    loader: ILoader;
    lastPing?: Date = null;
    messageModalData: { title: string; body: string; size: string; config: any; action: any; };

    @ViewChild('messageModal') public messageModal: MessageModalComponent;

    constructor(
        private preload: PreloadService,
        private router: Router,
        private idle: Idle, private keepalive: Keepalive,
        private translate: TranslateService,
        private permissionService: PermissionService,
        private permissionChangeRoute: PermissionChangeRoute,
        private permissionMainMenu: PermissionMainMenu,
        private mainMenuRibWebService: MainMenuRibWebService,
        private Constants:Constants,
        private location:Location,
        private isLoginService:IsLoginService,
        private getinformationService: GetinformationService
    ) {

        this.messageModalData = {
            title: 'lbl.ConfirmLogout',
            body: 'msg.confirmLogout',
            size: 'md',
            config: { isShowOKBtn: false, isShowCancelBtn: false },
            action: {}
        };

        this.loader = this.preload.loader;

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });

        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(300);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(60);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        idle.onIdleEnd.subscribe(() => { this.messageModal.hide(); });
        idle.onTimeout.subscribe(() => {
            this.messageModalData = {
                title: '',
                body: this.translate.instant('label.sessionTimeout'),
                size: 'md',
                config: { isShowOKBtn: false, isShowCancelBtn: false },
                action: {}
            };
            this.permissionService.logoutSession().then((result) => {
                this.permissionChangeRoute.changeRoute("HOME");
            }, function (error) { });
        });
        idle.onIdleStart.subscribe(() => { });
        idle.onTimeoutWarning.subscribe((countdown) => {
            this.messageModalData = {
                title: '',
                body: this.translate.instant('label.sessionCount') + " " + countdown + " " + this.translate.instant('label.second'),
                size: 'md',
                config: { isShowOKBtn: false, isShowCancelBtn: false },
                action: {}
            };
            this.messageModal.show();
        });

        this.breadcrumb = {
            input: {
                data: [
                    { name: 'lbl.home', menuCode: "MY_ACCOUNTS" },
                    { name: 'lbl.fundTransfer', menuCode: 'FUND_TRANSFER' }
                ],
                style: "rib-web",
                selected: "FUND_TRANSFER"
            }
        };

        // sets the ping interval to 15 seconds
        keepalive.interval(15);
        keepalive.onPing.subscribe(() => this.lastPing = new Date());
    }

    ngOnInit() {

       console.log("init rib-web.component")
        this.currentLink = this.permissionChangeRoute.getMenuCodeByPath(this.location.path());
        this.permissionChangeRoute.ChangeMenuEvent.subscribe(menuCode => this.menuCodeChanged(menuCode));
        this.isLoginService.multipleLoginEvent.subscribe(status => this.logOutMultipleLogin(status));

        this.menuCodeChanged(this.currentLink);

    }


    logOutMultipleLogin(status){
        if(status){
            this.messageModalData = {
                title: '',
                body: this.translate.instant('label.multipleloginmsg'),
                size: 'md',
                config: { isShowOKBtn: false, isShowCancelBtn: false },
                action: {}
            };
                  this.messageModal.show();
            this.permissionService.logoutSession().then((result) => {
                this.permissionChangeRoute.changeRoute("HOME");
            }, function (error) { });

        }
        
    }

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
                    prefix = { name: {en:"Home",th:"หน้าหลัก"}, 'menuCode': this.Constants.FIRST_PAGE_CODE_AF_LGN ,'isClick':true };
                this.breadCrumbData.push(prefix);
            }
        } else {
                prefix = { name: {en:"Home",th:"หน้าหลัก"}, 'menuCode': this.Constants.FIRST_PAGE_CODE_BF_LGN ,'isClick':true };
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
            
        } else {
            allMenuList = this.mainMenuRibWebService.getMainMenuList(this.Constants.KK_PATH_URL +"/th/promotions");
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

        return data

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

    onModalHidden() {
    }

    thisUserAgent(event){
        this.getinformationService.userAgentInfo = event;


    }
}
