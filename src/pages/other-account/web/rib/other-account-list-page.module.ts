import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';

import { OtherAccountService } from '../../other-account.service';
import { OtherAccountListPageComponent } from './other-account-list-page.component';
import { OtherAccountAccordianComponent } from '../../other-account-accordian.component';
import { OtherAccountListPageRoute } from './other-account-list-page.route'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    OtherAccountListPageRoute
  ],
  declarations: [
      OtherAccountListPageComponent,
      OtherAccountAccordianComponent
  ],
  exports: [
      OtherAccountListPageComponent,
      OtherAccountAccordianComponent
  ]
})
export class OtherAccountListPageModule {
    static forRoot(): ModuleWithProviders { return {ngModule: OtherAccountListPageModule, providers: [OtherAccountService]}; }
}