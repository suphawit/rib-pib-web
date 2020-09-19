import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Constants } from '../../../../share/service/constants';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';
import { ValidationService } from '../../../../share/service/validation.service';
import { PermissionService,PermissionChangeRoute} from '../../../../share/service/permission.service';
import { ChangeUsernameService } from './share/change-username.service';

@Component({
    selector: 'change-username-step2',
    templateUrl: 'change-username-step2.html'
})
export class ChangeUsernameStep2Component implements OnInit {
    stepCaptionData: any;
    formHeader: any;
    messageModalData: {title: string; body:string; size: string; config:any; action:any; };
    myForm: any;
    submitted: boolean = false;
    nameSuggestionList: any = [];

    @ViewChild('messageModal') public messageModal:MessageModalComponent;

    constructor( 
        @Inject(Router) public router: Router,
        public fb: FormBuilder,
        public constants: Constants,
        public permissionService:PermissionService,
        public permissionChangeRoute: PermissionChangeRoute,
        public changeUsernameService: ChangeUsernameService){
            changeUsernameService.validPage('step2');
    }

    ngOnInit():void {
        this.formHeader = {
            title: 'lbl.changeUsername',
            stepwizOption: {
                data: [{name: '', label: 'wiz.verOTP'},{name: '', label: 'lbl.changeUsername'}],
                style: 'rib-web',
                step: 1
            },
            alertMsgOption: {
                type: 'danger',
                message: '',
                show: false
            }
        };

        this.stepCaptionData = {
            step: {
                step: 1,
                totalStep: 2
            },
            title: 'lbl.changeUsernameStep'
        };

        this.messageModalData = {
            title: 'label.Success', 
            body: 'lbl.changeUsernameSuccess', 
            size: 'md',
            config: {isShowCloseBtn: true },
            action: {}
        };

        this.buildForm();
    }

    onSubmit(): void {
        this.setErrorMessage('');
        this.submitted = true;
        if(!this.myForm.valid) return;

        this.changeUsernameService.requestChangeUsername(this.myForm.value).then((result: any) => {
            this.messageModal.show();
        }, (error)=> {
            const respVal = error.value || {};
            if (respVal.suggestionUserIdList && respVal.suggestionUserIdList.length > 0) {
                this.nameSuggestionList = respVal.suggestionUserIdList;
            } else {
                this.setErrorMessage(error.responseStatus.errorMessage);
            }
        });
    }

    private buildForm(): void {
        this.myForm = this.fb.group({
          currentUsername: new FormControl({value: this.changeUsernameService.username || '', disabled: true}, ValidationService.requiredValidator),
          newUsername: new FormControl('', ValidationService.requiredValidator),
          confirmUsername: new FormControl('', ValidationService.requiredValidator)
        },{validator: ValidationService.matchingUsername('newUsername', 'confirmUsername')});

    }

    private setErrorMessage(msg: string){
        this.formHeader.alertMsgOption = {
            type: 'danger',
            message: msg,
            show: (msg ? true : false)
        };
    }

    onModalHidden():void {
        this.permissionService.logoutSession();
        this.permissionChangeRoute.changeRoute("HOME");
    }

    onclickNameSuggestion(nameSuggestion: string) {
        this.myForm.patchValue({ newUsername: nameSuggestion });
    }
}