import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../service/constants';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { PermissionAction } from '../../../share/service/permission.service';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TermAndConditionModalService } from './terms-and-conditions-modal.service';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';

@Component({
    selector: 'terms-and-conditions-modal',
    templateUrl: './terms-and-conditions-modal.html',
    providers: [TermsAndConditionsService]
})
export class TermsAndConditionsModalComponent {
    result: any;
    private type: string;
    private message: string;
    isAgree: boolean = false;
    isCheck: boolean = false;
    private isLogin: boolean;
    private isError: boolean;

    @Input('Style') Style: string;
    @Input('termAction') termAction: string;
    @Input('modalType') modalType: string;
    @Output('onClickSubmit') clickSubmit = new EventEmitter();
    @ViewChild('childModal') public childModal: ModalDirective;
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

    // actionObserver: any;
    // actionObserver1: any;

    constructor(public TermsAndConditionsService: TermsAndConditionsService,
        public PermissionAction: PermissionAction,
        public Constants: Constants,
        public termAndConditionModalService: TermAndConditionModalService
    ) {
    }

    public showChildModal(): void {
        this.isLogin = this.modalType == 'firstlogin' ? true : false;
        this.getTermsAndConditionsService();
        this.childModal.show();
    }

    onSubmit(): void {
        this.TermsAndConditionsService.setActionCode(this.Constants.REQ_ACTION_CODE.UPDATE_TERM_AND_CONDITION);
        this.TermsAndConditionsService.updateTermsAndConditionsService('').then((objResponse: any) => {
            let responseCode = objResponse.responseJSON.result.responseStatus.responseCode;
            
            this.isAgree = responseCode === this.Constants.RESP_CODE_SUCCESS ? true : false;
            this.childModal.hide();
        }, function (error) {
            this.childModal.hide();
            
        });
    }

    disAgree(): void {
        this.childModal.hide();
    }

    getTermsAndConditionsService() {
        this.TermsAndConditionsService.setActionCode(this.Constants.REQ_ACTION_CODE.RBAC_GET_INFORMATION_SERVICE);
        this.TermsAndConditionsService.setTermAction(this.termAction);
        this.TermsAndConditionsService.getTermsAndConditionsService().then((objResponse: any) => {
            this.result = objResponse.responseJSON.result.value.data;
            let responseCode = objResponse.responseJSON.result.responseStatus.responseCode;
            this.isError = responseCode !== this.Constants.RESP_CODE_SUCCESS ? true : false;

            if (this.isError) {
                this.message = objResponse.responseJSON.result.responseStatus.errorMessage;
                this.type = 'danger';
                this.alertMessage.show();
            }
        }, function (error) {
            
        });
    }

    onHide(): void {
        this.clickSubmit.emit(this.isAgree);
        this.isAgree = false;
        this.isCheck = false;
    }
}