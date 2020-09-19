import { Location } from '@angular/common';
import { TranslateService, LangChangeEvent } from 'ng2-translate';
import { UtilService } from '../../../../share/service/util.service';
import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { NotificationService } from "../../../../share/service/notification.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'tree-view',
  template: `
              <nav class="navbar navbar-default" role="navigation" (clickOutside)="clickOutside($event)">
                <ul class="nav navbar-nav navbar-left" >
                  <li id="node.menuCode" (click)="toggleDropdown(node)" *ngFor="let node of treeData;trackBy: trackById" class="kk-font {{lang}} dropdown-main dropdown" [class.active-menu]="currentLink == node.menuCode">
                    <a *ngIf="lang =='th'" (click)="clickAction(node.menuCode)">{{node.menuTh}} <span style = " position: relative;  margin-top: 3px!important;"  *ngIf ="isShowNotification(node.menuCode)" class="badgePIB badge-danger" >{{getNotificationCount(node.menuCode)}}</span> </a>
                    <a *ngIf="lang =='en'" (click)="clickAction(node.menuCode)">{{node.menuEn}} <span style = " position: relative;  margin-top: 3px!important;"  *ngIf ="isShowNotification(node.menuCode)" class="badgePIB badge-danger">{{getNotificationCount(node.menuCode)}}</span> </a>
                           
                    <ul  id="{{node.menuCode}}" *ngIf="node.children != ''" href="javascript:;" class="dropdown-menu sub-menu-horizontal" [class.show]="currentLink == node.menuCode && isOpen" role="menu" >
                        <li  *ngFor="let children of node.children;trackBy: trackById" class="kk-font {{lang}}" [class.active-menu]="currentLink == children.menuCode">
                          <a *ngIf="lang =='th'" (click)="clickAction(children.menuCode)">{{ children.menuTh }}   <span   *ngIf ="isShowNotification(children.menuCode)" class="badge badge-danger" style = " position: relative;   margin-left:4px;  padding: 3px 6px 0px 6px!important;">
                          {{getNotificationCount(children.menuCode)}}</span> </a>
                          <a *ngIf="lang =='en'"  (click)="clickAction(children.menuCode)">{{ children.menuEn }}   <span  *ngIf ="isShowNotification(children.menuCode)" class="badge badge-danger" style = " position: relative;  margin-left:4px;  padding: 3px 6px 0px 6px!important; ">
                          {{getNotificationCount(children.menuCode)}}</span> </a>
                        </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            `,
})
export class TreeView implements OnInit,OnDestroy, AfterViewInit {
  private lang: any;
  public currentLink: string;
  private tmpCurrentLink: string;
  private permissionSubscription: Subscription;
  private langSubscription: Subscription;
  @Input() treeData: any;
  @Input() notificationList: any[];
  private isOpen: boolean = false;
  constructor(private permissionChangeRoute: PermissionChangeRoute,
    private translate: TranslateService,
    private location: Location,
    private notificationService: NotificationService,
    private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.permissionSubscription = this.permissionChangeRoute.ChangeMenuEvent
      .subscribe(menuCode => this.menuCodeChanged(menuCode));
    this.currentLink = this.permissionChangeRoute.getMenuCodeByPath(this.location.path());
 
  }

  ngOnDestroy(): void{
    this.permissionSubscription.unsubscribe();
    this.langSubscription.unsubscribe();
  }

  onMenuMouseOver(menucode): void {
    // var p = document.getElementById(menucode);
    //
  }

  toggleDropdown(node){
      if(node.children.length > 0){



        this.isOpen = true;
      }
  }

  ngAfterViewInit(): void {

    this.lang = this.translate.currentLang;
    this.langSubscription = this.translate.onLangChange
    .subscribe((event: LangChangeEvent) => {
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

    if (this.tmpCurrentLink != menuCode) {
      this.currentLink = menuCode;
      this.tmpCurrentLink = menuCode;

      // Reset page height
      this.utilService.setPageHeight(700);
    }
  }


  public getNotificationCount(menuCode:string){
    return this.notificationService.getBadgeMenuCountStr(menuCode);
  }

  public isShowNotification(menuCode:string){
    let isShow = false;
    const countStr = this.notificationService.getBadgeMenuCountStr(menuCode);
    if( (this.notificationList.length == 0)||(countStr === '')){
      return false ;
    }
    this.notificationList.forEach( (item, index)=>{
      if(item.menuCode === menuCode){
        isShow = true;
      }
    });
    if(menuCode === 'RTP'){
      isShow = true;
    }

    return isShow;
  }

  clickAction(menuCode) {
    if (['FUND_TRANSFER', 'PAY_BILL'].indexOf(menuCode) != -1) {
      this.permissionChangeRoute.targetAction = "NEW";
    }

    if (menuCode.indexOf('http://') >= 0 || menuCode.indexOf('https://') >= 0) {
      // Found world
      window.open(menuCode, '_blank');
    } else {
      this.permissionChangeRoute.changeRoute(menuCode);
    }
  }

  clickOutside($event){
    if($event == null){
      this.isOpen = false;
    }
  }
}
