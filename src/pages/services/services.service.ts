import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../../../share/service/constants';

@Injectable()
export class ServicesService {
    private language: any;
    private actioncode: string;

    constructor(private mfpApi: MfpApi) {
    }

    public getServices() {
        var p = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: this.actioncode,
                params: {
                    language: this.language,
                    actionCode: "sevice_detail"
                },
                procedure: "getServiceDetailProcedure"
            };

            //this.mfpApi.invokeProcedure(objRequest).then((result) => {
            this.mfpApi.invokeProcedure(objRequest,{adapter:'utilityAdapter',isHideLoader:false}).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
                
            });
        });

        return p;
    }

    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }
    public getActionCode(): string {
        return this.actioncode;
    }

    public setLanguage(language: string) {
        this.language = language;
    }
    public getLanguage(): string {
        return this.language;
    }
}