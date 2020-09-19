import { Location } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { MainMenuRibWebService } from '../../../../share/service/main-menu.service';
import { LanguageSettingService } from '../../../../pages/main-layout/web/language-setting.service';
import { PermissionChangeRoute, PermissionMainMenu, PermissionService } from '../../../../share/service/permission.service';
import { NotificationService } from "../../../../share/service/notification.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'ul[main-menu-tree]',
  template: `
              <li class="nav-item {{lang}}" [class.active]="currentLink == node.menuCode || hasSubActive[node.menuCode]" [class.open]="hasSubActive[node.menuCode]" *ngFor="let node of treeData" >
                  <a *ngIf="node.children != '' && node.children != undefined" href="javascript:;"  class="nav-link nav-toggle">
                      <i class="{{node.icon}}"></i>
                      <span *ngIf="node.href"></span>
                      <span *ngIf="lang =='en'" class="title">{{node.menuEn}}</span>
                      <span *ngIf="lang =='th'" class="title">{{node.menuTh}}</span>
                      <span class="arrow" [class.open]="hasSubActive[node.menuCode]"></span>
                      <span  style = "margin-left: 5px; margin-top:5px;" *ngIf =" isShowNotification(node.menuCode); "  class="badge badge-danger">{{getNotificationCount(node.menuCode)}}</span>
                  </a>
                  <a *ngIf="node.children == '' || node.children == undefined" href="javascript:;" (click)="clickAction(node.menuCode)" class="nav-link stand-link" >
                      <i class="{{node.icon}}"></i>
                      <span *ngIf="node.href"></span>
                      <span *ngIf="lang =='en'" class="title">{{node.menuEn}}</span>
                      <span *ngIf="lang =='th'" class="title">{{node.menuTh}}</span>
                      <span *ngIf ="isShowNotification(node.menuCode);" style= "margin-left: 5px;"class="badge badge-danger">{{getNotificationCount(node.menuCode)}}</span>
                  </a>
                  <ul *ngIf="node.children != ''" class="sub-menu" style="display:none;" [ngStyle]="{'display': hasSubActive[node.menuCode] == true ? 'block' : 'none'}" main-menu-tree [treeData]="node.children" [notificationList]="notificationList" ></ul>
              </li>
            `,
  providers: [MainMenuRibWebService]
})

export class TreeView implements OnInit,OnDestroy {
  private lang: any;
  public hasSubActive: any;
  public langObserver: any;
  public currentLink: string;
  private tmpCurrentLink: string;
  private menuSubscription:Subscription;
  private translateSubscription:Subscription;

  @Input() treeData: any;
  @Input() notificationList: any[];

  constructor(private permissionChangeRoute: PermissionChangeRoute,
    private languageSettingService: LanguageSettingService,
    private translate: TranslateService,
    private mainMenuRibWebService: MainMenuRibWebService,
    private permissionMainMenu: PermissionMainMenu,
    private permissionService: PermissionService,
    private notificationService:NotificationService,
    private location: Location) {
  
  }
  ngOnDestroy():void{
    this.menuSubscription.unsubscribe();
    this.translateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.hasSubActive = [];
    this.menuSubscription = this.permissionChangeRoute.ChangeMenuEvent.subscribe(menuCode => this.menuCodeChanged(menuCode));
    this.currentLink = this.permissionChangeRoute.getMenuCodeByPath(this.location.path());
    this.lang = this.translate.currentLang;

    this.translateSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translate.currentLang;
    });
  }

  menuCodeChanged(selectedMenu) {
    // menuCode = menuCode.split('.');
    // menuCode = menuCode[0];
    let menuCode = '';

    if (selectedMenu.indexOf('.') != -1) {
      menuCode = selectedMenu.split('.')[0];
    } else {
      menuCode = selectedMenu;
    }

    this.hasSubActive = [];
    let hasSubActive = this.hasSubActive;

    if (this.tmpCurrentLink != menuCode) {
      this.currentLink = menuCode;
      this.tmpCurrentLink = menuCode;

      if (this.permissionService.getIsLogin()) {
        let allMenuList = this.permissionMainMenu.getMainMenuList();

        // allMenuList.forEach(function (item, index) {
        //   if (item.menuCode === menuCode) {
        //     if (item.parentCode != null) {
        //       hasSubActive[item.parentCode] = true;
        //     }
        //   }
        // });

        allMenuList.filter(x => x.menuCode === menuCode).forEach(function (item, index) {
          if (item.parentCode != null) {
            hasSubActive[item.parentCode] = true;
          }
        });

        this.hasSubActive = hasSubActive;
      }
    }
  }


  public getNotificationCount(menuCode:string){
    return this.notificationService.getBadgeMenuCountStr(menuCode);
  }


  public isShowNotification(menuCode:string){
    let isShow = false;
    const countStr = this.notificationService.getBadgeMenuCountStr(menuCode);
    if(!this.notificationList||(countStr === '')){
      return false;
    }
    this.notificationList.forEach((item)=>{
      if(item.menuCode === menuCode){
        isShow = true;
      }
    });

    if(menuCode === 'RTP'){
      isShow = true;
    }
    return isShow;
  }


  // private setActiveLink(menuCode) {
  //   let allMenuList = this._PermissionMainMenu.getMainMenuList();
  //   allMenuList.forEach(function (item, index) {

  //     if (item.menuCode == menuCode) {
  //       if (item.parentCode != null) {

  //         return false;

  //       }
  //     }

  //   });
  //   //   return true
  // }

  clickAction(menuCode) {
    if (['FUND_TRANSFER', 'PAY_BILL'].indexOf(menuCode) != -1) {
      this.permissionChangeRoute.targetAction = "NEW";
    }

    if (menuCode.indexOf('http://') >= 0 || menuCode.indexOf('https://') >= 0) {
      window.open(menuCode, '_blank');
    } else {
      this.permissionChangeRoute.changeRoute(menuCode)
    }
  }
}