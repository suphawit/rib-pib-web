import { Component ,OnInit, OnDestroy} from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

import { BillPaymentRequestToPayService } from '../../../bill-payment-request-to-pay.service';
import { BillerRequestToPayAddEditConfirm } from '../../../biller-request-to-pay-add-edit-confirm';
import { BillerProfileBean } from '../../../../../share/bean/biller-profile-bean';
import { UtilService } from '../../../../../share/service/util.service';

@Component({
    selector: 'biller-request-to-pay-add-confirm',
    templateUrl: '../../../biller-request-to-pay-add-edit-confirm.html'
})
export class BillerRequestToPayAddConfirm extends BillerRequestToPayAddEditConfirm implements OnInit, OnDestroy {

    public confirmBillerProfile: BillerProfileBean;
    public isFromAddNewAfterPayBill: boolean;

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

        this.isAdd = true;
        this.verifyOTPStyle = this.constants.STYLE_RIB_WEB;
        this.titlePageBiller = 'label.titleAddBiller';
        this.stepPageBiller  = 'label.stepAddBiller2';

        this.isFromAddNewAfterPayBill = this.billPaymentRequestToPayService.getIsFromAddNewAfterPayBill();

        this.init();
    }

    ngOnDestroy() {
        if(this.permissionChangeRoute.targetAction == 'MANAGE_BILLER.add'){
            this.billPaymentRequestToPayService.setIsFromAddNewAfterPayBill(this.isFromAddNewAfterPayBill);
        }else{
            this.billPaymentRequestToPayService.setIsFromAddNewAfterPayBill(undefined);
        }
    }
}