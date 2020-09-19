import './polyfills.browser.ts';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { ConfigMock, NavMock, PlatformMock } from './mocks';





/*
*/

import { NgModule, ApplicationRef, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routing } from './rib-web.routes';

import { RIBWebComponent } from './rib-web.component'
import { RIBMenuRoot } from './pages/main-layout/web/rib/main-menu';
import { HomeComponent } from './pages/home/web/rib/home.component';
import { RIBWebHeader } from './pages/main-layout/web/rib/header';
import { RIBFooter } from './pages/main-layout/web/rib/footer';
import { AccountActivateComponent } from './pages/activate-customer/web/rib/account-activate.component';
import { AccountActivateVerifyRefCodeComponent } from './pages/activate-customer/web/rib/account-activate-verify-ref-code.component';
import { AccountActivateVerifyOtpComponent } from './pages/activate-customer/web/rib/account-activate-verify-otp.component';
import { AccountActivateCreateUserAccountComponent } from './pages/activate-customer/web/rib/account-activate-create-user-account.component';
import { AccountActivateAcceptTermsAndConditionsComponent } from './pages/activate-customer/web/rib/account-activate-accept-terms-and-conditions.component';
import { VerifyRefCodeComponent } from './share/component/verify-ref-code/verify-ref-code.component'
import { VerifyOtpComponent } from './share/component/verify-otp/verify-otp.component';
import { OtpService } from './share/component/verify-otp/otp.service';
import { LoginComponent } from './pages/login/rib/web/login';
import { RIBWebContactUs } from './pages/contact-us/web/rib/contact-us'
import { RIBWebPromptPayRegisterComponent } from './pages/prompt-pay/web/rib/rib-web-prompt-pay-register.component';
import { RIBWebPromptPayRegisterConfirmComponent } from './pages/prompt-pay/web/rib/rib-web-prompt-pay-register-confirm.component';
import { RIBWebPromptPayRegisterSuccessComponent } from './pages/prompt-pay/web/rib/rib-web-prompt-pay-register-success.component';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker'

/*** Share Component */
import { StepWizardComponent } from './share/component/step-wizard/step-wizard.component';
import { CardType } from './share/component/card-type/card-type.component';
import { MfpApi } from './share/mfp/mfp-api.service';
import { Dateservice } from './share/service/date.service';
import { Constants } from './share/service/constants';
import { UtilService } from './share/service/util.service';
import { TreeView } from './pages/main-layout/web/rib/menu-tree-view.component';
import { PreloadService } from './share/service/preload.service';
import { AuthGuard } from './share/service/AuthGuard';
import { PermissionService, PermissionMainMenu, PermissionAction, PermissionChangeRoute } from './share/service/permission.service';
import { IsLoginService } from './share/service/islogin.service';
import { ValidationService } from './share/service/validation.service';
import { ControlMessagesComponent } from './share/component/control-messages.component';
import { RequestReferenceFormComponent } from './share/component/request-reference-form/request-reference-form.component';
import { ForgotResetPasswordComponent } from './pages/forgot-reset-password/web/rib/forgot-reset-password.component';
import { ForgotResetPasswordRequestRefCodeComponent } from './pages/forgot-reset-password/web/rib/forgot-reset-password-request-ref-code.component';
import { ForgotResetPasswordVerifyRefCodeComponent } from './pages/forgot-reset-password/web/rib/forgot-reset-password-verify-refcode.component';
import { ForgotResetPasswordVerifyOTPComponent } from './pages/forgot-reset-password/web/rib/forgot-reset-password-verify-otp.component';
import { ForgotResetPasswordResetPasswordComponent } from './pages/forgot-reset-password/web/rib/forgot-reset-password-reset-password.component';
import { RIBWebFAQ } from './pages/faq/web/rib/faq';
import { RIBWebServices } from './pages/services/web/rib/services';
import { ResetPasswordFormComponent } from './share/component/reset-password-form/reset-password-form.component';
import { TermsAndConditionsComponent } from './share/component/terms-and-conditions/terms-and-conditions.component';
import { AcceptTermsAndConditionComponent } from './share/component/terms-and-conditions/accept-terms-and-conditions.component';
import { RIBWebLocateUs } from './pages/locate-us/web/rib/locate-us';
/* Google Map */
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ForgotUsernameComponent } from './pages/forgot-username/web/rib/forgot-username.component';
import { ForgotUsernameResultComponent } from './pages/forgot-username/web/rib/forgot-username-result.component';
import { ForgotUsernameVerifyAccountComponent } from './pages/forgot-username/web/rib/forgot-username-verify-account.component';
import { ForgotUsernameVerifyOTPComponent } from './pages/forgot-username/web/rib/forgot-username-verify-otp.component';
import { ForgotUsernameVerifyRefcodeComponent } from './pages/forgot-username/web/rib/forgot-username-verify-refcode.component';
import { VerifyAccountFormComponent } from './share/component/verify-account-form/verify-account-form.component';
import { DropdownDataService } from './share/service/dropdown.service';
import { NgbDropdownModule } from './share/directives/ngb-dropdown/dropdown.module';

import { ChangeTermDepositBaseComponent } from './pages/term-deposit/web/rib/change-term-deposit-base.component';
import { ChangeTermDepositSwitchTermComponent, filterDuplicate } from './pages/term-deposit/web/rib/change-term-deposit-switch-term.component';
import { ChangeTermDepositSwitchTermConfirmComponent } from './pages/term-deposit/web/rib/change-term-deposit-switch-term-confirm.component';
import { PromptPayRegisterServiceMain } from './pages/prompt-pay/prompt-pay-register.service';
import { MyAccountTypePipe, MyAccountListComponent } from './pages/my-account/my-account-list.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TermDepositAccountService } from './pages/term-deposit/web/rib/term-deposit-account.service';
import { RIBWebTermAndCondition } from './pages/term-and-condition/web/rib/rib-web-term-and-condition.component';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MyAccountStatementPageComponent } from './pages/my-account/web/rib/my-account-statement-page.component';
import { MyAccountStatementComponent } from './pages/my-account/my-account-statement.component';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { LanguageSettingService } from './pages/main-layout/web/language-setting.service';
import { TermsAndConditionsModalComponent } from './share/component/terms-and-conditions/terms-and-conditions-modal.component';
import { ModalModule } from 'ng2-bootstrap/modal';
import { TermAndConditionModalService } from './share/component/terms-and-conditions/terms-and-conditions-modal.service';
import { AlertMessageComponent } from './share/component/alert-message/alert-message.component';
import { MessageModalComponent } from './share/component/modal-messages.component';
import { RIBWebChangePassword } from './pages/change-password/web/rib/change-password';
import { RIBWebChangePasswordNew } from './pages/change-password/web/rib/change-password-new';
import { RIBWebChangePasswordVerifyOTP } from './pages/change-password/web/rib/change-password-verify-otp';
import { PromptPayRegisterComponent } from './pages/prompt-pay/prompt-pay-register.component';
import { PromptPayRegisterConfirmComponent } from './pages/prompt-pay/prompt-pay-register-confirm.component';
import { PromptPayRegisterSuccessComponent } from './pages/prompt-pay/prompt-pay-register-success.component';
import { RIBWebPrivacyPolicy } from './pages/privacy-policy/web/rib/privacy-policy';
import { OtherAccountService } from './pages/other-account/other-account.service';
import { OtherAccountAddEditConfirm } from './pages/other-account/other-account-add-edit-confirm';
import { OtherAccountAddConfirm } from './pages/other-account/web/rib/add/other-account-add-confirm.component';
import { OtherAccountAdd } from './pages/other-account/web/rib/add/other-account-add.component';
import { MyAccountDetailComponent } from './pages/my-account/my-account-detail.component';
import { MyAccountListPageComponent } from './pages/my-account/web/rib/my-account-list-page.component';
import { PortletsMenuComponent } from './share/component/portlets-menu/portlets-menu.component';
import { MyAccountDetailPageComponent } from './pages/my-account/web/rib/my-account-detail-page.component';
import { MyAccountService } from './pages/my-account/my-account.service';
import { OtherAccountEdit } from './pages/other-account/web/rib/edit/other-account-edit.component';
import { OtherAccountListPageComponent } from './pages/other-account/web/rib/other-account-list-page.component';
import { OtherAccountAccordianComponent } from './pages/other-account/other-account-accordian.component';
import { FromAccountList } from './share/component/from-account-list/web/from-account-list.component';
import { ToAccountList } from './share/component/to-account-list/web/to-account-list.component';
import { RIBFundTransfer } from './pages/fund-transfer/web/rib/rib-fund-transfer';
import { RIBFundTransferStep1 } from './pages/fund-transfer/web/rib/rib-fund-transfer-step1';
import { RIBFundTransferStep2 } from './pages/fund-transfer/web/rib/rib-fund-transfer-step2';
import { RIBFundTransferStep3 } from './pages/fund-transfer/web/rib/rib-fund-transfer-step3';
import { BreadcrumbComponent } from './share/component/breadcrumb/breadcrumb.component';
import { UserProfileComponent } from './share/component/user-profile/user-profile.component';
import { InputDetails } from './share/component/step-process/web/input-details.component';
import { TermDepositInputDetails } from './share/component/step-process/web/td-input-details.component';
import { Confirm } from './share/component/step-process/web/confirm.component';
import { TermDepositConfirm } from './share/component/step-process/web/td-confirm.component';
import { Complete } from './share/component/step-process/web/complete.component';
import { TermDepositComplete } from './share/component/step-process/web/td-complete.component';
import { MasterDataService } from './share/service/master-data.service';
import { FundTransferService } from './share/service/fund-transfer.service';
import { AccountService } from './share/service/account.service';
import { CurrencyFormatterDirective } from './share/directives/currency-formatter.directive';
import { CurrencyFormatterPipe } from './share/pipe/currency-formatter.pipe';
import { DateFormatterPipe } from './share/pipe/date-formatter.pipe';
import { SubstringPipe } from './share/pipe/substring.pipe';
import { StrFormatPipe } from './share/pipe/string-format.pipe';
import { MinValidator } from './share/directives/min-validator.directive';
import { RangeLengthValidator } from './share/directives/range-length-validator.directive';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ClickOutsideDirective } from './share/directives/click-outside.directive';
import { BankCodeDataService } from './share/service/bankcode-data.service';
import { MyAccountAddComponent } from './pages/my-account/web/rib/add/my-account-add.component';
import { MyAccountAddConfirmComponent } from './pages/my-account/web/rib/add/my-account-add-confirm.component';
import { MyAccountEditComponent } from './pages/my-account/web/rib/edit/my-account-edit.component';
import { MyAccountEditConfirmComponent } from './pages/my-account/web/rib/edit/my-account-edit-confirm.component';
import { OtherAccountDetailPageComponent } from './pages/other-account/other-account-detail-page-component';
import { PaginationComponent } from './share/component/pagination/pagination.component';
import { ReportService } from './share/service/report.service';
import { OnlyNumberDirective, onlyENUpperDirective } from './share/directives/common.directive';
import { BillerListPageComponent } from './pages/bill-payment/web/rib/biller-list-page.component';
import { BillerAccordianComponent } from './pages/bill-payment/biller-accordian.component';
import { BillerAdd } from './pages/bill-payment/web/rib/add/biller-add';
import { BillerEdit } from './pages/bill-payment/web/rib/edit/biller-edit';
import { BillerAddConfirm } from './pages/bill-payment/web/rib/add/biller-add-confirm';
import { BillerEditConfirm } from './pages/bill-payment/web/rib/edit/biller-edit-confirm';
import { BillerDetailPageComponent } from './pages/bill-payment/biller-detail-page-component';
import { BillPaymentService } from './pages/bill-payment/bill-payment.service';
import { OtherAccountEditConfirm } from './pages/other-account/web/rib/edit/other-account-edit-confirm.component';
import { TimelineComponent } from './share/component/timeline/timeline.component';
import { TimelineModalComponent } from './share/component/timeline/timeline-modal.component';
import { TransactionHistoryPageComponent } from './pages/transaction-history/web/rib/transaction-history-page.component';
import { SchedulePageComponent } from './pages/schedule/web/rib/schedule-page.component';
import { modalDeleteSchComponent } from './pages/schedule/modal-delete-schedule.component';
import { ModalEditScheduleComponent } from './pages/schedule/modal-edit-schedule.component';
import { RIBBillPayment } from './pages/bill-payment/web/rib/bill/rib-bill-payment';
import { RIBBillPaymentStep1 } from './pages/bill-payment/web/rib/bill/rib-bill-payment-step1';
import { RIBBillPaymentStep2 } from './pages/bill-payment/web/rib/bill/rib-bill-payment-step2';
import { RIBBillPaymentStep3 } from './pages/bill-payment/web/rib/bill/rib-bill-payment-step3';
import { BillPaymentInputDetails } from './pages/bill-payment/web/rib/bill/component/bill-payment-input-details.component';
import { BillPaymentConfirm } from './pages/bill-payment/web/rib/bill/component/bill-payment-confirm.component';
import { BillPaymentComplete } from './pages/bill-payment/web/rib/bill/component/bill-payment-complete.component';
import { ToBillerList } from './pages/bill-payment/web/rib/bill/component/to-biller-list.component';
import { MutualFundService } from './share/service/mutual-fund.service';
import { MutualFundSummaryComponent } from './pages/mutual-fund/mutual-fund-summary.component';
import { MutualFundSummaryPageComponent } from './pages/mutual-fund/mutual-fund-summary-page.component';
import { MutualFundDetailComponent } from './pages/mutual-fund/mutual-fund-detail.component';
import { TransactionCodeInfoModalComponent } from './pages/my-account/transaction-code-info-modal.component';
import { deleteOtherAccModalComponent } from './pages/other-account/delete-other-account-modal.component';
import { RIBWebLanguageSettings } from './pages/language-settings/web/rib/language-settings';
import { SanitizeHtmlPipe } from './share/pipe/sanitize-html.pipe';
import { FormValidatorDirective } from './share/directives/form-validator.directive';
import { OrderByPipe } from './share/pipe/order-by.pipe';
import { RIBWebKKProductAndServicePage } from './pages/kk-product-and-service/web/rib/kk-product-and-service.component';
import { KKProductAndServiceDetail } from './pages/kk-product-and-service/kk-product-and-service-detail';
import { MessageModalDeleteMyAccountComponent } from './pages/my-account/modal-messages-delete-my-account.component';
import { MessageModalDeleteBillerComponent } from './pages/bill-payment/modal-messages-delete-biller.component';
import { MultipleTranslationPipe } from './share/pipe/multiple-translation.pipe';
import { RequestReferenceFormService } from './share/component/request-reference-form/request-reference-form.service';
import { ResponsiveModule } from 'ng2-responsive';
import { HtmlOutletDirective } from './share/directives/html-outlet.directive';
import { AccountActivateService } from './pages/activate-customer/web/rib/account-activate.service';
import { modalDeleteSchAllComponent } from './pages/schedule/modal-delete-schedule.component';
import { modalDeleteSchResultComponent } from './pages/schedule/modal-delete-schedule.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { GetinformationService } from './share/service/getInformation.service';
 









/**
 * 
 * 
 */










//import { PermissionService } from './share/service/permission.service';


// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
//testmerge
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): any { /* no op */};

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing'),
  System.import('./share/service/permission.service'),
])
  // First, initialize the Angular testing environment.
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  // Then we find all the tests.
  .then(() => require.context('./', true, /\.spec\.ts/))
  // And load the modules.
  .then(context => context.keys().map(context))
  // Finally, start Karma to run the tests.
  .then(__karma__.start, __karma__.error);

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        {provide: App, useClass: ConfigMock},
        {provide: Config, useClass: ConfigMock},
        Form,
        {provide: Keyboard, useClass: ConfigMock},
        {provide: MenuController, useClass: ConfigMock},
        {provide: NavController, useClass: NavMock},
        {provide: Platform, useClass: PlatformMock},
      TranslateLoader
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
            TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
      deps: [Http]
    }),
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
