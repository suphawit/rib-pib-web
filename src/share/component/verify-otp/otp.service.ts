import { Injectable } from '@angular/core';
import { MfpApi } from '../../mfp/mfp-api.service';

import { CardInfoBean } from '../../bean/card-info-bean';

@Injectable()
export class OtpService {

    private actioncode: string;
    private procedure: string;

    private cardInfoBean: CardInfoBean;
    // private anyIDType: string;

    constructor(private _MfpApi: MfpApi) {

    };

    public requestOtp(requestOtp: any) {
        var promise = new Promise((resolve, reject) => {
            requestOtp.actionCode = this.getActionCode();
            requestOtp.procedure  = this.getProcedure();
            this._MfpApi.invokeProcedure(requestOtp, this.invokeOption).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    public verifyOtp(verifyOtp: any) {
        var promise = new Promise((resolve, reject) => {
            verifyOtp.actionCode = this.getActionCode();
            verifyOtp.procedure  = this.getProcedure();
            this._MfpApi.invokeProcedure(verifyOtp, this.invokeOption).then((result) => {
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
    public setProcedure(procedure: string) {
        this.procedure = procedure;
    }
    public getProcedure() : string {
        return this.procedure;
    }
    public setCardInfoBean(cardInfoBean: CardInfoBean) {
        this.cardInfoBean = cardInfoBean;
    }
    public getCardInfoBean() : CardInfoBean {
        return this.cardInfoBean;
    }

    private _invokeOption: any = {};
    get invokeOption(){
        return this._invokeOption;
    }
    set invokeOption(options: any){
        this._invokeOption = options;
    }
    // public getAnyIDType(): string {
    //     return this.anyIDType;
    // }
    // public setAnyIDType(anyIDType: string) {
    //     this.anyIDType = anyIDType;
    // }
}