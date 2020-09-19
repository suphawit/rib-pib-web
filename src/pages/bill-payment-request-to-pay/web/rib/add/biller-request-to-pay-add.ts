import { Component, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { Constants } from '../../../../../share/service/constants';
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

import { BillerRequestToPayAddEdit } from '../../../biller-request-to-pay-add-edit';
import { BillPaymentRequestToPayService } from '../../../bill-payment-request-to-pay.service';

@Component({
    selector: 'biller-request-to-pay-add',
    templateUrl: '../../../biller-request-to-pay-add-edit.html'
})
export class BillerRequestToPayAdd extends BillerRequestToPayAddEdit implements OnInit {

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService) {

        super(constants, permissionChangeRoute, billPaymentRequestToPayService, translate, utilService);


        this.stepWizard = {
            input: {
                data: [{ name: '1', label: 'stepWizard.enterDetails' }, { name: '2', label: 'stepWizard.confirm' }],
                step: 0,
                style: this.constants.STYLE_RIB_WEB
            }
        };
        
        this.channel = this.constants.CHANNEL_RIB_WEB;
    }

    ngOnInit() {
        this.isAdd = true;
        this.titlePageBiller = 'label.titleAddBiller';
        this.stepPageBiller = 'label.stepAddBiller1';
        this.init();
    }
}