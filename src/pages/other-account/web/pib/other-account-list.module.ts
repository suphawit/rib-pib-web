import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';

import { OtherAccountService } from '../../other-account.service';
import { OtherAccountListPageComponent } from './other-account-list-page.component';
import { OtherAccountAccordianComponent } from '../../other-account-accordian.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule
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
export class OtherAccountListModule {
    static forRoot(): ModuleWithProviders { return {ngModule: OtherAccountListModule, providers: [OtherAccountService]}; }
}