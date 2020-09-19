import { ViewChild, OnInit } from '@angular/core';
import { BankBean } from '../../share/bean/bank-bean';
import { Constants } from '../../share/service/constants';
import { BillerBean } from '../../share/bean/biller-bean';
import { AccountBean } from '../../share/bean/account-bean';
import { CategoryBean } from '../../share/bean/category-bean';
import { TransferBean } from '../../share/bean/transfer-bean';
import { UtilService } from '../../share/service/util.service';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';
import { AccountService } from '../../share/service/account.service';
import { BillPaymentBean } from '../../share/bean/bill-payment-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { ScheduleTypeBean } from '../../share/bean/schedule-type-bean';
import { RecurringTimeBean } from '../../share/bean/recurring-time-bean';
import { BillPaymentService } from '../bill-payment/bill-payment.service';
import { MasterDataService } from '../../share/service/master-data.service';
import { FundTransferService } from '../../share/service/fund-transfer.service';
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { PermissionService } from '../../share/service/permission.service';
import { BillerProfileBean } from '../../share/bean/biller-profile-bean';

export class SchedulePage implements OnInit {

    webStyle: string;
    public banks: any;
    public accounts: any;
    public actionCode: any;
    public anyIDTypeList: any;
    public scheduleData: { period: string; };
    public scheduleType: string = 'fundtransfer';
    dropdownListPeriodOption: { isopen: boolean; };
    monthList: { options: Array<any>; selected: any; };
    public messageModalData:any;
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    timeline: { data: { rawData: Array<any>, isAdded: boolean , resetData:boolean}, title: string; subtitle: string; };

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public constants: Constants,
        public translate: TranslateService,
        public fundTransferService: FundTransferService,
        public billPaymentService: BillPaymentService,
        public bankCodeDataService: BankCodeDataService,
        public masterDataService: MasterDataService,
        public permissionService: PermissionService,
        public accountService: AccountService,
        public utilService: UtilService) {

        this.actionCode = permissionService.getActionCode();
    }

    ngOnInit(): void {
        if (this.actionCode.VIEW_TRANSFER_SCHEDULE) {
            this.timeline.subtitle = 'fundtransfer';
        } else if (this.actionCode.VIEW_BILL_PAYMENT_SCHEDULE) {
            this.timeline.subtitle = 'biller';
        }
    }

    switchScheduleType(type: string) {
        this.timeline.subtitle = type;
        this.scheduleType = type;
        this.timeline.data = { rawData: [], isAdded: false, resetData: true };
        this.requestSchedule();
    }

    requestSchedule() {
        if (this.timeline.subtitle === 'fundtransfer' && this.actionCode.VIEW_TRANSFER_SCHEDULE) {
            this.getFundTransferSchedule();
        } else if (this.timeline.subtitle === 'biller' && this.actionCode.VIEW_BILL_PAYMENT_SCHEDULE) {
            this.getBillPaymentSchedule();
        }
    }

    public onError(responseData: any) {
        this.alertConfig.message = responseData.errorMessage;
        this.alertConfig.type = 'danger';
        this.alertMessage.show();
    }

    public getFundTransferSchedule() {
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypeList = result;
        });

        this.fundTransferService.requestInquiryFundTransferSchedule(this.scheduleData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.timeline.data = {
                    rawData: result.value,
                    isAdded: false,
                    resetData: false
                };

            } else {
                this.onError(result.responseStatus);
            }

        }, function (error) {

        });
    }

    public getBillPaymentSchedule() {
        this.billPaymentService.requestInquiryBillerSchedule(this.scheduleData).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.timeline.data = {
                    rawData: result.value,
                    isAdded: false,
                    resetData: false
                };

            } else {
                this.onError(result.responseStatus);
            }
        }, function (error) {

        });
    }


    // Populate Fund Transfer Object
    public populateTranferObj(data: any): TransferBean {


        let srcAccount = this.accounts.find(x => x.accNo == data.fromAccountNumber) || {};

        let category = new CategoryBean();
        category.catId = data.toCategoryID == -1 ? 999 : Number(data.toCategoryID);

        let anyIDType = this.anyIDTypeList[data.anyIDType] || new AnyIDTypeBean();

        let destAccount = new AccountBean();
        destAccount.accId = data.toAccountID;
        destAccount.accNo = data.toAccountNumber;
        destAccount.accName = data.toAccountName || "";
        destAccount.aliasName = data.toAccountAliasName || ""; //toAliasName
        destAccount.category = category;

        if (data.anyIDType == this.constants.ANYID_TYPE_BANK_ACCOUNT) {
            let destBank = this.banks.find(x => x.bankCode == data.bankCode);
            destBank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(destBank.bankCode);
            destAccount.bank = destBank;
        } else {
            anyIDType.shortName = data.shortNameTo;
        }

        destAccount.anyIDType = anyIDType;

        let scheduleType = new ScheduleTypeBean();
        scheduleType.schedTypeId = data.scheduleType || 0;

        let recurringTime = new RecurringTimeBean();
        recurringTime.time = data.recurringTimes || 0;
        recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

        let transferObj = new TransferBean();
        transferObj.srcAccount = srcAccount;
        transferObj.destAccount = destAccount;
        transferObj.scheduleType = scheduleType;
        transferObj.recurringTime = recurringTime;

        transferObj.effectiveDate = data.transferDate;
        transferObj.notifyLang = (data.msgLanguage) ? data.msgLanguage.toUpperCase() : null;
        transferObj.notifyMobileNo = data.toMobileNumber;
        transferObj.notifyEmail = data.toEmail;
        transferObj.refNo = data.refNo;
        transferObj.transactionRef = data.transactionRef;
        transferObj.txnDate = data.txnDate;
        transferObj.recvDate = data.txnReceiveDate || "";
        transferObj.note = data.memo;
        transferObj.transferAmount = data.amount;
        transferObj.isAllowPrint = data.canPrintSlip;
        transferObj.txnId = data.transactionID;
        transferObj.txnMasId = data.masterTransactionID;
        transferObj.refTxnId = data.refTxnId;
        transferObj.editType = data.editType;
        transferObj.immediateType = this.constants.IMMEDIATE_TYPE_LATER;

        if (data.editType == this.constants.EDIT_TYPE_THIS_TIME) {
            transferObj.recurringType = this.constants.RECURRING_TYPE_NO;
        } else {
            transferObj.recurringType = this.constants.RECURRING_TYPE_YES
        }

        return transferObj;
    }

    public populateBillPaymentObj(data: any): BillPaymentBean {


        let srcBank = new BankBean();
        srcBank.bankCode = data.fromBankCode;
        srcBank.bankName = data.fromBankName;
        srcBank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(srcBank.bankCode);

        let srcAccount = new AccountBean();
        srcAccount.accId = data.fromAccountID;
        srcAccount.accNo = data.fromAccountNumber;
        srcAccount.accName = data.fromAccountName;
        srcAccount.aliasName = data.fromAliasName;
        srcAccount.bank = srcBank;

        let destBiller = new BillerBean();
        destBiller.billerAliasName = data.billerAliasName;
        destBiller.billerID = data.billerID;
        destBiller.billerName = data.billerName;
        destBiller.ref1 = data.reference1;
        destBiller.ref2 = data.reference2;
        destBiller.ref3 = data.reference3;
        destBiller.billerProfileId = data.billerProfileId;
        destBiller.logoCompany = this.utilService.getBillerIcon(data);
        destBiller.isAddNewToBiller = (data.addNewBillerFlag == this.constants.YES_STATUS);
        
        let scheduleType = new ScheduleTypeBean();
        scheduleType.schedTypeId = data.scheduleType || 0;

        let recurringTime = new RecurringTimeBean();
        recurringTime.time = data.recurringTimes || 0;
        recurringTime.desc = recurringTime.time + " " + (recurringTime.time == 0 || recurringTime.time == 1 ? this.translate.instant("lbl.time") : this.translate.instant("lbl.times"));

        let billPaymentObj = new BillPaymentBean();
        billPaymentObj.fromAccount = srcAccount;
        billPaymentObj.toBiller = destBiller;
        billPaymentObj.scheduleType = scheduleType;
        billPaymentObj.recurringTime = recurringTime;

        billPaymentObj.effectiveDate = data.paymentDate;
        billPaymentObj.referenceNO = data.referenceNO;
        billPaymentObj.transactionRef = data.transactionRef;
        billPaymentObj.transactionDate = data.transactionDate;
        billPaymentObj.memo = data.memo;
        billPaymentObj.payAmount = data.payAmount;
        billPaymentObj.feeAmount = data.feeAmount;
        billPaymentObj.transactionID = data.transactionID;
        billPaymentObj.masterTransactionID = data.masterTransactionID;
        billPaymentObj.refTxnID = data.refTxnID;
        billPaymentObj.editType = data.editType;
        billPaymentObj.immediateType = this.constants.IMMEDIATE_TYPE_LATER;
        billPaymentObj.profileCode = data.profileCode;
        billPaymentObj.promptpayBillerId = data.promptpayBillerId;
        billPaymentObj.rtpReferenceNo = data.rtpRef;
        
        if (data.editType == this.constants.EDIT_TYPE_THIS_TIME) {
            billPaymentObj.recurringType = this.constants.RECURRING_TYPE_NO;
        } else {
            billPaymentObj.recurringType = this.constants.RECURRING_TYPE_YES
        }


        return billPaymentObj;
    }

    public initialMonthList() {
        let p = new Promise((resolve, reject) => {
            this.masterDataService.getCurrentDate().then((result: any) => {
                let month;
                let currDate = result;
                let currMonth = currDate.getMonth();
                let currYear = currDate.getFullYear();
                let period = 6;

                // set first option
                let json = {
                    "label": this.translate.instant('lbl.allSchedule'),
                    "value": ''
                };

                this.monthList.options.push(json);
                //this.monthList.selected = json;

                for (let count = 0; count < period; count++) {
                    if (currMonth > 11) {
                        currYear = currDate.getFullYear() + 1;
                        currMonth = 0;
                    }

                    if (currMonth < 9) {
                        month = "0" + (currMonth + 1);
                    } else {
                        month = currMonth + 1;
                    }
                    json = {
                        "label": this.constants.MONTH_FULLNAME[this.translate.currentLang][currMonth] + " " + currYear,
                        "value": currYear + "-" + month
                    };
                    this.monthList.options.push(json);
                    
                    currMonth++;
                    // select current month
                    if(count === 0){
                        this.monthList.selected = json;
                        this.scheduleData.period = this.monthList.selected.value;
                    }
                }

                resolve(true);
            });
        });

        return p;
    }

    onChangePeriod(period: any) {

        this.utilService.setPageHeight(700);

        if (this.timeline.subtitle === 'fundtransfer') {
            this.scheduleType = 'fundtransfer';
        } else {
            this.scheduleType = 'biller';
        }

        this.monthList.selected = period;
        this.scheduleData.period = this.monthList.selected.value;
        this.requestSchedule();
    }

    public trackByFn(index, item) {
        return index;
    }
}
