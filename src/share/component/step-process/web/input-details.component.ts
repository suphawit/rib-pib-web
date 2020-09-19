import * as moment from 'moment';
import { Constants } from '../../../service/constants';
import { AccountBean } from '../../../bean/account-bean';
import { TransferBean } from '../../../bean/transfer-bean';
import { Dateservice } from '../../../service/date.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { DropdownDataService } from '../../../service/dropdown.service';
import { MasterDataService } from '../../../service/master-data.service';
import { FundTransferService } from '../../../service/fund-transfer.service';
import { CurrencyFormatterPipe } from '../../../pipe/currency-formatter.pipe';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { PermissionChangeRoute, PermissionService } from '../../../service/permission.service';
import { UtilService } from "../../../service/util.service";

@Component({
    selector: 'input-details',
    templateUrl: './input-details.html'
})

export class InputDetails implements OnInit, OnChanges {

    protected model: any = {
        immediateType: this.constants.IMMEDIATE_TYPE_TODAY,
        scheduleType: 0,
        recurringType: this.constants.RECURRING_TYPE_NO,
        recurringTime: 0,
        amount: "0.00",
        disableAmount: false,
        mobileNumber: "",
        emailAddress: "",
        transferDate: "",
        note: "",
        notifyLanguage: "",
        referenceNO: "",
        rtpReferenceNo: "",
        sendToRDType: 1
    };

    public dt: Date;
    actionCodes: any = {};
    protected today: any;
    protected minDate: Date;
    protected maxDate: Date;
    protected dateOptions: any;
    protected immediateTypes: any;
    protected recurringTypes: any;
    protected notifyLanguages: any;
    private isReccuring: boolean;
    private disabledEmail = true;
    protected scheduleTypes: any;
    protected recurringTimes: any;
    private disabledMobile = true;
    public submitted: boolean = false;
    private transferObj: TransferBean = null;
    protected nextStep: string = 'FUND_TRANSFER.CONFIRM';
    disabledAmount:boolean = false;
    isShowRecurring:boolean = true;
    private isTodayOnly = false;
	private currentDate: Date;

    get currentLang(): string {
        return this.translate.currentLang.toUpperCase();
    }

    @Input() settings: any = [];
    @Input() fromAccount: any = new AccountBean();
    @Input() toAccount: any = new AccountBean();
    @Output() onRecurringChange = new EventEmitter();

    constructor(
        public constants: Constants,
        public translate: TranslateService,
        public dateService: Dateservice,
        public masterDataService: MasterDataService,
        public dropdownDataService: DropdownDataService,
        public fundTransferService: FundTransferService,
        public currencyFormatter: CurrencyFormatterPipe,
        public permissionChangeRoute: PermissionChangeRoute,
        public permissionService: PermissionService,
        public utilService: UtilService

    ) {
        this.actionCodes = this.permissionService.getActionCode();
        
    }

    ngOnInit() {
        this.init();
    }

    init(): void {
        let isImmediateType = false;
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

        if (['TRANSFER', 'SCHEDULE', 'REQUEST_TO_PAY'].indexOf(this.settings.module) != -1) {
            this.transferObj = this.fundTransferService.getTransferObj();

            if (this.transferObj != null) {
                
                this.fromAccount = this.transferObj.srcAccount;
                this.toAccount = this.transferObj.destAccount;
                this.model.immediateType = this.transferObj.immediateType || this.constants.IMMEDIATE_TYPE_TODAY;
                this.model.scheduleType = this.transferObj.scheduleType.schedTypeId || 0;
                this.model.recurringType = this.transferObj.recurringType !== undefined && this.model.editType != '0' ? this.transferObj.recurringType : this.constants.RECURRING_TYPE_NO;
                this.model.recurringTime = this.transferObj.recurringTime !== undefined ? this.transferObj.recurringTime.time : 0;
                this.model.amount = this.currencyFormatter.transform(this.transferObj.transferAmount) || "0.00";
                this.model.mobileNumber = this.transferObj.notifyMobileNo || "";
                this.disabledMobile = this.model.mobileNumber == "";
                this.model.emailAddress = this.transferObj.notifyEmail || "";
                this.disabledEmail = this.model.emailAddress == "";
                this.model.note = this.transferObj.note || "";
                this.model.notifyLanguage = this.transferObj.notifyLang || this.currentLang;
                this.model.notifyLanguageDisplay = this.notifyLanguages.find(x => x.value == this.model.notifyLanguage).display;
                this.model.editType = this.transferObj.editType || "";
                this.model.txnId = this.transferObj.txnId || "";
                this.model.txnMasId = this.transferObj.txnMasId || "";
                this.model.rtpReferenceNo = this.transferObj.rtpReferenceNo || "";

                // Default recurring type value
                this.model.recurringType = this.constants.RECURRING_TYPE_NO

                if (this.fromAccount.allowSchedule) {
                    if (this.transferObj.recurringType !== undefined && this.model.editType != '0') {
                        this.model.recurringType = this.transferObj.recurringType;
                    }

                    if (this.model.immediateType === this.constants.IMMEDIATE_TYPE_LATER) {
                        this.dt = this.dateService.parseDate(this.transferObj.effectiveDate);
                        this.model.transferDate = this.dateService.formatDate(this.dt, "dddd D MMMM YYYY", this.currentLang);
                        isImmediateType = true;
                    }
                }

                this.onRecTypeChange(this.model.recurringType);
            }

            this.fundTransferService.setTransferObj(null);
            // UI renderer
            if (['REQUEST_TO_PAY'].indexOf(this.settings.module) != -1) {
                this.isShowRecurring = false;
                this.isTodayOnly = true;
            }
            
            this.masterDataService.getCurrentDate().then((result: any) => {
                let dt = result;
                this.currentDate = dt;
                this.today = this.dateService.formatDate(dt, 'DD/MM/YYYY');
                this.minDate = dt;
                this.maxDate = (this.isTodayOnly) ? dt : moment(this.minDate).add(180, 'days').toDate();

                if (!isImmediateType) {
                    this.dt = dt
                    this.model.transferDate = this.dateService.formatDate(dt, "dddd D MMMM YYYY", this.currentLang);
                }
            });

            
        } 

    }

    ngOnChanges(changed: any): void {
        

        if (this.toAccount.accNo !== undefined) {
            this.model.emailAddress = this.toAccount.email || "";
            this.model.mobileNumber = this.toAccount.mobileNo || "";

            if (this.model.mobileNumber != '') {
                this.model.notifyLanguage = this.toAccount.notifyLang || this.currentLang;
            } else {
                this.model.notifyLanguage = this.currentLang;
            }

            this.disabledEmail = this.model.emailAddress == "";
            this.disabledMobile = this.model.mobileNumber == "";
            this.onLanguageSelected(this.model.notifyLanguage);
        }
    }

    onRecTypeChange(recType): void {

        if (this.model.editType != '0') {
            if (recType === this.constants.RECURRING_TYPE_YES) {
                this.isReccuring = true;
            } else {
                this.isReccuring = false;
                this.model.recurringTime = 0;
                this.model.scheduleType = 0;
            }
            this.onRecurringChange.emit();
        }
        this.autoScaleHeight();
    }

    onSendToRDTypeChange(sendToRDType): void {
        console.log(sendToRDType);
    }

    onEmailCheckedChanged(event): void {
        //

        if (event.target.checked) {
            this.disabledEmail = false;
        } else {
            this.disabledEmail = true;
            this.model.emailAddress = "";
        }
    }

    onEmailTextChanged(event): void {
        this.disabledEmail = this.model.emailAddress == "";
    }

    onMobileCheckedChanged(event): void {
        //

        if (event.target.checked) {
            this.disabledMobile = false;
        } else {
            this.disabledMobile = true;
            this.model.mobileNumber = "";
        }
    }

    onMobileTextChanged(event): void {
        this.disabledMobile = this.model.mobileNumber == "";
    }

    onLanguageSelected(lang): void {
        
        this.model.notifyLanguage = lang;

        if (this.notifyLanguages != undefined) {
            this.model.notifyLanguageDisplay = this.notifyLanguages.find(x => x.value == lang).display;
        }
    }

    onSelect(date: Date) {
        //
        this.model.transferDate = this.dateService.formatDate(date, 'dddd D MMMM YYYY', this.currentLang);
        //
    }

    goToNextStep(data, valid): void {
        this.submitted = true;
        if (this.fromAccount.accNo !== undefined && this.toAccount.accNo !== undefined && valid) {
            let promise = null;
            let scheduleType = data.scheduleType || 0;
            let recurringTime = data.recurringTime || 0;
            let effectiveDate = this.dateService.formatDate(this.dt, 'DD/MM/YYYY');

            let transferObj = new TransferBean();
            transferObj.srcAccount = this.fromAccount;
            transferObj.destAccount = this.toAccount;
            transferObj.transferAmount = +this.currencyFormatter.parse((data.amount) ? data.amount: this.model.amount);
            transferObj.effectiveDate = effectiveDate;
            transferObj.notifyEmail = data.emailAddress || "";
            transferObj.notifyMobileNo = data.mobileNumber || "";
            transferObj.notifyLang = data.mobileNumber != "" ? data.notifyLanguage : "";
            transferObj.recurringType = this.model.recurringType !== undefined && this.model.editType != '0' ? data.recurringType : this.constants.RECURRING_TYPE_NO;
            transferObj.recurringTime = this.recurringTimes.find(x => x.time == recurringTime) || {};
            transferObj.note = data.note;
            transferObj.scheduleType = this.scheduleTypes.find(x => x.schedTypeId == scheduleType) || {};
            transferObj.editType = data.editType || "";
            transferObj.txnId = data.txnId || "";
            transferObj.txnMasId = data.txnMasId || "";
            transferObj.immediateType = this.today == effectiveDate ? this.constants.IMMEDIATE_TYPE_TODAY : this.constants.IMMEDIATE_TYPE_LATER;

            if (this.fromAccount.allowSchedule && this.model.recurringType !== undefined && this.model.editType != '0') {
                transferObj.recurringType = data.recurringType;
            } else {
                transferObj.recurringType = this.constants.RECURRING_TYPE_NO
            }

            transferObj.rtpReferenceNo = this.model.rtpReferenceNo || "";

            if (this.settings.module == "TRANSFER" || this.settings.module == "REQUEST_TO_PAY") {
                promise = this.fundTransferService.verifyFundTransfer(transferObj);//promise = this.fundTransferService.prepareFundTransfer(transferObj);
            }
            if (this.settings.module == "SCHEDULE") {
                promise = this.fundTransferService.verifyEditFundTransfer(transferObj);//promise = this.fundTransferService.prepareSchedule(transferObj);
            }

            if (promise != null) {
                promise.then((result: any) => {
                    if (typeof result.responseCode === "undefined") {
                        this.fundTransferService.setTransferObj(result);
                        //
                        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                        this.permissionChangeRoute.changeRoute(this.nextStep);
                    } else {
                        //
                        this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
                    }
                });
            }
        }
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }
}