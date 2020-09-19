import { Subject } from 'rxjs/Rx';
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class LanguageSettingService {
    lang: string;
    private actioncode: any;
    private languageObserver: Subject<any> = new Subject();

    @Output() LanguageChangeEvent: EventEmitter<any> = new EventEmitter(true);

    constructor(private mfpApi: MfpApi) {
    }

    getLanguageObserver(): Subject<any> {
        return this.languageObserver;
    }
    updateLanguageObserver(param: any) {
        //this.languageObserver.next(param);
        this.LanguageChangeEvent.emit(param);
        this.languageObserver = param;
    }

    set setLanguageSeting(actioncode) {
        this.actioncode = actioncode;
    }
    get getLanguageSeting() {
        return this.actioncode;
    }

    public setActionCode(actioncode: string) {
        this.actioncode = actioncode;
    }
    public getActionCode(): string {
        return this.actioncode;
    }

    public getLanguage(data: any) {
        

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.actioncode,
                params: {
                    language: data
                },
                procedure: "changeLNGProcedure"
            }
            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
                
            });
        });

        return promise;
    }
}