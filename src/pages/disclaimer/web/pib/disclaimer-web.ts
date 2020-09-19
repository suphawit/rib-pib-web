import { Disclaimer } from '../../disclaimer';
import { OnInit, Component } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { GetinformationService } from '../../../../share/service/getInformation.service';

@Component({
    selector: 'disclaimer-web',
    template: '<div [innerHTML]="result | sanitizeHtml"></div>'
})
export class DisclaimerWeb extends Disclaimer implements OnInit {

    constructor(public getinformationService: GetinformationService,
        public constants: Constants) {
        super(getinformationService, constants);
    }
}