import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { AccountActivateService } from './account-activate.service';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { ValidationService } from '../../../../share/service/validation.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { MessageModalComponent } from '../../../../share/component/modal-messages.component';

@Component({
    selector: 'account-activate-create-user-account',
    templateUrl: 'account-activate-create-user-account.html'
})

export class AccountActivateCreateUserAccountComponent implements OnInit {
    private _username: string;
    private _password: string;
    submitted: boolean = false;
    private _nameSuggestion: any;
    private _isShowSuggest: boolean;
    private _confirmPassword: string;
    public createUserAccountForm: any;
    private _isDisableSubmitBtn: boolean;
    messageModalData: { title: string; body: string; size: string; config: any; action: any; };

    @ViewChild('messageModal') public messageModal: MessageModalComponent;

    constructor(public permissionChangeRoute: PermissionChangeRoute,
        private fb: FormBuilder,
        private accountActivateService: AccountActivateService,
        private otpService: OtpService,
        private constants: Constants) {
    }

    ngOnInit(): void {
        this.buildForm();
        this.isShowSuggest = false;
        this.isDisableSubmitBtn = false;

        this.accountActivateService.updateObserver([
            { key: 'stepwizard', value: 3 },
            { key: 'alertmessage', value: '' }
        ]);

        this.messageModalData = {
            title: 'label.Success',
            body: 'label.activation.successMsg',
            size: 'md',
            config: { isShowCloseBtn: true },
            action: {}
        };

        if (this.accountActivateService.isCreatedUser()) {
            this.accountActivateService.setCountAttemp(0);
            this.accountActivateService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setIsCreatedUser(false);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        } else if (this.accountActivateService.getCurrentStep() != 4) {
            this.accountActivateService.setCountAttemp(0);
            this.accountActivateService.setCardInfoBean(null);
            this.accountActivateService.setTermAndConResult(null);
            this.otpService.setCardInfoBean(null);
            this.accountActivateService.setIsCreatedUser(false);
            this.accountActivateService.setCurrentStep(1);
            this.permissionChangeRoute.changeRoute("HOME");
        }
    }

    private buildForm(): void {
        this.createUserAccountForm = this.fb.group({
            'username': ['', [
                ValidationService.requiredValidator,
                Validators.minLength(1),
                Validators.maxLength(20)
            ]
            ],
            'password': ['', [
                ValidationService.requiredValidator,
                Validators.minLength(1),
                Validators.maxLength(20)
            ]
            ],
            'confirmPassword': ['', [
                ValidationService.requiredValidator,
                Validators.minLength(1),
                Validators.maxLength(20)
            ]
            ]
        }, { validator: ValidationService.matchingPasswords('password', 'confirmPassword') });
    }

    onClickSubmitCreateUserAccount() {
        this.submitted = true;
        this.isDisableSubmitBtn = true;

        if (!this.createUserAccountForm.valid) return;

        this.accountActivateService.setActionCode('ACT_ACTIVATE');
        this.accountActivateService.setProcedure('createNewUserProcedure');
        let username: string;

        if (this.isShowSuggest === true) {
            username = this.username;
        } else {
            username = this.createUserAccountForm.value.username;
        }

        let objRequest: any = {
            params: {
                // after kk adapter success - have to delete 2 fields - idNo, idType
                idNo: this.accountActivateService.getCardInfoBean().cardId,
                idType: this.accountActivateService.getCardInfoBean().cardType,
                idIssueCountryCode: this.accountActivateService.getCardInfoBean().idIssueCountryCode,
                // -----------------------------------------------------------------
                tokenUUID: this.constants.TOKEN_UUID,
                customerType: this.constants.CUSTOMER_TYPE_RETAIL,
                username: username,
                password: this.createUserAccountForm.value.password,
                userAction: username,
                sessionToken: '',
                userProfile: '',
                corpId: this.constants.CORP_ID_RIB,
                attempCount: this.accountActivateService.getCountAttemp(),
                referenceCode: this.accountActivateService.getCardInfoBean().referenceCode,
                actionType: this.constants.ACTION_TYPE_ACTIVATE_ACCOUNT,
            },
        };

        

        this.accountActivateService.accountActivate(objRequest).then((objResponse: any) => {
            let result = objResponse.responseJSON.result;

            if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                
                this.accountActivateService.setIsCreatedUser(true);
                this.accountActivateService.setCurrentStep(1);
                this.show();
                // this.permissionChangeRoute.changeRoute("HOME");
            } else if (result.responseStatus.responseCode === this.constants.RESP_CODE_CREATE_USER_DUPLICATE) {
                
                this.accountActivateService.getAddCountAttemp();

                if (typeof result.value !== 'undefined') {
                    this.isShowSuggest = true;
                    this.nameSuggestion = result.value.suggestionUserIdList;
                    this.createUserAccountForm.get('username').disable();
                    this.accountActivateService.updateObserver([{ key: 'alertmessage', value: '' }]);
                } else {
                    this.accountActivateService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage }]);
                }

            } else {
                this.accountActivateService.updateObserver([{ key: 'alertmessage', value: result.responseStatus.errorMessage }]);
            }

            this.isDisableSubmitBtn = false;
        }, function (error) {
            
        });
    }

    public show(): void {
        this.messageModal.show();
    }

    onModalHidden() {
        this.accountActivateService.setCountAttemp(0);
        this.accountActivateService.setCardInfoBean(null);
        this.accountActivateService.setTermAndConResult(null);
        this.otpService.setCardInfoBean(null);
        this.permissionChangeRoute.changeRoute("HOME");
    }

    onclickNameSuggestion(nameSuggestion: string) {
        
        this.username = nameSuggestion;
        this.createUserAccountForm.patchValue({ username: nameSuggestion });
    }

    get isShowSuggest(): boolean {
        return this._isShowSuggest;
    }
    set isShowSuggest(isShowSuggest: boolean) {
        this._isShowSuggest = isShowSuggest;
    }

    get username(): string {
        return this._username;
    }
    set username(username: string) {
        this._username = username;
    }

    get password(): string {
        return this._password;
    }
    set password(password: string) {
        this._password = password;
    }

    get confirmPassword(): string {
        return this._confirmPassword;
    }
    set confirmPassword(confirmPassword: string) {
        this._confirmPassword = confirmPassword;
    }

    get nameSuggestion(): any {
        return this._nameSuggestion;
    }
    set nameSuggestion(nameSuggestion: any) {
        this._nameSuggestion = nameSuggestion;
    }

    get isDisableSubmitBtn(): boolean {
        return this._isDisableSubmitBtn;
    }
    set isDisableSubmitBtn(isDisableSubmitBtn: boolean) {
        this._isDisableSubmitBtn = isDisableSubmitBtn;
    }
}
