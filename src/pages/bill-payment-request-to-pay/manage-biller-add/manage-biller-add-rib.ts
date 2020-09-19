import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from "ng2-translate/src/translate.service";
import { ManageBiller } from './shared/manage-biller';
import { StepWizard } from '../../../share/component/step-wizard/step-wizard.component';
import { Constants } from '../../../share/service/constants';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { BillPaymentRequestToPayService } from '../bill-payment-request-to-pay.service';
import { UtilService } from '../../../share/service/util.service';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'manage-biller-add',
    templateUrl: 'manage-biller-add.html'

})
export class ManageBillerAddRIB extends ManageBiller implements OnInit, OnDestroy {
    public stepWizard: StepWizard;
    public manageBiller: ManageBiller;
    public titlePageBiller: string;
    public stepPageBiller: string;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService,
        public formbuilder: FormBuilder,
    ) {
        super(constants, permissionChangeRoute, billPaymentRequestToPayService, translate,formbuilder);
        this.stepWizard = {
            input: {
                data: [
                    { name: '1', label: 'stepWizard.enterDetails' }, 
                    { name: '2', label: 'stepWizard.confirm' }
                ],
                step: 0,
                style: this.constants.STYLE_RIB_WEB
            }
        }
    }

    ngOnInit() {
        this.titlePageBiller = 'label.titleAddBiller';
        this.stepPageBiller = 'label.stepAddBiller1';
        this.init();
    }

    onClickBack(){
        super.onClickBack();
    }

    ngOnDestroy() {
        if(this.permissionChangeRoute.targetAction !== 'MANAGE_BILLER.add-confirm'){
            this.billPaymentRequestToPayService.setIsFromAddNewAfterPayBill(false);
        }
    }
}