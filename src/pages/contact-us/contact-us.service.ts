import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { PermissionService } from '../../share/service/permission.service';

@Injectable()
export class ContactUsService {
    private actioncode: string
    constructor(private _MfpApi: MfpApi,  public _PermissionService: PermissionService) {
    };

    
    public getcontactUs(lang) {
         let isLogin = this._PermissionService.getIsLogin();
         var procedureName = "getContactUsProcedure";
        if(isLogin) {
            procedureName = "getPrivacyWithLoginProcedure";
        } else {
            procedureName = "getContactUsProcedure";
        }
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'ACT_RBAC_GET_INFORMATION_SERVICE',
                params: {
                    language: lang,
                    actionCode:'contact_us'
                },
                procedure: procedureName
            }
            // this._MfpApi.invokeProcedure(obj).then((result) => {
            this._MfpApi.invokeProcedure(obj,{adapter:'utilityAdapter',isHideLoader:false}).then((result) => {
                resolve(result);
            }, function (error) {
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