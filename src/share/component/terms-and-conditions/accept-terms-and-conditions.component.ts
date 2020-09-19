import { Constants } from '../../service/constants';
import { OtpService } from '../verify-otp/otp.service';
import { UtilService } from '../../service/util.service';
import { AlertMessageComponent } from '../../component/alert-message/alert-message.component';
import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'accept-terms-and-conditions',
    templateUrl: './accept-terms-and-conditions.html'
})

export class AcceptTermsAndConditionComponent implements OnChanges {
    public responseOtp;
    public isRequestOtp;
    private type: string;
    private isError = true;
    private message: string;
    protected otpPass: string = '';
    protected unChecked: boolean = false;

    @Input('Style') Style: string;
    @Input('userData') userData: any;
    @Input('termAction') termAction: string;
    @Input('errorMessage') errorMessage: string;
    @Input('screen-name') screenName: string; // fistLogin,view,anyID
    @Input('verifyOTPAction') verifyOTPAction: string;
    @Output('onClickSubmit') clickSubmit = new EventEmitter();
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public constants: Constants,
        public otpService: OtpService,
        public utilService: UtilService,
        public cdRef: ChangeDetectorRef) {
        this.verifyOTPAction = this.constants.ACTION_CODE_TERM_AND_CON;
        this.isRequestOtp = false;
    }

    ngOnChanges(): void {
        if (this.errorMessage != '') {
            this.message = this.errorMessage;
            this.type = 'danger';
            this.alertMessage.show();
        }

    }

    agreementCheckedChanged(event): void {

        this.cdRef.detectChanges();
        this.autoScaleHeight();
    }

    onRequestOTP(result) {
        this.isRequestOtp = true;

        if (typeof result.responseCode === "undefined") {
            this.responseOtp = result;

            this.message = '';
            this.alertMessage.hide();
        } else {
            this.message = result.errorMessage;
            this.type = 'danger';
            this.alertMessage.show();
        }
    }

    getOtpPass($event) {
        this.otpPass = $event;
    }

    responseServiceChecked(event) {
        if (event.responseCode == this.constants.RESP_CODE_SUCCESS) {
            this.isError = false;
        } else {
            this.message = event.errorMessage;
            this.type = 'danger';
            this.alertMessage.show();
        }
    }

    onSubmit(): void {
        if (this.userData && this.userData.newAccept) {
            let objRequest: any = {
                params: {
                    referenceNO: this.responseOtp.otpRefcode,
                    otp: this.otpPass,
                    tokenOTPForCAA: this.responseOtp.tokenOtp
                }
            };

            this.otpService.setActionCode('ACT_VERIFY_OTP');
            this.otpService.setProcedure('verifyOTPProcedure');
            this.otpService.verifyOtp(objRequest).then((objResponse: any) => {

                if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.clickSubmit.emit('agree');
                } else {
                    this.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                    this.type = 'danger';
                    this.alertMessage.show();
                    this.clickSubmit.emit('');
                }
            }, function (error) {

            });
        } else {
            this.clickSubmit.emit('agree');
        }
    }

    disAgree(): void {
        this.clickSubmit.emit('disagree');
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            setTimeout(function () {
                root.utilService.pageLoad(50);
            }, 500);
        }
    }
}