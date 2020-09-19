import { Router } from '@angular/router/src';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { pibRoutes } from '../../../../app/web/pib/pib-web.routes'
import { TranslateService } from 'ng2-translate/src/translate.service';
import { PermissionService } from '../../../../share/service/permission.service';
import { MainMenuPibWebService } from '../../../../share/service/main-menu.service';
import { NotificationService } from "../../../../share/service/notification.service";
import { Constants } from "../../../../share/service/constants";
import { Subscription } from "rxjs";
@Component({
  selector: 'main-menu-pib',
  template: '<tree-view class="" [treeData]=menuList [notificationList]=notificationList ></tree-view><user-profile [username]="nameDisplay"></user-profile>',
  providers: [MainMenuPibWebService]
})
export class PIBMenuRoot implements OnInit, OnDestroy {
  public menuList;
  fullName: string;
  fullSurName: string;
  nameDisplay: string;
  public notificationList: any[];
  private permissionSubscription: Subscription;
  private notificationListSubscription: Subscription;

  @Input() inputLoginState: string;

  constructor(private mainMenuPibWebService: MainMenuPibWebService,
    private permissionService: PermissionService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private constants: Constants,) {
    this.mainMenuPibWebService.setRouterData(pibRoutes);
    this.mainMenuPibWebService.setMenuList();
  }

  ngOnInit(): void {
    this.permissionSubscription = this.permissionService.PermssionChangeEvent
      .subscribe(user => this.selectedUserEventHandler(user));
    this.menuRender();
    this.notificationListSubscription = this.notificationService.getBadgeMenuListStream()
    .subscribe((badgemenuList)=>{
      this.notificationList = badgemenuList;
    })
   
  }

  ngOnDestroy(): void {
    this.permissionSubscription.unsubscribe();
    this.notificationListSubscription.unsubscribe();
  }

  selectedUserEventHandler(user: any) {
    this.menuRender();
  }

  private menuRender() {
  

    let isLogin = this.permissionService.getIsLogin();
    let isTermAndCon = this.permissionService.getIsTermAndCon();

    if (!isLogin || !isTermAndCon) {
      this.menuList = this.mainMenuPibWebService.getMainMenuList();
    } else {
      this.menuList = this.mainMenuPibWebService.getMainMenuAfterLogin();
      let userData = this.permissionService.getUserData();
      if (this.translate.currentLang === 'th') {
        this.fullName = userData.fullNameTH || '';
        this.fullSurName = userData.fullSurNameTH || '';
      } else {
        this.fullName = userData.fullNameEN || '';
        this.fullSurName = userData.fullSurNameEN || '';
      }
      
      this.nameDisplay = (userData.username) ? userData.username : this.fullName + ' ' + this.fullSurName;
      this.notificationService.updateBadgeMenuCount();
    }
  }
}