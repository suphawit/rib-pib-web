import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';

@Injectable()
export class PromptPayRegisterServiceMain {
    private _resultAnyIDConfirm: any;
    private _verifyTransactionId: any;

    private _confirmRegisterAnyIDData: any;
    private _tempRegisterAnyIDData: any;
    private _registerAnyIDInfo:any;
    private _promptPayAccountDetail: any;
    private _EditAnyIDData: any;
    constructor(private _MfpApi: MfpApi,
    private _Constants:Constants) {
    };
    public getTermAndConditionPromptPayRegisterService() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                   
                },
				actionCode: this._Constants.REQ_ACTION_CODE.CONTACT_US, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.CONTACT_US
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }
     public inquiryCustomerAnyIDInformation() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                   
                },
				actionCode: this._Constants.REQ_ACTION_CODE.INQUIRY_CUSTOMER_ANYID_INFORMATION, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.INQUIRY_CUSTOMER_ANYID_INFORMATION
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }
    public inquiryMyAccount() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                   
                },
				actionCode: this._Constants.REQ_ACTION_CODE.MY_ACCOUNT_INQUIRY_CASA_SUMMARY, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.MY_ACCOUNT_INQUIRY_CASA_SUMMARY
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public registerAnyIDConfirm(param) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: param,
				actionCode: this._Constants.REQ_ACTION_CODE.VERIFY_ANYID_INFORMATION, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.VERIFY_ANYID_INFORMATION
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    set resultAnyIDConfirm(resultAnyIDConfirm: any){
        this._resultAnyIDConfirm = resultAnyIDConfirm;
    }
    get resultAnyIDConfirm(){
        return this._resultAnyIDConfirm;
    }

    set verifyTransactionId(data: any){
        this._verifyTransactionId = data;
    }
    get verifyTransactionId(){
        return this._verifyTransactionId;
    }

    public registerAnyID(data: any) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: data,
				actionCode: this._Constants.REQ_ACTION_CODE.REGISTER_ANYID, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.REGISTER_ANYID
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }
    
    set confirmRegisterAnyIDData(data: any){
        this._confirmRegisterAnyIDData = data;
    }
    get confirmRegisterAnyIDData(){
        return this._confirmRegisterAnyIDData;
    }

    set tempRegisterAnyIDData(data: any){
        this._tempRegisterAnyIDData = data;
    }
    get tempRegisterAnyIDData(){
        return this._tempRegisterAnyIDData;
    }

    public inquiryAnyIDType() {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: {
                    actionType:'register_anyid_type'
                },
				actionCode: 'ACT_INQUIRY_ANYID_TYPE', 
				procedure: 'inquiryBankInfoProcedure'
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    set registerAnyIDInfo(data: any){
        this._registerAnyIDInfo = data;
    }
    get registerAnyIDInfo(){
        return this._registerAnyIDInfo;
    }

    set PromptPayAccountDetail(data: any){
        this._promptPayAccountDetail = data;
    }
    get PromptPayAccountDetail(){
        return this._promptPayAccountDetail;
    }

    set EditAnyIDData(data: any){
        this._EditAnyIDData = data;
    }
    get EditAnyIDData(){
        return this._EditAnyIDData;
    }

    public verifyPromptPayEditAccountService(param: any) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: param,
				actionCode: this._Constants.REQ_ACTION_CODE.VERIFY_AMEND_ANYID, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.VERIFY_AMEND_ANYID, 
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmPromptPayEditAccountService(param: any) {
        let promise = new Promise((resolve, reject) => {
            
            let objRequest = {
                params: param,
				actionCode: this._Constants.REQ_ACTION_CODE.CONFIRM_AMEND_ANYID, 
				procedure: this._Constants.REQ_PROCEDURE_NAME.CONFIRM_AMEND_ANYID, 
            };
            this._MfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
}