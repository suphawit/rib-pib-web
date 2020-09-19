import { ChangeDetectorRef } from '@angular/core';
import { BankBean } from '../../../share/bean/bank-bean';
import { Constants } from '../../../share/service/constants';
import { BillPaymentService } from '../bill-payment.service';
import { BillerBean } from '../../../share/bean/biller-bean';
import { AccountBean } from '../../../share/bean/account-bean';
import { UtilService } from '../../../share/service/util.service';
import { BillPaymentBean } from '../../../share/bean/bill-payment-bean';
import { OtherAccountService } from '../../other-account/other-account.service';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { FundTransferStep1 } from '../../fund-transfer/web/fund-transfer-step1';
import { PermissionChangeRoute, PermissionService } from '../../../share/service/permission.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { TranslateService } from 'ng2-translate';
import { BillPaymentRequestToPayService } from '../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { BillerRefNoBean } from '../../../share/bean/biller-ref-no-bean';

export class BillPaymentStep1 extends FundTransferStep1 {

    protected destBillerObj: any = {};
    protected billPaymentObj: BillPaymentBean = null;
    protected isRTP:boolean = false;
    protected currentLang = this.translateService.currentLang;
    constructor(
        public constants: Constants,
        public cdRef: ChangeDetectorRef,
        public fundTransferService: FundTransferService,
        public myAccountService: MyAccountService,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentService: BillPaymentService,
        public otherAccountService: OtherAccountService,
        public bankCodeDataService: BankCodeDataService,
        public utilService: UtilService,
        public translateService: TranslateService,
		public permissionService: PermissionService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService) {

        super(constants, cdRef, fundTransferService, myAccountService, permissionChangeRoute, otherAccountService, bankCodeDataService, utilService, permissionService);
        // this.preLoadEvent();
    }

    updateMyAccount(arg) {
        this.srcAccountObj = arg;
    }

    updateBiller(arg) {
        this.destBillerObj = arg;
console.log(this.destBillerObj)

        // prevent cancel action
        if(arg['ref1'] !== undefined){
            this.getBillAmountOnline(arg);
        }
        
    }

    protected preLoadEvent(): void {
        if (this.permissionChangeRoute.targetAction == 'NEW') {
            this.billPaymentService.setBillPaymentObj(null);
        } else {

            // Pass data from my account/ other account to bill payment
            if (this.utilService.arrayObjectIndexOf(['/my-account/detail', '/my-account/my-deposit', '/dashboard/my-deposit'], this.permissionChangeRoute.prevUrl) !== -1
                && this.myAccountService.selectAccountDetailData != null
                && this.myAccountService.selectAccountDetailData.statusCode !== '2'
                && this.myAccountService.selectAccountDetailData.accountType !== this.constants.ACCOUNT_TYPE_TD) {

                this.module = 'MY_ACCOUNT';
                this.fundTransferService.setTransferObj(null);
            } else if (this.utilService.arrayObjectIndexOf(['/biller-list', '/biller-detail'], this.permissionChangeRoute.prevUrl) !== -1
                && this.billPaymentService.selectBillerDetailData != null) {

                this.module = 'BILLER';
                this.fundTransferService.setTransferObj(null);
            } else if(this.utilService.arrayObjectIndexOf(['/biller-list','/request-to-pay'], this.permissionChangeRoute.prevUrl) !== -1
                && this.billPaymentService.selectBillerDetailData != null){
                    
                this.module = 'BILL_REQUEST_TO_PAY';
                this.fundTransferService.setTransferObj(null);
                this.billPaymentService.setBillPaymentObj(null);
            }
        }

        // Load bill payment form
        this.onLoadEvent();
    }

    private fromPageDataInit(){
        switch (this.module) {
            case 'MY_ACCOUNT':
                this.fromPageMyAccountDataInit();
                break;
            case 'BILLER':
                this.fromPageBillerDataInit();
                break;
            case 'BILL_REQUEST_TO_PAY':
                this.fromPageRTPDataInit();
                break;
            default:
                break;
        }
    }

    private fromPageMyAccountDataInit(){
        this.srcAccountObj = new AccountBean();
        
        let bank = new BankBean();
        bank.bankCode = this.myAccountService.selectAccountDetailData.bankCode;
        bank.bankName = this.myAccountService.selectAccountDetailData.bankName;
        bank.shortName = this.myAccountService.selectAccountDetailData.shortName;
        bank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(bank.bankCode);

        this.srcAccountObj.accId = this.myAccountService.selectAccountDetailData.myAccountID;
        this.srcAccountObj.accName = this.myAccountService.selectAccountDetailData.accName;
        this.srcAccountObj.accNo = this.myAccountService.selectAccountDetailData.myAccountNumber.substring(0,10);
        this.srcAccountObj.accountType = this.myAccountService.selectAccountDetailData.accountType;
        this.srcAccountObj.aliasName = this.myAccountService.selectAccountDetailData.myAccountAliasName;
        this.srcAccountObj.balance = this.myAccountService.selectAccountDetailData.myAvailableBalance;
        this.srcAccountObj.benefitAcc = this.myAccountService.selectAccountDetailData.myLedgerBalance;
        this.srcAccountObj.bank = bank;

        this.billPaymentObj = new BillPaymentBean();
        this.billPaymentObj.fromAccount = this.srcAccountObj;
        this.billPaymentObj.toBiller = new BillerBean();
        this.billPaymentObj.editType = '';
        this.billPaymentService.setBillPaymentObj(this.billPaymentObj);
    }

    private fromPageBillerDataInit(){
        this.billPaymentObj = new BillPaymentBean();
        this.billPaymentObj.fromAccount = new AccountBean();
        this.billPaymentObj.toBiller = this.billPaymentService.selectBillerDetailData;
        this.billPaymentObj.editType = '';
        this.billPaymentService.setBillPaymentObj(this.billPaymentObj);

        this.getBillAmountOnline(this.billPaymentObj.toBiller);
    }

    private fromPageRTPDataInit(){
        this.isRTP=true;
        this.billPaymentObj = new BillPaymentBean();
        let billObj = this.billPaymentService.selectBillerDetailData.billObj;
        let billpayInfo = this.billPaymentService.selectBillerDetailData.billpayInfo;
        
        if(billpayInfo!=null && this.billPaymentService.selectBillerDetailData.errorMessage==undefined){
        let ToBiller = new BillerBean();

        ToBiller.billerAliasName = billObj.requesterAccountName;
        ToBiller.billerID = billpayInfo.billerId;
        ToBiller.billerName = this.translateService.currentLang == 'en'? billpayInfo.companyEn: billpayInfo.companyTh;
        ToBiller.billerProfileId = billpayInfo.billerProfileId;
        ToBiller.companyCode = billpayInfo.companyCode;
        ToBiller.createdDate = billObj.createdDate;
        ToBiller.lastUpdatedDate = billObj.createdDate;
        ToBiller.ref1 = billObj.billReference1;
        ToBiller.ref2 = billObj.billReference2;
        ToBiller.ref3 = billObj.billReference3;
        ToBiller.profileCode = billpayInfo.profileCode;
        ToBiller.promptPayBillerId = billpayInfo.promptPayBillerId;
        ToBiller.serviceCode = billpayInfo.serviceCode;
        this.billPaymentObj.toBiller = ToBiller;

        this.billPaymentObj.payAmount= billObj.amount;
        this.billPaymentObj.rtpReferenceNo = billObj.rtpreference;
        this.billPaymentObj.editType = '';
        this.billPaymentService.setBillPaymentObj(this.billPaymentObj);
        }else{
            this.billPaymentService.updateObserver([
                { key: 'alertmessage', value: this.billPaymentService.selectBillerDetailData.errorMessage, show: true }
            ])
        }

        // this.getBillAmountOnline(this.billPaymentObj.toBiller);
        this.setBillAmountOnlineData(billpayInfo);
        let billReferences = [billObj.billReference1,billObj.billReference2,billObj.billReference3]
        let addNewBillObjForEdit = this.billPaymentRequestToPayService.parseObjToBillerProfileBean(billpayInfo);
        if (addNewBillObjForEdit.refNoList != null) {
            let billerProfileBean = new Array<BillerRefNoBean>();
            addNewBillObjForEdit.refNoList.forEach((element, index) => { 
                element.value = billReferences[index] || "";
            });
        }
        this.billPaymentRequestToPayService.setConfirmBillerProfileForAddNew(addNewBillObjForEdit);

    }

    protected onLoadEvent(): void {
        this.billPaymentService.updateObserver([
            { key: 'stepwizard', value: 0 },
            { key: 'alertmessage', value: '', show: false }
        ]);

        this.permissionChangeRoute.prevUrl = null;
        this.permissionChangeRoute.targetAction = null;
        this.billPaymentObj = this.billPaymentService.getBillPaymentObj() || null;
        if (this.billPaymentObj != null) { 

            if (this.billPaymentObj.editType != '') { this.settings.module = 'BILL_SCHEDULE'; }
            if (this.billPaymentObj.rtpReferenceNo != ''&& this.billPaymentObj.rtpReferenceNo != null) { this.settings.module = 'BILL_REQUEST_TO_PAY'; }
        }

        this.fromPageDataInit();
    }

    private getBillAmountOnline(biller: any){
        // retreive biller info
        this.billPaymentService.inquiryPayInfoOnline(biller).then((result: any)=>{
            // const payAmount = {
            //     value: result.billAmount || null,
            //     isDisable: result.flagAmountFix === 'Y' ? true : false
            // };
            // // re initial setting to trick onchange event

            // this.settings = { module: this.settings.module, styleClass: this.constants.STYLE_RIB_WEB, amountOnline: payAmount };
            
            // // add company code and service code
            // this.destBillerObj.companyCode = result.companyCode || '';
            // this.destBillerObj.serviceCode = result.serviceCode || '';
            if (this.isEDonationCategory(biller.categoryId)) {
                this.setEDonationData(result);
            }else {
                this.setBillAmountOnlineData(result);
            }
        },(error: any)=>{
            this.billPaymentService.updateObserver([
                { key: 'alertmessage', value: error.errorMessage, show: true }
            ]);
        });
    }

    private setBillAmountOnlineData(billpayInfoOnline){
        const payAmount = {
            value: billpayInfoOnline.billAmount,
            isDisable: billpayInfoOnline.flagAmountFix === 'Y'  ? true : false
        };

        if(billpayInfoOnline.billAmount <= 0){
            payAmount.isDisable = false;
        }

        this.settings = { module: this.settings.module, styleClass: this.constants.STYLE_RIB_WEB, amountOnline: payAmount };
        
        // add company code and service code
        this.destBillerObj.companyCode = billpayInfoOnline.companyCode || '';
        this.destBillerObj.serviceCode = billpayInfoOnline.serviceCode || '';
    }

    private setEDonationData(billpayInfoOnline){
        // re initial setting to trick onchange event

        this.settings = { module: this.settings.module, styleClass: this.constants.STYLE_RIB_WEB };

        // add company code and service code
        this.destBillerObj.companyCode = billpayInfoOnline.companyCode || '';
        this.destBillerObj.serviceCode = billpayInfoOnline.serviceCode || '';
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }
}