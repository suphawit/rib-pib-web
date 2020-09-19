import { Component} from '@angular/core';

@Component({
    selector: 'pib-web-term-and-condition',
    template: ' <terms-and-conditions [termAction]= "termAction"></terms-and-conditions>'
})

export class PIBWebTermAndCondition {
     language : string = 'EN';
     termAction : string = ' pib_term_and_con';
}