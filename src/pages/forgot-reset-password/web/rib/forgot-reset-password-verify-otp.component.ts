import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotResetPasswordService } from './forgot-reset-password.service';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-reset-password-verify-otp',
  template: '<verify-otp [style]="verifyOTPStyle" [actionOTP]="verifyOTPAction" (onClickSubmit)="onClickSubmitOTP($event)" [verifyTransactionId]="verifyOTPTransactionId" [subscriptionChannel]="verifyOTPSubscribtionChannel" (requestOTPChanged)="onClickRequestOTP($event)"></verify-otp>'
})
// Component class
export class ForgotResetPasswordVerifyOTPComponent implements ForgotResetPasswordConfirm, OnInit {

  constructor(
    @Inject(Router) public router: Router,
    public forgotResetPasswordService: ForgotResetPasswordService,
    public otpService: OtpService,
    public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute) {

    if (permissionChangeRoute.targetAction === 'forgot-reset-password/verify-otp') {
      permissionChangeRoute.targetAction = null;
    } else {
      permissionChangeRoute.changeRoute("HOME");
      this.forgotResetPasswordService.cardInfo = null;
    }
  }

  verifyOTPAction: string;
  verifyOTPStyle: string;

  verifyOTPTransactionId: string;
  verifyOTPSubscribtionChannel: string;

  ngOnInit(): void {
    this.verifyOTPAction = this.constants.ACTION_CODE_RESET_PASSWORD;
    this.verifyOTPStyle = this.constants.STYLE_RIB_WEB;

    this.verifyOTPTransactionId = this.forgotResetPasswordService.cache.verifyTransactionId;
    this.verifyOTPSubscribtionChannel = "REF_CODE";

    this.forgotResetPasswordService.updateObserver([
      { key: 'radiobutton', value: 'have' },
      { key: 'stepwizard', value: 1 },
      { key: 'alertmessage', value: '' }
    ]);

    this.otpService.setCardInfoBean(this.forgotResetPasswordService.cardInfo);
  }

  onClickSubmitOTP(data: any): void {
    if (data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
      this.forgotResetPasswordService.cache = null;
      this.permissionChangeRoute.targetAction = 'forgot-reset-password/reset-password';
      this.router.navigate(['forgot-reset-password/reset-password']);
    } else {
      this.forgotResetPasswordService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
    }

  }

  onClickRequestOTP(result: any) {
    if(result['errorMessage'] !== undefined) {
      this.forgotResetPasswordService.updateObserver([
          { key: 'alertmessage', value: result.errorMessage }
      ]);
    }
    
}
}

interface ForgotResetPasswordConfirm {
  verifyOTPAction: string;
  verifyOTPStyle: string;
  onClickSubmitOTP: Function;
}