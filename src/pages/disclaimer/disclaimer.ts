import { OnInit } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { GetinformationService } from '../../share/service/getInformation.service';

export class Disclaimer implements OnInit {
    result: any;
    actionCodeService: string = 'desclaimer';

    constructor(public getinformationService: GetinformationService,
        public constants: Constants) {
    }

    ngOnInit(): void {
        this.inquiryDisclaimer();
    }

    inquiryDisclaimer(): void {
        this.getinformationService.getInformation('getDesclaimerWithLoginProcedure', 'desclaimer').then((objResponse: any) => {
            this.result = objResponse.responseJSON.result.value.data;
        }, function (error) {
            
        });
    }
}