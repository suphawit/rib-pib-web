import { Injectable } from '@angular/core';
import { Constants } from '../../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../../share/service/permission.service';
import { SubscriptionService } from '../../../../../../share/service/subscription.service';
import { OtpService } from '../../../../../../share/component/verify-otp/otp.service';

@Injectable()
export class ForgotUsernameService {
    private _pageState: string;
    private _pageCache: any = null;

    constructor(
        public subscriptionService: SubscriptionService,
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public otpService: OtpService) {
        
    }

    public verifyReferenceCode(params: any) {
        if(this.pageCache !== null){
            params.idType = this.pageCache.idType;
            params.idNo = this.pageCache.idNo;
        }

        let promise = new Promise((resolve, reject) => {
            params.actionType = this.constants.ACTION_TYPE_FORGOT_USERNAME;

            this.subscriptionService.verifyReferenceCode(params).then((result: any) => {
                // cache params
                params['verifyTransactionId'] = result.value.verifyTransactionId;
                this.pageCache = params;

                this.otpService.setCardInfoBean({
                    cardType: params.idType,
                    cardId: params.idNo,
                    referenceCode: params.referenceCode,
                    idIssueCountryCode: params.idIssueCountryCode
                });

                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public verifyDebitCardAndATMPin(params: any) {
        let promise = new Promise((resolve, reject) => {
            params.actionType = this.constants.ACTION_TYPE_FORGOT_USERNAME;

            this.subscriptionService.verifyDebitCardAndATMPin(params).then((result: any) => {
                // cache result
                this.pageCache = result.value;

                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public verifyProduct(params: any) {
        let promise = new Promise((resolve, reject) => {
            params.actionType = this.constants.ACTION_TYPE_FORGOT_USERNAME;

            this.subscriptionService.verifyProduct(params).then((result: any) => {
                // cache params
                this.pageCache = {
                    idNo: params.idNo,
                    idType: params.idType,
                    email: result.value.email,
                    mobileNo: result.value.mobileNo,
                    verifyTransactionId: result.value.verifyTransactionId
                };

                this.otpService.setCardInfoBean({
                    cardType: params.idType,
                    cardId: params.idNo,
                    referenceCode: params.referenceCode,
                    idIssueCountryCode: params.idIssueCountryCode
                });

                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public verifyOTP(params: any) {
        let promise = new Promise((resolve, reject) => {
            let objParams = {
                otp: params.otpPin,
                referenceNO: params.otpRefcode,
                tokenOTPForCAA: params.tokenOtp,
                verifyTransactionId: params.verifyTransactionId,
                subscriptionChannel: params.subscriptionChannel
            };

            this.subscriptionService.verifyOtp(objParams).then((result: any) => {
                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public requestUsername(params?: any) {
        let promise = new Promise((resolve, reject) => {
            let objParams = {
                idType: params.idType,
                referenceCode: params.referenceCode || '',
                idNo: params.idNo,
                subscriptionChannel: params.subscriptionChannel || '',
                verifyTransactionId: params.verifyTransactionId || '',
                idIssueCountryCode: this.pageCache['idIssueCountryCode'] || ''
            };
            this.subscriptionService.requestUsername(objParams).then((result: any) => {
                this.pageCache.username = result.value;
                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public inquiryAllIssueCountry() {
        let promise = new Promise((resolve, reject) => {
            this.subscriptionService.inquiryAllIssueCountry().then((result: any) => {
                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public changeRouteByRadioBox(value){
        let pageCode;
        let selected = value || 'usingrefcode';
        switch (selected) {
            case 'debitcard':
                pageCode = 'debitcard1';
                break;
            case 'usingrefcode':
                pageCode = 'refcode1';
                break;
            case 'kkproducts':
                pageCode = 'products1';
                break;
        }

        this.changeRoute(pageCode);
    }

    public changeRoute(pageCode){
        let menuCode = pageCode;
        if(pageCode === 'HOME'){
            this.pageCache = null;
            this.pageState = '';
        } else {
            menuCode = 'forgotUserName-' + pageCode;
            this.pageState = pageCode;
        }
        
        this.permissionChangeRoute.changeRoute(menuCode);
    }

    public validPage(pageCode){
        if(pageCode !== this.pageState) {
            this.permissionChangeRoute.changeRoute('HOME');
        }
    }

    set pageState(data: any){
        this._pageState = data;
    }

    get pageState(): any {
        return this._pageState;
    }

    set pageCache(data: any){
        this._pageCache = data;
    }

    get pageCache(): any {
        return this._pageCache;
    }
}