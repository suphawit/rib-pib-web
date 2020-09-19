import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { PromptPayEditCompleteComponent } from '../../prompt-pay-edit-account-complete.component';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { MasterDataService } from '../../../../share/service/master-data.service';

@Component({
  selector: 'rib-web-prompt-pay-edit-complete-account',
  templateUrl: '../../prompt-pay-edit-account-complete.html'
})
export class RIBWebPromptPayEditCompleteComponent extends PromptPayEditCompleteComponent {
    public stepWizard: StepWizard;

    constructor(public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute,
    public masterDataService: MasterDataService){
        super(constants,promptPayRegisterServiceMain,permissionChangeRoute,masterDataService);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 3,
                style: this.constants.STYLE_RIB_WEB
            }
        }
    }
}