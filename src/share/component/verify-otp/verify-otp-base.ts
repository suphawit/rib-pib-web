import { OtpService } from './otp.service';
import { Constants } from '../../service/constants';
import { CardInfoBean } from '../../bean/card-info-bean';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';
import { ResponseStatusBean } from '../../bean/response-status-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';

export class VerifyOtpBase implements AfterViewInit{

    @Input('style') style: string;
    @Input('actionOTP') actionOTP: string;
    @Input('verifyTransactionId') verifyTransactionId: string;
    @Input('responseCodeMainService') responseCodeMainService: string;
    @Input('options') options: any;
    @Input('subscriptionChannel') subscriptionChannel: string;

    @Output('onClickSubmit') clickSubmit = new EventEmitter();
    @Output() requestOTPChanged = new EventEmitter();
    @Output('otpPass') otpPass = new EventEmitter();

    public verifyOtpForm: any;
    private cardInfoBean: CardInfoBean;

    private _mobileNumber: string;
    private _otpRefcode: string;
    private _tokenOtp: string;
    private _actionBy: string;
    private _verifyTransactionId: string;
    private _subscriptionChannel: string;

    public isShowRespOTP: boolean = false;
    public isRequestOTP: boolean = false;
    public showSubmitButton: boolean = false;
    public isDisableRequestOtpBtn: boolean = false;
    public styleMode: string;
    public isDisableOtpPass: boolean = true;

    public timer: any;

    constructor(protected fb: FormBuilder,
        protected _otpService: OtpService,
        protected _translateService: TranslateService,
        protected _constants: Constants,
        protected elementRef: ElementRef
    ) {
    }

    protected init() {
        
        this.buildForm();
        this.verifyOtpForm.patchValue({ otpPass: '' });

        this.cardInfoBean = this._otpService.getCardInfoBean();
        if (this.style === this._constants.STYLE_RIB_WEB) {
            this.actionBy = this._constants.CHANNEL_RIB_WEB;
        } else if (this.style === this._constants.STYLE_RIB_MOBILE) {
            this.actionBy = this._constants.CHANNEL_RIB_MOBILE;
        } else if (this.style === this._constants.STYLE_PIB_WEB) {
            this.actionBy = this._constants.CHANNEL_PIB_WEB;
        } else if (this.style === this._constants.STYLE_PIB_MOBILE) {
            this.actionBy = this._constants.CHANNEL_PIB_MOBILE;
            this.styleMode = 'pib-mobile';
        }
        if (this.actionOTP == this._constants.ACTION_CODE_RESET_PASSWORD
            || this.actionOTP == this._constants.ACTION_CODE_CHANGE_PASSWORD
            || this.actionOTP == this._constants.ACTION_CODE_CHANGE_USERNAME) {
            this.showSubmitButton = true;
        } else {
            this.showSubmitButton = false;
        }

    }

    protected changes() {
        if (this.responseCodeMainService === this._constants.RESP_CODE_OTP_IN_CORRECT) {
            this.verifyOtpForm.patchValue({ otpPass: '' });
        }
        if (this.responseCodeMainService === this._constants.RESP_CODE_REQ_OTP_AGAIN) {
            this.verifyOtpForm.patchValue({ otpPass: '' });
            let otpPassCtrl = this.verifyOtpForm.get('otpPass');
            otpPassCtrl.disable();
            this.isDisableOtpPass = true;
            clearTimeout(this.timer);
            this.isDisableRequestOtpBtn = false;
            this.isShowRespOTP = false;
        }
    }

    protected buildForm(): void {
        this.verifyOtpForm = this.fb.group({
            'otpPass': ['', [
                ValidationService.requiredValidator,
                Validators.minLength(1)
            ]
            ]
        });
        let otpPassCtrl = this.verifyOtpForm.get('otpPass');
        otpPassCtrl.disable();
        this.isDisableOtpPass = true;
    }

    onkeyupInputOtpPass() {
        let otpPassCtrl = this.verifyOtpForm.get('otpPass');
        this.otpPass.emit(otpPassCtrl.value);
    }

    requestOTP() {
        let obj: any = {
            params: {
                actionOTP: this.actionOTP,
                language: this._translateService.currentLang
            },
        };
        

        if (this.verifyTransactionId !== undefined) {
            obj.params.verifyTransactionId = this.verifyTransactionId;
            this._verifyTransactionId = this.verifyTransactionId;
        }
        if(this.subscriptionChannel !== undefined){
            obj.params.subscriptionChannel = this.subscriptionChannel;
            this._subscriptionChannel = this.subscriptionChannel;
        }
        if (this.actionOTP == this._constants.ACTION_CODE_RESET_PASSWORD) {

            obj.params.idType = this.cardInfoBean.cardType;
            obj.params.idNO = this.cardInfoBean.cardId;
            obj.params.idIssueCountryCode = this.cardInfoBean.idIssueCountryCode || 'TH';

            this._otpService.invokeOption = {adapter: 'SubscriptionAdapter'};

            this._otpService.setActionCode('ACT_REQUEST_OTP');
            this._otpService.setProcedure('requestOTPWithOutLoginProcedure');
        } else if (this.actionOTP == this._constants.ACTION_CODE_ACTIVATE_ACCOUNT
                || this.actionOTP == this._constants.ACTION_CODE_FORGOT_USERNAME) {
            obj.params.idType = this.cardInfoBean.cardType;
            obj.params.idNo = this.cardInfoBean.cardId;
            obj.params.idIssueCountryCode = this.cardInfoBean.idIssueCountryCode || 'TH';

            this._otpService.setActionCode(this._constants.REQ_ACTION_CODE.REQUEST_OTP);
            this._otpService.setProcedure(this._constants.REQ_PROCEDURE_NAME.REQUEST_OTP);
            this._otpService.invokeOption = {adapter: 'SubscriptionAdapter'};
        } else if (this.actionOTP == this._constants.ACTION_CODE_FUND_TRANSFER){
            // use on fundtransferAdapter
            this._otpService.invokeOption = {adapter: 'FundTransferAdapter'};

            this._otpService.setActionCode('ACT_REQUEST_OTP');
            this._otpService.setProcedure('requestOTPProcedure');
            delete obj.params.actionOTP;
        } else if (this.actionOTP == this._constants.ACTION_CODE_CHANGE_USERNAME || 
                    this.actionOTP == this._constants.ACTION_CODE_CHANGE_PASSWORD) {
            this._otpService.invokeOption = {adapter: 'otpAdapter'};
            this._otpService.setActionCode('ACT_REQUEST_OTP');
            this._otpService.setProcedure('requestOTPWithLoginProcedure');
        } else if (this.actionOTP == this._constants.ACTION_CODE_BILL_PAYMENT ||
                    this.actionOTP == this._constants.ACTION_CODE_E_DONATION) {
            this._otpService.invokeOption = {adapter: 'iBankingCBSAdapter'};
            this._otpService.setActionCode('ACT_BPS_REQUEST_OTP');
            this._otpService.setProcedure('requestOTPWithLoginProcedure');
        } else {
            this._otpService.invokeOption = {adapter: 'otpAdapter'};
            this._otpService.setActionCode('ACT_REQUEST_OTP');
            this._otpService.setProcedure('requestOTPWithLoginProcedure');
        }

        this.isDisableRequestOtpBtn = true;

        this._otpService.requestOtp(obj).then((objResponse: any) => {
            let responseStatus = objResponse.responseJSON.result.responseStatus;

            if (responseStatus.responseCode === this._constants.RESP_CODE_SUCCESS) {

                let data = objResponse.responseJSON.result.value;
                

                this.otpRefcode = data.referenceNo;
                this.mobileNumber = data.mobileNo;
                this.tokenOtp = data.tokenOTPForCAA;
                this.isRequestOTP = true;
                this.isShowRespOTP = true;

                let otpPassCtrl = this.verifyOtpForm.get('otpPass');
                otpPassCtrl.enable();
                this.isDisableOtpPass = false;

                

                let verifyOTPObj = { otpRefcode: this.otpRefcode, tokenOtp: this.tokenOtp };
                this.requestOTPChanged.emit(verifyOTPObj);
                this.verifyOtpForm.patchValue({ otpPass: '' });
            } else {
                this.isRequestOTP = false;
                this.isShowRespOTP = false;
                let verifyOTPObj = new ResponseStatusBean(responseStatus.responseCode, responseStatus.responseMessage, responseStatus.errorMessage);
                this.requestOTPChanged.emit(verifyOTPObj);
                
            }

            // clear invokeOption
            this._otpService.invokeOption = {};

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isDisableRequestOtpBtn = false;
                
            }, 60000);
        }, function (error) {
            
        });
        
    }

    onSubmit() {
        
        let obj: any = {
            params: {
                referenceNO: this.otpRefcode,
                otp: this.verifyOtpForm.value.otpPass.trim(),
                // actionBy:		this._constants.CHANNEL_RIB_WEB,
                tokenOTPForCAA: this.tokenOtp
            },
        };

        this._otpService.setActionCode('ACT_VERIFY_OTP');
        this._otpService.setProcedure('verifyOTPProcedure');

        if (this.actionOTP == this._constants.ACTION_CODE_ACTIVATE_ACCOUNT
            || this.actionOTP == this._constants.ACTION_CODE_FORGOT_USERNAME) {
            this._otpService.setActionCode(this._constants.REQ_ACTION_CODE.VERIFY_OTP);
            this._otpService.setProcedure(this._constants.REQ_PROCEDURE_NAME.VERIFY_OTP);
        } else if (this.actionOTP == this._constants.ACTION_CODE_CHANGE_USERNAME) {
            this._otpService.invokeOption = {adapter: 'otpAdapter'};
        } else if (this.actionOTP == this._constants.ACTION_CODE_RESET_PASSWORD) {
            this._otpService.invokeOption = {adapter: 'SubscriptionAdapter'};
            obj.params['verifyTransactionId'] = this._verifyTransactionId;
            obj.params['subscriptionChannel'] = this._subscriptionChannel;
        }
        
        this._otpService.verifyOtp(obj).then((result: any) => {
            if (result.responseJSON.result.responseStatus.responseCode !== this._constants.RESP_CODE_SUCCESS) {
                if (result.responseJSON.result.responseStatus.responseCode === this._constants.RESP_CODE_REQ_OTP_AGAIN) {
                    this.isRequestOTP = false;
                }
                this.responseCodeMainService = result.responseJSON.result.responseStatus.responseCode;
                this.changes();

                // clear invokeOption
                this._otpService.invokeOption = {};
            }
            this.clickSubmit.emit(result.responseJSON.result);
        }, function (error) {
            
        });
        
    }

    get mobileNumber(): string {
        return this._mobileNumber;
    }
    set mobileNumber(mobileNumber: string) {
        this._mobileNumber = mobileNumber;
    }
    get otpRefcode(): string {
        return this._otpRefcode;
    }
    set otpRefcode(otpRefcode: string) {
        this._otpRefcode = otpRefcode;
    }
    get tokenOtp(): string {
        return this._tokenOtp;
    }
    set tokenOtp(tokenOtp: string) {
        this._tokenOtp = tokenOtp;
    }
    get actionBy(): string {
        return this._actionBy;
    }
    set actionBy(actionBy: string) {
        this._actionBy = actionBy;
    }

    ngAfterViewInit(){
        const element = this.elementRef.nativeElement;
        if(element.offsetParent !== null) {
            this.requestOTP();
        }
    }
}

export interface IVerifyOtpComponent {
    inputVerifyOtpComponent: InputVerifyOtpComponent;
    onClickSubmitVerifyOtp: Function;
}

export interface InputVerifyOtpComponent {
    style: string;
    actionOTP: string;
}
