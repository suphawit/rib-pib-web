import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { AccountActivateService } from './account-activate.service';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { IVerifyOtpComponent, InputVerifyOtpComponent } from '../../../../share/component/verify-otp/verify-otp-base';

@Component({
    selector: 'account-activate-verify-otp',
    template: '<verify-otp [style]="inputVerifyOtpComponent.style" [actionOTP]="inputVerifyOtpComponent.actionOTP" (onClickSubmit)="onClickSubmitVerifyOtp($event)" (requestOTPChanged)="onClickRequestOTP($event)"></verify-otp>'
})

export class AccountActivateVerifyOtpComponent implements OnInit, IVerifyOtpComponent {
    inputVerifyOtpComponent: InputVerifyOtpComponent;

    constructor(public permissionChangeRoute: PermissionChangeRoute,
        private accountActivateService: AccountActivateService,
        private otpService: OtpService,
        private constants: Constants) {
        
    }

    ngOnInit(): void {
        this.inputVerifyOtpComponent = {
            actionOTP: this.constants.ACTION_CODE_ACTIVATE_ACCOUNT,
            style: this.constants.STYLE_RIB_WEB
        };

        this.accountActivateService.updateObserver([
            { key: 'stepwizard', value: 1 },
            { key: 'alertmessage', value: '' }
        ]);

        if (this.otpService.getCardInfoBean() != null) {
            this.accountActivateService.setCardInfoBean(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        } else if (this.accountActivateService.getCurrentStep() != 2) {
            this.accountActivateService.setCardInfoBean(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        }

        this.otpService.setCardInfoBean(this.accountActivateService.getCardInfoBean());
    }

    onClickRequestOTP(result: any) {
        this.accountActivateService.updateObserver([
            { key: 'alertmessage', value: '' }
        ]);
    }

    onClickSubmitVerifyOtp(result: any) {
        

        if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            this.accountActivateService.setCurrentStep(3);
            this.permissionChangeRoute.changeRoute('account-activate.accept-terms-and-conditions');
        } else {
            this.accountActivateService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage }]);
        }
    }
}