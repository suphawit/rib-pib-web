import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { ServicesService } from '../../services.service';
import { RIBWebServices } from './services';
import { ServiceRoute } from './service.route';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule,
    ServiceRoute
  ],
  declarations: [
      RIBWebServices
  ],
  exports: [
      RIBWebServices
  ],
  providers: [
      ServicesService
  ]
})
export class ServiceModule {}