import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { Constants } from '../../share/service/constants';

@Injectable()
export class DisclaimerService {
    private actioncode: string
    private actionCodeService: string
    
    constructor(private mfpApi: MfpApi, private constants: Constants) {
    }

    public inquiryDisclaimer() {
        var p = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    actionCode: this.actionCodeService
                },
                procedure: this.constants.REQ_PROCEDURE_NAME.CONTACT_US
            };

            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return p;
    }

    public setActionCode(actioncode:string){
        this.actioncode = actioncode;
    }
    public getActionCode():string{
        return this.actioncode;
    }
    public setActionCodeService(actionCodeService:string){
        this.actionCodeService = actionCodeService;
    }
}