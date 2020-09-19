import { Idle } from '@ng-idle/core';
import { Router } from '@angular/router/src';
import { Constants } from '../../../../share/service/constants';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { routes } from '../../../../app/web/rib/rib-web.routes';
import { UtilService } from '../../../../share/service/util.service';
import { Dateservice } from '../../../../share/service/date.service';
import { PreloadService } from '../../../../share/service/preload.service';
import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../../share/service/authen.service'
import { MainMenuRibWebService } from '../../../../share/service/main-menu.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { PermissionService, PermissionChangeRoute, PermissionMainMenu } from '../../../../share/service/permission.service';
import { TermsAndConditionsModalComponent } from '../../../../share/component/terms-and-conditions/terms-and-conditions-modal.component';
import { NotificationService } from "../../../../share/service/notification.service";
import { Subscription } from "rxjs";
import { GetinformationService } from "../../../../share/service/getInformation.service";

// Declare for layout in jquery
declare var Layout;

@Component({
  selector: 'main-menu-rib',
  templateUrl: './main-menu.html',
  providers: [MainMenuRibWebService, UtilService]
})
export class RIBMenuRoot extends AuthenticationService implements OnInit,OnDestroy {
  public isDesktop = true;
  private menuList;
  private language: any;
  private isLogin: boolean;
  private username: string = '';
  private password: string = '';
  private isError: boolean = false;
  private errorMessage: string = '';
  protected languageSettingValue: any;
  private isDisplayTermAndCon: boolean;
  private isTermAndCon: boolean = false;
  public notificationList;
  //private notificationListSubscription: Subscription;
  private langSubscription: Subscription;
  private permissionSubscription: Subscription;
  // private username:string = 'baipordev01';
  // private password:string = 'P@ssw0rd';
  private promotionUrl;

  @Input() inputLoginState: string;
  @ViewChild('focusUsername') private focusUsernameElement: ElementRef;
  @ViewChild('firstLoginAcceptTermModal') public childModal: TermsAndConditionsModalComponent;

  constructor(
    public permissionService: PermissionService,
    public dateservice: Dateservice,
    public constants: Constants,
    public utilService: UtilService,
    public permissionMainMenu: PermissionMainMenu,
    public mfpApi: MfpApi,
    private permissionChangeRoute: PermissionChangeRoute,
    private mainMenuRibWebService: MainMenuRibWebService,
    private router: Router,
    private preload: PreloadService,
    public translateService: TranslateService,
    private idle: Idle,
    public notificationService: NotificationService,
	private getinformationService: GetinformationService
  ) {
    super(dateservice, constants, permissionService, utilService, permissionMainMenu, mfpApi,translateService);
    this.isDisplayTermAndCon = true;
    this.mainMenuRibWebService.setRouterData(routes);
    this.permissionChangeRoute.setChannelRoute(this.constants.MENU_WEB);
    this.mainMenuRibWebService.setMenuList();
  }

  ngOnInit(): void {
    this.clearSessionLogin();
    Layout.init();
    this.permissionSubscription = this.permissionService.PermssionChangeEvent
    .subscribe(user => this.selectedUserEventHandler(user));
    this.getinformationService
        .getInformation(this.constants.REQ_PROCEDURE_NAME.PROMOTION_INFORMATION, 'promotion')
        .then((objResponse: any) => {
          this.promotionUrl = objResponse.responseJSON.result.value.data;
            this.menuRender();
      }).catch((err: any)=>{
        this.promotionUrl = '#';
        this.menuRender();
    });
    this.language = this.translateService.currentLang;
    this.langSubscription = this.translateService.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.selectedLanguageEventHandler(event.lang)
    });
	this.isDesktop = this.getinformationService.isDesktop();
    // this.notificationListSubscription = this.notificationService.getBadgeMenuListStream().subscribe((badgemenuList)=>{
    //   this.notificationList = badgemenuList;
    // })
  }

  ngOnDestroy(): void{
    this.langSubscription.unsubscribe();
    // this.notificationListSubscription.unsubscribe();
    this.permissionSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.init();
  }

  selectedLanguageEventHandler(language: any) {
    this.language = language;
  }
  selectedUserEventHandler(user: any) {
    this.menuRender()
  }

  private menuRender() {
    this.isLogin = this.permissionService.getIsLogin();
    this.isTermAndCon = this.permissionService.getIsTermAndCon();

    if (!this.isLogin || !this.isTermAndCon) {
      this.menuList = this.mainMenuRibWebService.getMainMenuList(this.promotionUrl);
    } else {
      this.menuList = this.mainMenuRibWebService.getMainMenuAfterLogin();
      //this.notificationService.updateBadgeMenuCount();
    }
  }

  failChallenge(returnChallenge) {
    this.preload.hideLoader();
    this.failLogin(returnChallenge.errorMessage);
  }

  successChallenge(returnChallenge) {
    this.idle.watch();
    this.preload.hideLoader();
    let value = returnChallenge;
    let termAndConditionStatus = value.termAndCondition;

    if (!termAndConditionStatus) {
      this.permissionService.setIsTermAndCon(false);
      this.isDisplayTermAndCon = true;
      this.childModal.showChildModal();
    } else {
      this.username = "";
      this.password = "";
      this.permissionService.setIsTermAndCon(true);
      this.permissionChangeRoute.changeRoute("DASHBOARD");
    }
  }

  timeoutChallenge() {
    this.permissionService.timeoutSession()
    this.preload.hideLoader();
    this.permissionChangeRoute.changeRoute("HOME");
  }

  loginBtn() {
    if ((this.username.trim() != "" && this.password != "") && (this.username != undefined && this.password != undefined)) {
      this.isError = false;
      this.preload.showLoader();
      this.loginByUserNamePassword(this.username.trim(), this.password, this.language.trim());
    } else {
      this.failLogin(this.constants.RESP_CODE_INVALID_USERNAME_OR_PASSWORD);
    }
  }

  enterLogin(e) {
    if (e.keyCode == 13) {
      this.loginBtn();
    }
  }

  private failLogin(errorMessage) {
    // this.username = '';
    // this.password = '';
    this.isError = true;
    this.errorMessage = errorMessage;
    this.focusUsernameElement.nativeElement.focus();
  }

  onClickSubmit($event) {
    if ($event) {
      this.permissionService.setIsTermAndCon(true);
      this.permissionService.setIsLogin(true);
      this.permissionChangeRoute.changeRoute("DASHBOARD");
    } else {
      this.permissionService.logoutSession().then((result) => {
        this.username = '';
        this.password = '';
        this.permissionChangeRoute.changeRoute("HOME");
        this.languageSettingValue = this.translateService.currentLang;
      });
    }
  }
}
