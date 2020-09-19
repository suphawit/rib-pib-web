import { Constants } from '../../../share/service/constants';
import { RequestToPayService } from '../request-to-pay.service';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MasterDataService } from '../../../share/service/master-data.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UtilService } from '../../../share/service/util.service';
import { AnyIDTypeBean } from '../../../share/bean/anyid-type-bean';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'rtp-to-account-list',
    templateUrl: './request-to-pay-to-account.html'
})
export class RTPToAccountList implements OnInit {

    private accAnyIDType: any;
    private rangeLength: [number] = [1,1];
    private inputPattern: string = '^\\d+$';
    public submitted: boolean = false;
    public isAccNameRequired: boolean = false;
    isSelectAccFromFavList:boolean =  false;
    public status: any = {
        isFirstOpen: true,
        isOpen: false
    };

    private model: any = {
        anyIDType: String,
        accountNo: String,
        accountName: String
    }

    @Input() settings: any;
    @Input() currentAccount: any = null;
    @Input() anyIDTypes: any;
    @Input() otherAccounts: any= [];
    @Output() accountChanged = new EventEmitter();

    constructor(public constants: Constants,
        private translate: TranslateService,
        private requestToPayService: RequestToPayService,
        private masterDataService: MasterDataService,
        private utilService: UtilService) {

    }

    ngOnInit(): void {
        this.InitNewAccount();

        //check if it has to patch value back on new account
        if (this.currentAccount.category.catId == 999) {
            this.model.anyIDType = this.currentAccount.anyIDType.anyIDType;
            this.model.accountNo = this.currentAccount.accNo;

            this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
            this.rangeLength = this.accAnyIDType.getRangeLength();
            this.inputPattern = this.accAnyIDType.getRegexPattern();
        }

    }

    onSelectChanged(accountObj: any,catId: string) {
        this.isSelectAccFromFavList = (catId === 'favorites');
        accountObj.isSelectAccFromFavList = this.isSelectAccFromFavList;
        this.getAccount(accountObj);
    }

    addAccount(data, valid): void {
        this.submitted = true;

        if (valid) {

            let anyIDType = this.anyIDTypes[data.anyIDType] || new AnyIDTypeBean();

            let category = {
                catId : 999,
                catName : this.translate.instant('lbl.newAccount')
            };

            let accountObj = {
                accId : -1,
                accNo : data.accountNo,
                anyIDType : anyIDType,
                category : category
            };
            

            this.getAccount(accountObj);
        }

    }

    clearForm(form: NgForm): void {
        this.model.anyIDType = this.constants.ANYID_TYPE_CITIZEN_ID;
        this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
        this.model.accountNo = '';
        this.submitted = false;
        this.resetSubmittedState(form);

        let category = {
                catId : 999,
                catName : this.translate.instant('lbl.newAccount')
         };

         let accountObj = {
                accNo : "",
                anyIDType : "",
                category : category
        };

        this.getAccount(accountObj);
    }

    getAnyIDTypes(): any {
        return this.anyIDTypes != null ? Object.keys(this.anyIDTypes) : [];
    }

    private getAccount(accountObj: any) {
        this.currentAccount = accountObj;
        this.accountChanged.emit(accountObj);
    }

    isHighlighted(account, currentAccount) {
        return currentAccount != null ? account.accNo === currentAccount.accNo : false;
    }

    onAnyIDTypeChange(newValue) {
        this.model.accountNo = '';
        this.model.accountName = '';
        this.accAnyIDType = this.anyIDTypes[newValue];
        this.rangeLength = this.accAnyIDType.getRangeLength();
        this.inputPattern = this.accAnyIDType.getRegexPattern();
    }
    private resetSubmittedState(form: NgForm): void {
        this.submitted = false;
        let root = this;
        ['accountNo'].forEach(name => {
            root.utilService.resetInputState(form, name);
        });
    }

    protected autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            setTimeout(function () {
                root.utilService.pageLoad();
            }, 1000);
        }
    }

    private InitNewAccount(){
        this.model =   {
            anyIDType: this.constants.ANYID_TYPE_CITIZEN_ID,
            accountNo: '',
            accountName: ''
        };

        this.accAnyIDType = this.anyIDTypes[this.model.anyIDType];
        this.rangeLength = this.accAnyIDType.getRangeLength();
        this.inputPattern = this.accAnyIDType.getRegexPattern();
    }
}