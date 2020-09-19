import { Constants } from '../../../service/constants';
import { Component, Input, OnInit } from '@angular/core';
import { TransferBean } from '../../../bean/transfer-bean';
import { UtilService } from '../../../service/util.service';
import { TransferTypeBean } from '../../../bean/transfer-type-bean';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { BankCodeDataService } from '../../../service/bankcode-data.service';
import { PermissionAction, PermissionChangeRoute } from '../../../service/permission.service';

@Component({
    selector: 'confirm',
    templateUrl: './confirm.html'
})

export class Confirm implements OnInit {

    protected model: any = {
        transferMethod: '',
        otpPin: '',
        verifyOTP: null
    };

    protected verifyOTPStyle: string;
    protected verifyOTPAction: string;
    public submitted: boolean = false;
    protected prevStep: string = 'FUND_TRANSFER'; //'transfer/step1';
    protected nextStep: string = 'FUND_TRANSFER.COMPLETE'; //'transfer/step3';
    private transferObj: TransferBean = new TransferBean();

    public isRequestOTP: boolean = false;
    public isRequireOTP: boolean = false;

    protected responseCodeMainService: string = '';

    @Input() settings: any = [];

    verifyOTPOptions: any = {};

    constructor(
        public constants: Constants,
        public permissionAction: PermissionAction,
        public bankCodeDataService: BankCodeDataService,
        public fundTransferService: FundTransferService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService
    ) {
    }

    ngOnInit(): void {
        this.verifyOTPStyle = this.settings.styleClass;
        this.verifyOTPAction = this.constants.ACTION_CODE_FUND_TRANSFER;
        this.verifyOTPOptions = { adapter: 'FundTransferAdapter' };

        this.transferObj = this.fundTransferService.getTransferObj();

        if (this.transferObj != null) {
            this.isRequireOTP = this.transferObj.isRequireOtp;
            if (!this.isRequireOTP) {
                this.isRequestOTP = true;
            }
            let transferDecisionList = this.transferObj.transferDecisionList || [];

            // Assign an initial value to fee detail radio button by default.
            if (transferDecisionList.length > 0) {
                this.model.transferMethod = transferDecisionList[0].RIBTransferTypeCode;
            }
        }
    }

    goToPrevStep(): void {
        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
        this.fundTransferService.updateObserver([{ key: 'IS_DATA_READY', value: false }]);
        this.permissionChangeRoute.changeRoute(this.prevStep);
    }

    onRequestOTP(result) {
        this.isRequestOTP = true;

        if (typeof result.responseCode === "undefined") {
            this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
            this.model.verifyOTP = result;
        } else {
            this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
        }
    }

    onOtpChanged(arg) {
        this.model.otpPin = arg;
    }

    goToNextStep(data): void {

        this.responseCodeMainService = '';

        let promise = null;
        this.transferObj.transferType = new TransferTypeBean();
        this.transferObj.transferType.code = data.transferMethod;

        if (this.model.verifyOTP != null) {
            this.transferObj.verifyOTP = {
                otpRefcode: this.model.verifyOTP.otpRefcode,
                otpPin: this.model.otpPin,
                tokenOtp: this.model.verifyOTP.tokenOtp
            };
        }

        if (this.settings.module == 'TRANSFER' || this.settings.module == 'REQUEST_TO_PAY') {
            promise = this.fundTransferService.confirmFundTransfer(this.transferObj);
        }
        if (this.settings.module == 'SCHEDULE') {
            promise = this.fundTransferService.confirmEditFundTransfer(this.transferObj);
        }

        if (promise != null) {
            promise.then((result: any) => {
                if (typeof result.responseCode === 'undefined') {
                    
                    this.fundTransferService.setTransferObj(result);
                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                    this.permissionChangeRoute.changeRoute(this.nextStep);
                } else {
                    if (result.responseCode === this.constants.RESP_CODE_REQ_OTP_AGAIN) {
                        this.isRequestOTP = false;
                    }
                    this.responseCodeMainService = result.responseCode;
                    this.model.otpPin = '';
                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
                }
            });
        }
    }
}