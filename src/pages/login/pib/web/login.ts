import { Idle } from '@ng-idle/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { Constants } from '../../../../share/service/constants';
import { Dateservice } from '../../../../share/service/date.service';
import { UtilService } from '../../../../share/service/util.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { AuthenticationService } from '../../../../share/service/authen.service'
import { GetinformationService } from '../../../../share/service/getInformation.service';
import { PermissionService, PermissionMainMenu, PermissionAction, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'page-login',
  templateUrl: './login.html',
  providers: [UtilService]
})
// Component class
export class LoginComponent extends AuthenticationService implements OnInit, OnDestroy {

  private tokenid: string;
  public lang: string;
  public firstName: string;
  public password: string;
  private routeSubscription:Subscription;

  constructor(public dateservice: Dateservice,
    public constants: Constants,
    public permissionService: PermissionService,
    public utilService: UtilService,
    public permissionMainMenu: PermissionMainMenu,
    private permissionAction: PermissionAction,
    public mfpApi: MfpApi,
    public permissionChangeRoute: PermissionChangeRoute,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public router: Router,
    public getinformationService: GetinformationService,
    public translateService: TranslateService,

	private idle: Idle
  ) {
    super(dateservice, constants, permissionService, utilService, permissionMainMenu, mfpApi,translateService);
    this.init();
  }

  ngOnInit(): void {
    // Get URL parameters
    this.routeSubscription = this.route.params.subscribe(params => {
      this.tokenid = params['token'];
      this.lang = params['language'] ? params['language'].toLowerCase() : this.constants.CULTURE_SHORTNAME_ENGLISH.toLowerCase();
    });

    if (this.tokenid != undefined && this.lang != undefined) {
      // this.loginBtn()
      this.translate.use(this.lang);
      this.clearSessionToken(this.tokenid, this.lang);
      // this.loginByToken(this.tokenid, this.lang); // TODO: Change to login by token id
      this.translate.use(this.lang);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  failChallenge(returnChallenge) {
    // alert("fail=" + JSON.stringify(returnChallenge));
    this.getinformationService.setChallengeResult(returnChallenge);
    // if ("RIB-E-LOG012" == returnChallenge.responseCode || "RIB-E-LOG011" == returnChallenge.responseCode || "RIB-E-LOG007" == returnChallenge.responseCode) {
      this.permissionChangeRoute.changeRoute("LANDING_PAGE");
    // }
  }

  successChallenge(returnChallenge) {
    
    let value = returnChallenge;
    let userEmail = value.email;
    let userMobile = value.mobileNo;
    let termAndConditionStatus = value.termAndCondition;

    if (userMobile == "" || userEmail == "") {
      // alert("userEmail='' || userEmail = ''");
      return false;
    }

    if (!termAndConditionStatus) {
      this.permissionService.setIsTermAndCon(false);
      this.permissionService.tokenId = this.tokenid;
      this.permissionChangeRoute.changeRoute("AcceptTermsAndcontdition")
    } else {
      this.idle.watch();
      this.permissionService.setIsTermAndCon(true);
      this.permissionChangeRoute.changeRoute("MY_DEPOSITS")
    }
  }

  timeoutChallenge() {
  }
}