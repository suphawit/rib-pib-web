import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../../../share/service/constants';
import { OrderByPipe } from '../../../../share/pipe/order-by.pipe';
import { UtilService } from '../../../../share/service/util.service';
import { PermissionAction } from '../../../../share/service/permission.service';
import { PromptPayRegisterComponent } from '../../prompt-pay-register.component';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';
import { TermAndConditionModalService } from '../../../../share/component/terms-and-conditions/terms-and-conditions-modal.service';

@Component({
    selector: 'rib-web-prompt-pay-register',
    templateUrl: '../../prompt-pay-register.html'
})
export class RIBWebPromptPayRegisterComponent extends PromptPayRegisterComponent {
    stepwizardStyle: string = this.constants.STYLE_RIB_WEB;

    constructor(public permissionAction: PermissionAction,
        public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
        public constants: Constants,
        public termAndConditionModalService: TermAndConditionModalService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translate: TranslateService,
        public fb: FormBuilder,
        public orderBy: OrderByPipe,
        public utilService: UtilService) {
        super(permissionAction, promptPayRegisterServiceMain, constants, termAndConditionModalService, permissionChangeRoute, translate, fb, orderBy, utilService);
    }
}
