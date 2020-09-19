import { OnInit, ViewChild } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../share/service/constants';
import { Dateservice } from '../../share/service/date.service';
import { UtilService } from '../../share/service/util.service';
import { ReportService } from '../../share/service/report.service';
import { BillPaymentService } from '../bill-payment/bill-payment.service';
import { PermissionService } from '../../share/service/permission.service';
import { MasterDataService } from '../../share/service/master-data.service';
import { MyAccountService } from '../../pages/my-account/my-account.service';
import { FundTransferService } from '../../share/service/fund-transfer.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
export class TransactionHistoryPage implements OnInit {

    webStyle: string;
    public actionCode: any;
    dropdownListPeriodOption: { isopen: boolean; };
    dropdownListAccountOption: { isopen: boolean; };
    monthList: { options: Array<any>; selected: any; };
    myAccountDropdownlist: { selectlabel: string; data: Array<any>; };
    public slipData: { refNO: string; refTxnID: string; acctNameTo: string; };
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    public historyData: { period: string; accountNo: string; paging: { page: number; pageSize: string; }; };
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    timeline: {
        data: {
            rawData: any[],
            resetData: boolean
        },
        title: string;
        subtitle: string;
    };

    public slipBillerData: {
        refNO: string;
        refTxnID: string;
        transactionDate: string;
        deductDate: string;
        amount: string;
        fee: string;
        billerAliasName: string;
        ref1: string;
        ref2: string;
        ref3: string;
        status: string;
        recurringDetail: string;
        submitStatus: string;
        categoryId: string;
        transactionRef: string;
    };

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

        this.actionCode = permissionService.getActionCode();
        // this.actionCode.MORE_INFO_TRANSFER_HISTORY = true;
        // this.actionCode.MORE_INFO_PAY_BILL_HISTORY = true;
    }

    ngOnInit(): void {
        if (this.actionCode.MORE_INFO_TRANSFER_HISTORY) {
            this.timeline.subtitle = 'fundtransfer';
        } else if (this.actionCode.MORE_INFO_PAY_BILL_HISTORY) {
            this.timeline.subtitle = 'biller';
        } else if(this.actionCode.MORE_INFO_RTP_HISTORY){
            this.timeline.subtitle = 'RTP';
        }
    }

    switchTransactionType(type: string) {
        this.timeline.subtitle = type;
        this.timeline.data = {
            rawData: [],
            resetData: true
        };
        this.requestHistory();
    }

    selectAccount(account: any) {
        this.utilService.setPageHeight(700);

        if (account === '') {
            this.myAccountDropdownlist.selectlabel = "label.selectAllAccount";
            this.historyData.accountNo = "";
        } else {
            this.myAccountDropdownlist.selectlabel = account.myAccountNumber;
            let accountNo = ''+ account.myAccountNumber;
            const accountNoLen = (accountNo.indexOf('(') > -1) ? accountNo.indexOf('(') : accountNo.length;
            this.historyData.accountNo = accountNo.substring(0, accountNoLen);
        }

        this.requestHistory();
    }

    onActions(result: any) {


        if (result.name === 'print') {
            let data = result.data;

            if (this.timeline.subtitle === 'fundtransfer') {
                this.slipData = {
                    refNO: data.referenceNumber,
                    refTxnID: data.refTxnId,
                    acctNameTo: data.toAliasName
                };



                if (data.fundTransferType === '7' || data.fundTransferType === '8') {
                    this.getTDTransferSlip();
                } else {
                    this.getCASATransferSlip();
                }
            } else {
                let transactionDate = this.dateservice.parseDateTime(data.transactionDate);
                let paymentDate = this.dateservice.parseDate(data.debitDate);
                this.slipBillerData = {
                    refNO: data.referenceNO,
                    refTxnID: data.refTxnID,
                    transactionDate: this.dateservice.formatDate(transactionDate, 'DD MMM YYYY HH:mm:ss', this.translateService.currentLang),
                    deductDate: this.dateservice.formatDate(paymentDate, 'DD MMM YYYY', this.translateService.currentLang),
                    amount: data.payAmount,
                    fee: data.feeAmount,
                    billerAliasName: data.billerAliasName,
                    ref1: data.reference1,
                    ref2: data.reference2,
                    ref3: data.reference3,
                    status: data.paymentStatus,
                    recurringDetail: '',
                    submitStatus: data.paymentStatusDesc,
                    categoryId: data.categoryId,
                    transactionRef: data.transactionRef
                };

                if (typeof data.scheduleType.desc !== 'undefined') {
                    this.slipBillerData.recurringDetail = data.scheduleType.desc + ', ' + data.recurringTime.desc;
                }


                this.getBillerSlip();
            }
        }
    }

    private onError(responseData: any) {
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: responseData.responseStatus.errorMessage,
            show: true,
            option: {}
        };
        this.alertMessage.show();
    }

    public getMyAccount() {
        this.myAccountService.requestDashboard().then((objResponse: any) => {
            let result = objResponse.responseJSON.result;


            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.myAccountDropdownlist.data = result.value;
            } else {
                this.onError(result);
            }

        }, function (error) {

        });
    }

    public getFundTransferHistory() {
        this.timeline.data.rawData = [];
        this.fundTransferService.requestInquiryHistoryFundtransfer(this.historyData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.timeline.data = {
                    rawData: result.value || [],
                    resetData: false
                };
            } else {

                this.onError(result);
            }

        }, function (error) {

        });

        
    }

    public getBillerHistory() {
        this.timeline.data.rawData = [];
        this.billPaymentService.requestInquiryHistoryBiller(this.historyData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                console.log('result.value.historys.items', result.value.historys.items)
                this.timeline.data = {
                    rawData: result.value.historys.items || [],
                    resetData: false
                };

            } else {
                this.onError(result);
            }

        }, function (error) {

        });
    }

    public getRTPHistory() {
        this.billPaymentService.requestRTPHistory(this.historyData).then((result: any) => {
            let tmpresult = result.responseJSON.result;
            if (tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.timeline.data = {
                    rawData: tmpresult.value.rtpInfoDetailList || [],
                    resetData: false
                };
            } else {
                this.onError(tmpresult);
            }

        }, function (error) {

        });
    }

    public initialMonthList() {
        let p = new Promise((resolve, reject) => {
            this.masterDataService.getCurrentDate().then((result: any) => {
                let currDate = result;
                let currMonth = currDate.getMonth() + 1;
                let currYear = currDate.getFullYear();
                let month;

                for (let count = 0; count < 6; count++) {
                    currMonth--;
                    if (currMonth < 0) {
                        currYear = currDate.getFullYear() - 1;
                        currMonth = 12 + currMonth;
                    }
                    if (currMonth < 9) {
                        month = "0" + (currMonth + 1);
                    } else {
                        month = currMonth + 1;
                    }
                    let json = {
                        "label": this.constants.MONTH_FULLNAME[this.translateService.currentLang][currMonth] + " " + currYear,
                        "value": currYear + "-" + month
                    };
                    this.monthList.options.push(json);
                    if (count === 0) {
                        this.monthList.selected = json;
                    }
                }
                resolve(true);
            });
        });

        return p;
    }

    onChangePeriod(period: any) {
        this.utilService.setPageHeight(700);
        this.historyData.period = period.value;
        this.monthList.selected = period;
        this.requestHistory();
    }

    public getCASATransferSlip() {
        this.reportService.requestCASATransferSlip(this.slipData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(result.value.data, 'KKPBankTransfer_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.onError(result);
            }

        }, function (error) {

        });
    }

    public getTDTransferSlip() {
        this.reportService.requestTDTransferSlip(this.slipData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(result.value.data, 'KKPBankTransfer_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.onError(result);
            }

        }, function (error) {

        });
    }

    public getBillerSlip() {


        this.billPaymentService.requestBillPaymentSlip(this.slipBillerData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.utilService.downloadStreamFile(result.value.data, 'KKPBankBillPayment_' + this.dateservice.formatDate(new Date(), 'YYYYMMDD') + '.pdf');
            } else {
                this.onError(result);
            }

        }, function (error) {

        });
    }

    public requestHistory() {
        if (this.timeline.subtitle === 'fundtransfer' && this.actionCode.MORE_INFO_TRANSFER_HISTORY) {
            this.getFundTransferHistory();
        } else if (this.timeline.subtitle === 'biller' && this.actionCode.MORE_INFO_PAY_BILL_HISTORY) {
            this.getBillerHistory();
        }  else if (this.timeline.subtitle === 'RTP'){
            this.getRTPHistory();
        }
    }

    public trackByFn(index, item) {
        return index;
    }
}
