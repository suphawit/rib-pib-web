import { LandingPage } from '../../landing-page';
import { OnInit, Component, NgZone } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { GetinformationService } from '../../../../share/service/getInformation.service';

@Component({
    selector: 'landing-page',
    templateUrl: './landing-page.html'
})

export class LandingPagePIB extends LandingPage implements OnInit {

    constructor(public getinformationService: GetinformationService,
        public constants: Constants,
        public zone: NgZone) {
        super(getinformationService, constants, zone);
    }
}