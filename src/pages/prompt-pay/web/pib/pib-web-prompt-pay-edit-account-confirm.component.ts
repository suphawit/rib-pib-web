import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { PromptPayEditConfirmComponent } from '../../prompt-pay-edit-account-confirm.component';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
@Component({
  selector: 'pib-web-prompt-pay-edit-confirm-account',
  templateUrl: '../../prompt-pay-edit-account-confirm.html'
})
export class PIBWebPromptPayEditConfirmComponent extends PromptPayEditConfirmComponent {
    public stepWizard: StepWizard;

    constructor(public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public constants: Constants,
    public otpService: OtpService,
    public permissionChangeRoute: PermissionChangeRoute,
    public masterDataService: MasterDataService){
        super(otpService,constants,promptPayRegisterServiceMain,permissionChangeRoute,masterDataService);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 2,
                style: this.constants.STYLE_PIB_WEB
            }
        }
    }
}