import { Directive, ElementRef, OnInit, DoCheck, Input, KeyValueDiffers, OnChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../service/validation.service';
import { TranslateService, LangChangeEvent } from "ng2-translate/src/translate.service";
import { Subscription } from "rxjs";

@Directive({
  selector: '[formControlValidator]',
  providers: [ValidationService]
})
export class FormValidatorDirective implements OnInit, OnDestroy, DoCheck, OnChanges {
    constructor(private _elementRef: ElementRef, private differs: KeyValueDiffers, private translateService: TranslateService) {
    }

    @Input('control') control: FormControl;
    @Input('submitted') isSubmitted: boolean;
    @Input('option') messageOption:any;
    differ: any;
    nativeElement: any;
    private langSubscription: Subscription;

    ngOnChanges(changed: any){
        if(changed && changed.isSubmitted && changed.isSubmitted.currentValue){
            this.validation();
        }
    }

    ngDoCheck(){
        let changes = this.differ.diff(this.control);
		if(changes) {
            this.validation();
        }
    }

    ngOnInit(){
        this.nativeElement = this._elementRef.nativeElement;
        this.differ = this.differs.find(this.control).create(null);

        this.langSubscription = this.translateService.onLangChange
        .subscribe((event: LangChangeEvent) => {
            this.validation();
        });
        //
    }
    ngOnDestroy(){
        this.langSubscription.unsubscribe();
    }
  

    validation(){
        //
        if(this.control.errors && (this.control.dirty || this.control.touched || this.isSubmitted)){
            this.addClass('has-error');
            this.addErrorMessage();
        } else {
            this.removeClass('has-error');
            this.removeErrorMessage();
        }
    }

    addClass(className){
        if(this.nativeElement){
            this.nativeElement.classList ? this.nativeElement.classList.add(className) : this.nativeElement.className += ' ' + className;
        }
    }

    removeClass(className){
        if(this.nativeElement){
            this.nativeElement.classList ? this.nativeElement.classList.remove(className) : this.nativeElement.className += this.nativeElement.className.replace(new RegExp('(?:^|\\s)'+ className + '(?:\\s|$)'), ' ');
        }
    }

    addErrorMessage(){
        if(this.nativeElement){
            let divErrorBlock = this.nativeElement.querySelector('.help-block.with-errors');
            if(divErrorBlock){
                divErrorBlock.innerText = this.errorMessage;
                divErrorBlock.style.display = 'block';
            }
        }
    }
    removeErrorMessage(){
        if(this.nativeElement){
            let divErrorBlock = this.nativeElement.querySelector('.help-block.with-errors');
            if(divErrorBlock){
                divErrorBlock.innerText = "";
                divErrorBlock.style.display = 'none';
            }
        }
    }

    resetValidator(){
        this.removeClass('has-error');
        this.removeErrorMessage();
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return this.translateService.instant(ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]),this.messageOption || {});
            } 
        }
        
        return null;
    }
}
