import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { PIBWebModule } from './pib-web.module';


declare var ENV;


    if(ENV === "production"){
       enableProdMode();
    }

platformBrowserDynamic().bootstrapModule(PIBWebModule);
