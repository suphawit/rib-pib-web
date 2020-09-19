import { Injectable } from '@angular/core';
import { MfpApi } from '../../../share/mfp/mfp-api.service';

@Injectable()
export class LanguageService {
    private actioncode: string
    lang: string;
    constructor(private _MfpApi: MfpApi) {
       
    };
    
    public getLanguage(data: any) {
        var promise = new Promise((resolve, reject) => {
         
            let obj = {
                actionCode: this.actioncode,
                params: {
                    language: data
                },
                procedure: "changeLNGProcedure"
            }
            this._MfpApi.invokeProcedure(obj).then((result) => {
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

    
}




