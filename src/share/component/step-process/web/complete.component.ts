import { Constants } from '../../../service/constants';
import { TransferBean } from '../../../bean/transfer-bean';
import { UtilService } from '../../../service/util.service';
import { Dateservice } from '../../../service/date.service';
import { ReportService } from '../../../service/report.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { PermissionChangeRoute, PermissionService } from '../../../service/permission.service';

import { NotificationService } from "../../../service/notification.service";
import { RequestToPayService } from '../../../../pages/request-to-pay/request-to-pay.service';
import { GetinformationService } from "../../../service/getInformation.service";
@Component({
    selector: 'complete',
    templateUrl: './complete.html'
})

export class Complete implements OnInit, OnDestroy {
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
        private fundTransferService: FundTransferService,
        private permissionChangeRoute: PermissionChangeRoute,
        private permissionService: PermissionService,
        public notificationService: NotificationService,
        public requestToPayService:RequestToPayService,
		private getinformationService: GetinformationService
    ) { }

    ngOnInit(): void {
        this.isDesktop = this.getinformationService.isDesktop();
        
        this.transferObj = this.fundTransferService.getTransferObj();
       
        this.getBadgeList(this.transferObj);

        this.authorized = {
            printSlip: this.permissionService.getActionCode().PRINT_SLIP_TRANSFER,
            makeTransaction: this.permissionService.getActionCode().FUND_TRANSFER,
            addNewOtherAccount: this.permissionService.getShortcutActionCodePermission('OTHER_ACCOUNTS','MANAGE_OTHER_ACCOUNTS')
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
        
        let slipData = {
            refNO: transferObj.refNo,
            refTxnID: (transferObj.refTxnId) ? transferObj.refTxnId : transferObj.refNo,
            acctNameTo: transferObj.destAccount.accName
        };
        if (transferObj.recurringType === this.constants.RECURRING_TYPE_YES) {
            if (typeof transferObj.scheduleType.desc !== 'undefined') {
                slipData['recurringDetail'] = transferObj.scheduleType.desc + ', ' + transferObj.recurringTime.desc;
            }
        }
        this.getCASATransferSlip(slipData);
    }

    private getCASATransferSlip(data: any) {
   
        this.reportService.requestCASATransferSlip(data).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;
           
            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(result.value.data, 'KKPBankTransfer_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage, show: true }]);
            }

        }, function (error) {
            
        });
    }

    addToAccount(transferObj) {
        let destAccount = transferObj.destAccount;
        destAccount.email = transferObj.notifyEmail;
        destAccount.mobileNo = transferObj.notifyMobileNo;
        destAccount.notifyLang = transferObj.notifyLang;
        destAccount.txnId = transferObj.txnId;
        destAccount.refTxnId = transferObj.refTxnId;
        this.fundTransferService.newAccountAfterFund = destAccount;
        
        if (transferObj.addAccountType === 'OTHER_ACCOUNT') {
            this.permissionChangeRoute.changeRoute('OTHER_ACCOUNTS.add1');
        } else {
            this.permissionChangeRoute.changeRoute('MY_DEPOSITS.ADD');
        }
    }

    navigateTo(menuCode): void {
        this.permissionChangeRoute.changeRoute(menuCode);
    }


    private getBadgeList(data: any) {
        
        if(  data.transferDecisionList[0].transferStatus.code === "SC" && data.rtpReferenceNo !== null){
            this.notificationService.updateBadgeMenuCount();
        }
    }

}
