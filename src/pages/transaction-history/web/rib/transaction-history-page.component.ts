import { Component, OnInit } from '@angular/core';
import { TransactionHistoryPage } from '../../transaction-history-page';
import { Constants } from '../../../../share/service/constants';
import { MyAccountService } from '../../../../pages/my-account/my-account.service';
import { FundTransferService } from '../../../../share/service/fund-transfer.service';
import { BillPaymentService } from '../../../bill-payment/bill-payment.service';
import { TranslateService } from 'ng2-translate';
import { UtilService } from '../../../../share/service/util.service';
import { Dateservice } from '../../../../share/service/date.service';
import { ReportService } from '../../../../share/service/report.service';
import { MasterDataService } from '../../../../share/service/master-data.service';
import { PermissionService } from '../../../../share/service/permission.service';

@Component({
    selector: 'transaction-history',
    templateUrl: '../../transaction-history-page.html'
})
export class TransactionHistoryPageComponent extends TransactionHistoryPage implements OnInit {
    constructor(
        public myAccountService: MyAccountService,
        public constants: Constants,
        public fundTransferService: FundTransferService,
        public billPaymentService: BillPaymentService,
        public translateService: TranslateService,
        public utilService: UtilService,
        public dateservice: Dateservice,
        public reportService: ReportService,
        public masterDataService: MasterDataService,
        public permissionService: PermissionService) {
        super(myAccountService, constants, fundTransferService, billPaymentService, translateService, utilService, dateservice, reportService, masterDataService,permissionService);
    }
    ngOnInit() {
        this.webStyle = this.constants.STYLE_RIB_WEB;

        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.timeline = {
            data: {
                rawData: [],
                resetData: true
            },
            title: 'history',
            subtitle: 'fundtransfer'
        };

         if(this.actionCode.MORE_INFO_TRANSFER_HISTORY){
            this.timeline = {
            data: {
                rawData: [],
                resetData: true
            },
            title: 'history',
            subtitle:  'fundtransfer' 
        };
           
        }else if(this.actionCode.MORE_INFO_PAY_BILL_HISTORY){
           
            this.timeline = {
            data: {
                rawData: [],
                resetData: true
            },
            title: 'history',
            subtitle:  'biller' 
        };
        }else if(this.actionCode.MORE_INFO_RTP_HISTORY){
            this.timeline = {
            data: {
                rawData: [],
                resetData: true
            },
            title: 'history',
            subtitle:  'RTP' 
            }
        }


        this.monthList = {
            options: [],
            selected: {
                label: "",
                value: ""
            }
        };
 
        this.historyData = {
            period: '',
            accountNo: '',
            paging: { page: 0, pageSize: '0' }
        };

        this.slipData = {
            refNO: '',
            refTxnID: '',
            acctNameTo: ''
        };

        this.myAccountDropdownlist = {
            data: [],
            selectlabel: 'label.selectAllAccount'
        };

        this.dropdownListPeriodOption = {
            isopen: false
        };

        this.dropdownListAccountOption = {
            isopen: false
        };

        this.slipBillerData = {
            refNO: '',
            refTxnID: '',
            transactionDate: '',
            deductDate: '',
            amount: '',
            fee: '',
            billerAliasName: '',
            ref1: '',
            ref2: '',
            ref3: '',
            status: '',
            recurringDetail: '',
            submitStatus: '',
            categoryId: '',
            transactionRef: ''
        };

        this.initialMonthList().then((result: any) => {
            this.historyData.period = this.monthList.selected.value;
            this.requestHistory();
        });

        this.getMyAccount();
        
    }

}