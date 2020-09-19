import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';
import { Constants } from '../../service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class RequestReferenceFormService {

    constructor(private _MfpApi: MfpApi, private constants: Constants, public translateService:TranslateService) {

    };

    private _cacheData: any;

    public requestReferenceCode(data: any) {
        let promise = new Promise((resolve, reject) => {

           
            let objRequest = {
                params: {
                    idType: data.idType,
                    idNo: data.idNo,
                    birthDay: data.birthDay,
                    mobileNO: data.mobileNO,
                    username: data.username,
                    email: data.email,
                    language: this.translateService.currentLang,
                    idIssueCountryCode: data.idIssueCountryCode
                },
                actionCode: this.constants.REQ_ACTION_CODE.VERIFY_CUSTOMER,
                procedure: this.constants.REQ_PROCEDURE_NAME.VERIFY_CUSTOMER
            };
            
            this._MfpApi.invokeProcedure(objRequest, {adapter: 'SubscriptionAdapter'}).then((result: any) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    get cacheData(){
        return this._cacheData;
    }

    set cacheData(data: any){
        this._cacheData = data;
    }
}