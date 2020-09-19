import { NgControl } from "@angular/forms";
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

/**
 * Reference: http://stackoverflow.com/questions/41465542/angular2-input-field-to-accept-only-numbers
 */
@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {
  regexStr = /[0-9\ ]/;

  constructor(private el: ElementRef) { }

  @Input() onlyNumber: boolean;
  @Input('limit') limit: number;

  ngOnChanges(changed: any) {
    if (changed.limit && changed.limit.currentValue) {
      let elm = this.el.nativeElement;
      if (elm.tagName !== 'INPUT') {
        elm = elm.getElementsByTagName("input")[0];
      }
      if (elm) {
        elm.setAttribute("maxlength", changed.limit.currentValue.toString());
      }

    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    //alert(JSON.stringify(e));
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      // let it happen, don't do anything
      return;
    }

    if (this.onlyNumber) {
      let ch = String.fromCharCode(e.keyCode);
      
      if(ch == undefined){
        e.preventDefault();
      }else{
        ch = ch.trim();
        let regEx = new RegExp(this.regexStr);

        if (regEx.test(ch) && ch !== '')
          return;
        else
          e.preventDefault();
      }
    }
  }
}


@Directive({
  selector: '[onlyENUpper]'
})
export class onlyENUpperDirective {
  regexStr = /^[A-Za-z\- s]+$/m;

  @HostListener('keydown', ['$event']) onKeyDown(event) {

    let e = <KeyboardEvent>event;

    let regEx = new RegExp(this.regexStr);
    if (regEx.test(e.key)) {
      return e.key.toUpperCase();

    } else
      e.preventDefault();
  }

  constructor(private control: NgControl) { }
  transformedTxt;
  init = true;
  adjustTextFocus(bindModel) {

    if (this.init) {
      this.init = false;
      if (bindModel === undefined || bindModel === '' || bindModel === null) {
        return false;
      }
      this.transformedTxt = bindModel.value;


    } else {
      this.transformedTxt = bindModel.value;
    }
    this.transformedTxt = this.transformedTxt.toUpperCase();
    this.transformedTxt = this.transformedTxt.replace(/([^\sA-Z\-])|(^\-)+/g, "");
    this.transformedTxt = this.transformedTxt.replace("\- ", "-");
    this.transformedTxt = this.transformedTxt.replace(" \-", "-");
    this.transformedTxt = this.transformedTxt.replace(/\s\-+/g, '');
    this.transformedTxt = this.transformedTxt.replace(/\-\s+/g, '');
    this.transformedTxt = this.transformedTxt.replace(/^-+|-+$|(-)+/g, '$1');
    this.transformedTxt = this.transformedTxt.replace(/\s+/g, ' ');
    this.transformedTxt = this.transformedTxt.replace(/^\s+|\s+$/g, '');
    this.control.control.patchValue(this.transformedTxt);
  }
  @HostListener('focus', ['$event.target']) onFocus(target) {
    
    this.adjustTextFocus(target);
  }
  @HostListener('blur', ['$event.target']) onblur(target) {
    
    this.adjustTextFocus(target);
  }
}

@Directive({
  selector: '[infinite-scroll]',
  host: { '(scroll)': 'track($event)' },
})
export class InfiniteScrollerDirective {
  @Output() scrolled = new EventEmitter();

  track(event: Event) {
    this.scrolled.emit({
      value: event
    });
  }
}


@Directive({
  selector: '[maxLengthLimit]'
})
export class maxLengthLimitDirective {

  constructor(private el: ElementRef) { }

  @Input() maxLengthLimit: Number;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    let elm = this.el.nativeElement.getElementsByTagName("input")[0];
    let value = elm.value || '';

    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      // let it happen, don't do anything
      return;
    } else {
      
      if (value.length >= this.maxLengthLimit) {
        e.preventDefault();
      } else {
        return;
      }
    }
  }
}

@Directive({
  selector: '[allowCurrency]'
})
export class AllowCurrencyDirective {

  constructor(private el: ElementRef) { }

  @Input() allowCurrency: Number;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    let el = this.el.nativeElement.getElementsByTagName("input")[0];
    let current = el.value || '';

    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      (e.keyCode >= 96 && e.keyCode <= 105)) {
      // let it happen, don't do anything
      return;
    }

    let pattern = /^(\d*)\.{0,1}(\d*)$/g;
    let regEx = new RegExp(pattern);
    let ch = e.keyCode == 190 ? '.' : String.fromCharCode(e.keyCode);
    let next = current.concat(ch);

    if (e.key !== '' && regEx.test(next)) {
      return;
    }

    e.preventDefault();
  }
}
