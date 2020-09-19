import { Constants } from '../../../service/constants';
import { Component, OnInit } from '@angular/core';
import { TransferBean } from '../../../bean/transfer-bean';
import { BankCodeDataService } from '../../../service/bankcode-data.service';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { PermissionChangeRoute } from '../../../service/permission.service';

@Component({
    selector: 'td-confirm',
    templateUrl: './td-confirm.html'
})

export class TermDepositConfirm implements OnInit {

    model: any = {
        note: ""
    };

    public submitted: boolean = false;
    private prevStep: string = 'FUND_TRANSFER'; // 'transfer/step1';
    private nextStep: string = 'FUND_TRANSFER.COMPLETE'; // 'transfer/step3';
    private transferObj: TransferBean = new TransferBean();

    constructor(
        public constants: Constants,
        public bankCodeDataService: BankCodeDataService,
        private fundTransferService: FundTransferService,
        private permissionChangeRoute: PermissionChangeRoute
    ) {
    }

    ngOnInit(): void {
        this.transferObj = this.fundTransferService.getTransferObj();
    }

    goToNextStep(data): void {
        //
        this.transferObj.note = data.note;

        this.fundTransferService.submitFundTransferTermDeposit(this.transferObj).then((result: any) => {
            if (typeof result.responseCode === "undefined") {
                this.fundTransferService.setTransferObj(result);
                this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                this.permissionChangeRoute.changeRoute(this.nextStep);
            } else {
                //
                this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
            }
        });
    }

    goToPrevStep(): void {
        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.fundTransferService.updateObserver([{ key: 'IS_DATA_READY', value: false }]);
        this.permissionChangeRoute.changeRoute(this.prevStep);
    }
}
