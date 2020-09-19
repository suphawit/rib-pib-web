import { Component, OnInit } from '@angular/core';
import { AccountActivateService } from './account-activate.service'
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
    selector: 'account-activate-accept-terms-and-conditions',
    template: '<accept-terms-and-conditions [screen-name]="\'account-activate\'" [Style]="\'rib-web\'" [termAction]="\'rib_term_and_con\'" [errorMessage]="errorMessage" (onClickSubmit)="onClickSubmitAcceptTermAndConditions($event)"></accept-terms-and-conditions>'
})
export class AccountActivateAcceptTermsAndConditionsComponent implements OnInit {
    errorMessage: string = '';

    constructor(
        public permissionChangeRoute: PermissionChangeRoute,
        private accountActivateService: AccountActivateService,
        private otpService: OtpService) {
        
    }

    ngOnInit() {
        this.accountActivateService.updateObserver([
            { key: 'stepwizard', value: 2 },
            { key: 'alertmessage', value: '' }
        ]);

        if (this.accountActivateService.getTermAndConResult() != null) {
            this.accountActivateService.setCardInfoBean(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        } else if (this.accountActivateService.getCurrentStep() != 3) {
            this.accountActivateService.setCardInfoBean(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        }
    }

    onClickSubmitAcceptTermAndConditions(data: any) {
        
        if (data === 'agree') {
            this.accountActivateService.setTermAndConResult('agree');
            this.accountActivateService.setCurrentStep(4);
            this.permissionChangeRoute.changeRoute('account-activate.create-user-account');
        } else {
            this.permissionChangeRoute.changeRoute("HOME");
        }
    }
}