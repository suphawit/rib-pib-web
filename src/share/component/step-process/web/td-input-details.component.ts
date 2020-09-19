import { Constants } from '../../../service/constants';
import { AccountBean } from '../../../bean/account-bean';
import { TransferBean } from '../../../bean/transfer-bean';
import { Dateservice } from '../../../service/date.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TranslateService } from "ng2-translate/src/translate.service";
import { FundTransferService } from '../../../service/fund-transfer.service';
import { CurrencyFormatterPipe } from '../../../pipe/currency-formatter.pipe';
import { PermissionChangeRoute } from '../../../service/permission.service';

require("!style-loader!css-loader!sass-loader!./input-details.scss");

@Component({
    selector: 'td-input-details',
    templateUrl: './td-input-details.html'
})

export class TermDepositInputDetails implements OnInit, OnChanges {

    private model: any = {
        amount: "0.00",
        mobileNumber: "",
        emailAddress: "",
        transferDate: "",
        term: "",
        freqIntPay: "",
        notifyLanguage: "",
        benefitAcc: ""
    };

    private termTypes: {};
    private periods: any = [];
    public dt: Date = new Date();
    public submitted: boolean = false;
    private transferObj: TransferBean = null;
    private nextStep: string = "FUND_TRANSFER.CONFIRM"; // 'transfer/step2';
    private accountList: any = [];

    get currentLang(): string {
        return this.translate.currentLang.toUpperCase();
    }

    @Input() settings: any = [];
    @Input() fromAccount: any = new AccountBean();
    @Input() toAccount: any = new AccountBean();

    constructor(
        public constants: Constants,
        private translate: TranslateService,
        private dateService: Dateservice,
        private fundTransferService: FundTransferService,
        private currencyFormatter: CurrencyFormatterPipe,
        private permissionChangeRoute: PermissionChangeRoute
    ) {
    }

    ngOnInit() {


        this.model.transferDate = this.dateService.formatDate(this.dt, 'dddd D MMMM YYYY', this.currentLang);
        this.transferObj = this.fundTransferService.getTransferObj();

        if (this.transferObj !== null) {
            //

            this.fromAccount = this.transferObj.srcAccount;
            this.toAccount = this.transferObj.destAccount;
            this.model.amount = this.currencyFormatter.transform(this.transferObj.transferAmount) || "0.00";
            this.model.mobileNumber = this.transferObj.notifyMobileNo || "";
            this.model.emailAddress = this.transferObj.notifyEmail || "";
            this.model.note = this.transferObj.note || "";
            this.model.notifyLanguage = this.transferObj.notifyLang || "";
            this.model.term = this.transferObj.termType.term;
            this.model.freqIntPay = this.transferObj.termType.freqIntPay;
            this.getTermTypes(false);
        }

        this.fundTransferService.setTransferObj(null);
    }

    ngOnChanges() {
        //

        if (this.toAccount.accNo !== undefined) {
            this.model.emailAddress = this.toAccount.email || "";
            this.model.mobileNumber = this.toAccount.mobileNo || "";
            this.model.notifyLanguage = this.toAccount.notifyLang || "";

            if (this.model.amount != '0.00') {
                this.getTermTypes();
            }
        }
    }

    getTermTypes(setDefault = true) {
        this.submitted = true;
        //

        if (this.fromAccount.accNo !== undefined && this.toAccount.accNo !== undefined) {
            let transferObj = new TransferBean();
            transferObj.srcAccount = this.fromAccount;
            transferObj.destAccount = this.toAccount;
            transferObj.transferAmount = +this.currencyFormatter.parse(this.model.amount);
            transferObj.notifyEmail = this.model.emailAddress || "";
            transferObj.notifyMobileNo = this.model.mobileNumber || "";
            transferObj.notifyLang = this.model.mobileNumber != "" ? this.model.notifyLanguage : "";

            this.fundTransferService.prepareFundTransferTermDeposit(transferObj).then((result: any) => {
                if (typeof result.responseCode === "undefined") {
                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                    this.termTypes = result.termTypes;

                    if (this.termMonths().length > 0) {
                        let termMonth = this.termMonths()[0];
                        if (setDefault) this.model.term = termMonth;
                        this.getPeriods(this.model.term, setDefault);
                    }
                    
                    // get list of benefit accountlist and set default item
                    this.accountList = result.benefitAccList || [];
                    this.model.benefitAcc = this.accountList[0];
                } else {

                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.errorMessage, show: true }]);
                }
            });
        }
    }

    termMonths(): Array<string> {
        return this.termTypes != null ? Object.keys(this.termTypes) : [];
    }

    getPeriods(termMonth, setDefault = true): void {
        this.periods = this.termTypes[termMonth];
        if (setDefault) this.model.freqIntPay = this.periods[0].freqIntPay;
        //
    }

    goToNextStep(data, valid): void {
        //

        this.submitted = true;

        if (this.fromAccount.accNo !== undefined && this.toAccount.accNo !== undefined && valid) {
            let transferObj = new TransferBean();
            transferObj.srcAccount = this.fromAccount;
            transferObj.destAccount = this.toAccount;
            transferObj.transferAmount = +this.currencyFormatter.parse(data.amount);
            transferObj.notifyEmail = data.emailAddress || "";
            transferObj.notifyMobileNo = data.mobileNumber || "";
            transferObj.notifyLang = transferObj.notifyMobileNo != "" ? data.notifyLanguage : "";
            transferObj.termType = this.termTypes[data.term].find(x => x.freqIntPay == data.freqIntPay);
            transferObj.editType =  "";
            transferObj.rtpReferenceNo = "";
            transferObj.benefitAcc = data.benefitAcc;
            
            this.fundTransferService.getRatesByCifType(transferObj).then((result: any) => {
                if (typeof result.responseCode === "undefined") {
                    this.fundTransferService.setTransferObj(result);
                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: '', show: false }]);
                    this.permissionChangeRoute.changeRoute(this.nextStep);
                } else {
                    //
                    this.fundTransferService.updateObserver([{ key: 'alertmessage', value: result.responseMessage, show: true }]);
                }
            });
        }
    }
}
