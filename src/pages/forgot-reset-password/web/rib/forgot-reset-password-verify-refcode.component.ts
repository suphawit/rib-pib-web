import { Component, Inject, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotResetPasswordService } from './forgot-reset-password.service';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-reset-password-verify-refcode',
  template: '<verify-ref-code [screen-name]="verifyRefCodeScreenName" (onClickBack)="onClickBackVerifyRefCode($event)" (onClickSubmit)="onClickSubmitVerifyRefCode($event)"></verify-ref-code>'
})
// Component class
export class ForgotResetPasswordVerifyRefCodeComponent implements ForgotResetPasswordInput, OnInit {
    @Output() onEventEmitter = new EventEmitter();

    constructor(
      @Inject(Router) public router: Router, 
      public forgotResetPasswordService: ForgotResetPasswordService, 
      public constants: Constants,
      public permissionChangeRoute: PermissionChangeRoute) {
        
        if(permissionChangeRoute.targetAction === 'forgot-reset-password/verify-refcode'){
          permissionChangeRoute.targetAction = null;
        } else {
          permissionChangeRoute.changeRoute("HOME");
        }
    }

    verifyRefCodeScreenName: string;

    ngOnInit(): void {
      this.verifyRefCodeScreenName = 'forgot-password';
      this.forgotResetPasswordService.updateObserver([
        { key: 'radiobutton', value: 'have' },
        { key: 'stepwizard', value: 0 },
        { key: 'alertmessage', value: '' }
      ]);
    }

    onClickBackVerifyRefCode(data: any): void {
      this.forgotResetPasswordService.updateObserver({ key: 'radiobutton', value: 'donot' });
      this.router.navigate(['forgot-reset-password/request-refcode']);
    }

    onClickSubmitVerifyRefCode(data: any): void {
      if(data.resultObj.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
        this.forgotResetPasswordService.cardInfo = data.cardInfoBean;
        this.forgotResetPasswordService.cache = data.resultObj.value;
        this.permissionChangeRoute.targetAction = 'forgot-reset-password/verify-otp';
        this.router.navigate(['forgot-reset-password/verify-otp']);
      }else{
        this.forgotResetPasswordService.updateObserver([{ key: 'alertmessage', value: data.resultObj.responseStatus.errorMessage }]);
      }
      
    }
}

interface ForgotResetPasswordInput {
  verifyRefCodeScreenName: string;
  onClickBackVerifyRefCode: Function;
  onClickSubmitVerifyRefCode: Function;
}