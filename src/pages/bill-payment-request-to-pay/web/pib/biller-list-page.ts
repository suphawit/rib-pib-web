import { Component, OnInit } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";

import { PermissionService, PermissionChangeRoute } from '../../../../share/service/permission.service';
import { Constants } from '../../../../share/service/constants';
import { BillerRequestToPayList } from '../../biller-list';
import { BillPaymentRequestToPayService } from '../../bill-payment-request-to-pay.service';
@Component({
  selector: 'biller-list',
  templateUrl: '../../biller-list.html' 
})
export class BillerRequestToPayListPage extends BillerRequestToPayList implements OnInit {

    constructor(public permissionChangeRoute: PermissionChangeRoute,
        public permissionService: PermissionService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        public constants: Constants,
        protected translate: TranslateService) {
            super(constants, permissionChangeRoute, permissionService, billPaymentRequestToPayService, translate)
    }

    ngOnInit() {
        this.init();
        this.pageStyle = this.constants.STYLE_PIB_WEB;
    }
}