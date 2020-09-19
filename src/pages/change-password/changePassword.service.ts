import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';
import { CardInfoBean } from '../../share/bean/card-info-bean';
import { Subject } from 'rxjs/Rx';
import { PermissionService } from '../../share/service/permission.service';

declare var KKPES;
@Injectable()

export class ChangePasswordService {
    private _cardInfo: CardInfoBean;
    private tokenOtp: string;
    public setStepwindow:string;
    private isLoginDate: any;
    private _observer: Subject<any> = new Subject();
    private _invokeOption: any = {adapter: 'UserManagementAdapter'};
  
    constructor(private _MfpApi: MfpApi,  private _permissionService: PermissionService) {
          this.isLoginDate = this._permissionService.getUserData();
         
    };
    public getServices(data: any) {
        var promise = new Promise((resolve, reject) => {
          
            let obj = {
                actionCode: "ACT_CHANGE_PASSWORD",
                params: {
                    sessionTokenCAA : KKPES.KKPESTokenStore.getSessionToken() || "",
					oldPassword 	: data.currentpassword ,
					newPassword		: data.newpassword
                },
                procedure: "changePasswordProcedure"
            }
            this._MfpApi.invokeProcedure(obj,this._invokeOption).then((result) => {
                    resolve(result);
            },  function (error) {
                    reject(error);

            }
            );
        });
        return promise;
    }


  getObserver(): Subject<any> {
        return this._observer;
    }
    updateObserver(param: any) {
        this._observer.next(param);
    }

     get cardInfo(): CardInfoBean {
      return this._cardInfo;
  }
    set cardInfo(cardInfo: CardInfoBean) {
      this._cardInfo = cardInfo;
  }
    public setTokenOtp(tokenOtp){
       
        this.tokenOtp = tokenOtp;
    }
  
   set setStepWindow(data: any) {
        this.setStepwindow = data;
    }

    get setStepWindow() {
        return this.setStepwindow;
    }
 
}