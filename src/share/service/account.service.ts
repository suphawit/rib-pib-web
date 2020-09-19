import { Injectable } from '@angular/core';
import { BankBean } from '../../share/bean/bank-bean';
import { Dictionary } from '../../share/bean/dictionary';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { AccountBean } from '../../share/bean/account-bean';
import { OrderByPipe } from '../../share/pipe/order-by.pipe';
import { CategoryBean } from '../../share/bean/category-bean';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MasterDataService } from '../../share/service/master-data.service';
import { PermissionService } from '../../share/service/permission.service';

@Injectable()
export class AccountService {
    constructor(
        private mfpApi: MfpApi,
        private constants: Constants,
        private orderBy: OrderByPipe,
        private translate: TranslateService,
        private masterDataService: MasterDataService,
        private permissionService:PermissionService) {

    }

    getMyAccounts() {
        let accounts: any = [];

        let objRequest = {
            params: {
                language: this.translate.currentLang,
            },
            actionCode: this.constants.REQ_ACTION_CODE.RBAC_MY_ACCOUNT_INQUIRY_CASA_SUMMARY,
            procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_CASA_SUMMARY
        }

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {

                        objResponse.responseJSON.result.value.forEach(element => {

                            let bankImgList = this.masterDataService.getBankImgList();
                            let bank = new BankBean();
                                bank.bankCode = element.bankCode;
                                bank.bankName = element.bankName;
                                bank.shortName = element.shortName;
                                bank.imgObj = bankImgList[element.bankCode] || bankImgList[this.constants.DEFAULT_BANK_CODE];

                            let accountObj = new AccountBean();
                                accountObj.accId = element.myAccountID;
                                accountObj.accNo = element.myAccountNumber;
                                accountObj.aliasName = element.myAccountAliasName;
                                accountObj.balance = element.myAvailableBalance;
                                accountObj.benefitAcc = element.myLedgerBalance;
                                accountObj.accountType = element.accountType;
                                accountObj.accName = element.myAccountName;
                                accountObj.bank = bank;
                                accountObj.productID = element.productID;
                                accountObj.allowSchedule = this.permissionService.isProductAllow(element.productID, 'allowSchedule');

                            accounts.push(accountObj);
                        });
                        resolve(accounts);
                    }else{
                        resolve(objResponse.responseJSON.result.responseStatus);
                    }
                }

                
            }, function (error) {

            });
        });

        return p;
    }

    getGroupMyAccounts() {
        let groups: any = [];
        let accounts: any = [];
        let dictAccount: Dictionary = {};

        let objRequest = {
            params: {
                language: this.translate.currentLang,
            },
            actionCode: this.constants.REQ_ACTION_CODE.RBAC_MY_ACCOUNT_INQUIRY_CASA_SUMMARY,
            procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_CASA_SUMMARY
        }

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        objResponse.responseJSON.result.value.forEach(element => {

                            let bankImgList = this.masterDataService.getBankImgList();

                            let bank = new BankBean();
                            bank.bankCode = element.bankCode;
                            bank.bankName = element.bankName;
                            bank.shortName = element.shortName;
                            bank.imgObj = bankImgList[element.bankCode] || bankImgList[this.constants.DEFAULT_BANK_CODE];

                            let accountObj = new AccountBean();
                            accountObj.accId = element.myAccountID;
                            accountObj.accNo = element.myAccountNumber;
                            accountObj.aliasName = element.myAccountAliasName;
                            accountObj.balance = element.myAvailableBalance;
                            accountObj.benefitAcc = element.myLedgerBalance;
                            accountObj.accountType = element.accountType;
                            accountObj.accTypeDesc = element.myAccountType;
                            accountObj.accName = element.myAccountName;
                            accountObj.allowSchedule = this.permissionService.isProductAllow(element.productID, 'allowSchedule');
                            accountObj.bank = bank;

                            accounts.push(accountObj);

                            var accountType = accountObj.accountType;
                            dictAccount[accountType] = dictAccount[accountType] || [];
                            dictAccount[accountType].push(accountObj);
                        });

                        let keys = dictAccount != null ? Object.keys(dictAccount) : [];

                        keys.forEach(function (accType, index) {
                            let myAccounts = dictAccount[accType];
                            groups[index] = {
                                name: accType,
                                desc: myAccounts[0].accTypeDesc,
                                items: myAccounts,
                                show: false
                            };
                        });
                    }
                }

                resolve(groups);
            }, function (error) {

            });
        });

        return p;
    }

    getOtherAccounts(anyIDTypeList: any = []) {
        let groups: any = [];
        let otherAccounts: Dictionary = {};

        let objRequest = {
            params: {
                language: this.translate.currentLang,
            },
            actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_TRANSFER_TO_ACCOUNT,
            procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_TRANSFER_TO_ACCOUNT
        }

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    if (objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        objResponse.responseJSON.result.value.forEach(element => {
                            let category = new CategoryBean();
                            category.catId = element.categoryId;
                            category.catName = element.categoryName;

                            let anyIDType = anyIDTypeList[element.anyIDType] || new AnyIDTypeBean();
                            anyIDType.anyIDType = element.anyIDType;

                            let accountObj = new AccountBean();
                            accountObj.accId = element.accountID;
                            accountObj.accNo = element.accountNumber;
                            accountObj.aliasName = element.accountAliasName;
                            accountObj.accName = element.accountName;
                            accountObj.accountType = element.accountType;
                            accountObj.category = category;

                            // Notify Receiver
                            accountObj.email = element.email;
                            accountObj.mobileNo = element.mobileNumber;
                            accountObj.notifyLang = (element.msgLang) ? element.msgLang.toUpperCase() : null;

                            if (element.bankCode !== null && element.bankCode !== '') {
                                let bank = new BankBean();
                                bank.bankCode = element.bankCode;
                                bank.bankName = element.bankName;
                                bank.shortName = element.shortName;
                                bank.isORFT = element.isOrft;

                                let bankImgList = this.masterDataService.getBankImgList();
                                bank.imgObj = bankImgList[element.bankCode] || bankImgList[this.constants.DEFAULT_BANK_CODE];

                                accountObj.bank = bank;
                            } else {
                                anyIDType.shortName = element.shortName;
                            }

                            accountObj.anyIDType = anyIDType;

                            var catId = accountObj.category.catId;
                            otherAccounts[catId] = otherAccounts[catId] || [];
                            otherAccounts[catId].push(accountObj);
                        });

                        let categories = otherAccounts != null ? this.orderBy.transform(Object.keys(otherAccounts), "") : [];

                        // Initial add new account panel
                        groups[0] = {
                            index: 0,
                            name: this.translate.instant("lbl.newAccount"),
                            catId: 999,
                            items: [],
                            show: false
                        };

                        categories.forEach(function (catId, index) {
                            let accounts = otherAccounts[catId];

                            groups[index + 1] = {
                                index: index + 1,
                                name: accounts[0].category.catName,
                                catId: catId,
                                items: accounts,
                                show: false
                            };
                        });
                    }
                }

                resolve(groups);
            }, function (error) {

            });
        });

        return p;
    }
}