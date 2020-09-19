import { Component, OnInit } from '@angular/core';

import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { TypeaheadMatch } from 'ng2-bootstrap/typeahead';
import { TranslateService } from "ng2-translate/src/translate.service";

import { Constants } from '../../../../../share/service/constants';
import { UtilService } from '../../../../../share/service/util.service';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';

import { BillerRequestToPayAddEdit } from '../../../biller-request-to-pay-add-edit';
import { BillPaymentRequestToPayService } from '../../../bill-payment-request-to-pay.service';

@Component({
    selector: 'biller-request-to-pay-edit',
    templateUrl: '../../../biller-request-to-pay-add-edit.html'

})
export class BillerRequestToPayEdit extends BillerRequestToPayAddEdit implements OnInit {

    public typeaheadLoading: boolean;
    public typeaheadNoResults: boolean;
    public dataSource: Observable<any>;

    public billerProfileAutoCompleteList: any[] = [];

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
                style: this.constants.STYLE_PIB_WEB
            }
        };

        this.channel = this.constants.CHANNEL_PIB_WEB;
    }

    ngOnInit() {
        this.isAdd = false;
        this.titlePageBiller = 'label.titleEditBiller';
        this.stepPageBiller = 'label.stepEditBiller1';
        this.init();
    }
}