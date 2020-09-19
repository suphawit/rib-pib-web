import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';
import { NgbDropdownModule } from '../../directives/ngb-dropdown/dropdown.module';

import { TimelineModalComponent } from './timeline-modal.component';
import { TimelineComponent } from './timeline.component';
import { DirectivesModule } from "../../directives/directives.module";
import { ResponsiveModule } from "ng2-responsive";

@NgModule({
  imports: [
      CommonModule, 
      TranslateModule, 
      ModalModule, 
      NgbDropdownModule,
      DirectivesModule,
      ResponsiveModule
    ],
  declarations: [
      TimelineComponent,
      TimelineModalComponent
  ],
  exports: [
      TimelineComponent,
      TimelineModalComponent
  ],
  providers: [
  ]
})
export class TimelineModule { }