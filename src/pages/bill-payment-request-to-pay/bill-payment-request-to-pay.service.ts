import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { TranslateService } from "ng2-translate/src/translate.service";
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';

import { BillerProfileBean } from '../../share/bean/biller-profile-bean';
import { BillerRefNoBean } from '../../share/bean/biller-ref-no-bean';
import { BillerBean } from '../../share/bean/biller-bean';
import { UtilService } from '../../share/service/util.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class BillPaymentRequestToPayService {
    
    private _observer: Subject<any> = new Subject();

    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    private confirmBillerProfile: BillerProfileBean;
    private selectBillerProfileDetail: BillerProfileBean;

    private confirmBillerProfileForAddNew: BillerProfileBean;
    private isFromAddNewAfterPayBill: boolean;

    constructor(
        private mfpApi: MfpApi,
        private constants: Constants,
        private translate: TranslateService,
        private utilService: UtilService) {
    }

    getObserver(): Subject<any> {
        return this._observer;
    }
    
    updateObserver(param: any) {
        this._observer.next(param);
    }

    public getUserDataBillerProfileList() : Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {},
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BILLER_CUSTOMER,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BILLER_CUSTOMER
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                let tmp = this.addLogoCompanyURL(result);
                result = tmp;
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public getBillerProfile(token: string) : Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    inquiryToken: token
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BILLER_INFO,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BILLER_INFO
            }
            this.mfpApi.invokeProcedure(obj,{adapter:'billerSearchCBSAdapter',isHideLoader:true}).then((result) => {
                let tmp = this.addLogoCompanyURL(result);
                result = tmp;
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public inquiryBillerByTokenAndCategories(token: string, categories: string[]): Promise<any>{
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    inquiryToken: token,
                    categoryCodeList: categories
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_INQUIRY_BILLER_TOKEN_AND_CATEGORY_LIST,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_INQUIRY_BILLER_TOKEN_AND_CATEGORY_LIST
            }
            this.mfpApi.invokeProcedure(obj,{adapter:'billerSearchCBSAdapter',isHideLoader:true}).then((result) => {
                let tmp = this.addLogoCompanyURL(result);
                result = tmp;
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public inquiryCategories(): Promise<any>{
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_INQUIRY_ALL_CATEGORY,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_INQUIRY_ALL_CATEGORY
            }
            this.mfpApi.invokeProcedure(obj,{adapter:'billerSearchCBSAdapter'}).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public getBillerProfileDetail(billerProfileId: string) : Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerProfileId: billerProfileId
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_PAY_INFO_PIBRIB,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_PAY_INFO_PIBRIB
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                let tmp = this.addLogoCompanyURL(result);
                result = tmp;
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public verifyAddBillerProfileDetail(billerProfileDetail : BillerProfileBean) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerInfo: {
                        aliasName:          billerProfileDetail.aliasName,
                        billerProfileId:    billerProfileDetail.billerProfileId,
	                    promptPayBillerId:  billerProfileDetail.promptPayBillerId,
                        profileCode:        billerProfileDetail.profileCode,
                        companyCode:        billerProfileDetail.companyCode,
                        categoryId:         billerProfileDetail.categoryId,
                        categoryTh:         billerProfileDetail.categoryTh,
                        categoryEn:         billerProfileDetail.categoryEn,
                        companyTh:          billerProfileDetail.categoryTh,
                        companyEn:          billerProfileDetail.companyEn,
                        logoCompany:        billerProfileDetail.logoCompany,
                        subServiceTh:       billerProfileDetail.subServiceTh,
                        subServiceEn:       billerProfileDetail.subServiceEn
                    }
                },
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_ADD_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_ADD_BILLER
            }
            let refInfos = new Array<any>();
            billerProfileDetail.refNoList.forEach((element: BillerRefNoBean) => {
                let refInfo = {
                    no:     element.no,
                    value:  element.value.trim(),
                    textEn: element.refTextEn,
                    textTh: element.refTextTh
                };
                refInfos.push(refInfo);
            });
            obj.params.billerInfo['refInfos'] = refInfos;
            this.mfpApi.invokeProcedure(obj).then((result) => {
                let tmp = this.addLogoCompanyURL(result);
                result = tmp;
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmAddBillerProfileDetail(billerProfileDetail : BillerProfileBean, OTPData: any) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    referenceNO:            OTPData.otpRefcode,
                    tokenOTPForCAA:         OTPData.tokenOtp,
                    otp:                    OTPData.pin,
                    billerInfo: {
                        aliasName:          billerProfileDetail.aliasName,
                        billerProfileId:    billerProfileDetail.billerProfileId,
	                    promptPayBillerId:  billerProfileDetail.promptPayBillerId,
                        profileCode:        billerProfileDetail.profileCode,
                        companyCode:        billerProfileDetail.companyCode,
                        categoryId:         billerProfileDetail.categoryId,
                        categoryTh:         billerProfileDetail.categoryTh,
                        categoryEn:         billerProfileDetail.categoryEn,
                        companyTh:          billerProfileDetail.categoryTh,
                        companyEn:          billerProfileDetail.companyEn,
                        logoCompany:        billerProfileDetail.logoCompany,
                        subServiceTh:       billerProfileDetail.subServiceTh,
                        subServiceEn:       billerProfileDetail.subServiceEn
                    }
                },
                actionCode: this.constants.REQ_ACTION_CODE.ADD_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.ADD_BILLER
            }
            let refInfos = new Array<any>();
            billerProfileDetail.refNoList.forEach((element: BillerRefNoBean) => {
                let refInfo = {
                    no:     element.no,
                    value:  element.value.trim(),
                    textEn: element.refTextEn,
                    textTh: element.refTextTh
                };
                refInfos.push(refInfo);
            });
            obj.params.billerInfo['refInfos'] = refInfos;
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public verifyEditBillerProfileDetail(billerProfileDetail : BillerProfileBean) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerInfo: {
                        aliasName:          billerProfileDetail.aliasName,
                        billerId:           billerProfileDetail.billerId,
	                    promptPayBillerId:  billerProfileDetail.promptPayBillerId,
                        profileCode:        billerProfileDetail.profileCode,
                        companyCode:        billerProfileDetail.companyCode,
                        categoryId:         billerProfileDetail.categoryId,
                        categoryTh:         billerProfileDetail.categoryTh,
                        categoryEn:         billerProfileDetail.categoryEn,
                        companyTh:          billerProfileDetail.categoryTh,
                        companyEn:          billerProfileDetail.companyEn,
                        logoCompany:        billerProfileDetail.logoCompany,
                        subServiceTh:       billerProfileDetail.subServiceTh,
                        subServiceEn:       billerProfileDetail.subServiceEn
                    }
                },
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_EDIT_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_EDIT_BILLER
            }
            let refInfos = new Array<any>();
            billerProfileDetail.refNoList.forEach((element: BillerRefNoBean) => {
                let refInfo = {
                    no:     element.no,
                    value:  element.value.trim(),
                    textEn: element.refTextEn,
                    textTh: element.refTextTh
                };
                refInfos.push(refInfo);
            });
            obj.params.billerInfo['refInfos'] = refInfos;
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public confirmEditBillerProfileDetail(billerProfileDetail : BillerProfileBean) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerInfo: {
                        aliasName:          billerProfileDetail.aliasName,
                        billerId:           billerProfileDetail.billerId,
	                    promptPayBillerId:  billerProfileDetail.promptPayBillerId,
                        profileCode:        billerProfileDetail.profileCode
                    }
                },
                actionCode: this.constants.REQ_ACTION_CODE.EDIT_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.EDIT_BILLER
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public deleteBillerProfileDetail(billerProfileDetail : BillerProfileBean) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerId: billerProfileDetail.billerId
                },
                actionCode: this.constants.REQ_ACTION_CODE.DELETE_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.DELETE_BILLER
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }
    
    public updateFavouriteBiller(billerProfileDetail : BillerProfileBean) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerId: billerProfileDetail.billerId,
                    isFavourite: (billerProfileDetail.isFavourite == this.constants.NO_STATUS) ? this.constants.YES_STATUS : this.constants.NO_STATUS
                },
                actionCode: this.constants.REQ_ACTION_CODE.UPDATE_FAVOURITE_BILLER,
                procedure: this.constants.REQ_PROCEDURE_NAME.UPDATE_FAVOURITE_BILLER
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public requestBillPaymentFee(data: any) {
        let promise = new Promise((resolve, reject) => {
            let objRequest = {
                params: {
                    transactionID: data.transactionID
                },
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BILL_PAYMENT_FEE,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BILL_PAYMENT_FEE
            };

            this.mfpApi.invokeProcedure(objRequest).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }
    public parseObjToBillerProfileBean(obj: any) : BillerProfileBean {
        let billerProfileBean : BillerProfileBean = new BillerProfileBean();
        billerProfileBean.aliasName         = obj.aliasName;
        billerProfileBean.billerId          = obj.billerId;
        billerProfileBean.billerProfileId   = obj.billerProfileId;
        billerProfileBean.categoryEn        = obj.categoryEn;
        billerProfileBean.categoryId        = obj.categoryId;
        billerProfileBean.categoryTh        = obj.categoryTh;
        billerProfileBean.companyCode       = obj.companyCode;
        billerProfileBean.companyEn         = obj.companyEn;
        billerProfileBean.companyTh         = obj.companyTh;
        billerProfileBean.logoCompany       = obj.logoCompany;
        billerProfileBean.profileCode       = obj.profileCode;
        billerProfileBean.promptPayBillerId = obj.promptPayBillerId;
        billerProfileBean.subServiceEn      = obj.subServiceEn;
        billerProfileBean.subServiceTh      = obj.subServiceTh;
        billerProfileBean.isFavourite       = obj.isFavourite;
        billerProfileBean.billerNameEn      = obj.billerNameEn;
        billerProfileBean.billerNameTh      = obj.billerNameTh;
        billerProfileBean.serviceCode       = obj.serviceCode;
        if (obj.refInfos != null) {
            billerProfileBean.refNoList = new Array<BillerRefNoBean>();
            obj.refInfos.forEach((element) => {
                let billerRefNoBean = new BillerRefNoBean();
                billerRefNoBean.no          = element.no;
                billerRefNoBean.value       = element.value || "";
                billerRefNoBean.refTextEn   = element.textEn;
                billerRefNoBean.refTextTh   = element.textTh;
                billerProfileBean.refNoList.push(billerRefNoBean);
            });
        }

        return billerProfileBean;
    }

    public parseBillerProfileBeanToBillerBean(data: BillerProfileBean) : BillerBean {
        let billerBean = new BillerBean();
        billerBean.billerID = data.billerId;
        billerBean.categoryId = data.categoryId;
        billerBean.billerAliasName = data.aliasName;
        billerBean.billerName = (this.translate.currentLang === 'en')?data.getBillerNameEn():data.getBillerNameTh();
        billerBean.isFavourite = data.isFavourite;
        billerBean.profileCode = data.profileCode;
        billerBean.billerProfileId = data.billerProfileId;
        billerBean.promptPayBillerId = data.promptPayBillerId;
        billerBean.logoCompany = this.utilService.getBillerIcon(billerBean);
        billerBean.companyCode = data.companyCode;
        billerBean.serviceCode = data.serviceCode;
        if (data.refNoList != null) {
            data.refNoList.forEach(element => {
                if (element.no == '1') {
                    billerBean.ref1 = element.value;
                    billerBean.ref1TextEn = element.refTextEn;
                    billerBean.ref1TextTh = element.refTextTh;
                }
                if (element.no == '2') {
                    billerBean.ref2 = element.value;
                    billerBean.ref2TextEn = element.refTextEn;
                    billerBean.ref2TextTh = element.refTextTh;
                }
                if (element.no == '3') {
                    billerBean.ref3 = element.value;
                    billerBean.ref3TextEn = element.refTextEn;
                    billerBean.ref3TextTh = element.refTextTh;
                }
            });
        }
        return billerBean;
    }

    // getter & setter instance Obj
    public getConfirmBillerProfile() : BillerProfileBean {
        return this.confirmBillerProfile;
    }

    public setConfirmBillerProfile(confirmSelectedBillerProfile: BillerProfileBean) : void {
        this.confirmBillerProfile = confirmSelectedBillerProfile;
    }

    public getSelectBillerProfileDetail() : BillerProfileBean {
        return this.selectBillerProfileDetail;
    }

    public setSelectBillerProfileDetail(selectBillerProfileDetail : BillerProfileBean) : void {
        this.selectBillerProfileDetail = selectBillerProfileDetail;
    }
    
    private addLogoCompanyURL(result){
        let returnValue = result;
        let tmpresult = result.responseJSON.result;
        if(tmpresult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
            let tmpvalue = tmpresult.value;
            if(tmpvalue instanceof Array){
                for(let i = 0; i < tmpvalue.length; i++){
                    let tmp = tmpvalue[i];
                    //
                    tmpvalue[i].logoCompany = this.utilService.getBillerIcon(tmp);
                }
            } else {
                if(tmpvalue['logoCompany'] !== undefined){
                    tmpvalue['logoCompany'] = this.utilService.getBillerIcon(tmpvalue);
                }
            }
            returnValue.responseJSON.result.value = tmpvalue;
        } 

        return returnValue;
    }

    public getBillerByToken(token:string):Observable<any[]>{
        return Observable.fromPromise(this.getBillerProfile(token))
            .map((resp)=>{
                const result = resp.responseJSON.result;
                if(result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    return result.value.map((value)=>{
                        const {billerNameTh,billerNameEn} = value;
                        const qname = (this.translate.currentLang === 'th') ?  billerNameTh: billerNameEn;
                        return Object.assign({}, value,{ qname })
                    })
                }else{
                    throw Observable.throw(result.responseStatus)
                }
            })
    }

    public getBillerByTokenAndCategories(token:string,categories:string[]):Observable<any[]>{

        return Observable.fromPromise(this.inquiryBillerByTokenAndCategories(token,categories))
            .map((resp)=>{
                const result = resp.responseJSON.result;
                if(result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    return result.value.map((item)=>{
                        const qnameth = item.billerNameTh;
                        const qnameen = item.billerNameEn;
                        const qname = (this.translate.currentLang === 'th') ?  qnameth : qnameen ;
                        return Object.assign({}, item,{ qname })
                    });
                }else{
                    throw Observable.throw(result.responseStatus)
                }
            })
    }

    public getBillerProfileInfo(billerProfileId:string): Observable<any>{
        return Observable.fromPromise(this.getBillerProfileDetail(billerProfileId))
            .map((resp)=>{
                const result = resp.responseJSON.result;
                if(result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    return result.value;
                }else{
                    throw Observable.throw(result.responseStatus)
                }
            })
    }

    public inquiryBillerCategory() : Promise<any> {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_PAY_INFO_PIBRIB,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_PAY_INFO_PIBRIB
            }

            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public getBillerCategories(): Observable<any[]>{
        return Observable.fromPromise(this.inquiryCategories())
            .map((resp)=>{
                const result = resp.responseJSON.result;
                if(result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                    return result.value.map((item)=>{
                        item.categoryId = item.categoryCode;
						return item
                    });
                }else{
                    throw Observable.throw(result.responseStatus)
                }
            })
    }

    public setConfirmBillerProfileForAddNew(confirmBillerProfileForAddNew: BillerProfileBean) : void {
        this.confirmBillerProfileForAddNew = confirmBillerProfileForAddNew;
    }

    public getConfirmBillerProfileForAddNew() : BillerProfileBean {
        return this.confirmBillerProfileForAddNew;
    }

    public confirmAddBillerProfileDetailWithOutOTP(billerProfileDetail : BillerProfileBean, OTPData: any) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                params: {
                    billerInfo: {
                        aliasName:          billerProfileDetail.aliasName,
                        billerProfileId:    billerProfileDetail.billerProfileId,
	                    promptPayBillerId:  billerProfileDetail.promptPayBillerId,
                        profileCode:        billerProfileDetail.profileCode,
                        companyCode:        billerProfileDetail.companyCode,
                        categoryId:         billerProfileDetail.categoryId,
                        categoryTh:         billerProfileDetail.categoryTh,
                        categoryEn:         billerProfileDetail.categoryEn,
                        companyTh:          billerProfileDetail.categoryTh,
                        companyEn:          billerProfileDetail.companyEn,
                        logoCompany:        billerProfileDetail.logoCompany,
                        subServiceTh:       billerProfileDetail.subServiceTh,
                        subServiceEn:       billerProfileDetail.subServiceEn
                    }
                },
                actionCode: this.constants.REQ_ACTION_CODE.BPS_ADD_BILLER_WITHOUT_OTP,
                procedure: this.constants.REQ_PROCEDURE_NAME.BPS_ADD_BILLER_WITHOUT_OTP
            }
            let refInfos = new Array<any>();
            billerProfileDetail.refNoList.forEach((element: BillerRefNoBean) => {
                let refInfo = {
                    no:     element.no,
                    value:  element.value.trim(),
                    textEn: element.refTextEn,
                    textTh: element.refTextTh
                };
                refInfos.push(refInfo);
            });
            obj.params.billerInfo['refInfos'] = refInfos;
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }

    public setIsFromAddNewAfterPayBill(isFromAddNewAfterPayBill: boolean) : void {
        this.isFromAddNewAfterPayBill = isFromAddNewAfterPayBill;
    }

    public getIsFromAddNewAfterPayBill() : boolean {
        return this.isFromAddNewAfterPayBill;
    }
}
