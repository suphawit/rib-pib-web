import { Injectable } from '@angular/core';
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Injectable()
export class SwiperService {

    constructor(private _MfpApi: MfpApi, private translateService: TranslateService) {
    }

    public getImages(actType, callback) {
        let obj = {
            actionCode: 'ACT_INQUIRY_ANYID_TYPE',
            params: {
                language: this.translateService.currentLang,
                actionType: actType
            },
            procedure: ""
        }
        this._MfpApi.invokeProcedure(obj).then((result) => {
            callback(result);
        }, function (error) {
            callback(error);
            
        });
    }
}