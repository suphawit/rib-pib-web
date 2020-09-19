import { BillPayment } from '../../bill-payment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { BillPaymentService } from '../../../bill-payment.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
    templateUrl: './bill-payment.html'
})

export class RIBBillPayment extends BillPayment implements OnInit, OnDestroy {
    constructor(public constants: Constants,
        public billPaymentService: BillPaymentService,
        public translate: TranslateService) {
        super(constants, billPaymentService, translate);
        
    }

    ngOnInit() {
        this.init(this.constants.STYLE_RIB_WEB);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}