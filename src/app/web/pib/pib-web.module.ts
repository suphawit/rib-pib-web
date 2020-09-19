import { NgModule, ApplicationRef, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { ResponsiveModule } from 'ng2-responsive';

import { PIBWebComponent } from './pib-web.component'
import { PIBMenuRoot } from '../../../pages/main-layout/web/pib/main-menu';
import { PIBFooter } from '../../../pages/main-layout/web/pib/footer';
import { LoginComponent } from '../../../pages/login/pib/web/login';
import { routing } from './pib-web.routes';

/*** Share Component */
import { StepWizardComponent } from '../../../share/component/step-wizard/step-wizard.component';
import { CanvasService } from '../../../share/service/canvas.service';
import { PreloadService } from '../../../share/service/preload.service';
import { BreadcrumbComponent } from '../../../share/component/breadcrumb/breadcrumb.component';
import { UserProfileComponent } from '../../../share/component/user-profile/user-profile.component';
import { FromAccountList } from '../../../share/component/from-account-list/web/from-account-list.component';
import { ToAccountList } from '../../../share/component/to-account-list/web/to-account-list.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FundTransferService } from '../../../share/service/fund-transfer.service';
import { PIBFundTransfer } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer';
import { PIBFundTransferStep1 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step1';
import { PIBFundTransferStep2 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step2';
import { PIBFundTransferStep3 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step3';
import { InputDetails } from '../../../share/component/step-process/web/input-details.component';
import { TermDepositInputDetails } from '../../../share/component/step-process/web/td-input-details.component';
import { Confirm } from '../../../share/component/step-process/web/confirm.component';
import { TermDepositConfirm } from '../../../share/component/step-process/web/td-confirm.component';
import { Complete } from '../../../share/component/step-process/web/complete.component';
import { TermDepositComplete } from '../../../share/component/step-process/web/td-complete.component';
import { PromptPayRegisterComponent } from '../../../pages/prompt-pay/prompt-pay-register.component';
import { PromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/prompt-pay-register-confirm.component';
import { PromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/prompt-pay-register-success.component';
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { Dateservice } from '../../../share/service/date.service';
import { PermissionService, PermissionMainMenu, PermissionAction, PermissionChangeRoute } from '../../../share/service/permission.service';
import { IsLoginService } from '../../../share/service/islogin.service';
import { AccountService } from '../../../share/service/account.service';
import { Constants } from '../../../share/service/constants';
import { UtilService } from '../../../share/service/util.service';
import { TermsAndConditionsComponent } from '../../../share/component/terms-and-conditions/terms-and-conditions.component';
import { AcceptTermsAndConditionComponent } from '../../../share/component/terms-and-conditions/accept-terms-and-conditions.component';
import { MessageModalComponent } from '../../../share/component/modal-messages.component';
import { VerifyRefCodeComponent } from '../../../share/component/verify-ref-code/verify-ref-code.component'
import { VerifyOtpComponent } from '../../../share/component/verify-otp/web/verify-otp.component';
import { OtpService } from '../../../share/component/verify-otp/otp.service';
import { CardType } from '../../../share/component/card-type/card-type.component';
import { ControlMessagesComponent } from '../../../share/component/control-messages.component';
import { PromptPayRegisterServiceMain } from '../../../pages/prompt-pay/prompt-pay-register.service';
import { AuthGuard, HalfAuthGuard } from '../../../share/service/AuthGuard';
import { TreeView } from '../../../pages/main-layout/web/pib/menu-tree-view.component';
import { PIBWebTermAndCondition } from '../../../pages/term-and-condition/web/pib/pib-web-term-and-condition.component';
import { TranslateService } from "ng2-translate/src/translate.service";
import { DropdownDataService } from '../../../share/service/dropdown.service';
import { GetinformationService } from '../../../share/service/getInformation.service';
import { TermAndConAfterLogin } from '../../../pages/term-and-condition/web/pib/tc-after-login.component';
import { TermsAndConditionsModalComponent } from '../../../share/component/terms-and-conditions/terms-and-conditions-modal.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { TermAndConditionModalService } from '../../../share/component/terms-and-conditions/terms-and-conditions-modal.service';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { LanguageSettingService } from '../../../pages/main-layout/web/language-setting.service';
import { PIBWebPromptPayRegisterComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register.component';
import { PIBWebPromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register-confirm.component';
import { PIBWebPromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register-success.component';
import { MasterDataService } from '../../../share/service/master-data.service';
import { CurrencyFormatterDirective } from '../../../share/directives/currency-formatter.directive';
import { CurrencyFormatterPipe } from '../../../share/pipe/currency-formatter.pipe';
import { DateFormatterPipe } from '../../../share/pipe/date-formatter.pipe';
import { SubstringPipe } from '../../../share/pipe/substring.pipe';
import { MyAccountDetailComponent } from '../../../pages/my-account/my-account-detail.component';
import { MyAccountListComponent, MyAccountTypePipe } from '../../../pages/my-account/my-account-list.component';
import { StrFormatPipe } from '../../../share/pipe/string-format.pipe';
import { MinValidator } from '../../../share/directives/min-validator.directive';
import { RangeLengthValidator } from '../../../share/directives/range-length-validator.directive';
import { OtherAccountAddComponent } from '../../../pages/other-account/web/pib/add/other-account-add.component';
import { OtherAccountAddConfirmComponent } from '../../../pages/other-account/web/pib/add/other-account-add-confirm.component';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { OtherAccountListPageComponent } from '../../../pages/other-account/web/pib/other-account-list-page.component';
import { OtherAccountAccordianComponent } from '../../../pages/other-account/other-account-accordian.component';
import { OtherAccountService } from '../../../pages/other-account/other-account.service';
import { BankCodeDataService } from '../../../share/service/bankcode-data.service';
import { ClickOutsideDirective } from '../../../share/directives/click-outside.directive';
import { MyAccountAddComponent } from '../../../pages/my-account/web/pib/add/my-account-add.component';
import { MyAccountAddConfirmComponent } from '../../../pages/my-account/web/pib/add/my-account-add-confirm.component';
import { MyAccountEditComponent } from '../../../pages/my-account/web/pib/edit/my-account-edit.component';
import { MyAccountEditConfirmComponent } from '../../../pages/my-account/web/pib/edit/my-account-edit-confirm.component';
import { MyAccountDetailPageComponent } from '../../../pages/my-account/web/pib/my-account-detail-page.component';
import { MyAccountListPageComponent } from '../../../pages/my-account/web/pib/my-account-list-page.component';
import { PortletsMenuComponent } from '../../../share/component/portlets-menu/portlets-menu.component';
import { PaginationComponent } from '../../../share/component/pagination/pagination.component';
import { MyAccountStatementPageComponent } from '../../../pages/my-account/web/pib/my-account-statement-page.component';
import { MyAccountStatementComponent } from '../../../pages/my-account/my-account-statement.component';
import { OtherAccountDetailPageComponent } from '../../../pages/other-account/other-account-detail-page-component';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ReportService } from '../../../share/service/report.service';
import { OnlyNumberDirective, onlyENUpperDirective } from '../../../share/directives/common.directive';
import { TimelineComponent } from '../../../share/component/timeline/timeline.component';
import { TimelineModalComponent } from '../../../share/component/timeline/timeline-modal.component';
import { TransactionHistoryPageComponent } from '../../../pages/transaction-history/web/pib/transaction-history-page.component';
import { SchedulePageComponent } from '../../../pages/schedule/web/pib/schedule-page.component';
import { BillPaymentService } from '../../../pages/bill-payment/bill-payment.service';
import { modalDeleteSchComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { ModalEditScheduleComponent } from '../../../pages/schedule/modal-edit-schedule.component';
import { TransactionCodeInfoModalComponent } from '../../../pages/my-account/transaction-code-info-modal.component';
import { deleteOtherAccModalComponent } from '../../../pages/other-account/delete-other-account-modal.component';
import { SanitizeHtmlPipe } from '../../../share/pipe/sanitize-html.pipe';
import { OrderByPipe } from '../../../share/pipe/order-by.pipe';
import { FormValidatorDirective } from '../../../share/directives/form-validator.directive';
import { OtherAccountEditComponent } from '../../../pages/other-account/web/pib/edit/other-account-edit.component';
import { OtherAccountEditConfirmComponent } from '../../../pages/other-account/web/pib/edit/other-account-edit-confirm.component';
import { PIBWebKKProductAndServicePage } from '../../../pages/kk-product-and-service/web/pib/kk-product-and-service.component';
import { KKProductAndServiceDetail } from '../../../pages/kk-product-and-service/kk-product-and-service-detail';
import { MessageModalDeleteMyAccountComponent } from '../../../pages/my-account/modal-messages-delete-my-account.component';
import { DisclaimerWeb } from '../../../pages/disclaimer/web/pib/disclaimer-web';
import { DisclaimerService } from '../../../pages/disclaimer/disclaimer.service';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker'
import { MultipleTranslationPipe } from '../../../share/pipe/multiple-translation.pipe';
import { LandingPagePIB } from '../../../pages/landing-page/web/pib/landing-page';
import { modalDeleteSchAllComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { modalDeleteSchResultComponent } from '../../../pages/schedule/modal-delete-schedule.component';
import { NgbDropdownModule } from '../../../share/directives/ngb-dropdown/dropdown.module';
import { CapitalizePipe } from '../../../share/pipe/capitalize.pipe';

////////////////// Request to pay module //////////////////////////////
import { BillerRequestToPayListPage } from '../../../pages/bill-payment-request-to-pay/web/pib/biller-list-page';
import { BillerAccordianRequestToPay } from '../../../pages/bill-payment-request-to-pay/biller-accordian';
import { BillerRequestToPayDetail } from '../../../pages/bill-payment-request-to-pay/web/biller-detail';
import { BillerRequestToPayAdd } from '../../../pages/bill-payment-request-to-pay/web/pib/add/biller-request-to-pay-add';
import { BillerRequestToPayAddConfirm } from '../../../pages/bill-payment-request-to-pay/web/pib/add/biller-request-to-pay-add-confirm';
import { BillerRequestToPayEdit } from '../../../pages/bill-payment-request-to-pay/web/pib/edit/biller-request-to-pay-edit';
import { BillerRequestToPayEditConfirm } from '../../../pages/bill-payment-request-to-pay/web/pib/edit/biller-request-to-pay-edit-confirm';
import { BillPaymentRequestToPayService } from '../../../pages/bill-payment-request-to-pay/bill-payment-request-to-pay.service';
import { MessageModalDeleteBillerRequestToPay } from '../../../pages/bill-payment-request-to-pay/web/modal-messages-delete-biller';
import { PIBBillPaymentStep1 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step1';
import { PIBBillPaymentStep2 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step2';
import { PIBBillPaymentStep3 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step3';
import { PIBBillPayment } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment';
import { BillPaymentInputDetails } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-input-details.component';
import { ToBillerList } from '../../../pages/bill-payment/web/rib/bill/component/to-biller-list.component';
import { BillPaymentConfirm } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-confirm.component';
import { BillPaymentComplete } from '../../../pages/bill-payment/web/rib/bill/component/bill-payment-complete.component';
import { RTPTimelineModalComponent } from '../../../pages/request-to-pay/request-to-pay-timeline-modal.component';
import { RequestToPayListPageComponent } from '../../../pages/request-to-pay/web/request-to-pay-list-page.component';
import { RequestToPayTimelineComponent } from '../../../pages/request-to-pay/web/request-to-pay-timeline.component';
import { PIBRequestToPayListPageComponent } from '../../../pages/request-to-pay/web/pib/pib-request-to-pay-list-page.component';
import { AddRequestToPayStep1 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step1.component';
import { RTPFromAccountList } from '../../../pages/request-to-pay/web/request-to-pay-from-account';
import { RTPToAccountList } from '../../../pages/request-to-pay/web/request-to-pay-to-account';
import { RequestToPayService } from '../../../pages/request-to-pay/request-to-pay.service';
import { AddRequestToPayStep2 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step2.component';
import { AddRequestToPayStep3 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step3.component';
import { NotificationService } from "../../../share/service/notification.service";
import { PIBWebQRGeneratorComponent } from "../../../pages/qr-generator/web/pib/pib-web-qr-generator.component";
import { QRCodeModule } from 'angular2-qrcode';
import { PIBWebQRGeneratorCompleteComponent } from "../../../pages/qr-generator/web/pib/pib-web-qr-generator-complete.component";
import { qrGeneratorService } from '../../../pages/qr-generator/qr-generator.service';
import { BillerImageComponent } from '../../../share/component/biller-image/billerImage.component';
import { SelectModule } from "ng2-select";
import { ManageBillerAddPIB } from '../../../pages/bill-payment-request-to-pay/manage-biller-add/manage-biller-add-pib';
import { PIBRequestToPayBlockListComponent } from '../../../pages/request-to-pay/web/pib/pib-request-to-pay-block-list.component';
import { ModalRTPBlockListComponent } from '../../../pages/request-to-pay/web/modal-rtp-block-list.component';
import { ModalDeleteRTPIncomingComponent } from '../../../pages/request-to-pay/modal-delete-rtp-incoming.component';
import { PromptPayAccountListComponent } from '../../../pages/prompt-pay/prompt-pay-account-list.component';
import { PromptPayAccountDetailComponent } from '../../../pages/prompt-pay/prompt-pay-account-detail.component';
import { PromptPayAccountTimelineComponent } from '../../../pages/prompt-pay/prompt-pay-account-timeline.component';
import { MomentModule } from 'angular2-moment';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AddNewBiller } from '../../../pages/bill-payment/web/add-new-biller.component';
import { PIBWebPromptPayEditComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account.component';
import { PIBWebPromptPayEditConfirmComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account-confirm.component';
import { PIBWebPromptPayEditCompleteComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account-complete.component';
import {EDonationModalComponent} from "../../../pages/bill-payment/web/rib/bill/component/e-donation-modal.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    MaterialDatepicker,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    TypeaheadModule.forRoot(),
    InfiniteScrollModule,
	  ResponsiveModule,
	  NgbDropdownModule.forRoot(),
    QRCodeModule,
    SelectModule,
    MomentModule
  ],
  declarations: [
    PIBWebComponent,
    PIBMenuRoot,
    PIBFooter,
    StepWizardComponent,
    LoginComponent,
    PIBFundTransfer,
    PIBFundTransferStep1,
    PIBFundTransferStep2,
    PIBFundTransferStep3,
    InputDetails,
    TermDepositInputDetails,
    Confirm,
    TermDepositConfirm,
    Complete,
    TermDepositComplete,
    BreadcrumbComponent,
    UserProfileComponent,
    PromptPayRegisterComponent,
    PromptPayRegisterConfirmComponent,
    PromptPayRegisterSuccessComponent,
    TermsAndConditionsComponent,
    AcceptTermsAndConditionComponent,
    MessageModalComponent,
    VerifyRefCodeComponent,
    VerifyOtpComponent,
    CardType,
    ControlMessagesComponent,
    TreeView,
    PIBWebTermAndCondition,
    TermAndConAfterLogin,
    TermsAndConditionsModalComponent,
      EDonationModalComponent,
    AlertMessageComponent,
    FromAccountList,
    ToAccountList,
    PIBWebPromptPayRegisterComponent,
    PIBWebPromptPayRegisterConfirmComponent,
    PIBWebPromptPayRegisterSuccessComponent,
    CurrencyFormatterDirective,
    CurrencyFormatterPipe,
    DateFormatterPipe,
    SubstringPipe,
    StrFormatPipe,
    MinValidator,
    RangeLengthValidator,
    MyAccountTypePipe,
    OtherAccountAddComponent,
    OtherAccountAddConfirmComponent,
    MyAccountListComponent,
    MyAccountDetailComponent,
    OtherAccountListPageComponent,
    OtherAccountAccordianComponent,
    MyAccountAddComponent,
    MyAccountAddConfirmComponent,
    MyAccountEditComponent,
    MyAccountEditConfirmComponent,
    MyAccountDetailPageComponent,
    MyAccountListPageComponent,
    PortletsMenuComponent,
    PaginationComponent,
    MyAccountStatementPageComponent,
    MyAccountStatementComponent,
    ClickOutsideDirective,
    OtherAccountDetailPageComponent,
    OnlyNumberDirective,
    onlyENUpperDirective,
    TimelineComponent,
    TimelineModalComponent,
    TransactionHistoryPageComponent,
    SchedulePageComponent,
    modalDeleteSchComponent,
    ModalEditScheduleComponent,
    TransactionCodeInfoModalComponent,
    deleteOtherAccModalComponent,
    SanitizeHtmlPipe,
    FormValidatorDirective,
    OtherAccountEditComponent,
    OtherAccountEditConfirmComponent,
    OrderByPipe,
    PIBWebKKProductAndServicePage,
    KKProductAndServiceDetail,
    MessageModalDeleteMyAccountComponent,
    DisclaimerWeb,
    MultipleTranslationPipe,
    LandingPagePIB,

    modalDeleteSchResultComponent,
    modalDeleteSchAllComponent,

    //// Request to pay module ////////
    BillerRequestToPayListPage,
    BillerAccordianRequestToPay,
    BillerRequestToPayDetail,
    BillerRequestToPayAdd,
    BillerRequestToPayAddConfirm,
    BillerRequestToPayEdit,
    BillerRequestToPayEditConfirm,
    MessageModalDeleteBillerRequestToPay,
    PIBBillPaymentStep1,
    PIBBillPaymentStep2,
    PIBBillPaymentStep3,
    PIBBillPayment,
    BillPaymentInputDetails,
    ToBillerList,
    BillPaymentConfirm,
    BillPaymentComplete,
    RTPTimelineModalComponent,
    RequestToPayListPageComponent,
    RequestToPayTimelineComponent,
    PIBRequestToPayListPageComponent,
    AddRequestToPayStep1,
    RTPFromAccountList,
    RTPToAccountList,
    AddRequestToPayStep2,
    AddRequestToPayStep3,
    PIBWebQRGeneratorComponent,
    PIBWebQRGeneratorCompleteComponent,
    BillerImageComponent,
    ManageBillerAddPIB,
    CapitalizePipe,
    ManageBillerAddPIB,
    ModalDeleteRTPIncomingComponent,
    PIBRequestToPayBlockListComponent,
	  PromptPayAccountListComponent,
    PromptPayAccountDetailComponent,
    PromptPayAccountTimelineComponent,
    ModalRTPBlockListComponent,
    AddNewBiller,
    PIBWebPromptPayEditComponent,
    PIBWebPromptPayEditConfirmComponent,
    PIBWebPromptPayEditCompleteComponent
  ],

  entryComponents: [
    PIBWebComponent,
    PIBMenuRoot,
    PIBFooter,
    StepWizardComponent,
    LoginComponent,
    PIBFundTransfer,
    PIBFundTransferStep1,
    PIBFundTransferStep2,
    PIBFundTransferStep3,
    InputDetails,
    TermDepositInputDetails,
    Confirm,
    TermDepositConfirm,
    Complete,
    TermDepositComplete,
    BreadcrumbComponent,
    UserProfileComponent,
    PromptPayRegisterComponent,
    PromptPayRegisterConfirmComponent,
    PromptPayRegisterSuccessComponent,
    TermsAndConditionsComponent,
    AcceptTermsAndConditionComponent,
    MessageModalComponent,
    VerifyRefCodeComponent,
    VerifyOtpComponent,
    CardType,
    ControlMessagesComponent,
    PIBWebTermAndCondition,
    TermsAndConditionsModalComponent,
      EDonationModalComponent,
    AlertMessageComponent,
    FromAccountList,
    ToAccountList,
    PIBWebPromptPayRegisterComponent,
    PIBWebPromptPayRegisterConfirmComponent,
    PIBWebPromptPayRegisterSuccessComponent,
    OtherAccountAddComponent,
    OtherAccountAddConfirmComponent,
    MyAccountListComponent,
    MyAccountDetailComponent,
    OtherAccountListPageComponent,
    OtherAccountAccordianComponent,
    MyAccountAddComponent,
    MyAccountAddConfirmComponent,
    MyAccountEditComponent,
    MyAccountEditConfirmComponent,
    MyAccountDetailPageComponent,
    MyAccountListPageComponent,
    PortletsMenuComponent,
    PaginationComponent,
    MyAccountStatementPageComponent,
    MyAccountStatementComponent,
    OtherAccountDetailPageComponent,
    TimelineComponent,
    TimelineModalComponent,
    TransactionHistoryPageComponent,
    SchedulePageComponent,
    modalDeleteSchComponent,
    ModalEditScheduleComponent,
    TransactionCodeInfoModalComponent,
    deleteOtherAccModalComponent,
    OtherAccountEditComponent,
    OtherAccountEditConfirmComponent,
    PIBWebKKProductAndServicePage,
    KKProductAndServiceDetail,
    MessageModalDeleteMyAccountComponent,
    DisclaimerWeb,
    LandingPagePIB,
    modalDeleteSchResultComponent,
    modalDeleteSchAllComponent,

    //// Request to pay module ////////
    BillerRequestToPayListPage,
    BillerAccordianRequestToPay,
    BillerRequestToPayDetail,
    BillerRequestToPayAdd,
    BillerRequestToPayAddConfirm,
    BillerRequestToPayEdit,
    BillerRequestToPayEditConfirm,
    MessageModalDeleteBillerRequestToPay,
    PIBBillPaymentStep1,
    PIBBillPaymentStep2,
    PIBBillPaymentStep3,
    PIBBillPayment,
    BillPaymentInputDetails,
    ToBillerList,
    BillPaymentConfirm,
    BillPaymentComplete,
    RTPTimelineModalComponent,
    RequestToPayListPageComponent,
    RequestToPayTimelineComponent,
    AddRequestToPayStep1,
    RTPFromAccountList,
    RTPToAccountList,
    AddRequestToPayStep2,
    AddRequestToPayStep3,
    PIBWebQRGeneratorComponent,
    PIBWebQRGeneratorCompleteComponent,
    PIBRequestToPayBlockListComponent,
    PromptPayAccountListComponent,
    PromptPayAccountDetailComponent,
    PromptPayAccountTimelineComponent,
    ModalRTPBlockListComponent,
    AddNewBiller,
    PIBWebPromptPayEditComponent,
    PIBWebPromptPayEditConfirmComponent,
    PIBWebPromptPayEditCompleteComponent,
    ModalDeleteRTPIncomingComponent
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    CanvasService,
    FundTransferService,
    MasterDataService,
    MfpApi,
    Dateservice,
    PermissionService,
    IsLoginService,
    PermissionMainMenu,
    PermissionAction,
    AccountService,
    Constants,
    UtilService,
    PermissionChangeRoute,
    OtpService,
    PromptPayRegisterServiceMain,
    AuthGuard,
    HalfAuthGuard,
    DropdownDataService,
    TermAndConditionModalService,
    LanguageSettingService,
    PIBWebPromptPayRegisterComponent,
    PIBWebPromptPayRegisterConfirmComponent,
    PIBWebPromptPayRegisterSuccessComponent,
    CurrencyFormatterPipe,
    DateFormatterPipe,
    SubstringPipe,
    StrFormatPipe,
    MinValidator,
    RangeLengthValidator,
    PreloadService,
    MyAccountService,
    OtherAccountService,
    BankCodeDataService,
    OtherAccountDetailPageComponent,
    ReportService,
    BillPaymentService,
    SanitizeHtmlPipe,
    OrderByPipe,
    DisclaimerService,
    MultipleTranslationPipe,
    GetinformationService,
	  BillPaymentRequestToPayService,
    RequestToPayService,
    NotificationService,
    qrGeneratorService,

  { provide: LOCALE_ID, useValue: 'th-TH' }
  ]
})

export class PIBWebModule implements ErrorHandler {

  constructor(private mfpApi: MfpApi, private constants: Constants, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    // Call mdf first step

    this.mfpApi.connect(this.constants.MFP_CONTEXT_ROOT, this.constants.PIB_WEB_APP_ID, "PIB", "PIBWeb").then((value: any) => {   
      appRef.bootstrap(PIBWebComponent);
    }, function (error) {
      
    });
  }

  handleError(error) {
    // Do something with the exception
    
  }
}
