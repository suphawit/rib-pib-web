import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { RIBWebModule } from './rib-web.module';

declare var ENV;


    if(ENV === "production"){
       enableProdMode();
    }

platformBrowserDynamic().bootstrapModule(RIBWebModule);
