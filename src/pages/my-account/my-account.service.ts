import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class MyAccountService {
    private _selectAccountDetailData: any;
    private _newMyAccountData: any;

    alertConfig: {title: string, type: string,message: string, show: boolean, option: any};

    constructor(private _MfpApi: MfpApi, private constants: Constants, public translateService: TranslateService) {


        this._selectAccountDetailData = null;
    };

    get selectAccountDetailData(): any{
        return this._selectAccountDetailData;
    }
    set selectAccountDetailData(data: any){
        this._selectAccountDetailData = data;
    }

    public deleteMyAccount(myAccount:any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    myAccountID: myAccount.myAccountID
                },
                actionCode: this.constants.REQ_ACTION_CODE.MY_ACCOUNT_DELETE, 
                procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_DELETE
            }
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestDashboard() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                },
				actionCode: this.constants.REQ_ACTION_CODE.DASHBOARD, 
				procedure: this.constants.REQ_PROCEDURE_NAME.DASHBOARD
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestInquiryMyAccount() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                },
				actionCode: this.constants.REQ_ACTION_CODE.MY_ACCOUNT_INQUIRY, 
				procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestTDStatementReport(data: any) {
        let lang = this.translateService.currentLang;
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
			        language: lang, 
                    accountID: data.accountID
                },
				actionCode: this.constants.REQ_ACTION_CODE.TD_STATEMENT_REPORT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.TD_STATEMENT_REPORT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestCASAStatementReport(data: any) {
        let lang = this.translateService.currentLang;
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    language: lang, 
					accountID: data.accountID,
                    dateFrom: data.dateFrom,
			        dateTo: data.dateTo
                },
				actionCode: this.constants.REQ_ACTION_CODE.CASA_STATEMENT_REPORT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.CASA_STATEMENT_REPORT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestInquiryTDStatement(data: any) {
        let lang = this.translateService.currentLang;
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    language: lang,
			        paging: {
                        page: 0,
			            pageSize: '0'
                    },
                    inquiryAccountStatement: {
                        myAcctId: data.inquiryAccountStatement.myAcctId
                    }
                },
				actionCode: this.constants.REQ_ACTION_CODE.MY_ACCOUNT_INQUIRY_TD_STATEMENT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_TD_STATEMENT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestInquiryCASAStatement(data: any) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    tokenID: '',
			        paging: {
                        page: data.paging.page,
			            pageSize: data.paging.pageSize
                    },
                    inquiryAccountStatement: {
                        myAcctId: data.inquiryAccountStatement.myAcctId,
			            statementDateFrom: data.inquiryAccountStatement.statementDateFrom,
			            statementDateTo: data.inquiryAccountStatement.statementDateTo
                    }
                },
				actionCode: this.constants.REQ_ACTION_CODE.MY_ACCOUNT_INQUIRY_CASA_STATEMENT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_CASA_STATEMENT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

     public getEditMyAccountService(param) {

        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'ACT_MY_ACCOUNT_CHANGE_ALIAS_NAME',
                params: param,
                procedure: 'changeAilasNameMyAccountProcedure'
            }
             
            this._MfpApi.invokeProcedure(obj).then((result) => {
           
                resolve(result);
            }, function (error) {
                reject(error);

            }
            );
        });
        return promise;
    }

    public invokeServices(actionCode:string,procedure:string,objParam:any) {
        

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: actionCode,
                params: objParam,
                procedure: procedure
            }
            this._MfpApi.invokeProcedure(obj).then((result) => {
                    resolve(result);
            },  function (error) {
                    reject(error);

            }
            );
        });
        return promise;
    }

    set newMyAccountData(newMyAccountData: any){
        this._newMyAccountData = newMyAccountData;
    }
    get newMyAccountData(){
        return this._newMyAccountData;
    }

    public requestDownloadTDStatement(accountID){
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    accountID: accountID
                },
				actionCode: this.constants.REQ_ACTION_CODE.TD_STATEMENT_REPORT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.TD_STATEMENT_REPORT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }
    public requestDownloadCASAStatement(accountID, dateFrom, dateTo){
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    accountID: accountID,
                    dateFrom: dateFrom,
                    dateTo: dateTo
                },
				actionCode: this.constants.REQ_ACTION_CODE.CASA_STATEMENT_REPORT, 
				procedure: this.constants.REQ_PROCEDURE_NAME.CASA_STATEMENT_REPORT
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public requestAddSubmitWithoutOTP(data){
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    myCustomerAccount: {
                        myAccountAliasName: data.myAccountAliasName,
                        myAccountNumber: data.myAccountNumber
                    }
                },
				actionCode: this.constants.REQ_ACTION_CODE.MY_ACCOUNT_ADD_SUBMIT_WITHOUT_OTP, 
				procedure: this.constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_ADD_SUBMIT_WITHOUT_OTP
            };

            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    private _isAccountAfterTransfer: boolean = false;
    set isAccountAfterTransfer(flag: boolean){
        this._isAccountAfterTransfer = flag
    }
    get isAccountAfterTransfer():boolean{
        return this._isAccountAfterTransfer;
    }

    private _isRequireOtp: boolean = true;
    set isRequireOtp(flag: boolean) {
        this._isRequireOtp = flag;
    }
    get isRequireOtp(): boolean {
        return this._isRequireOtp;
    }
}