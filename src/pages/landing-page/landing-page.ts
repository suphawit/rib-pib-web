import { ViewChild, OnInit, NgZone } from '@angular/core';
import { Constants } from '../../share/service/constants';
import { SanitizeHtmlPipe } from '../../share/pipe/sanitize-html.pipe';
import { GetinformationService } from '../../share/service/getInformation.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';

export class LandingPage implements OnInit {
    public type: string;
    public message: string;
    public result: SanitizeHtmlPipe;
    public actionCodeService: string = 'landing_page_pib';

    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    constructor(public getinformationService: GetinformationService,
        public constants: Constants,
        public zone: NgZone) {
    }

    ngOnInit(): void {
        this.zone.run(() => {
            this.inquiryLandingPage();
        });
    }

    inquiryLandingPage(): void {
        let challengeResult = this.getinformationService.getChallengeResult();
        

        if (challengeResult != null) {
                this.message = challengeResult.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
                this.getinformationService.setChallengeResult(null);
        }

        this.getinformationService.getInformation("getLandingPagePibProcedure", this.actionCodeService).then((objResponse: any) => {
            
            if(objResponse.responseJSON.result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
                this.result = objResponse.responseJSON.result.value.data;
            }
            
        }, function (error) {
            
        });
    }
}
