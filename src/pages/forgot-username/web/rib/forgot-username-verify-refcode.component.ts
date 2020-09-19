import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotUsernameService } from './forgot-username.service';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-username-verify-refcode',
  template: '<verify-ref-code [screen-name]="verifyRefCodeScreenName" (onClickSubmit)="onClickSubmitVerifyRefCode($event)"></verify-ref-code>'
})
// Component class
export class ForgotUsernameVerifyRefcodeComponent implements ForgotResetPasswordInput, OnInit {
    constructor(
      @Inject(Router) public router: Router, 
      public forgotUsernameService: ForgotUsernameService,
      public constants: Constants,
      public permissionChangeRoute: PermissionChangeRoute) {
        if(forgotUsernameService.cardInfo !== undefined && forgotUsernameService.cardInfo !== null){
          forgotUsernameService.cardInfo = null;
          permissionChangeRoute.changeRoute("HOME");
        }
    }

    verifyRefCodeScreenName: string;

    ngOnInit(): void {
      this.verifyRefCodeScreenName = 'forgot-username';
      this.forgotUsernameService.updateObserver([
        { key: 'stepwizard', value: 0 },
        { key: 'alertmessage', value: '' }
      ]);
    }

    onClickSubmitVerifyRefCode(data: any): void {
      
       if(data.resultObj.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
        this.forgotUsernameService.cardInfo = data.cardInfoBean;
        this.permissionChangeRoute.targetAction = 'forgot-username/verify-otp';
        this.router.navigate(['forgot-username/verify-otp']);
      }else{
        this.forgotUsernameService.updateObserver([{ key: 'alertmessage', value: data.resultObj.responseStatus.errorMessage }]);
      }
    }
}
interface ForgotResetPasswordInput {
  verifyRefCodeScreenName: string;
  onClickSubmitVerifyRefCode: Function;
}