import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';

import { MyAccountDetailComponent } from '../../my-account-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
      MyAccountDetailComponent
  ],
  exports: [
      MyAccountDetailComponent
  ]
})
export class MyAccountDetailModule {}