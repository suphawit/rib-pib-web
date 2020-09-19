import { OtpService } from '../otp.service';
import { VerifyOtpBase } from '../verify-otp-base';
import { Constants } from '../../../service/constants';
import { CardInfoBean } from '../../../bean/card-info-bean';
import { FormBuilder, Validators } from '@angular/forms';
import { ResponseStatusBean } from '../../../bean/response-status-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';

@Component({
    selector: 'verify-otp',
    templateUrl: './verify-otp.html'
})

export class VerifyOtpComponent extends VerifyOtpBase implements OnInit, OnChanges {

    constructor(protected fb: FormBuilder,
        protected _otpService: OtpService,
        protected _translateService: TranslateService,
        protected _constants: Constants,
        protected elementRef: ElementRef
    ) {
        super(fb, _otpService, _translateService, _constants, elementRef);
    }

    public ngOnInit() {
        this.init();
    }

    public ngOnChanges() {
        this.changes();
    }
}
