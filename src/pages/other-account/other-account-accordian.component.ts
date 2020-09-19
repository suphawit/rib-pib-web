import { Router } from '@angular/router';
import { BankBean } from '../../share/bean/bank-bean';
import { Constants } from '../../share/service/constants';
import { AccountBean } from '../../share/bean/account-bean';
import { CategoryBean } from '../../share/bean/category-bean';
import { UtilService } from '../../share/service/util.service';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MasterDataService } from '../../share/service/master-data.service';
import { BankCodeDataService } from '../../share/service/bankcode-data.service';
import { OtherAccountService } from '../../pages/other-account/other-account.service';
import { PermissionChangeRoute, PermissionService } from '../../share/service/permission.service';
import { Component, trigger, animate, style, state, transition, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'other-account-accordian',
    templateUrl: './other-account-accordian.html',
    animations: [
        trigger('accordingState', [
            state('collapsed, void', style({
                height: '0'
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('collapsed <=> expanded', [animate(250)])
        ])
    ]
})
// Component class
export class OtherAccountAccordianComponent implements OnInit {
    @Output('onGetStatus') onGetStatus = new EventEmitter();

    permissionManage: any;
    public anyIDTypeList: any;
    public firstLoad: boolean = true;
    public bankcodeImageProperties: any;
    public accordian: { data: Array<any>; state: any; };

    get currentLang() {
        return this.translate.currentLang.toUpperCase();
    }

    constructor(public constants: Constants,
        public otherAccountService: OtherAccountService,
        public bankCodeDataService: BankCodeDataService,
        public router: Router,
        public masterDataService: MasterDataService,
        public permissionChangeRoute: PermissionChangeRoute,
        public translate: TranslateService,
        public permissionService: PermissionService,
        public utilService: UtilService) {
    }

    public ngOnInit(): void {
        this.init();
        this.permissionManage = {
            transfer: this.permissionService.getShortcutActionCodePermission('FUND_TRANSFER','FUND_TRANSFER'),
            delete: this.permissionService.getActionCode().MANAGE_OTHER_ACCOUNTS
        }
    }

    init(): void {
        this.accordian = {
            data: [],
            state: {}
        };

        this.getExternalAccount();
        this.permissionChangeRoute.prevUrl = this.router.url;
    }


    toggleState(selectState) {
        //
        this.accordian.state[selectState] = (this.accordian.state[selectState] === 'expanded') ? 'collapsed' : 'expanded';
    }

    onClickFavourite(data: any) {
        this.otherAccountService.requestManageFavourite(data).then((objResponse: any) => {
            this.sendStatus('', '');
            let result = objResponse.responseJSON.result;
            //

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.getExternalAccount();
            } else {
                this.sendStatus('error', result.responseStatus);
            }
        }, function (error) {

        });
    }

    getExternalAccount() {
        this.accordian.data = [];
        this.accordian.state = {};

        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            this.anyIDTypeList = result;

            this.otherAccountService.requestInquiryExternalAccount().then((objResponse: any) => {
                let errors: any = {};
                this.firstLoad = false;
                let result = objResponse.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    if (result.value.length > 0) {
                        this.createExternalAccountAccordianDataByCategory(result.value);
                    } else {
                        // this.sendStatus('no result', result.value);
                        errors = { msg: 'no result', data: result.value };
                    }
                } else {
                    // this.sendStatus('error', result.responseStatus);
                    errors = { msg: 'error', data: result.responseStatus };
                }

                this.sendStatus(errors.msg, errors.data);
            }, function (error) {

            });
        });
    }

    createExternalAccountAccordianDataByCategory(data: any) {
        let externalAccount = data;
        externalAccount = this.sortData(externalAccount, 'acctAliasName');

        let categoriesData = this.getCategories(externalAccount);
        let itemCount = 0;
        let favouriteAccountCount = this.createFavouriteAccount(externalAccount);

        for (let cate of categoriesData) {
            let catetmp = cate;
            let accordianData = { stateName: {}, stateData: [] };

            for (let item of externalAccount) {



                    item.allowTransfer = this.permissionService.isProductAllow(item.productId,"allowTransferTo");
                if (item.catId === catetmp.id) {
                    accordianData.stateName = { id: item.catId, name: item.categoryName };

                    accordianData.stateData.push(item);
                }
            }

            // set accordian state
            if (favouriteAccountCount > 0 || itemCount > 0) {
                this.accordian.state[cate.id] = 'collapsed';
            } else {
                this.accordian.state[cate.id] = 'expanded';
            }

            itemCount++;

            // set accordian data
            this.accordian.data.push(accordianData);
        }
        
        this.addAccountBean();
    }

    createFavouriteAccount(data: any) {
        let externalAccount = data;
        let favouriteData = externalAccount.filter(x => x.isFavourite === 'Y') || [];


        if (favouriteData.length > 0) {
            let accordianData = { stateName: {}, stateData: [] };
            accordianData.stateName = { id: 'fav', name: 'lbl.myFavourite' };
            accordianData.stateData = favouriteData;

            // set accordian state
            this.accordian.state['fav'] = 'expanded';

            // set accordian data
            this.accordian.data.push(accordianData);
        }

        return favouriteData.length;
    }

    getCategories(data: any): Array<any> {
        let category = {};
        let returnData = [];
        let externalAccount = data;
        for (let item of externalAccount) {
            if (category[item.catId] !== item.categoryName) {
                category[item.catId] = item.categoryName;
                returnData.push({ id: item.catId, name: item.categoryName });
            }
        }
        returnData = this.sortData(returnData, 'name');

        return returnData;
    }

    sortData(array: Array<any>, key: any): Array<any> {
        let returnArray = JSON.parse(JSON.stringify(array));
        returnArray.sort((a: any, b: any) => {
            let nameA = a[key] && a[key].toLowerCase() || "";
            let nameB = b[key] && b[key].toLowerCase() || "";
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            } else {
                return 0;
            }
        });
        return returnArray;
    }

    navigateToExAccDetail(data: any): void {
        let anyIDType = this.anyIDTypeList[data.anyIDType] || new AnyIDTypeBean();
        data.anyIDTypeLabel = anyIDType.label;
        data.anyIDTypeDesc = anyIDType.desc;
        data.msgLang = data.msgLang != null ? data.msgLang.toUpperCase() : this.currentLang;

        this.otherAccountService.selectAccountDetailData = data;
        this.permissionChangeRoute.changeRoute("OTHER_ACCOUNTS.DETAIL");
    }

    navigateToFundTransfer(data: any): void {
        this.otherAccountService.selectAccountDetailData = data;
        this.permissionChangeRoute.changeRoute("FUND_TRANSFER");
    }

    private addAccountBean(): void {
        let accounts = this.accordian.data;
        if (accounts) {
            for (let i in accounts) {
                let state = accounts[i].stateData;
                for (let j in state) {
                    let item = state[j];
                    let accountObj = new AccountBean();
                    let anyIDType = this.anyIDTypeList[item.anyIDType] || new AnyIDTypeBean();

                    if (this.constants.ANYID_TYPE_BANK_ACCOUNT == anyIDType.anyIDType) {
                        let bank = new BankBean();
                        bank.bankCode = item.bankCode;
                        bank.bankName = item.bankName;
                        bank.shortName = item.shortName || "";
                        bank.imgObj = this.bankCodeDataService.getBankCodeImageProperty(bank.bankCode);
                        bank.isORFT = item.isORFT;
                        accountObj.bank = bank;
                    } else {
                        anyIDType.shortName = item.shortName || "";
                    }

                    let category = new CategoryBean();
                    category.catId = item.catId;
                    category.catName = item.categoryName;

                    accountObj.accId = item.exAcctId;
                    accountObj.accNo = item.acctNo;
                    accountObj.accName = item.acctName;
                    accountObj.aliasName = item.acctAliasName;
                    accountObj.anyIDType = anyIDType;
                    accountObj.category = category;
                    accountObj.email = item.email;
                    accountObj.mobileNo = item.mobile;
                    accountObj.notifyLang = (item.msgLang) ? item.msgLang.toUpperCase() : null;

                    this.accordian.data[i].stateData[j]["accountBean"] = accountObj;
                }
            }
        }
    }



    private sendStatus(msg, data) {

        this.onGetStatus.emit({
            msg: msg,
            data: data
        });
    }

    public trackByFn(index, item) {
        return index;
    }

    public autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;
            root.utilService.setPageHeight(700);

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }
}
