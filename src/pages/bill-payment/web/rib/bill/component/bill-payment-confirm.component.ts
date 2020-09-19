import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';
import { BillPaymentService } from '../../../../bill-payment.service';
import { UtilService } from '../../../../../../share/service/util.service';
import { BillPaymentBean } from '../../../../../../share/bean/bill-payment-bean';
import { BankCodeDataService } from '../../../../../../share/service/bankcode-data.service';
import { FundTransferService } from '../../../../../../share/service/fund-transfer.service';
import {
    PermissionChangeRoute,
    PermissionAction,
    PermissionService
} from '../../../../../../share/service/permission.service';
import { Confirm } from '../../../../../../share/component/step-process/web/confirm.component';
import { BillPaymentRequestToPayService } from '../../../../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import {TranslateService} from "ng2-translate";
declare var BUILD_NUM;

@Component({
    selector: 'bill-payment-confirm',
    templateUrl: './bill-payment-confirm.html'
})

export class BillPaymentConfirm extends Confirm implements OnInit, OnDestroy {
    public BUILD_NUM = BUILD_NUM;
    private billPaymentObj: BillPaymentBean = new BillPaymentBean();

    public isDisableSubmit: boolean = false;
    private userCardType: string;

    constructor(public constants: Constants,
        public permissionAction: PermissionAction,
        public bankCodeDataService: BankCodeDataService,
        public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute,
        public billPaymentService: BillPaymentService,
        public utilService: UtilService,
        public billPaymentRequestToPayService: BillPaymentRequestToPayService,
        public translateService: TranslateService
    ) {
        super(constants, permissionAction, bankCodeDataService, fundTransferService, permissionChangeRoute, utilService);
    }

    ngOnInit() {
        this.verifyOTPStyle = this.settings.styleClass;
        
        //this.nextStep = 'MANAGE_SCHEDULE.PAYBILL3';

        this.billPaymentObj = this.billPaymentService.getBillPaymentObj();
        if (this.isEDonationCategory(this.billPaymentObj.toBiller.categoryId)) {
            this.verifyOTPAction = this.constants.ACTION_CODE_E_DONATION;
            this.billPaymentService.getCustomerType().then((result: any) => {
                this.userCardType = result;
            });
        }else {
            this.verifyOTPAction = this.constants.ACTION_CODE_BILL_PAYMENT;
        }

        console.log(this.billPaymentObj)

        //this.billPaymentService.setBillPaymentObj(null);

        
    }

    onRequestOTP(result) {
        

        this.isRequestOTP = true;

        if (typeof result.responseCode === "undefined") {
            this.billPaymentService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
            this.model.verifyOTP = result;
        } else {
            this.billPaymentService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
        }
    }

    goToPrevStep(): void {
        this.prevStep = "PAY_BILL";
        this.billPaymentService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.permissionChangeRoute.changeRoute(this.prevStep);
    }

    goToNextStep(): void {
        
        this.responseCodeMainService = '';
        this.isDisableSubmit = true;
        let promise = null;
        if (this.model.verifyOTP != null) {
            this.billPaymentObj.verifyOTP = {
                otpRefcode: this.model.verifyOTP.otpRefcode,
                otpPin: this.model.otpPin,
                tokenOtp: this.model.verifyOTP.tokenOtp
            };
        }

        if (this.settings.module == "BILLPAYMENT" || this.settings.module == "BILL_REQUEST_TO_PAY") {
            promise = this.billPaymentService.confirmBillPayment(this.billPaymentObj);
        }
        if (this.settings.module == "BILL_SCHEDULE") {
            promise = this.billPaymentService.confirmEditBillPayment(this.billPaymentObj);
        }
        if (promise != null) {
            promise.then((result: any) => {
                if (typeof result.responseCode === "undefined") {
                    this.billPaymentService.setBillPaymentObj(result);
                    this.billPaymentService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                    this.isDisableSubmit = false;

                    this.nextStep = "PAY_BILL.STEP3";
                    this.permissionChangeRoute.changeRoute(this.nextStep);
                } else {
                    
                    if (result.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                        this.isRequestOTP = false;
                    }
                    this.responseCodeMainService = result.responseCode;
                    this.billPaymentService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
                    this.isDisableSubmit = false;
                }
            });
        }
    }

    ngOnDestroy():void{
        if(this.prevStep !== 'PAY_BILL' && this.nextStep !== 'PAY_BILL.STEP3'){
            this.billPaymentService.setBillPaymentObj(null);
            this.billPaymentRequestToPayService.setConfirmBillerProfileForAddNew(null);
        }
    }

    isEDonationCategory(id: string): boolean {
        return id === this.constants.E_DONATION_CATEGORY_ID;
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