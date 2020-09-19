import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class OtherAccountService {
    private selectItem: any;
    private procedure: string;
    private actioncode: string;
    private param: Object = {};
    private _tempAddExtAccountData: any;
    private _selectAccountDetailData: any;
    private _confirmAddExtAccountData: any;
    private _confirmEditExtAccountData: any;
    private _isAccountAfterTransfer: boolean = false;
    private _isRequireOtp: boolean = true;

    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }
    public getActionCode(): string {
        return this.actioncode;
    }

    public setProcedure(procedure: string) {
        this.procedure = procedure;

    }
    public getProcedure(): string {
        return this.procedure;
    }

    public setParam(param: Object) {
        this.param = param;
    }
    public getParam(): Object {
        return this.param;
    }

    set confirmAddExtAccountData(confirmAddExtAccountData: any) {
        this._confirmAddExtAccountData = confirmAddExtAccountData;
    }
    get confirmAddExtAccountData() {

        return this._confirmAddExtAccountData;
    }

    get selectAccountDetailData(): any {
        return this._selectAccountDetailData;
    }
    set selectAccountDetailData(data: any) {

        this._selectAccountDetailData = data;
    }

    set tempAddExtAccountData(data: any) {
        this._tempAddExtAccountData = data;
    }
    get tempAddExtAccountData() {
        return this._tempAddExtAccountData;
    }

    set tempEditExtAccountData(data: any) {
        this._tempAddExtAccountData = data;
    }
    get tempEditExtAccountData() {
        return this._tempAddExtAccountData;
    }

    set confirmEditExtAccountData(confirmAddExtAccountData: any) {
        this._confirmAddExtAccountData = confirmAddExtAccountData;
    }
    get confirmEditExtAccountData() {

        return this._confirmAddExtAccountData;
    }

    set setSelectOtherAcc(selectItem) {
        this.selectItem = selectItem;

    }
    get getSelectOtherAcc() {
        return this.selectItem;
    }

    set setConfirmEditExtAccountData(confirmEditExtAccountData: any) {
        this._confirmEditExtAccountData = confirmEditExtAccountData;
    }
    get getConfirmEditExtAccountData() {
        return this._confirmEditExtAccountData;
    }

    set isAccountAfterTransfer(flag: boolean) {
        this._isAccountAfterTransfer = flag
    }
    get isAccountAfterTransfer(): boolean {
        return this._isAccountAfterTransfer;
    }

    set isRequireOtp(flag: boolean) {
        this._isRequireOtp = flag;
    }
    get isRequireOtp() {
        return this._isRequireOtp;
    }

    constructor(private mfpApi: MfpApi,
        public constants: Constants,
        public translateService: TranslateService) {
        this._selectAccountDetailData = null;
    }

    public masterData() {
        var promise = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: this.actioncode,
                params: this.param,
                procedure: this.procedure
            };

            this.mfpApi.invokeProcedure(objRequest).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public requestInquiryExternalAccount() {
        let lang = this.translateService.currentLang;

        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    language: lang,
                    userID: undefined
                },
                actionCode: this.constants.REQ_ACTION_CODE.EXTERNAL_ACCOUNT_INQUIRY,
                procedure: this.constants.REQ_PROCEDURE_NAME.EXTERNAL_ACCOUNT_INQUIRY
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public requestManageFavourite(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    detail: {
                        exActID: data.exAcctId,
                        enable: (data.isFavourite === 'N') ? true : false
                    },
                    userID: undefined
                },
                actionCode: this.constants.REQ_ACTION_CODE.EXTERNAL_ACCOUNT_UPDATE_FAVORITE,
                procedure: this.constants.REQ_PROCEDURE_NAME.EXTERNAL_ACCOUNT_UPDATE_FAVORITE
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public removeExternalAccount(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    exAcctId: data
                },
                actionCode: this.constants.REQ_ACTION_CODE.EXTERNAL_ACCOUNT_DELETE,
                procedure: this.constants.REQ_PROCEDURE_NAME.EXTERNAL_ACCOUNT_DELETE
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public editExternalAccountService(data: any) {


        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    externalAccount: {
                        acctAliasName: data.accountAliasname,
                        mobile: data.mobile,
                        email: data.email,
                        exAcctId: this.selectItem.exAcctId,
                        acctNo: data.account,
                        acctName: data.accountName,
                        anyIDType: data.anyIDType,
                        status: this.selectItem.status,
                        bankName: this.selectItem.bankName,
                        productId: '',
                        bankCode: this.selectItem.bankCode,
                        isFavourite: this.selectItem.isFavourite,
                        msgLang: this.selectItem.msgLang,
                        catId: this.selectItem.catId,
                    },
                },
                actionCode: 'ACT_EXTERNAL_ACCOUNT_EDIT',
                procedure: 'editExternalAccountProcedure'
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });

        return promise;
    }

    public InquiryCategoryInfo() {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    //language: lang,
                    //userID: undefined
                },
                actionCode: 'ACT_INQUIRY_CATEGORY_INFO',
                procedure: 'inquiryCategoryInfoProcedure'
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public InquiryBankInfo() {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {},
                actionCode: 'ACT_INQUIRY_BANK_INFO',
                procedure: 'inquiryBankInfoProcedure'
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public inquiryAnyIDType() {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    actionType: 'to_anyid_type'
                    //language: lang,
                    //userID: undefined
                },
                actionCode: 'ACT_INQUIRY_ANYID_TYPE',
                procedure: 'inquiryBankInfoProcedure'
                // TODO: add new Procedure
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public requestAddExternalAccount(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    accountAliasname: data.accountAliasname,
                    mobile: data.mobile,
                    email: data.email,
                    accountNo: data.accountNo,
                    accountName: data.accountName,
                    anyIDType: data.anyIDType,
                    bankCode: data.bankCode,
                    isFavourite: false,
                    msgLang: data.msgLang,
                    category: data.category,
                    txnId: data.txnId,
                    refTxnId: data.refTxnId
                },
                actionCode: this.constants.REQ_ACTION_CODE.EXTERNAL_ACCOUNT_ADD,
                procedure: this.constants.REQ_PROCEDURE_NAME.EXTERNAL_ACCOUNT_ADD
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }

    public requestSubmitExternalAccountWithoutOTP(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    externalAccount: {
                        acctAliasName: data.acctAliasName,
                        mobile: data.mobile,
                        email: data.email,
                        acctNo: data.acctNo,
                        acctName: data.accountName || data.acctName,
                        anyIDType: data.anyIDType,
                        bankCode: data.bankCode,
                        msgLang: data.msgLang,
                        catId: data.catId
                    },
                    verifyOTP: {}
                },
                actionCode: this.constants.REQ_ACTION_CODE.EXTERNAL_ACCOUNT_ADD_SUBMIT_WITHOUT_OTP,
                procedure: this.constants.REQ_PROCEDURE_NAME.EXTERNAL_ACCOUNT_ADD_SUBMIT_WITHOUT_OTP
            };


            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise;
    }
}
