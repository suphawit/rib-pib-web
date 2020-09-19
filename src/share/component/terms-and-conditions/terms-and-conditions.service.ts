import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';
import { Constants } from '../../service/constants';
import { PermissionService, PermissionMainMenu } from '../../service/permission.service';
@Injectable()
export class TermsAndConditionsService {
    private actioncode: string;
    private termAction: string;
    private _invokeOption: any = {adapter: 'authenticationAdapter'};

    constructor(private mfpApi: MfpApi, private constants: Constants,
      public permissionService: PermissionService,
      public permissionMainMenu: PermissionMainMenu) {
    }

    public getTermsAndConditionsService() {
        let p = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    actionCode: this.termAction
                },
                procedure: this.constants.REQ_PROCEDURE_NAME.CONTACT_US
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

    public updateTermsAndConditionsService(token) {
        let p = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    pibToken: token
                },
                procedure: this.constants.REQ_PROCEDURE_NAME.RBAC_UPDATE_TERM_AND_CONDITION
            };

            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((result) => {
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

    public setTermAction(termAction: string) {
        this.termAction = termAction;
    }

    public getRBACMenuFirstLogin(){
        let p = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: "ACT_RBAC_GET_MENU_ACTION",
                params: {},
                procedure: "getMenuListProcedure"
            }
            this.mfpApi.invokeProcedure(objRequest).then((result) => {
                let responseResult = result.responseJSON.result;
                if (responseResult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.permissionService.setIsLogin(true);


                    let MenuList = result.responseJSON.result.value.rbacMenus;
                    let actionCodeList = result.responseJSON.result.value.rbacActions;
                    let productAllowList = result.responseJSON.result.value.rbacAllowAction;

                    this.permissionMainMenu.setMainMenuList(MenuList);
                    this.permissionMainMenu.setMenuActionList(actionCodeList);
                    this.permissionMainMenu.setProductAllowList(productAllowList);
                } 
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });

        return p;
    }
}