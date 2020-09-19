import { MfpApi } from '../../share/mfp/mfp-api.service';

export class ServicesMain {
    public result: string
    public actioncode: string

    constructor(public mfpApi: MfpApi) {
    }

    public getcontactUs() {
        var p = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: this.actioncode,
                params: {
                    language: "en"
                },
                procedure: "getServiceDetailProcedure"
            };

            this.mfpApi.invokeProcedure(objRequest).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return p;
    }
}