import { Constants } from '../../../service/constants';
import { TransferBean } from '../../../bean/transfer-bean';
import { UtilService } from '../../../service/util.service';
import { Dateservice } from '../../../service/date.service';
import { ReportService } from '../../../service/report.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { PermissionChangeRoute, PermissionService } from '../../../service/permission.service';
import { GetinformationService } from "../../../service/getInformation.service";

@Component({
    selector: 'td-complete',
    templateUrl: './td-complete.html'
})

export class TermDepositComplete implements OnInit, OnDestroy {
    public isDesktop = true;
    menuCode: any;
    authorized: any;
    transferObj: TransferBean = new TransferBean();

    @Input() settings: any = [];

    constructor(
        public constants: Constants,
        private utilService: UtilService,
        private dateservice: Dateservice,
        private reportService: ReportService,
        private permissionService: PermissionService,
        private fundTransferService: FundTransferService,
        private permissionChangeRoute: PermissionChangeRoute,
        private getinformationService: GetinformationService
    ) { }

    ngOnInit(): void {
        this.isDesktop = this.getinformationService.isDesktop();
        //
        this.transferObj = this.fundTransferService.getTransferObj();
        this.authorized = {
            printSlip: this.permissionService.getActionCode().PRINT_SLIP_TRANSFER,
            makeTransaction: this.permissionService.getActionCode().FUND_TRANSFER
        };
        this.menuCode = {
            dashboard: this.settings.styleClass == this.constants.STYLE_RIB_WEB ? "DASHBOARD" : "MY_DEPOSITS",
            fundTransfer: "FUND_TRANSFER"
        }
    }

    ngOnDestroy(): void {
        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.fundTransferService.updateObserver([{ key: 'IS_DATA_READY', value: false }]);
        this.fundTransferService.setTransferObj(null);
    }

    downloadFile(transferObj) {
        let recurringDetail = transferObj.scheduleType.desc + ', ' + transferObj.recurringTime.desc;
        let slipData = {
            refNO: transferObj.refNo,
            refTxnID: (transferObj.refTxnId) ? transferObj.refTxnId : transferObj.refNo,
            acctNameTo: transferObj.destAccount.accName,
            recurringDetail: recurringDetail
        };

        this.getTDTransferSlip(slipData);
    }

    private getTDTransferSlip(data: any) {
        this.reportService.requestTDTransferSlip(data).then((result: any) => {
            let tmpresult = result.responseJSON.result;
          
            if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(tmpresult.value.data, 'KKPBankTransfer_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage, show: true }]);
            }

        }, function (error) {
            
        });
    }

    navigateTo(menuCode): void {
        this.permissionChangeRoute.changeRoute(menuCode);
    }
}
