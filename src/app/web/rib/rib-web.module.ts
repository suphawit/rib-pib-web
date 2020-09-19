import { NgModule, ApplicationRef, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routing } from './rib-web.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RIBWebComponent } from './rib-web.component'
import { RIBMenuRoot } from '../../../pages/main-layout/web/rib/main-menu';
import { HomeComponent } from '../../../pages/home/web/rib/home.component';
import { RIBWebHeader } from '../../../pages/main-layout/web/rib/header';
import { RIBFooter } from '../../../pages/main-layout/web/rib/footer';
import { VerifyRefCodeComponent } from '../../../share/component/verify-ref-code/verify-ref-code.component'
import { VerifyOtpComponent } from '../../../share/component/verify-otp/web/verify-otp.component';
import { OtpService } from '../../../share/component/verify-otp/otp.service';
import { LoginComponent } from '../../../pages/login/rib/web/login';
import { RIBWebContactUs } from '../../../pages/contact-us/web/rib/contact-us'
import { RIBWebPromptPayRegisterComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register.component';
import { RIBWebPromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register-confirm.component';
import { RIBWebPromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register-success.component';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker'

/*** Share Component */
import { StepWizardComponent } from '../../../share/component/step-wizard/step-wizard.component';
import { CardType } from '../../../share/component/card-type/card-type.component';
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { Dateservice } from '../../../share/service/date.service';
import { Constants } from '../../../share/service/constants';
import { UtilService } from '../../../share/service/util.service';
import { TreeView } from '../../../pages/main-layout/web/rib/menu-tree-view.component';
import { PreloadService } from '../../../share/service/preload.service';
import { AuthGuard } from '../../../share/service/AuthGuard';
import { PermissionService, PermissionMainMenu, PermissionAction, PermissionChangeRoute } from '../../../share/service/permission.service';
import { IsLoginService } from '../../../share/service/islogin.service';
import { ValidationService } from '../../../share/service/validation.service';
import { ControlMessagesComponent } from '../../../share/component/control-messages.component';
import { RequestReferenceFormComponent } from '../../../share/component/request-reference-form/request-reference-form.component';
import { ForgotResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password.component';
import { ForgotResetPasswordRequestRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-request-ref-code.component';
import { ForgotResetPasswordVerifyRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-refcode.component';
import { ForgotResetPasswordVerifyOTPComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-otp.component';
import { ForgotResetPasswordResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-reset-password.component';
import { RIBWebFAQ } from '../../../pages/faq/web/rib/faq';
import { RIBWebServices } from '../../../pages/services/web/rib/services';
import { ResetPasswordFormComponent } from '../../../share/component/reset-password-form/reset-password-form.component';
import { TermsAndConditionsComponent } from '../../../share/component/terms-and-conditions/terms-and-conditions.component';
import { AcceptTermsAndConditionComponent } from '../../../share/component/terms-and-conditions/accept-terms-and-conditions.component';
import { RIBWebLocateUs } from '../../../pages/locate-us/web/rib/locate-us';
/* Google Map */
import { AgmCoreModule } from 'angular2-google-maps/core';
import { VerifyAccountFormComponent } from '../../../share/component/verify-account-form/verify-account-form.component';
import { DropdownDataService } from '../../../share/service/dropdown.service';
import { NgbDropdownModule } from '../../../share/directives/ngb-dropdown/dropdown.module';

import { ChangeTermDepositBaseComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-base.component';
import { ChangeTermDepositSwitchTermComponent, filterDuplicate } from '../../../pages/term-deposit/web/rib/change-term-deposit-switch-term.component';
import { ChangeTermDepositSwitchTermConfirmComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-switch-term-confirm.component';
import { PromptPayRegisterServiceMain } from '../../../pages/prompt-pay/prompt-pay-register.service';
import { MyAccountTypePipe, MyAccountListComponent } from '../../../pages/my-account/my-account-list.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TermDepositAccountService } from '../../../pages/term-deposit/web/rib/term-deposit-account.service';
import { RIBWebTermAndCondition } from '../../../pages/term-and-condition/web/rib/rib-web-term-and-condition.component';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MyAccountStatementPageComponent } from '../../../pages/my-account/web/rib/my-account-statement-page.component';
import { MyAccountStatementComponent } from '../../../pages/my-account/my-account-statement.component';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { LanguageSettingService } from '../../../pages/main-layout/web/language-setting.service';
import { TermsAndConditionsModalComponent } from '../../../share/component/terms-and-conditions/terms-and-conditions-modal.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TermAndConditionModalService } from '../../../share/component/terms-and-conditions/terms-and-conditions-modal.service';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { MessageModalComponent } from '../../../share/component/modal-messages.component';
import { RIBWebChangePassword } from '../../../pages/change-password/web/rib/change-password';
import { RIBWebChangePasswordNew } from '../../../pages/change-password/web/rib/change-password-new';
import { RIBWebChangePasswordVerifyOTP } from '../../../pages/change-password/web/rib/change-password-verify-otp';
import { PromptPayRegisterComponent } from '../../../pages/prompt-pay/prompt-pay-register.component';
import { PromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/prompt-pay-register-confirm.component';
import { PromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/prompt-pay-register-success.component';
import { RIBWebPrivacyPolicy } from '../../../pages/privacy-policy/web/rib/privacy-policy';
import { OtherAccountService } from '../../../pages/other-account/other-account.service';
import { OtherAccountAddEditConfirm } from '../../../pages/other-account/other-account-add-edit-confirm';
import { OtherAccountAddConfirm } from '../../../pages/other-account/web/rib/add/other-account-add-confirm.component';
import { OtherAccountAdd } from '../../../pages/other-account/web/rib/add/other-account-add.component';
import { MyAccountDetailComponent } from '../../../pages/my-account/my-account-detail.component';
import { MyAccountListPageComponent } from '../../../pages/my-account/web/rib/my-account-list-page.component';
import { PortletsMenuComponent } from '../../../share/component/portlets-menu/portlets-menu.component';
import { MyAccountDetailPageComponent } from '../../../pages/my-account/web/rib/my-account-detail-page.component';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { OtherAccountEdit } from '../../../pages/other-account/web/rib/edit/other-account-edit.component';
import { OtherAccountListPageComponent } from '../../../pages/other-account/web/rib/other-account-list-page.component';
import { OtherAccountAccordianComponent } from '../../../pages/other-account/other-account-accordian.component';
import { FromAccountList } from '../../../share/component/from-account-list/web/from-account-list.component';
import { ToAccountList } from '../../../share/component/to-account-list/web/to-account-list.component';
import { RIBFundTransfer } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer';
import { RIBFundTransferStep1 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step1';
import { RIBFundTransferStep2 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step2';
import { RIBFundTransferStep3 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step3';
import { BreadcrumbComponent } from '../../../share/component/breadcrumb/breadcrumb.component';
import { UserProfileComponent } from '../../../share/component/user-profile/user-profile.component';
import { InputDetails } from '../../../share/component/step-process/web/input-details.component';
import { TermDepositInputDetails } from '../../../share/component/step-process/web/td-input-details.component';
import { Confirm } from '../../../share/component/step-process/web/confirm.component';
import { TermDepositConfirm } from '../../../share/component/step-process/web/td-confirm.component';
import { Complete } from '../../../share/component/step-process/web/complete.component';
import { TermDepositComplete } from '../../../share/component/step-process/web/td-complete.component';
import { MasterDataService } from '../../../share/service/master-data.service';
import { FundTransferService } from '../../../share/service/fund-transfer.service';
import { AccountService } from '../../../share/service/account.service';
import { CurrencyFormatterDirective } from '../../../share/directives/currency-formatter.directive';
import { CurrencyFormatterPipe } from '../../../share/pipe/currency-formatter.pipe';
import { DateFormatterPipe } from '../../../share/pipe/date-formatter.pipe';
import { SubstringPipe } from '../../../share/pipe/substring.pipe';
import { StrFormatPipe } from '../../../share/pipe/string-format.pipe';

import { MinValidator } from '../../../share/directives/min-validator.directive';
import { RangeLengthValidator } from '../../../share/directives/range-length-validator.directive';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ClickOutsideDirective } from '../../../share/directives/click-outside.directive';
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { MyAccountAddComponent } from '../../../pages/my-account/web/rib/add/my-account-add.component';
import { MyAccountAddConfirmComponent } from '../../../pages/my-account/web/rib/add/my-account-add-confirm.component';
import { MyAccountEditComponent } from '../../../pages/my-account/web/rib/edit/my-account-edit.component';
import { MyAccountEditConfirmComponent } from '../../../pages/my-account/web/rib/edit/my-account-edit-confirm.component';
import { OtherAccountDetailPageComponent } from '../../../pages/other-account/other-account-detail-page-component';
import { PaginationComponent } from '../../../share/component/pagination/pagination.component';
import { ReportService } from '../../../share/service/report.service';
import { OnlyNumberDirective, onlyENUpperDirective } from '../../../share/directives/common.directive';
import { BillerListPageComponent } from '../../../pages/bill-payment/web/rib/biller-list-page.component';
import { BillerAccordianComponent } from '../../../pages/bill-payment/biller-accordian.component';
import { BillerAdd } from '../../../pages/bill-payment/web/rib/add/biller-add';
import { BillerEdit } from '../../../pages/bill-payment/web/rib/edit/biller-edit';
import { BillerAddConfirm } from '../../../pages/bill-payment/web/rib/add/biller-add-confirm';
import { BillerEditConfirm } from '../../../pages/bill-payment/web/rib/edit/biller-edit-confirm';
import { BillerDetailPageComponent } from '../../../pages/bill-payment/biller-detail-page-component';
import { BillPaymentService } from '../../../pages/bill-payment/bill-payment.service';
import { OtherAccountEditConfirm } from '../../../pages/other-account/web/rib/edit/other-account-edit-confirm.component';
import { TimelineComponent } from '../../../share/component/timeline/timeline.component';
import { TimelineModalComponent } from '../../../share/component/timeline/timeline-modal.component';
import { TransactionHistoryPageComponent } from '../../../pages/transaction-history/web/rib/transaction-history-page.component';
import { SchedulePageComponent } from '../../../pages/schedule/web/rib/schedule-page.component';
import { modalDeleteSchComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { ModalEditScheduleComponent } from '../../../pages/schedule/modal-edit-schedule.component';
import { RIBBillPayment } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment';
import { RIBBillPaymentStep1 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step1';
import { RIBBillPaymentStep2 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step2';
import { RIBBillPaymentStep3 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step3';
import { BillPaymentInputDetails } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-input-details.component';
import { BillPaymentConfirm } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-confirm.component';
import { BillPaymentComplete } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-complete.component';
import { ToBillerList } from '../../../pages/bill-payment/web/rib/bill/component/to-biller-list.component';
import { MutualFundService } from '../../../share/service/mutual-fund.service';
import { MutualFundSummaryComponent } from '../../../pages/mutual-fund/mutual-fund-summary.component';
import { MutualFundSummaryPageComponent } from '../../../pages/mutual-fund/mutual-fund-summary-page.component';
import { MutualFundDetailComponent } from '../../../pages/mutual-fund/mutual-fund-detail.component';
import { TransactionCodeInfoModalComponent } from '../../../pages/my-account/transaction-code-info-modal.component';
import { deleteOtherAccModalComponent } from '../../../pages/other-account/delete-other-account-modal.component';
import { RIBWebLanguageSettings } from '../../../pages/language-settings/web/rib/language-settings';
import { SanitizeHtmlPipe } from '../../../share/pipe/sanitize-html.pipe';
import { FormValidatorDirective } from '../../../share/directives/form-validator.directive';
import { OrderByPipe } from '../../../share/pipe/order-by.pipe';
import { RIBWebKKProductAndServicePage } from '../../../pages/kk-product-and-service/web/rib/kk-product-and-service.component';
import { KKProductAndServiceDetail } from '../../../pages/kk-product-and-service/kk-product-and-service-detail';
import { MessageModalDeleteMyAccountComponent } from '../../../pages/my-account/modal-messages-delete-my-account.component';
import { MessageModalDeleteBillerComponent } from '../../../pages/bill-payment/modal-messages-delete-biller.component';
import { MultipleTranslationPipe } from '../../../share/pipe/multiple-translation.pipe';
import { RequestReferenceFormService } from '../../../share/component/request-reference-form/request-reference-form.service';
import { ResponsiveModule } from 'ng2-responsive';
import { HtmlOutletDirective } from '../../../share/directives/html-outlet.directive';
import { AccountActivateService } from '../../../pages/activate-customer/web/rib/account-activate.service';
import { modalDeleteSchAllComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { modalDeleteSchResultComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { GetinformationService } from '../../../share/service/getInformation.service';
import { CapitalizePipe } from '../../../share/pipe/capitalize.pipe';


////////////////// Request to pay module //////////////////////////////
import { BillerRequestToPayListPage } from '../../../pages/bill-payment-request-to-pay/web/rib/biller-list-page';
import { BillerAccordianRequestToPay } from '../../../pages/bill-payment-request-to-pay/biller-accordian';
import { BillerRequestToPayDetail } from '../../../pages/bill-payment-request-to-pay/web/biller-detail';
import { BillerRequestToPayAddConfirm } from '../../../pages/bill-payment-request-to-pay/web/rib/add/biller-request-to-pay-add-confirm';
import { BillerRequestToPayEdit } from '../../../pages/bill-payment-request-to-pay/web/rib/edit/biller-request-to-pay-edit';
import { BillerRequestToPayEditConfirm } from '../../../pages/bill-payment-request-to-pay/web/rib/edit/biller-request-to-pay-edit-confirm';
import { BillPaymentRequestToPayService } from '../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { MessageModalDeleteBillerRequestToPay } from '../../../pages/bill-payment-request-to-pay/web/modal-messages-delete-biller';
import { RequestToPayListPageComponent } from '../../../pages/request-to-pay/web/request-to-pay-list-page.component';
import { RequestToPayTimelineComponent } from '../../../pages/request-to-pay/web/request-to-pay-timeline.component';
import { RTPTimelineModalComponent } from '../../../pages/request-to-pay/request-to-pay-timeline-modal.component';
import { RIBRequestToPayListPageComponent } from '../../../pages/request-to-pay/web/rib/rib-request-to-pay-list-page.component';
import { AddRequestToPayStep1 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step1.component';
import { RTPFromAccountList } from '../../../pages/request-to-pay/web/request-to-pay-from-account';
import { RTPToAccountList } from '../../../pages/request-to-pay/web/request-to-pay-to-account';
import { RequestToPayService } from '../../../pages/request-to-pay/request-to-pay.service';
import { AddRequestToPayStep2 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step2.component';
import { AddRequestToPayStep3 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step3.component';
import { NotificationService } from "../../../share/service/notification.service";
import { RIBWebQRGeneratorComponent } from "../../../pages/qr-generator/web/rib/rib-web-qr-generator.component";
import { QRCodeModule } from 'angular2-qrcode';
import { RIBWebQRGeneratorCompleteComponent } from "../../../pages/qr-generator/web/rib/rib-web-qr-generator-complete.component";
import { qrGeneratorService } from '../../../pages/qr-generator/qr-generator.service';
import { PromptPayAccountListComponent } from '../../../pages/prompt-pay/prompt-pay-account-list.component';
import { BillerImageComponent } from '../../../share/component/biller-image/billerImage.component';
import { SelectModule } from "ng2-select";
import { ManageBillerAddRIB } from '../../../pages/bill-payment-request-to-pay/manage-biller-add/manage-biller-add-rib';import { PromptPayAccountDetailComponent } from '../../../pages/prompt-pay/prompt-pay-account-detail.component';
import { PromptPayAccountTimelineComponent } from '../../../pages/prompt-pay/prompt-pay-account-timeline.component';
import { RIBWebDashboardComponent } from '../../../pages/dashboard/web/rib/rib-web-dashboard.component';
import { ActivateAccountService } from '../../../pages/activate-account/web/rib/share/services/activate-account.service';
import { ActivateAccountByProductsStep1Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step1.component';
import { ActivateAccountByProductsStep2Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step2.component';
import { ActivateAccountByProductsStep3Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step3.component';
import { ActivateAccountByProductsStep4Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step4.component';
import { ActivateAccountByProductsStep5Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step5.component';
import { ActivateAccountByDebitcardStep1Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step1.component';
import { ActivateAccountByDebitcardStep2Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step2.component';
import { ActivateAccountByDebitcardStep3Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step3.component';
import { ActivateAccountByDebitcardStep4Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step4.component';
import { ActivateAccountByDebitcardStep5Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step5.component';
import { ActivateAccountByRefcodeStep1Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step1.component';
import { ActivateAccountByRefcodeStep2Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step2.component';
import { ActivateAccountByRefcodeStep3Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step3.component';
import { ActivateAccountByRefcodeStep4Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step4.component';
import { ActivateAccountTermAndCondComponent } from '../../../pages/activate-account/web/rib/share/components/activate-account-term-and-cond.component';
import { ActivateAccountFormComponent } from '../../../pages/activate-account/web/rib/share/components/activate-account-form.component';
import { ActivateAccountSubscribeInfoComponent } from '../../../pages/activate-account/web/rib/share/components/activate-account-subscribe-info.component';
import { ActivateAccountReSubmitRefcodeFormComponent } from '../../../pages/activate-account/web/rib/share/components/activate-account-resubmit-refcode-form.component';

import { ForgotUsernameService } from '../../../pages/forgot-username/web/rib/share/services/forgot-username.service';
import { ForgotUsernameByProductsStep1Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step1.component';
import { ForgotUsernameByProductsStep2Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step2.component';
import { ForgotUsernameByProductsStep3Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step3.component';
import { ForgotUsernameByProductsStep4Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step4.component';
import { ForgotUsernameByDebitcardStep1Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step1.component';
import { ForgotUsernameByDebitcardStep2Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step2.component';
import { ForgotUsernameByDebitcardStep3Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step3.component';
import { ForgotUsernameByRefcodeStep1Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step1.component';
import { ForgotUsernameByRefcodeStep2Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step2.component';
import { ForgotUsernameByRefcodeStep3Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step3.component';
import { ForgotUsernameByRefcodeStep4Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step4.component';

import { VerifyReferenceCodeFormComponent } from '../../../share/component/verify-form/web/reference-code-form.component';
import { VerifyDebitcardFormComponent } from '../../../share/component/verify-form/web/debitcard-form.component';
import { VerifyProductsFormComponent } from '../../../share/component/verify-form/web/products-form.component';
import { VerifyMethodFormComponent } from '../../../share/component/verify-form/web/method-form.component';
import { FormHeaderComponent } from '../../../share/component/verify-form/web/form-header.component';
import { FormStepCaptionComponent } from '../../../share/component/verify-form/web/form-step-caption.component';
import { ForgotUsernameVerifyOTPInfoComponent } from '../../../pages/forgot-username/web/rib/share/components/forgot-username-verify-otp-info.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MomentModule } from 'angular2-moment';
import { AddNewBiller } from '../../../pages/bill-payment/web/add-new-biller.component';
import { ModalDeleteRTPIncomingComponent } from '../../../pages/request-to-pay/modal-delete-rtp-incoming.component';
import { SubscriptionService } from "../../../share/service/subscription.service";
import { RIBRequestToPayBlockListComponent } from '../../../pages/request-to-pay/web/rib/rib-request-to-pay-block-list.component';
import { ModalRTPBlockListComponent } from '../../../pages/request-to-pay/web/modal-rtp-block-list.component';import { RIBWebPromptPayEditComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account.component';
import { RIBWebPromptPayEditConfirmComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account-confirm.component';
import { RIBWebPromptPayEditCompleteComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account-complete.component';
import {EDonationModalComponent} from "../../../pages/bill-payment/web/rib/bill/component/e-donation-modal.component";
import { ChangeUsernameStep1Component } from '../../../pages/change-username/web/rib/change-username-step1.component';
import { ChangeUsernameStep2Component } from '../../../pages/change-username/web/rib/change-username-step2.component';
import { ChangeUsernameService } from '../../../pages/change-username/web/rib/share/change-username.service';
import { ManageDeviceComponent } from '../../../pages/manage-device/manage-device.component';
import { ManageDeviceService } from '../../../pages/manage-device/share/manage-device.service';

@NgModule({

  imports: [
    BrowserModule,
    routing,
    FilterPipeModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    FormsModule,
    ReactiveFormsModule,
    MaterialDatepicker,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCjOaGCEZierv6NPxPgQ1-jDebQMzVvYPE&sensor'
    }),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    TypeaheadModule.forRoot(),
    ResponsiveModule,
    NgbDropdownModule.forRoot(),
    SelectModule,
    QRCodeModule,
    InfiniteScrollModule,
    MomentModule  ],

  declarations: [
    HomeComponent,
    RIBWebComponent,
    RIBWebHeader,
    RIBMenuRoot,
    RIBFooter,
    LoginComponent,
    StepWizardComponent,
    CardType,
    RIBWebContactUs,
    VerifyRefCodeComponent,
    ControlMessagesComponent,
    RequestReferenceFormComponent,
    ForgotResetPasswordComponent,
    VerifyOtpComponent,
    RIBWebPromptPayRegisterComponent,
    RIBWebPromptPayRegisterConfirmComponent,
    RIBWebPromptPayRegisterSuccessComponent,
    ForgotResetPasswordRequestRefCodeComponent,
    ForgotResetPasswordVerifyRefCodeComponent,
    ForgotResetPasswordVerifyOTPComponent,
    ForgotResetPasswordResetPasswordComponent,
    TreeView,
    RIBWebFAQ,
    RIBWebServices,
    ResetPasswordFormComponent,
    TermsAndConditionsComponent,
    AcceptTermsAndConditionComponent,
    RIBWebLocateUs,
    VerifyAccountFormComponent,
    ChangeTermDepositBaseComponent,
    ChangeTermDepositSwitchTermComponent,
    ChangeTermDepositSwitchTermConfirmComponent,
    MyAccountTypePipe,
    RIBWebTermAndCondition,
    MyAccountStatementPageComponent,
    MyAccountStatementComponent,
    AlertMessageComponent,
    RIBWebChangePassword,
    RIBWebChangePasswordVerifyOTP,
    TermsAndConditionsModalComponent,
      EDonationModalComponent,
    MessageModalComponent,
    MessageModalComponent,
    PromptPayRegisterComponent,
    PromptPayRegisterConfirmComponent,
    PromptPayRegisterSuccessComponent,
    RIBWebChangePasswordNew,
    RIBWebPrivacyPolicy,
    MyAccountListPageComponent,
    PortletsMenuComponent,
    MyAccountDetailPageComponent,
    OtherAccountAddEditConfirm,
    OtherAccountAddConfirm,
    OtherAccountAdd,
    MyAccountListComponent,
    MyAccountDetailComponent,
    OtherAccountEdit,
    OtherAccountListPageComponent,
    OtherAccountAccordianComponent,
    FromAccountList,
    ToAccountList,
    RIBFundTransfer,
    RIBFundTransferStep1,
    RIBFundTransferStep2,
    RIBFundTransferStep3,
    BreadcrumbComponent,
    UserProfileComponent,
    InputDetails,
    TermDepositInputDetails,
    Confirm,
    TermDepositConfirm,
    Complete,
    TermDepositComplete,
    CurrencyFormatterDirective,
    CurrencyFormatterPipe,
    DateFormatterPipe,
    SubstringPipe,
    StrFormatPipe,
    MinValidator,
    RangeLengthValidator,
    ClickOutsideDirective,
    MyAccountAddComponent,
    MyAccountAddConfirmComponent,
    MyAccountEditComponent,
    MyAccountEditConfirmComponent,
    OtherAccountDetailPageComponent,
    PaginationComponent,
    BillerListPageComponent,
    BillerAccordianComponent,
    BillerAdd,
    BillerEdit,
    BillerAddConfirm,
    BillerEditConfirm,
    BillerDetailPageComponent,
    OnlyNumberDirective,
    OtherAccountEditConfirm,
    onlyENUpperDirective,
    TimelineModalComponent,
    TransactionHistoryPageComponent,
    SchedulePageComponent,
    TimelineComponent,
    filterDuplicate,
    modalDeleteSchComponent,
    ModalEditScheduleComponent,
    RIBBillPayment,
    RIBBillPaymentStep1,
    RIBBillPaymentStep2,
    RIBBillPaymentStep3,
    BillPaymentInputDetails,
    BillPaymentConfirm,
    BillPaymentComplete,
    ToBillerList,
    MutualFundSummaryComponent,
    MutualFundSummaryPageComponent,
    MutualFundDetailComponent,
    TransactionCodeInfoModalComponent,
    deleteOtherAccModalComponent,
    RIBWebLanguageSettings,
    SanitizeHtmlPipe,
    FormValidatorDirective,
    OrderByPipe,
    RIBWebKKProductAndServicePage,
    KKProductAndServiceDetail,
    MessageModalDeleteMyAccountComponent,
    MessageModalDeleteBillerComponent,
    MultipleTranslationPipe,
    HtmlOutletDirective,
	  modalDeleteSchResultComponent,
    modalDeleteSchAllComponent,
    //// Request to pay module ////////
    BillerRequestToPayListPage,
    BillerAccordianRequestToPay,
    BillerRequestToPayDetail,
    BillerRequestToPayAddConfirm,
    BillerRequestToPayEdit,
    BillerRequestToPayEditConfirm,
    MessageModalDeleteBillerRequestToPay,
    RequestToPayListPageComponent,
    RequestToPayTimelineComponent,
    RTPTimelineModalComponent,
    RIBRequestToPayListPageComponent,
    AddRequestToPayStep1,
    RTPFromAccountList,
    RTPToAccountList,
    AddRequestToPayStep2,
    AddRequestToPayStep3,
    RIBWebQRGeneratorComponent,
    RIBWebQRGeneratorCompleteComponent,
   // DashboardComponent,
    PromptPayAccountListComponent,
    PromptPayAccountDetailComponent,
    PromptPayAccountTimelineComponent,
    BillerImageComponent,
    RIBWebDashboardComponent,

    ActivateAccountByProductsStep1Component,
    ActivateAccountByProductsStep2Component,
    ActivateAccountByProductsStep3Component,
    ActivateAccountByProductsStep4Component,
    ActivateAccountByProductsStep5Component,
    ActivateAccountByDebitcardStep1Component,
    ActivateAccountByDebitcardStep2Component,
    ActivateAccountByDebitcardStep3Component,
    ActivateAccountByDebitcardStep4Component,
    ActivateAccountByDebitcardStep5Component,
    ActivateAccountByRefcodeStep1Component,
    ActivateAccountByRefcodeStep2Component,
    ActivateAccountByRefcodeStep3Component,
    ActivateAccountByRefcodeStep4Component,
    ActivateAccountTermAndCondComponent,
    ActivateAccountFormComponent,
    ActivateAccountSubscribeInfoComponent,
    ActivateAccountReSubmitRefcodeFormComponent,
    ForgotUsernameByProductsStep1Component,
    ForgotUsernameByProductsStep2Component,
    ForgotUsernameByProductsStep3Component,
    ForgotUsernameByProductsStep4Component,
    ForgotUsernameByDebitcardStep1Component,
    ForgotUsernameByDebitcardStep2Component,
    ForgotUsernameByDebitcardStep3Component,
    ForgotUsernameByRefcodeStep1Component,
    ForgotUsernameByRefcodeStep2Component,
    ForgotUsernameByRefcodeStep3Component,
    ForgotUsernameByRefcodeStep4Component,
    VerifyReferenceCodeFormComponent,
    VerifyDebitcardFormComponent,
    VerifyProductsFormComponent,
    VerifyMethodFormComponent,
    FormHeaderComponent,
    FormStepCaptionComponent,
    ForgotUsernameVerifyOTPInfoComponent,
    ManageBillerAddRIB,
    CapitalizePipe,
    ModalDeleteRTPIncomingComponent,
	  RIBRequestToPayBlockListComponent,
    ModalRTPBlockListComponent,
    PromptPayAccountListComponent,
    PromptPayAccountDetailComponent,
    PromptPayAccountTimelineComponent,
    AddNewBiller,
    RIBWebPromptPayEditComponent,
    RIBWebPromptPayEditConfirmComponent,
    RIBWebPromptPayEditCompleteComponent,
    ChangeUsernameStep1Component,
    ChangeUsernameStep2Component,
    ManageDeviceComponent
  ],
  entryComponents: [
    HomeComponent,
    RIBWebComponent,
    RIBWebHeader,
    RIBMenuRoot,
    RIBFooter,
    LoginComponent,
    StepWizardComponent,
    VerifyRefCodeComponent,
    CardType,
    ControlMessagesComponent,
    RequestReferenceFormComponent,
    VerifyOtpComponent,
    ForgotResetPasswordComponent,
    RIBWebPromptPayRegisterComponent,
    RIBWebPromptPayRegisterConfirmComponent,
    RIBWebPromptPayRegisterSuccessComponent,
    ForgotResetPasswordRequestRefCodeComponent,
    ForgotResetPasswordVerifyRefCodeComponent,
    ForgotResetPasswordVerifyOTPComponent,
    ForgotResetPasswordResetPasswordComponent,
    RIBWebFAQ,
    RIBWebServices,
    ResetPasswordFormComponent,
    TermsAndConditionsComponent,
    AcceptTermsAndConditionComponent,
    RIBWebLocateUs,
    VerifyAccountFormComponent,
    ChangeTermDepositBaseComponent,
    ChangeTermDepositSwitchTermComponent,
    ChangeTermDepositSwitchTermConfirmComponent,
    RIBWebTermAndCondition,
    MyAccountStatementPageComponent,
    MyAccountStatementComponent,
    AlertMessageComponent,
    RIBWebChangePassword,
    RIBWebChangePasswordVerifyOTP,
    TermsAndConditionsModalComponent,
      EDonationModalComponent,
    MessageModalComponent,
    MessageModalComponent,
    PromptPayRegisterComponent,
    PromptPayRegisterConfirmComponent,
    PromptPayRegisterSuccessComponent,
    RIBWebChangePasswordNew,
    RIBWebPrivacyPolicy,
    MyAccountListPageComponent,
    PortletsMenuComponent,
    MyAccountDetailPageComponent,
    OtherAccountAddEditConfirm,
    OtherAccountAddConfirm,
    OtherAccountAdd,
    MyAccountListComponent,
    MyAccountDetailComponent,
    OtherAccountEdit,
    OtherAccountListPageComponent,
    OtherAccountAccordianComponent,
    FromAccountList,
    ToAccountList,
    RIBFundTransfer,
    RIBFundTransferStep1,
    RIBFundTransferStep2,
    RIBFundTransferStep3,
    BreadcrumbComponent,
    UserProfileComponent,
    InputDetails,
    TermDepositInputDetails,
    Confirm,
    TermDepositConfirm,
    Complete,
    TermDepositComplete,
    MyAccountAddComponent,
    MyAccountAddConfirmComponent,
    MyAccountEditComponent,
    MyAccountEditConfirmComponent,
    OtherAccountDetailPageComponent,
    PaginationComponent,
    BillerListPageComponent,
    BillerAccordianComponent,
    BillerAdd,
    BillerEdit,
    BillerAddConfirm,
    BillerEditConfirm,
    BillerDetailPageComponent,
    OtherAccountEditConfirm,
    TimelineModalComponent,
    TransactionHistoryPageComponent,
    SchedulePageComponent,
    TimelineComponent,
    modalDeleteSchComponent,
    ModalEditScheduleComponent,
    RIBBillPayment,
    RIBBillPaymentStep1,
    RIBBillPaymentStep2,
    RIBBillPaymentStep3,
    BillPaymentInputDetails,
    BillPaymentConfirm,
    BillPaymentComplete,
    ToBillerList,
    MutualFundSummaryComponent,
    MutualFundSummaryPageComponent,
    MutualFundDetailComponent,
    TransactionCodeInfoModalComponent,
    deleteOtherAccModalComponent,
    RIBWebLanguageSettings,
    RIBWebKKProductAndServicePage,
    KKProductAndServiceDetail,
    MessageModalDeleteMyAccountComponent,
    MessageModalDeleteBillerComponent,
    modalDeleteSchResultComponent,
    modalDeleteSchAllComponent,
    //// Request to pay module ////////
    BillerRequestToPayListPage,
    BillerAccordianRequestToPay,
    BillerRequestToPayDetail,
    BillerRequestToPayAddConfirm,
    BillerRequestToPayEdit,
    BillerRequestToPayEditConfirm,
    MessageModalDeleteBillerRequestToPay,
    RequestToPayTimelineComponent,
    RTPTimelineModalComponent,
    AddRequestToPayStep1,
    RTPFromAccountList,
    RTPToAccountList,
    AddRequestToPayStep2,
    AddRequestToPayStep3,
    RIBWebQRGeneratorComponent,
    RIBWebQRGeneratorCompleteComponent,
    ModalDeleteRTPIncomingComponent,
    PromptPayAccountListComponent,
    PromptPayAccountDetailComponent,
    PromptPayAccountTimelineComponent,

    RIBWebDashboardComponent,
    RIBRequestToPayBlockListComponent,
    ModalRTPBlockListComponent,
    AddNewBiller,
    RIBWebPromptPayEditComponent,
    RIBWebPromptPayEditConfirmComponent,
    RIBWebPromptPayEditCompleteComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MfpApi,
    Dateservice,
    Constants,
    UtilService,
    PermissionService,
    IsLoginService,
    PermissionMainMenu,
    PermissionAction,
    ValidationService,
    AuthGuard,
    OtpService,
    PermissionChangeRoute,
    DropdownDataService,
    PromptPayRegisterServiceMain,
    TermDepositAccountService,
    LanguageSettingService,
    TermAndConditionModalService,
    OtherAccountService,
    PreloadService,
    MyAccountService,
    CurrencyFormatterPipe,
    DateFormatterPipe,
    SubstringPipe,
    StrFormatPipe,
    MinValidator,
    RangeLengthValidator,
    MasterDataService,
    FundTransferService,
    AccountService,
    BankCodeDataService,
    ReportService,
    BillPaymentService,
    SanitizeHtmlPipe,
    OrderByPipe,
    MutualFundService,
    MultipleTranslationPipe,
    RequestReferenceFormService,
    AccountActivateService,
    GetinformationService,
    BillPaymentRequestToPayService,
    RequestToPayService,
    NotificationService,
    qrGeneratorService,
    ActivateAccountService,
    ForgotUsernameService,
    SubscriptionService,
    CapitalizePipe,
    ChangeUsernameService,
    ManageDeviceService,
    { provide: LOCALE_ID, useValue: "th-TH" }
  ]
})

export class RIBWebModule implements ErrorHandler {

  constructor(private _MfpApi: MfpApi, private _Constants: Constants, private translate: TranslateService) {
    //this.translate.setDefaultLang('en');
    //this.translate.use('th');
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    //for call mdf first step
    this._MfpApi.connect(this._Constants.MFP_CONTEXT_ROOT, this._Constants.RIB_WEB_APP_ID, "RIB", "RIBWeb").then((value) => {

          appRef.bootstrap(RIBWebComponent);
    });


  }

  handleError(error) {
    // do something with the exception

  }
}