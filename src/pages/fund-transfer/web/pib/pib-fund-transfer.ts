import { FundTransfer } from '../fund-transfer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
import { UtilService } from '../../../../share/service/util.service';
@Component({
    templateUrl: './fund-transfer.html'
})

export class PIBFundTransfer extends FundTransfer implements OnInit, OnDestroy {

    constructor(public constants: Constants,
        public fundTransferService: FundTransferService,
        public translate: TranslateService,
        public utilService: UtilService) {
        super(constants, fundTransferService, translate,utilService);
    }

    ngOnInit() {
        this.init(this.constants.STYLE_PIB_WEB);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}