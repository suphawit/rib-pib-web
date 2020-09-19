import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';
import { BillPaymentService } from '../../../../bill-payment.service';
import { BillerBean } from '../../../../../../share/bean/biller-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { UtilService } from '../../../../../../share/service/util.service';
import { Dateservice } from '../../../../../../share/service/date.service';
import { BillPaymentBean } from '../../../../../../share/bean/bill-payment-bean';
import { DropdownDataService } from '../../../../../../share/service/dropdown.service';
import { MasterDataService } from '../../../../../../share/service/master-data.service';
import { FundTransferService } from '../../../../../../share/service/fund-transfer.service';
import { CurrencyFormatterPipe } from '../../../../../../share/pipe/currency-formatter.pipe';
import { PermissionService, PermissionChangeRoute } from '../../../../../../share/service/permission.service';
import { InputDetails } from '../../../../../../share/component/step-process/web/input-details.component';
import * as moment from 'moment';
import {MessageModalComponent} from "../../../../../../share/component/modal-messages.component";
import {BillPaymentRequestToPayService} from "../../../../../bill-payment-request-to-pay/bill-payment-request-to-pay.service";

require("!style-loader!css-loader!sass-loader!./bill-payment-input-detail.scss");

@Component({
    selector: 'bill-payment-input-details',
    templateUrl: './bill-payment-input-details.html'
})

export class BillPaymentInputDetails extends InputDetails implements OnInit {

    private billPaymentObj: BillPaymentBean = null;
    @Input() toBiller: BillerBean;
    @ViewChild('sendToRDModal') public childModal: MessageModalComponent;
    private userCardType: string;
    messageModalData: {data: any, valid: any};
    private todayDate;

    constructor(public constants: Constants,
        public translate: TranslateService,
        public dateService: Dateservice,
        public masterDataService: MasterDataService,
        public dropdownDataService: DropdownDataService,
        public fundTransferService: FundTransferService,
        public currencyFormatter: CurrencyFormatterPipe,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentService: BillPaymentService,
        public permissionService: PermissionService,
        public utilService: UtilService,
        public translateService: TranslateService
    ) {
        super(constants, translate, dateService, masterDataService, dropdownDataService, fundTransferService, currencyFormatter, permissionChangeRoute, permissionService,utilService);
    }

    ngOnInit(): void {
        let isImmediateType = false;

        this.nextStep = 'PAY_BILL.STEP2';
        //this.nextStep = 'MANAGE_SCHEDULE.PAYBILL2';
        this.dateOptions = this.dateService.getMasterDates();
        this.immediateTypes = this.dropdownDataService.immediateTypes;
        this.recurringTypes = this.dropdownDataService.recurringTypes;
        this.notifyLanguages = this.dropdownDataService.notifyLanguages;
        this.model.transferDate = this.dateService.formatDate(this.dt, 'dddd D MMMM YYYY', this.currentLang);
        this.model.notifyLanguage = this.currentLang;
        this.model.notifyLanguageDisplay = this.notifyLanguages.find(x => x.value == this.model.notifyLanguage).display;

	    this.masterDataService.getRecurringTimeList().then((result: any) => {
            this.recurringTimes = result;
        });

        this.masterDataService.getAllScheduleList().then((result: any) => {
            this.scheduleTypes = result;
        });

        this.billPaymentObj = this.billPaymentService.getBillPaymentObj();
        if (this.billPaymentObj != null) {
            this.fromAccount = this.billPaymentObj.fromAccount;
            this.toBiller = this.billPaymentObj.toBiller;
            this.model.immediateType = this.billPaymentObj.immediateType || this.constants.IMMEDIATE_TYPE_TODAY;
            this.model.scheduleType = this.billPaymentObj.scheduleType.schedTypeId || 0;
            this.model.recurringType = this.billPaymentObj.recurringType !== undefined && this.model.editType != '0' ? this.billPaymentObj.recurringType : this.constants.RECURRING_TYPE_NO;
            this.model.recurringTime = this.billPaymentObj.recurringTime !== undefined ? this.billPaymentObj.recurringTime.time : 0;
            this.model.amount = this.currencyFormatter.transform(this.billPaymentObj.payAmount) || "0.00";
            this.model.note = this.billPaymentObj.memo || "";
            this.model.editType = this.billPaymentObj.editType || "";
            this.model.txnId = this.billPaymentObj.transactionID || "";
            this.model.txnMasId = this.billPaymentObj.masterTransactionID || "";
            this.model.referenceNO = this.billPaymentObj.referenceNO || "";
            //RTP 
            this.model.isRTP = this.billPaymentObj.rtpReferenceNo? true:false; //for detect RTP types
            if(this.model.isRTP){
                this.model.disableAmount = false;
                this.settings.module = "BILL_REQUEST_TO_PAY";
            }
            if(this.settings.module == "BILL_REQUEST_TO_PAY"){
                this.model.reference1 = this.billPaymentObj.toBiller.ref1||"";
                this.model.reference2 = this.billPaymentObj.toBiller.ref2||"";
                this.model.reference3 = this.billPaymentObj.toBiller.ref3||"";
                this.model.profileCode = this.billPaymentObj.toBiller.profileCode||"";
                this.model.rtpReferenceNo = this.billPaymentObj.rtpReferenceNo||"";
            }else if(this.settings.module == "BILL_SCHEDULE"){

                this.model.profileCode = this.billPaymentObj.profileCode || "";
                this.model.promptPayBillerId = this.billPaymentObj.promptpayBillerId || "";
            }

            if (this.model.immediateType === this.constants.IMMEDIATE_TYPE_LATER) {
                this.dt = this.dateService.parseDate(this.billPaymentObj.effectiveDate);
                this.model.transferDate = this.dateService.formatDate(this.dt, "dddd D MMMM YYYY", this.translate.currentLang);
                isImmediateType = true;
            }
            
            this.onRecTypeChange(this.model.recurringType);

            // Clear billPaymentObj
            this.billPaymentObj = null;
            this.billPaymentService.setBillPaymentObj(this.billPaymentObj);
        }
            this.masterDataService.getCurrentDate().then((result: any) => {
                let dt = result;
                this.today = this.dateService.formatDate(dt, 'DD/MM/YYYY');
                this.minDate = dt;
                this.maxDate = this.model.isRTP === true? moment(this.minDate).toDate() : moment(this.minDate).add(180, 'days').toDate();
                if(!isImmediateType) {
                    this.dt = dt
                    this.model.transferDate = this.dateService.formatDate(dt, "dddd D MMMM YYYY", this.currentLang);
                }

                this.todayDate = this.dateService.formatDate(dt, "dddd D MMMM YYYY", this.currentLang);
            });
        if (this.isEDonationCategory(this.toBiller.categoryId)) {
            this.model.sendToRDType = this.toBiller.ref2;
        }
        
        this.billPaymentService.getCustomerType().then((result: any) => {
            this.userCardType = result;
        });

        this.messageModalData = {
            data: '',
            valid: ''
        }
    }

    ngOnChanges(changed: any): void {
        if(changed.settings !== undefined && changed.settings.currentValue !== undefined && changed.settings.currentValue.amountOnline !== undefined) {
            this.model.disableAmount = changed.settings.currentValue.amountOnline.isDisable;
            if(changed.settings.currentValue.amountOnline.value != null){
                this.model.amount = this.currencyFormatter.transform(changed.settings.currentValue.amountOnline.value) || "0.00";
            }
            //set 0 if select e-donation
            if (this.isEDonationCategory(this.toBiller.categoryId)) {
                this.model.amount = "0.00";
            }
        }
    }

    goToNextStep(data, valid): void {




        this.submitted = true;

        if (this.fromAccount.accNo !== undefined && this.toBiller.billerID !== undefined && valid) {
            let effectiveDate = this.dateService.formatDate(this.dt, 'DD/MM/YYYY');



            let promise = null;
            let scheduleType = data.scheduleType || 0;
            let recurringTime = data.recurringTime || 0;

            if (this.isEDonationCategory(this.toBiller.categoryId)) {
                scheduleType = 0;
                recurringTime = 0;
                effectiveDate = this.dateService.formatDate(new Date(this.minDate), 'DD/MM/YYYY');
                this.model.transferDate = this.todayDate;
            }

            let billPaymentBean = new BillPaymentBean();
            billPaymentBean.fromAccount = this.fromAccount;
            billPaymentBean.toBiller = this.toBiller;
            billPaymentBean.payAmount = +this.currencyFormatter.parse(this.model.amount!=undefined ?this.model.amount:data.amount);
            billPaymentBean.effectiveDate = effectiveDate;
            billPaymentBean.paymentDate = effectiveDate;
            billPaymentBean.msgLanguage = this.translate.currentLang;
            billPaymentBean.recurringType = this.model.editType != '0' ? data.recurringType : this.constants.RECURRING_TYPE_NO;
            billPaymentBean.recurringTime = this.recurringTimes.find(x => x.time == recurringTime) || {};
            billPaymentBean.scheduleType = this.scheduleTypes.find(x => x.schedTypeId == scheduleType) || {};
            billPaymentBean.memo = data.note;
            billPaymentBean.editType = data.editType || "";
            billPaymentBean.transactionID = data.txnId || "";
            billPaymentBean.masterTransactionID = data.txnMasId || "";
            billPaymentBean.referenceNO = data.referenceNO;
            billPaymentBean.custName = this.permissionService.getUserData().fullNameEN+' '+this.permissionService.getUserData().fullSurNameEN;
            billPaymentBean.immediateType = this.today == effectiveDate ? this.constants.IMMEDIATE_TYPE_TODAY : this.constants.IMMEDIATE_TYPE_LATER;
            
            if (this.settings.module == "BILLPAYMENT" || this.settings.module == "BILL_REQUEST_TO_PAY") {
                if(this.model.isRTP){
                    billPaymentBean.immediateType = this.constants.IMMEDIATE_TYPE_TODAY;//default as today
                    billPaymentBean.toBiller.ref1 = this.model.reference1;
                    billPaymentBean.toBiller.ref2 = this.model.reference2;
                    billPaymentBean.toBiller.ref3 = this.model.reference3;
                    billPaymentBean.toBiller.profileCode = this.model.profileCode;
                    billPaymentBean.rtpReferenceNo = this.model.rtpReferenceNo;
                }

                if(this.isEDonationCategory(billPaymentBean.toBiller.categoryId)){
                    if(this.isCitizenCardType()){
                        billPaymentBean.toBiller.ref2 = data.sendToRDType;
                    }else {
                        billPaymentBean.toBiller.ref2 = "0";
                    }
                    billPaymentBean.recurringType = 'N';
                }

                promise = this.billPaymentService.verifyBillPayment(billPaymentBean);
            }
            if (this.settings.module == "BILL_SCHEDULE") {
                billPaymentBean.toBiller.profileCode = this.toBiller.isAddNewToBiller? this.toBiller.profileCode : this.model.profileCode;
                billPaymentBean.toBiller.promptPayBillerId = this.toBiller.isAddNewToBiller? this.toBiller.promptPayBillerId : this.model.promptPayBillerId;
                promise = this.billPaymentService.verifyEditBillPayment(billPaymentBean);
            }

            promise.then((result: any) => {
                if (typeof result.responseCode === "undefined") {
                    this.billPaymentService.setBillPaymentObj(result);
                    this.billPaymentService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);

                    this.permissionChangeRoute.changeRoute(this.nextStep);
                } else {

                    this.billPaymentService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
                }
            });
        }
    }

    beforeGoToNextStep(data, valid) {
        if(this.isEDonationCategory(this.toBiller.categoryId) && data.sendToRDType === 0 && this.isCitizenCardType()){
            this.openEDonationModal(data, valid);
        }else {
            this.goToNextStep(data, valid)
        }
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
    }

    openEDonationModal(data, valid) {
        this.messageModalData = {
            data: data,
            valid: valid
        };
        this.childModal.show();
    }
    onSubmit(event) {
        this.goToNextStep(event.data, event.valid);
        this.closeModal();
    }

    closeModal() {
        this.childModal.hide();
    }

    isCitizenCardType() {
        return this.userCardType === 'I';
    }

    public getDisplayLabel(biller: any, index: any) {
        let label = null;
        switch (index) {
            case 1 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref1TextEn;
                }else {
                    label = biller.ref1TextEn;
                }
                break;
            case 2 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref2TextEn;
                }else {
                    label = biller.ref2TextEn;
                }
                break;
            case 3 :
                if(this.translateService.currentLang === 'en') {
                    label = biller.ref3TextEn;
                }else {
                    label = biller.ref3TextEn;
                }
                break;

        }
        return label;
    }
}