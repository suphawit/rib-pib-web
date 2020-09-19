import { NgModule, ApplicationRef, LOCALE_ID, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { routing } from './rib-web-aot.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RIBWebComponent } from './rib-web.component'
import { RIBWebHeader } from '../../../pages/main-layout/web/rib/header';
import { RIBFooter } from '../../../pages/main-layout/web/rib/footer';
import { AccountActivateAcceptTermsAndConditionsComponent } from '../../../pages/activate-customer/web/rib/account-activate-accept-terms-and-conditions.component';
import { ChangeTermDepositBaseComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-base.component';

import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker';

import { TermDepositAccountService } from '../../../pages/term-deposit/web/rib/term-deposit-account.service';
import { PromptPayRegisterServiceMain } from '../../../pages/prompt-pay/prompt-pay-register.service';
import { MyAccountService } from '../../../pages/my-account/my-account.service';
import { OtherAccountService } from '../../../pages/other-account/other-account.service';

/*** Share Component */
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { Constants } from '../../../share/service/constants';
import { ValidationService } from '../../../share/service/validation.service';
/* Google Map */
import { AgmCoreModule } from 'angular2-google-maps/core';
import { NgbDropdownModule } from '../../../share/directives/ngb-dropdown/dropdown.module';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TranslateService } from "ng2-translate/src/translate.service";
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { LanguageSettingService } from '../../../pages/main-layout/web/language-setting.service';
import { ModalModule } from 'ng2-bootstrap/modal';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { ResponsiveModule } from 'ng2-responsive';
import { AccountActivateService } from '../../../pages/activate-customer/web/rib/account-activate.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

/** Share Module */
import { ServiceRIBWebModule } from "../../../share/service/serviceRIBWeb.module";
import { BreadcrumbModule } from "../../../share/component/breadcrumb/breadcrumb.module";
import { PipesModule } from "../../../share/pipe/pipe.module";
import { FromAccountListModule } from "../../../share/component/from-account-list/web/from-account-list.module";
import { DirectivesModule } from "../../../share/directives/directives.module";
import { PaginationModule } from "../../../share/component/pagination/pagination.module";
import { VerifyRefCodeModule } from '../../../share/component/verify-ref-code/verify-ref-code.module';
import { CardTypeModule } from '../../../share/component/card-type/card-type.module';
import { RequestReferenceFormModule } from '../../../share/component/request-reference-form/request-reference-form.module';
import { ResetPasswordFormModule } from '../../../share/component/reset-password-form/reset-password-form.module';
import { VerifyAccountFormModule } from '../../../share/component/verify-account-form/verify-account-form.module';
import { VerifyOTPModule } from '../../../share/component/verify-otp/verify-otp.module';
import { StepWizardModule } from '../../../share/component/step-wizard/step-wizard.module';
import { TimelineModule } from '../../../share/component/timeline/timeline.module';
import { StepProcessModule } from '../../../share/component/step-process/web/step-process.module';
import { TermAndConditionsModule } from '../../../share/component/terms-and-conditions/term-and-conditions.module';
import { AlertMessageModule } from '../../../share/component/alert-message/alert-message.module';
import { PortietsMenuModule } from "../../../share/component/portlets-menu/portlets-menu.module";
import { UserProfileModule } from '../../../share/component/user-profile/user-profile.module'; 
import { ToAccountListModule } from '../../../share/component/to-account-list/web/to-account-list.module';
import { ModalMessagesModule } from "../../../share/component/modal-messages.module";

/** Page Module */
import { AccountActivateModule } from "../../../pages/activate-customer/web/rib/account-activate.module";
import { FundTransferModule } from "../../../pages/fund-transfer/web/rib/fund-transfer.module";
import { ChangePasswordModule } from "../../../pages/change-password/web/rib/change-password.module";
import { ForgotResetPasswordModule } from "../../../pages/forgot-reset-password/web/rib/forgot-reset-password.module";
import { ForgotUsernameModule } from "../../../pages/forgot-username/web/rib/forgot-username.module";
import { HomeModule } from "../../../pages/home/web/rib/home.module";
import { LoginModule } from "../../../pages/login/rib/web/login.module";
import { MainMenuModule } from "../../../pages/main-layout/web/rib/main-menu.module";
import { BillPaymentModule } from "../../../pages/bill-payment/web/rib/bill/bill-payment.module";
import { BillerDetailPageModule } from "../../../pages/bill-payment/biller-detail-page-component.module";
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { MomentModule } from 'angular2-moment';
declare var BUILD_NUM;
@NgModule({
  imports: [
    BrowserModule,
    routing,
    FilterPipeModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json?v='+BUILD_NUM),
      deps: [Http]
    }),
    FormsModule,
    ReactiveFormsModule,
    MaterialDatepicker,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYWd0Ta0OHzztjpu-0GDqlMYKIyUnw2ic&sensor'
    }),
    PipesModule.forRoot(),
    DirectivesModule,
    ServiceRIBWebModule.forRoot(),

    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ResponsiveModule,
    NgbDropdownModule.forRoot(),
    AlertMessageModule,
    BreadcrumbModule,
    CardTypeModule,
    FromAccountListModule,
    PaginationModule,
    RequestReferenceFormModule,
    VerifyRefCodeModule,
    ResetPasswordFormModule,
    VerifyAccountFormModule,
    VerifyOTPModule.forRoot(),
    StepWizardModule,
    TimelineModule,
    StepProcessModule,
    TermAndConditionsModule.forRoot(),
    PortietsMenuModule,
    UserProfileModule,
    ModalMessagesModule,
    AccountActivateModule,
    FundTransferModule,
    ToAccountListModule,
    ChangePasswordModule,
    ForgotResetPasswordModule,
    ForgotUsernameModule,
    HomeModule,
    LoginModule,
    MainMenuModule,
    BillPaymentModule.forRoot(),
    BillerDetailPageModule,
    InfiniteScrollModule,
    MomentModule
    
  ],
  declarations: [
    RIBWebComponent,
    RIBWebHeader,
    RIBFooter,
    AccountActivateAcceptTermsAndConditionsComponent,
    ChangeTermDepositBaseComponent
  ],

  entryComponents: [
    RIBWebComponent,
    RIBWebHeader,
    RIBFooter,
    AccountActivateAcceptTermsAndConditionsComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MfpApi,
    ValidationService,
    LanguageSettingService,
    AccountActivateService,
    TermDepositAccountService,
    PromptPayRegisterServiceMain,
    MyAccountService,
    OtherAccountService,
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