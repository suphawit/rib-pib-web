import { Component, OnInit } from '@angular/core';
import { BillPaymentStep2 } from '../../bill-payment-step2';
import { Constants } from '../../../../../share/service/constants';
import { BillPaymentService } from '../../../bill-payment.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

@Component({
    template: ` 
                <bill-payment-confirm [settings]="settings"></bill-payment-confirm>
              `
})

export class RIBBillPaymentStep2 extends BillPaymentStep2 implements OnInit {

    constructor(public constants: Constants,
        public billPaymentService: BillPaymentService,
        public permissionChangeRoute: PermissionChangeRoute) {
        super(billPaymentService, permissionChangeRoute);
    }

    ngOnInit(): void {
        this.settings = { module: 'BILLPAYMENT', styleClass: this.constants.STYLE_RIB_WEB };
        this.init();
    }
}