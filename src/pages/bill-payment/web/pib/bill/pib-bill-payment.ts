import { BillPayment } from '../../bill-payment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { BillPaymentService } from '../../../bill-payment.service';
import { TranslateService } from "ng2-translate/src/translate.service";
@Component({
    templateUrl: '../../rib/bill/bill-payment.html'
})

export class PIBBillPayment extends BillPayment implements OnInit, OnDestroy {
    constructor(public constants: Constants, public billPaymentService: BillPaymentService,public translate: TranslateService) {
        super(constants, billPaymentService,translate);
        
    }

    ngOnInit() {
        this.init(this.constants.STYLE_PIB_WEB);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}