import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { AccountActivateService } from './account-activate.service';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { IVerifyRefCodeComponent, InputVerifyRefCodeComponent } from '../../../../share/component/verify-ref-code/verify-ref-code.component';

@Component({
    selector: 'account-activate-verify-ref-code',
    template: '<verify-ref-code [screen-name]="inputVerifyRefCodeComponent.screenName" (onClickSubmit)="onClickSubmitVerifyRefCode($event)"></verify-ref-code>'
})

export class AccountActivateVerifyRefCodeComponent implements OnInit, IVerifyRefCodeComponent {
    inputVerifyRefCodeComponent: InputVerifyRefCodeComponent;

    constructor(private permissionChangeRoute: PermissionChangeRoute,
        @Inject(Router) public router: Router,
        private accountActivateService: AccountActivateService,
        private otpService: OtpService,
        private constants: Constants) {
        
    }

    ngOnInit(): void {
        this.inputVerifyRefCodeComponent = {
            screenName: this.constants.SCREEN_NAME_ACCOUNT_ACTIVATE
        };

        this.accountActivateService.updateObserver([
            { key: 'stepwizard', value: 0 },
            { key: 'alertmessage', value: '' }
        ]);

        this.accountActivateService.setIsCreatedUser(false);
        

        if (this.accountActivateService.getCardInfoBean() != null) {
            this.accountActivateService.setCardInfoBean(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        }
    }

    onClickSubmitVerifyRefCode(result: any) {
        if (result.resultObj.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
            this.accountActivateService.setCardInfoBean(result.cardInfoBean);
            this.accountActivateService.setCurrentStep(2);
            this.permissionChangeRoute.changeRoute('account-activate.verify-otp');
        } else {
            this.accountActivateService.updateObserver([{ key: 'alertmessage', value: result.resultObj.responseStatus.errorMessage }]);
        }
    }
}
