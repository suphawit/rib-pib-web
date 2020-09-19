import { Router } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { Constants } from '../../../../share/service/constants';
import { Dateservice } from '../../../../share/service/date.service';
import { UtilService } from '../../../../share/service/util.service';
// import { AuthenticationService } from '../../../../share/service/authen.service'
import { TermAndConditionModalService } from '../../../../share/component/terms-and-conditions/terms-and-conditions-modal.service';
import { PermissionService, PermissionMainMenu, PermissionAction, PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'page-login',
  templateUrl: './login.html',
  providers: [UtilService]
})
// Component class
export class LoginComponent implements AfterViewInit {

  public firstName: string;
  public password: string;

  constructor(public dateservice: Dateservice,
    public constants: Constants,
    public permissionService: PermissionService,
    public utilService: UtilService,
    public permissionMainMenu: PermissionMainMenu,
    public mfpApi: MfpApi,
    private permissionAction: PermissionAction,
    private permissionChangeRoute: PermissionChangeRoute,
    private routes: Router,
    private termAndConditionModalService: TermAndConditionModalService) {
    // alert(this._PermissionService.getIsChallenged())
  }

  ngAfterViewInit() {
    // this.init();
  }

  failChallenge(returnChallenge) {
    alert("fail=" + JSON.stringify(returnChallenge));
  }

  successChallenge(returnChallenge) {
    // let value = returnChallenge.user.attributes.value;
    // let userEmail = value.email;
    // let userMobile = value.mobileNo;
    // let termAndConditionStatus = value.termAndCondition;

    //   if(userMobile =="" || userEmail == ""){
    //       alert("userEmail='' || userEmail = ''");

    //       return false;
    //   }

    //   if(termAndConditionStatus){
    //     //call termAndCondition here.
    //     this.termAndConditionModalService.updateAction();
    //      // this._PermissionChangeRoute.changeRoute("AcceptTermsAndcontdition")
    //   }else{
    //        this.permissionChangeRoute.changeRoute("DASHBOARD")

    //   }
  }

  loginBtn() {
    // 

    if ((this.firstName != "" && this.password != "") && (this.firstName != undefined && this.password != undefined)
    ) {
    }
    else {
      alert("Please insert user or pass")
    }
  }
}