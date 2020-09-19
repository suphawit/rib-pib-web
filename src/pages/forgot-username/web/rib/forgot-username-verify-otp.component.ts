import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotUsernameService } from './forgot-username.service';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-username-verify-otp',
  template: '<verify-otp [style]="verifyOTPStyle" [actionOTP]="verifyOTPAction" (onClickSubmit)="onClickSubmitOTP($event)"></verify-otp>'
})
// Component class
export class ForgotUsernameVerifyOTPComponent implements ForgotUsernameVerifyOTP, OnInit {
    
    constructor(
      @Inject(Router) public router: Router,  
      public forgotUsernameService: ForgotUsernameService,  
      @Inject(OtpService) public otpService: OtpService, 
      public constants: Constants,
      public permissionChangeRoute: PermissionChangeRoute) {
        if(permissionChangeRoute.targetAction === 'forgot-username/verify-otp'){
          permissionChangeRoute.targetAction = null;
        } else {
          forgotUsernameService.cardInfo = null;
          permissionChangeRoute.changeRoute("HOME");
        }
    }

    verifyOTPStyle: string;
    verifyOTPAction: string;

    ngOnInit(): void {
      this.verifyOTPStyle =  this.constants.STYLE_RIB_WEB;
      this.verifyOTPAction = this.constants.ACTION_CODE_FORGOT_USERNAME;
      this.forgotUsernameService.updateObserver([
        { key: 'stepwizard', value: 1 },
        { key: 'alertmessage', value: '' }
      ]);

      this.otpService.setCardInfoBean(this.forgotUsernameService.cardInfo);
    }

    onClickSubmitOTP(data: any): void{
      if(data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
        this.permissionChangeRoute.targetAction = 'forgot-username/verify-account';
        this.router.navigate(['forgot-username/verify-account']);
      }else{
        this.forgotUsernameService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
      }
      
    }
}
interface ForgotUsernameVerifyOTP {
  verifyOTPAction: string;
  verifyOTPStyle: string;
  onClickSubmitOTP: Function;
}