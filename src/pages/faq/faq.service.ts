import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';

@Injectable()
export class FaqService {
    private language: string;
    private actioncode: string;

    constructor(private mfpApi: MfpApi) {
    }

    public getFaq() {
        var p = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    language: this.language,
                    actionCode: "faq"
                },
                procedure: "getFAQProcedure"
            };

            //this.mfpApi.invokeProcedure(obj).then((result) => {
            this.mfpApi.invokeProcedure(obj,{adapter:'utilityAdapter',isHideLoader:false}).then((result) => {
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