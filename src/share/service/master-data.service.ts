import { Injectable } from '@angular/core';
import { BankBean } from '../../share/bean/bank-bean';
import { Dictionary } from '../../share/bean/dictionary';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';
import { BankCodeDataService } from './bankcode-data.service';
import { CategoryBean } from '../../share/bean/category-bean';
import { AnyIDTypeBean } from '../../share/bean/anyid-type-bean';
import { TransferTimeBean } from '../../share/bean/transfer-time-bean';
import { ScheduleTypeBean } from '../../share/bean/schedule-type-bean';
import { RecurringTimeBean } from '../../share/bean/recurring-time-bean';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";

@Injectable()
export class MasterDataService {

    private bankList: any = null;
    private categoryList: any = null;
    private anyIDTypeList: any = null;

    constructor(
        private mfpApi: MfpApi,
        private constants: Constants,
        private translate: TranslateService,
        private bankCodeDataService: BankCodeDataService
    ) {
        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

            this.bankList = null;
            this.categoryList = null;
            this.anyIDTypeList = null;
        });
    }

    public getAnyIDTypeList() {
        return this.anyIDTypeList;
    }
    public setAnyIDTypeList(anyIDTypeList: any) {
        this.anyIDTypeList = anyIDTypeList;
    }

    public getBankList() {
        return this.bankList;
    }
    public setBankList(bankList: any) {
        this.bankList = bankList;
    }

    public getCategoryList() {
        return this.categoryList;
    }
    public setCategoryList(categoryList) {
        this.categoryList = categoryList;
    }

    getAllBanks() {
        let bankList: Array<BankBean> = [];

        let p = new Promise((resolve, reject) => {
            if (this.bankList == null) {

                let objRequest = {
                    params: {
                        language: this.translate.currentLang
                    },
                    actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_BANK_INFO,
                    procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_BANK_INFO
                };

                this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                    if (objResponse != null) {
                        let responseStatus = objResponse.responseJSON.result.responseStatus;

                        if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                            objResponse.responseJSON.result.value.forEach(element => {
                                let bankObj = new BankBean();
                                bankObj.bankCode = element.bankCode;
                                bankObj.bankName = element.bankName;
                                bankObj.shortName = element.bankShortName;
                                bankObj.swiftCode = element.switftCode;
                                bankObj.isORFT = element.isORFT == 1;
                                bankObj.isBpDc2 = element.isBpDc2 == 1;
                                bankObj.isBpDc3 = element.isBpDc3 == 1;
                                bankObj.status = element.status;
                                bankList.push(bankObj);
                            });


                        } else {

                        }
                    }

                    resolve(bankList);
                }, function (error) {

                });
            } else {

                bankList = this.bankList;
                resolve(bankList);
            }
        });

        return p;
    }

    getAllCategories() {

        let categories: Array<CategoryBean> = [];

         let p = new Promise((resolve, reject) => {
             if (this.categoryList == null) {

                let objRequest = {
                    params: {
                        language: this.translate.currentLang
                    },
                    actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_CATEGORY_INFO,
                    procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_CATEGORY_INFO
                };
        
                this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                    if (objResponse != null) {
                        let responseStatus = objResponse.responseJSON.result.responseStatus;

                        if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                            objResponse.responseJSON.result.value.forEach(element => {
                                let categoryObj = new CategoryBean();
                                categoryObj.catId = element.catId;
                                categoryObj.catName = element.catName
                                categories.push(categoryObj);
                            });


                        } else {

                        }
                    }

                    resolve(categories);
                }, function (error) {

                });
            } else {

                categories = this.categoryList;
                resolve(categories);
            }
        });

        return p;
    }

    getAllScheduleList() {


        let schedtypeList: Array<ScheduleTypeBean> = [];

        let objRequest = {
            params: {
                language: this.translate.currentLang
            },
            actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_SCHEDULE_TYPE,
            procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_SCHEDULE_TYPE
        };

        let p = new Promise((resolve, reject) => {
            this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {

                if (objResponse != null) {
                    let responseStatus = objResponse.responseJSON.result.responseStatus;

                    if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                        let schedTypeObj = new ScheduleTypeBean();
                        schedTypeObj.schedTypeId = this.constants.SCHEDULER_TYPE_ONE_TIME;
                        schedTypeObj.desc = this.translate.instant("lbl.drpSelect");
                        schedtypeList.push(schedTypeObj);

                        objResponse.responseJSON.result.value.forEach(element => {
                            schedTypeObj = new ScheduleTypeBean();
                            schedTypeObj.schedTypeId = element.scheduleTypeId;
                            schedTypeObj.desc = element.scheduleTypeDesc;
                            schedTypeObj.timeUnit = element.timeUnit;
                            schedTypeObj.timeGap = element.timeGap;
                            schedtypeList.push(schedTypeObj);
                        });


                    } else {

                    }
                }

                resolve(schedtypeList);
            }, function (error) {

            });
        });

        return p;
    }

    getTransferTimeList() {
        let transferTimeList = [
            new TransferTimeBean(this.constants.TRANSFER_TIME_IMMEDIATE, this.translate.instant("lbl.transferTime.immediate")),
            new TransferTimeBean(this.constants.TRANSFER_TIME_MORNING, this.translate.instant("lbl.transferTime.morning")),
            new TransferTimeBean(this.constants.TRANSFER_TIME_EVENING, this.translate.instant("lbl.transferTime.evening"))
        ];

        return transferTimeList;
    }

    getBankImgList() {
        return this.bankCodeDataService.bankCodeImageProperties;
    }

    getAllAnyIDTypes() {
        let dictAnyIDType: Dictionary = {};

        let p = new Promise((resolve, reject) => {
            if (this.anyIDTypeList == null) {


                let language = this.translate.currentLang.toUpperCase();
                let objRequest = {
                    params: {
                        actionType: 'to_anyid_type'
                    },
                    actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_ANYID_TYPE,
                    procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_ANYID_TYPE
                };

                this.mfpApi.invokeProcedure(objRequest).then((objResponse: any) => {
                    if (objResponse != null) {
                        let responseStatus = objResponse.responseJSON.result.responseStatus;

                        if (responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                            objResponse.responseJSON.result.value.forEach(element => {

                                let anyIDType = new AnyIDTypeBean();
                                anyIDType.anyIDType = element.type;
                                anyIDType.shortName = element.anyidCode || "";
                                anyIDType.label = language == this.constants.CULTURE_SHORTNAME_ENGLISH ? element.labelEn : element.labelTh;
                                anyIDType.desc = language == this.constants.CULTURE_SHORTNAME_ENGLISH ? element.descriptionEN : element.descriptionTH;
                                anyIDType.valueType = element.valueType || "";
                                anyIDType.valueLength = element.valueLength || 0;
                                anyIDType.iconObj = {
                                    icon: element.icon,
                                    iconColor: element.iconColor
                                };

                                var type = anyIDType.anyIDType;
                                dictAnyIDType[type] = dictAnyIDType[type] || {};
                                dictAnyIDType[type] = anyIDType;
                            });


                        } else {

                        }
                    }
                    this.anyIDTypeList = dictAnyIDType;
                    resolve(Object.assign({},dictAnyIDType) );
                }, function (error) {
                    reject(error);

                });
            } else {

                dictAnyIDType = this.anyIDTypeList;
                resolve(Object.assign({},dictAnyIDType));
            }
        });

        return p;
    }

    getRecurringTimeList() {
        let p = new Promise((resolve, reject) => {
            const start: number = 1;
            const end: number = 6;

            let recurringTimes: any = Array<RecurringTimeBean>();
            let recurringTime = new RecurringTimeBean(0, this.translate.instant("lbl.drpSelect"));
            recurringTimes.push(recurringTime);

            for (var i = start; i <= end; i++) {
                let times = i.toString() + " " + this.translate.instant(i == 1 ? "lbl.time" : "lbl.times");
                recurringTime = new RecurringTimeBean(i, times);
                recurringTimes.push(recurringTime);
            }

            resolve(recurringTimes);
        });

        return p;
    }

    getCurrentDate(): any {
        let p = new Promise((resolve, reject) => {
            this.mfpApi.getCurrentDate().then((result: any) => {
                resolve(result);
            }, function (error) {

            });
        });

        return p;
    }
}
