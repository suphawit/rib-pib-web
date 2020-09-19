import { Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { PromptPayEditComponent } from '../../prompt-pay-edit-account.component';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';
import { StepWizard } from '../../../../share/component/step-wizard/step-wizard.component';
import { OrderByPipe } from '../../../../share/pipe/order-by.pipe';
import { FormBuilder } from '@angular/forms';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
@Component({
  selector: 'rib-web-prompt-pay-edit-account',
  templateUrl: '../../prompt-pay-edit-account.html'
})
export class RIBWebPromptPayEditComponent extends PromptPayEditComponent {
    public stepWizard: StepWizard;

    constructor(public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public constants: Constants,
    public orderBy: OrderByPipe,
    public fb: FormBuilder,
    public permissionChangeRoute: PermissionChangeRoute){
        super(promptPayRegisterServiceMain,constants,orderBy,fb,permissionChangeRoute);

        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }, { name: '3', label: 'stepWizard.complete' }],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        }
    }
}