import { Injectable } from '@angular/core';
import { MfpApi } from '../mfp/mfp-api.service';
import { Constants } from './constants';

@Injectable()
export class SubscriptionService {
    private _invokeOption: any = {adapter: 'SubscriptionAdapter'};
    private _attempCount: number = 0;

    constructor(
        public mfpApi: MfpApi,
        public constants: Constants) {

    }

    public requestActivateAccount(params: any) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.ACTIVATE_CUSTOMER,
                procedure: this.constants.REQ_PROCEDURE_NAME.ACTIVATE_CUSTOMER,
                params: {
                    idNo: params.idNo,
                    idType: params.idType,
                    tokenUUID: this.constants.TOKEN_UUID,
                    customerType: this.constants.CUSTOMER_TYPE_RETAIL,
                    username: params.username,
                    password: params.password,
                    userAction: params.username || '',
                    sessionToken: '',
                    userProfile: '',
                    corpId: this.constants.CORP_ID_RIB,
                    attempCount: ++this._attempCount,
                    referenceCode: params.referenceCode,
                    actionType: params.actionType,
                    verifyTransactionId: params.verifyTransactionId,
                    subscriptionChannel: params.subscriptionChannel,
                    idIssueCountryCode: params.idIssueCountryCode
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public verifyReferenceCode(params: any) {
        this._attempCount = 0;
        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_REF_CODE,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_REF_CODE,
                params: {
                    idType: params.idType || '',
                    idNo: params.idNo || '',
                    referenceCode: params.referenceCode,
                    customerType: this.constants.CUSTOMER_TYPE,
                    actionType: params.actionType,
                    subscriptionChannel: params.subscriptionChannel,
                    referenceNO: params.referenceNO || '',
                    otp: params.otp || '',
                    tokenOTPForCAA: params.tokenOTPForCAA || '',
                    verifyTransactionId: params.verifyTransactionId || '',
                    idIssueCountryCode: params.idIssueCountryCode || ''
                }
            };

            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public verifyDebitCardAndATMPin(params: any) {
        this._attempCount = 0;

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_SUBSCRIPTION_ATM_PIN,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_SUBSCRIPTION_ATM_PIN,
                params: {
                    //action: this.constants.CORP_ID_RIB,
                    atmNumber: params.atmNumber,
                    atmPin: params.atmPin,
                    actionType: params.actionType
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;
                console.log(result.responseStatus.responseCode)
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {

                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public verifyProduct(params: any) {
        this._attempCount = 0;

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_SUBSCRIPTION_PRODUCT_ID,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_SUBSCRIPTION_PRODUCT_ID,
                params: {
                    // action: this.constants.CORP_ID_RIB,
                    idNo: params.idNo,
                    idType: params.idType,
                    productType: params.productType,
                    productId: params.productId,
                    // birthDate: params.birthDate,
                    actionType: params.actionType,
                    idIssueCountryCode: params.idIssueCountryCode
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public requestOtp(params: any){
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.REQUEST_OTP,
                procedure: this.constants.REQ_PROCEDURE_NAME.REQUEST_OTP,
                params: {
                    //action: this.constants.CORP_ID_RIB,
                    idType: params.idType,
                    idNo: params.idNo,
                    actionOTP: params.actionOTP,
                    verifyTransactionId: params.verifyTransactionId,
                    subscriptionChannel: params.subscriptionChannel
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public verifyOtp(params: any){
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_OTP,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_OTP,
                params: {
                    referenceNO: params.referenceNO,
                    otp: params.otp,
                    tokenOTPForCAA: params.tokenOTPForCAA,
                    verifyTransactionId: params.verifyTransactionId,
                    subscriptionChannel: params.subscriptionChannel
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public requestUsername(params: any){
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.REQUEST_USERNAME,
                procedure: this.constants.REQ_PROCEDURE_NAME.REQUEST_USERNAME,
                params: {
                    idType: params.idType,
                    referenceCode: params.referenceCode,
                    idNo: params.idNo,
                    subscriptionChannel: params.subscriptionChannel,
                    verifyTransactionId: params.verifyTransactionId,
                    idIssueCountryCode: params.idIssueCountryCode
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public inquiryTermAndCondition() {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_TERM_AND_CONDITION,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_TERM_AND_CONDITION,
                params: {}
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public inquiryAllIssueCountry() {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_ALL_ISSUE_COUNTRY,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_ALL_ISSUE_COUNTRY,
                params: {}
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;

                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }
}