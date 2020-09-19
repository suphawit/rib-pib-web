import { Component, ViewChild } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { StepWizard } from '../../share/component/step-wizard/step-wizard.component';
import { PromptPayRegisterServiceMain } from '../../pages/prompt-pay/prompt-pay-register.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'prompt-pay-register-success',
    templateUrl: 'prompt-pay-register-success.html'
})
export class PromptPayRegisterSuccessComponent {
    public type: string;
    public result: any;
    public message: string;
    stepwizardStyle: string;
    public errorMsg: any = '';
    public stepWizard: StepWizard;
    public confirmRegisterAnyID: any;
    public confirmRegisterAnyIDData: any;
    public isFailRegisterKkPromptPay: boolean;
    public isSuccessRegisterKkPromptPay: boolean;

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public constants: Constants,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public translate: TranslateService,
        public permissionChangeRoute: PermissionChangeRoute) {
    }

    ngOnInit(): void {
        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 2,
                style: this.stepwizardStyle
            }
        };

        this.confirmRegisterAnyIDData = this.promptPayRegisterServiceMain.confirmRegisterAnyIDData;
        this.verifyConfirmRegisterAnyIDData();
    }

    public verifyConfirmRegisterAnyIDData() {
        if (this.confirmRegisterAnyIDData != undefined) {
            this.result = this.confirmRegisterAnyIDData.responseJSON.result.value;

            this.confirmRegisterAnyID = {
                typeAnyValue: this.result.anyIDValue,
                typeAnyResult: this.result.anyIDType,
                anyIDAliasName: this.result.accountName,
                anyIDMyAccountNumber: this.result.accountNO,
                descriptionEN: this.result.descriptionEN,
                descriptionTH: this.result.descriptionTH
            };
            
            if (this.confirmRegisterAnyID.typeAnyResult === this.constants.ANYID_TYPE_MOBILE) {
                this.confirmRegisterAnyID.typeAnyResult = this.translate.instant('label.mobileNumber');
            } else {
                this.confirmRegisterAnyID.typeAnyResult = this.translate.instant('label.NATID');
            }

            if (this.result.statusCode === this.constants.TRANSFER_STATUS_SUCCESS) {
                this.isSuccessRegisterKkPromptPay = true;
                this.errorMsg = this.translate.instant('label.Success');
            } else if (this.result.statusCode !== this.constants.TRANSFER_STATUS_SUCCESS) {
                this.isFailRegisterKkPromptPay = true;
                this.errorMsg = this.translate.instant('lbl.anyIDStatus.fail') + ',' + ' ' + this.result.statusMessage;
                this.message = this.result.statusMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }
    }

    gotoKKProduct(param): void {
        if (param == 'newProduct') {
            this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE');
        } else {
            this.permissionChangeRoute.changeRoute('KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY');
        }
    }
}
