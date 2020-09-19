import { Component, OnInit } from '@angular/core';
import { BillPaymentStep3 } from '../../bill-payment-step3';
import { Constants } from '../../../../../share/service/constants';
import { BillPaymentService } from '../../../bill-payment.service';

@Component({
    template: ` 
                <bill-payment-complete></bill-payment-complete>
              `
})

export class RIBBillPaymentStep3 extends BillPaymentStep3 implements OnInit {

    constructor(public constants: Constants,
        public billPaymentService: BillPaymentService) {
        super(billPaymentService);
    }

    ngOnInit(): void {
        this.settings = { module: 'BILLPAYMENT', styleClass: this.constants.STYLE_RIB_WEB };
        this.init();
    }
}