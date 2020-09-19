import { NgModule, ApplicationRef, LOCALE_ID, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule } from "ng2-translate/ng2-translate";
import { TranslateLoader, TranslateStaticLoader } from "ng2-translate/src/translate.service";
import { ResponsiveModule } from 'ng2-responsive';

import { PIBWebComponent } from './pib-web.component'
import { PIBFooter } from '../../../pages/main-layout/web/pib/footer';
import { routing } from './pib-web.routes';

/*** Share Component */
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MfpApi } from '../../../share/mfp/mfp-api.service';
import { Constants } from '../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { ModalModule } from 'ng2-bootstrap/modal';
import { AccordionModule } from 'ng2-bootstrap/accordion';
import { LanguageSettingService } from '../../../pages/main-layout/web/language-setting.service';
import { BsDropdownModule } from 'ng2-bootstrap/dropdown';
import { BillPaymentService } from '../../../pages/bill-payment/bill-payment.service';
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker'
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

/** Share Module */
import { NgbDropdownModule } from '../../../share/directives/ngb-dropdown/dropdown.module';
import { ServicePIBWebModule } from "../../../share/service/servicePIBWeb.module";
import { AlertMessageModule } from "../../../share/component/alert-message/alert-message.module";
import { BreadcrumbModule } from "../../../share/component/breadcrumb/breadcrumb.module";
import { CardTypeModule } from "../../../share/component/card-type/card-type.module";
import { PipesModule } from "../../../share/pipe/pipe.module";
import { FromAccountListModule } from "../../../share/component/from-account-list/web/from-account-list.module";
import { DirectivesModule } from "../../../share/directives/directives.module";
import { PaginationModule } from "../../../share/component/pagination/pagination.module";
import { TermAndConditionsModule } from "../../../share/component/terms-and-conditions/term-and-conditions.module";
import { VerifyOTPModule } from "../../../share/component/verify-otp/verify-otp.module";
import { PortietsMenuModule } from "../../../share/component/portlets-menu/portlets-menu.module";
import { StepProcessModule } from "../../../share/component/step-process/web/step-process.module";
import { StepWizardModule } from "../../../share/component/step-wizard/step-wizard.module";
import { TimelineModule } from "../../../share/component/timeline/timeline.module";
import { UserProfileModule } from '../../../share/component/user-profile/user-profile.module';
import { ToAccountListModule } from '../../../share/component/to-account-list/web/to-account-list.module';

/** Page Module */
import { FundTransferModule } from "../../../pages/fund-transfer/web/pib/fund-transfer.module";
import { TransactionHistoryModule } from '../../../pages/transaction-history/web/pib/transaction-history.module';
import { TermAndConditionPageModule } from '../../../pages/term-and-condition/web/pib/term-and-condition-page.module';
import { ScheduleModule } from '../../../pages/schedule/web/pib/schedule.module';
import { PromptPayModule } from '../../../pages/prompt-pay/web/pib/prompt-pay.module';
import { DisclaimerModule } from "../../../pages/disclaimer/web/pib/disclaimer.module";
import { KKProductAndServiceModule } from "../../../pages/kk-product-and-service/web/pib/kk-product-and-service.module";
import { LandingPageModule } from "../../../pages/landing-page/web/pib/landing-page.module";
import { LoginModule } from "../../../pages/login/pib/web/login.module";
import { OtherAccountListModule } from '../../../pages/other-account/web/pib/other-account-list.module';
import { OtherAccountDetailModule } from '../../../pages/other-account/web/pib/other-account-detail.module';
import { OtherAccountAddModule } from '../../../pages/other-account/web/pib/other-account-add.module';
import { OtherAccountEditModule } from '../../../pages/other-account/web/pib/other-account-edit.module';
import { MyAccountListModule } from '../../../pages/my-account/web/pib/my-account-list.module';
import { MyAccountDetailModule } from '../../../pages/my-account/web/pib/my-account-detail.module';
import { MyAccountAddModule } from '../../../pages/my-account/web/pib/my-account-add.module';
import { MyAccountEditModule } from '../../../pages/my-account/web/pib/my-account-edit.module';
import { MyAccountStatementModule } from '../../../pages/my-account/web/pib/my-account-statement.module';
import { VerifyRefCodeModule } from '../../../share/component/verify-ref-code/verify-ref-code.module';
import { MainMenuModule } from "../../../pages/main-layout/web/pib/main-menu.module";
import { ModalMessagesModule } from '../../../share/component/modal-messages.module';
declare var BUILD_NUM;
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
      useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json?v='+BUILD_NUM),
      deps: [Http]
    }),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    ResponsiveModule,
    NgbDropdownModule.forRoot(),
    ServicePIBWebModule.forRoot(),
    AlertMessageModule,
    BreadcrumbModule,
    CardTypeModule,
    PipesModule.forRoot(),
    FromAccountListModule,
    DirectivesModule,
    PaginationModule,
    TermAndConditionsModule.forRoot(),
    VerifyOTPModule.forRoot(),
    PortietsMenuModule,
    StepProcessModule,
    StepWizardModule,
    TimelineModule,
    UserProfileModule,
    ToAccountListModule,
    TransactionHistoryModule,
    TermAndConditionPageModule,
    ScheduleModule,
    PromptPayModule.forRoot(),
    FundTransferModule,
    DisclaimerModule,
    KKProductAndServiceModule,
    LandingPageModule,
    LoginModule,
    OtherAccountListModule.forRoot(),
    OtherAccountDetailModule,
    OtherAccountAddModule,
    OtherAccountEditModule,
    MyAccountListModule.forRoot(),
    MyAccountDetailModule,
    MyAccountAddModule,
    MyAccountEditModule,
    MyAccountStatementModule,
    MainMenuModule,
    VerifyRefCodeModule,
    ModalMessagesModule
  ],
  declarations: [
    PIBWebComponent,
    PIBFooter
  ],

  entryComponents: [
    PIBWebComponent,
    PIBFooter

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    MfpApi,
    LanguageSettingService,
    BillPaymentService,
  { provide: LOCALE_ID, useValue: 'th-TH' }
  ]
})

export class PIBWebModule implements ErrorHandler {

  constructor(private mfpApi: MfpApi, private constants: Constants, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    // Call mdf first step
    this.mfpApi.connect(this.constants.MFP_CONTEXT_ROOT, this.constants.RIB_WEB_APP_ID, "PIB", "PIBWeb").then((value: any) => {
      
      appRef.bootstrap(PIBWebComponent);
    }, function (error) {
      
    });
  }

  handleError(error) {
    // Do something with the exception
    
  }
}
