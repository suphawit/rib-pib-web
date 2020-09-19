import { ViewChild } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { BillPaymentRequestToPayService } from '../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { Constants } from '../../share/service/constants';
export class BillerRequestToPayList {
      
    @ViewChild('alertMessage') public alertMessage:AlertMessageComponent;

    public pageStyle:any;
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    private isShowAddBiller: boolean = true;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public permissionService: PermissionService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        protected translate: TranslateService) {
        
    }

    init() {
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };
        if(typeof this.billPaymentRequestToPayService.alertConfig !== 'undefined'){
            this.alertConfig = this.billPaymentRequestToPayService.alertConfig;
            this.alertMessage.show();
            this.billPaymentRequestToPayService.alertConfig = undefined;
        }
        this.billPaymentRequestToPayService.setConfirmBillerProfile(null);
    }

    onStatus(data: any): void {
        let msg;
        if (data.msg === 'error') {
            msg = data.data.errorMessage;
        } else if (data.msg === 'no result') {
            msg = this.translate.instant(this.constants.RESP_CODE_BILLER_NOT_FOUND);
        } else {
            msg = '';
        }

        this.alertConfig = { title: '', type: 'danger', message: msg, show: true, option: {} };

        if (msg != '') {
            this.alertMessage.show();
        } else {
            this.alertMessage.hide();
        }
    }


    gotoAddBillPaymentPage(){
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.add');
    }

    gotoEditBillPaymentPage(){
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.edit');
    }

    navigateToBillerDetail(){
        this.permissionChangeRoute.changeRoute('MANAGE_BILLER.detail');
    }
}