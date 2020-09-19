import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { MfpApi } from '../../../../share/mfp/mfp-api.service';
import { CardInfoBean } from '../../../../share/bean/card-info-bean';

@Injectable()
export class AccountActivateService {
    private procedure: string;
    private actioncode: string;
    private countAttemp: number;
    private currentStep: number = 1;
    private termAndConResult: string;
    private cardInfoBean: CardInfoBean;
    private _isCreatedUser: boolean = false;
    private _observer: Subject<any> = new Subject();

    constructor(private mfpApi: MfpApi) {
        this.countAttemp = 1;

    }

    public accountActivate(accountActivate: any) {
        var promise = new Promise((resolve, reject) => {
            accountActivate.actionCode = this.getActionCode();
            accountActivate.procedure = this.getProcedure();
            this.mfpApi.invokeProcedure(accountActivate).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });
        return promise;
    }

    getObserver(): Subject<any> {
        return this._observer;
    }
    updateObserver(param: any) {
        this._observer.next(param);
    }

    public getAddCountAttemp(): number {
        this.setCountAttemp(this.getCountAttemp() + 1);
        return this.getCountAttemp();
    }

    public setCardInfoBean(cardInfoBean: CardInfoBean) {
        this.cardInfoBean = cardInfoBean;
    }
    public getCardInfoBean(): CardInfoBean {
        return this.cardInfoBean;
    }

    public getActionCode(): string {
        return this.actioncode;
    }
    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }

    public getProcedure(): string {
        return this.procedure;
    }
    public setProcedure(procedure: string) {
        this.procedure = procedure;
    }

    public getCountAttemp(): number {
        return this.countAttemp;
    }
    public setCountAttemp(countAttemp: number) {
        this.countAttemp = countAttemp;
    }

    public getTermAndConResult(): string {
        return this.termAndConResult;
    }
    public setTermAndConResult(termAndConResult: string) {
        this.termAndConResult = termAndConResult;
    }

    public isCreatedUser(): boolean {
        return this._isCreatedUser;
    }
    public setIsCreatedUser(isCreatedUser: boolean) {
        this._isCreatedUser = isCreatedUser;
    }

    public getCurrentStep(): number {
        return this.currentStep;
    }
    public setCurrentStep(currentStep: number) {
        this.currentStep = currentStep;
    }
}