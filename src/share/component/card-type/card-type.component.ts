import { Component, Output, EventEmitter, OnInit, Input, OnChanges } from '@angular/core';
import { DropdownDataService } from '../../../share/service/dropdown.service';
import { UtilService } from '../../../share/service/util.service';
@Component({
  selector: 'card-type',
  templateUrl: './card-type.html'
})

export class CardType implements OnInit, OnChanges {

    @Input('selectCardType') selectCardType: number;
    @Output('onChangeCardType') valueCardType = new EventEmitter();

	private labelCardTypes: any;

    public selectCardTypeValue: string = null;

    constructor(private dropdownDataService: DropdownDataService, private utilService: UtilService) {
    }
    
    ngOnChanges(changed: any){
        if(changed.selectCardType && changed.selectCardType.currentValue !== undefined){
            let cardType = this.labelCardTypes[this.selectCardType];
            cardType.selected = true;
            this.selectCardTypeValue = cardType.value;
            this.onCardTypeChange(this.selectCardTypeValue);
        }
    }

    ngOnInit() {
        this.labelCardTypes = this.utilService.cloneObject(this.dropdownDataService.cardType);
        let num:number = 0;
        if(typeof this.selectCardType !== 'undefined'){
            num = this.selectCardType;
        }
        let cardType = this.labelCardTypes[num];
        cardType.selected = true;
        this.selectCardTypeValue = cardType.value;
        this.onCardTypeChange(this.selectCardTypeValue);
    }

    onCardTypeChange(newValue) {

        this.selectCardTypeValue = newValue;
        this.valueCardType.emit(this.selectCardTypeValue);
    }
}
