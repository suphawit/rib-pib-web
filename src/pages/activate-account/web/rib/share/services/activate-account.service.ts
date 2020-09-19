import { Injectable } from '@angular/core';
import { SubscriptionService } from '../../../../../../share/service/subscription.service';
import { Constants } from '../../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../../share/service/permission.service';
import { OtpService } from '../../../../../../share/component/verify-otp/otp.service';

@Injectable()
export class ActivateAccountService {
    private _pageState: string;
    private _pageCache: any = null;

    constructor(
        public subscriptionService: SubscriptionService,
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public otpService: OtpService) {
        
    }

    public requestActivateAccount(params: any) {
        let promise = new Promise((resolve, reject) => {
            params.idNo = this.pageCache['idNo'] || '';
            params.idType = this.pageCache['idType'] || '';
            params.referenceCode = this.pageCache.referenceCode;
            params.actionType = this.constants.ACTION_TYPE_ACTIVATE_ACCOUNT;
            params.verifyTransactionId = this.pageCache['verifyTransactionId'] || '';
            params.idIssueCountryCode = this.pageCache['idIssueCountryCode'] || '';

            this.subscriptionService.requestActivateAccount(params).then((result: any) => {
                this.pageCache = null;
                resolve(result);
            }, (result: any) => {
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_CREATE_USER_DUPLICATE) {
                    result.responseStatus.suggest = result.value.suggestionUserIdList || [];
                }
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public verifyReferenceCode(params: any) {
        let promise = new Promise((resolve, reject) => {
            params.actionType = this.constants.ACTION_TYPE_ACTIVATE_ACCOUNT;

            this.subscriptionService.verifyReferenceCode(params).then((result: any) => {
                // cache params
                this.pageCache = params;

                resolve(result);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public verifyDebitCardAndATMPin(params: any) {
        let promise = new Promise((resolve, reject) => {
            params.actionType = this.constants.ACTION_TYPE_ACTIVATE_ACCOUNT;

            this.subscriptionService.verifyDebitCardAndATMPin(params).then((result: any) => {
                // cache params
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
            params.actionType = this.constants.ACTION_TYPE_ACTIVATE_ACCOUNT;

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
                    referenceCode: result.value.referenceCode,
                    idIssueCountryCode: params.idIssueCountryCode
                });

                resolve(result.value);
            }, (result: any) => {
                reject(result.responseStatus);
            });
        });
        return promise;
    }

    public inquiryTermAndCondition() {
        let promise = new Promise((resolve, reject) => {
            this.subscriptionService.inquiryTermAndCondition().then((result: any) => {
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
            menuCode = 'account-activate-' + pageCode;
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