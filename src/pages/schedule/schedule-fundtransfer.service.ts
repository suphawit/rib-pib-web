import { Injectable } from '@angular/core';
import { MfpApi } from '../../share/mfp/mfp-api.service';

@Injectable()
export class ScheduleFundTransferService {
    private actioncode: string
    private procedure: string
    private param: Object = {};
    private data: any;
    private _invokeOption = {};

    constructor(private _MfpApi: MfpApi) {
    }

    public deleteSchedule() {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: this.param,
                procedure: this.procedure
            }


            this._MfpApi.invokeProcedure(obj, this._invokeOption).then((result) => {

                resolve(result);
            }, function (error) {
                reject(error);

            }
            );
        });
        //this.param='';
        return promise;
    }

    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }
    public getActionCode(): string {
        return this.actioncode;
    }
    public setProcedure(procedure: string) {
        this.procedure = procedure;

    }
    public getProcedure(): string {
        return this.procedure;
    }
    public setParam(param: Object) {
        this.param = param;
    }
    public getParam(): Object {
        return this.param;
    }

    set setScheduleRecurring(data: any) {
        this.data = data;
    }

    get getScheduleRecurring() {
        return this.data;
    }

    set setInvokeOption(data: any) {
        this._invokeOption = data;
    }

    get getInvokeOption() {
        return this._invokeOption;
    }

}