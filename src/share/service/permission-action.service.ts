import { MfpApi } from '../mfp/mfp-api.service';
import { Injectable } from '@angular/core';
@Injectable()
export class PermissionAction {
    constructor(public _MfpApi: MfpApi) { };

    getActionListByMenu(menuName: string) {

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: "action",
                params: {
                    menuName: menuName
                },
                procedure: "getMenuList"
            }
            this._MfpApi.invokeProcedure(obj).then((result) => {

                resolve(result);
            }, function (error) {
                reject(error);

            }

            );
        });
        return promise;
    }

}