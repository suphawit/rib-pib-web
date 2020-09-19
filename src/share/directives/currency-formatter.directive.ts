import { CurrencyFormatterPipe } from "../pipe/currency-formatter.pipe";
import { Directive, HostListener, ElementRef, OnInit, Output, EventEmitter } from "@angular/core";

@Directive({ selector: "[currencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit {

    private el: HTMLInputElement;

    @Output() ngModelChange = new EventEmitter();

    constructor(
        private elementRef: ElementRef,
        private currencyPipe: CurrencyFormatterPipe,
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.el.value = this.currencyPipe.transform(this.el.value);
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        this.el.value = this.currencyPipe.parse(value); // opposite of transform
        this.ngModelChange.emit(this.el.value);
    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.el.value = this.currencyPipe.transform(value);
        this.ngModelChange.emit(this.el.value);
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        let e = <KeyboardEvent>event;
        let current = this.el.value || '';

        // block shift
        if(e.shiftKey){
            e.preventDefault();
        }

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
