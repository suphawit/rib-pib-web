import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';

@Injectable()
export class LocateUsService {
    private actioncode: string;
    private language:any;

    constructor(private _MfpApi: MfpApi) {
            
    };
    public getLocateUs() {
        
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    language:  this.language
                },
                procedure: "getLocateUSProcedure"
            }
            //this._MfpApi.invokeProcedure(obj).then((result) => {
            this._MfpApi.invokeProcedure(obj,{adapter:'utilityAdapter',isHideLoader:false}).then((result) => {
                    resolve(result);
            },  function (error) {
                    reject(error);

            }
            );
        });
        return promise;
    }
    public setActionCode(actioncode:string){
        this.actioncode = actioncode;
    }
    public getActionCode():string{
        return this.actioncode;
    }

    
    public setLanguage(language:string){
        this.language = language;
    }
    public getLanguage():string{
        return this.language;
    }
}