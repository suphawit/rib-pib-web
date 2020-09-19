import { FormBuilder } from '@angular/forms';
import { UtilService } from '../../../share/service/util.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from "ng2-translate/src/translate.service";
import { StepWizard } from '../../../share/component/step-wizard/step-wizard.component';
import { Constants } from '../../../share/service/constants';
import { ManageBiller } from './shared/manage-biller';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { BillPaymentRequestToPayService } from '../bill-payment-request-to-pay.service';

@Component({
    selector: 'manage-biller-add',
    templateUrl: 'manage-biller-add.html'

})
export class ManageBillerAddPIB extends ManageBiller implements OnInit, OnDestroy {

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
                style: this.constants.STYLE_PIB_WEB
            }
        }
    }

    ngOnInit() {
        this.titlePageBiller = 'label.titleAddBiller';
        this.stepPageBiller = 'label.stepAddBiller1';
        this.init();
        this.autoScaleHeight();
    }

    onClickBack(){
        super.onClickBack();
        this.autoScaleHeight();
        this.utilService.scrollToTop();
    }

    public billerSelected(selected){
        super.billerSelected(selected);
        this.autoScaleHeight();
    }

    collapsedSearch(){
        super.collapsedSearch();
        this.autoScaleHeight();
    }

    private autoScaleHeight() {
        if (window != window.top) {
            this.utilService.setPageHeight(700);
            setTimeout(() => {
                this.utilService.pageLoad();
            })
        }
    }

    ngOnDestroy() {
        if(this.permissionChangeRoute.targetAction !== 'MANAGE_BILLER.add-confirm'){
            this.billPaymentRequestToPayService.setIsFromAddNewAfterPayBill(false);
        }
    }
}