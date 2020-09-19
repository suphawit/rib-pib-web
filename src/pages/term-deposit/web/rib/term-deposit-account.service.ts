import { Injectable } from '@angular/core';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class TermDepositAccountService {

    private _SelectedAccount: any;
    private _SelectedSwitchTerm: any;
    private _changeTermResponse: any;
    private actioncode: string
    private procedure: string;
    private param: Object;
    private _newTermNetAmount: any;
    private _ChangeTermDepositList: any;
    private _selectedDepositItem: any;
    private _SelectedDataList: any;
    private _observer: Subject<any> = new Subject();

    constructor(private _MfpApi: MfpApi) {
    }

    public getTermDepositService() {
        let p = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: this.param,
                procedure: this.procedure
            }
            this._MfpApi.invokeProcedure(obj).then((result) => {

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

    set SelectedAccount(currentSelectedAccount: any) {
        this._SelectedAccount = currentSelectedAccount;
    }
    get SelectedAccount(): any {
        return this._SelectedAccount;
    }

    set ChangeTermResponse(response) {
        this._changeTermResponse = response;
    }
    get ChangeTermResponse() {
        return this._changeTermResponse;
    }

    set ChangeTermDepositList(response) {
        this._ChangeTermDepositList = response;
    }
    get ChangeTermDepositList() {
        return this._ChangeTermDepositList;
    }

    set SelectedDepositItem(item) {
        this._selectedDepositItem = item;
    }
    get SelectedDepositItem() {
        return this._selectedDepositItem;
    }

    set SelectedDataList(SelectedDataList: any) {
        this._SelectedDataList = SelectedDataList;
    }
    get SelectedDataList() {
        return this._SelectedDataList;
    }

    set newTermNetAmount(newTermNetAmount: any) {
        this._newTermNetAmount = newTermNetAmount;
    }
    get newTermNetAmount() {
        return this._newTermNetAmount;
    }

    set SelectedSwitchTerm(SelctedSwitchTerm: any) {
        this._SelectedSwitchTerm = SelctedSwitchTerm;
    }
    get SelectedSwitchTerm(): any {
        return this._SelectedSwitchTerm;
    }

    getObserver(): Subject<any> {
        return this._observer;
    }
    updateObserver(param: any) {
        this._observer.next(param);
    }

    private _TERM_RATES: any;
    get termRates(): any{
        return this._TERM_RATES;
    }
    set termRates(termRate:any){
        this._TERM_RATES = termRate;
    }
}