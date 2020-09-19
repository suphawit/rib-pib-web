import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionModule } from 'ng2-bootstrap/accordion';
import { DirectivesModule } from '../../../directives/directives.module';
import { PipesModule } from '../../../pipe/pipe.module';

import { ToAccountList } from './to-account-list.component';

@NgModule({
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TranslateModule, 
      DirectivesModule,
      AccordionModule,
      PipesModule
    ],
  declarations: [
      ToAccountList
  ],
  exports: [
      ToAccountList
  ]
})
export class ToAccountListModule { }