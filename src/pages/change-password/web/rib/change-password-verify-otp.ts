import { Component, Inject, OnInit , Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { Constants } from '../../../../share/service/constants';
import { ChangePasswordService } from '../../changePassword.service';
import { InputVerifyOtpComponent } from '../../../../share/component/verify-otp/verify-otp-base';
import { PermissionService ,PermissionChangeRoute} from '../../../../share/service/permission.service';
@Component({
  selector: 'change-password-verify-otp',
  template: '<verify-otp [style]="verifyOTPStyle" [actionOTP]="verifyOTPAction" (onClickSubmit)="onClickSubmitOTP($event)" (requestOTPChanged)="onRequestOTP($event)"></verify-otp>'
})

export class RIBWebChangePasswordVerifyOTP implements OnInit, changePasswordVerify {
       
          public responseOtp;
          public isRequestOtp;
          public isLoginDate:any;
    
          inputVerifyOtpComponent: InputVerifyOtpComponent;
          @Output('onTokenCaa') valueTokenCaa = new EventEmitter();
          constructor(
          @Inject(Router) public router: Router, 
          private _changePasswordService: ChangePasswordService, 
          private _otpService: OtpService,
          public _constants: Constants, private _permissionService: PermissionService,  public permissionChangeRoute: PermissionChangeRoute,) {
            
          }
          
          verifyOTPAction: string;
          verifyOTPStyle: string;

          ngOnInit(): void {
              this._changePasswordService.setStepWindow = false
              this.verifyOTPAction = this._constants.ACTION_CODE_CHANGE_PASSWORD;
              this.verifyOTPStyle = this._constants.STYLE_RIB_WEB;
              this._otpService.setCardInfoBean(this._changePasswordService.cardInfo);
              this._changePasswordService.updateObserver([
              { key: 'stepwizard', value: 0 },
              { key: 'alertmessage', value: '' }
              
          
            ]);
         
          }
          
          onClickSubmitOTP(data: any): void{
                   
                if(data.responseStatus.responseCode === this._constants.RESP_CODE_SUCCESS){
                    this.router.navigate(['change-password/change-password-new-password']);
                    this._changePasswordService.setStepWindow = true;
                      this.permissionChangeRoute.prevUrl = this.router.url;
                      
                }else{
                    this._changePasswordService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
                    
                }
          }

         
          onRequestOTP(result) {
              
              this.isRequestOtp = true;    
              if (typeof result.responseCode === "undefined") {
                  this._changePasswordService.setTokenOtp(result.tokenOtp);
                  this._changePasswordService.updateObserver([
                    { key: 'alertmessage', value: '' }
                ]);
              } else {
                  this._changePasswordService.setTokenOtp(result.tokenOtp);
                  this._changePasswordService.updateObserver([
                    { key: 'alertmessage', value: result.errorMessage }
                ]);
              }
          }
  
  }

  interface changePasswordVerify {
        verifyOTPAction: string;
        verifyOTPStyle: string;
        onClickSubmitOTP: Function;
  }