import { Component ,OnInit} from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

import { BillPaymentRequestToPayService } from '../../../bill-payment-request-to-pay.service';
import { BillerRequestToPayAddEditConfirm } from '../../../biller-request-to-pay-add-edit-confirm';
import { UtilService } from '../../../../../share/service/util.service';

@Component({
    selector: 'biller-request-to-pay-edit-confirm',
    templateUrl: '../../../biller-request-to-pay-add-edit-confirm.html'
})
export class BillerRequestToPayEditConfirm extends BillerRequestToPayAddEditConfirm implements OnInit {

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentRequestToPayService:BillPaymentRequestToPayService,
        protected translate: TranslateService,
        public utilService: UtilService) {
        super(constants, permissionChangeRoute, billPaymentRequestToPayService, translate, utilService);

        this.stepWizard = {
            input: {
                data: [{name: '1', label: 'stepWizard.enterDetails'},{name: '2', label: 'stepWizard.confirm'}],
                step: 1,
                style: this.constants.STYLE_RIB_WEB
            }
        };
    }

    ngOnInit() {

        this.isAdd = false;
        this.titlePageBiller = 'label.titleEditBiller';
        this.stepPageBiller  = 'label.stepEditBiller2';
        this.init();
    }
}