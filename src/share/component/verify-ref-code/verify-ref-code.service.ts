import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';

@Injectable()
export class VerifyRefCodeService {

    private actioncode: string;

    constructor(
        private _MfpApi: MfpApi) {
        
    };

    public verifyRefCode(verifyRefCode: any) {
        var promise = new Promise((resolve, reject) => {

            verifyRefCode.actionCode = this.getActionCode();
            verifyRefCode.procedure  = "submitVerifyRefcode";
            this._MfpApi.invokeProcedure(verifyRefCode,{adapter: 'SubscriptionAdapter'}).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public setActionCode(actioncode:string){
        this.actioncode = actioncode;
    }
    public getActionCode():string{
        return this.actioncode;
    }
}