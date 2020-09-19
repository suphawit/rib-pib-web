import { Injectable, } from '@angular/core';
import { MfpApi } from '../mfp/mfp-api.service';

@Injectable()
export class GetinformationService {

    private challengeResult: any = null;
    private _userAgentInfo: any = null;

    public getChallengeResult(): any {
        return this.challengeResult;
    }
    public setChallengeResult(challengeResult: any) {
        this.challengeResult = challengeResult;
    }

    constructor(private mfpApi: MfpApi ) {
    }

    getInformation(procedure, actionCode) {
        var p = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: "ACT_RBAC_GET_INFORMATION_SERVICE",
                params: {
                    actionCode: actionCode
                },
                procedure: procedure
            };

            this.mfpApi.invokeProcedure(objRequest,{adapter:'utilityAdapter'}).then((objResponse) => {
                resolve(objResponse);
            }, function (error) {
                reject(error);
                
            });
        });

        return p;
    }

    get userAgentInfo(){
        return this._userAgentInfo;
    }
    set userAgentInfo(userAgentInfo){
        this._userAgentInfo = userAgentInfo;
    }

    public isDesktop(){
        if(this._userAgentInfo.device === "desktop" || this._userAgentInfo.browser === "ie" ){
            return true;
        }else{
            return false;
        }
    }
}
