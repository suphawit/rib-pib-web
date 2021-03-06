import { Injectable } from '@angular/core';
import { Constants } from '../../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../../share/service/permission.service';
import { MfpApi } from '../../../../../share/mfp/mfp-api.service';

@Injectable()
export class ChangeUsernameService {
    private _pageState: string;
    private _pageCache: any = null;
    private _invokeOption: any = {adapter: 'UserManagementAdapter'};
    private _username: string;
    private _attempCount: number = 0;

    constructor(
        public constants: Constants,
        public permissionChangeRoute: PermissionChangeRoute,
        public mfpApi: MfpApi) {
        
    }

    public requestChangeUsername(params: any) {
        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.CHANGE_USER_NAME,
                procedure: this.constants.REQ_PROCEDURE_NAME.CHANGE_USER_NAME,
                params: {
                    attempCount: ++this._attempCount,
                    userName: params.newUsername
                }
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public inquiryUsername() {
        this._attempCount = 0;
        let promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.INQUIRY_USER_NAME,
                procedure: this.constants.REQ_PROCEDURE_NAME.INQUIRY_USER_NAME,
                params: {}
            };
            this.mfpApi.invokeProcedure(obj, this._invokeOption).then((resp) => {
                let result = resp.responseJSON.result;
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    resolve(result.value);
                } else {
                    reject(result);
                } 
            }, (error) => {
                //reject(error);

            });
        });
        return promise;
    }

    public changeRoute(pageCode){
        let menuCode = pageCode;
        if(pageCode === 'HOME'){
            this.pageCache = null;
            this.pageState = '';
        } else {
            menuCode = 'CHANGE_USERNAME.' + pageCode;
            this.pageState = pageCode;
        }
        
        this.permissionChangeRoute.changeRoute(menuCode);
    }

    public validPage(pageCode){
        if(pageCode !== this.pageState) {
            this.permissionChangeRoute.changeRoute('HOME');
        }
    }

    private set pageState(data: any){
        this._pageState = data;
    }

    private get pageState(): any {
        return this._pageState;
    }

    set pageCache(data: any){
        this._pageCache = data;
    }

    get pageCache(): any {
        return this._pageCache;
    }

    get username(): string {
        return this._username;
    }

    set username(data: string) {
        this._username = data;
    }
}