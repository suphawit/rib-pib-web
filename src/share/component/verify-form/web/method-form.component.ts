import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'verify-method-form',
    templateUrl: 'method-form.html'
})
export class VerifyMethodFormComponent implements OnInit {
    @Input('selected') selectOption: string;
    @Output('onChange') onChangeOption = new EventEmitter();

    selected: string = 'usingrefcode';

    ngOnInit(){
        this.selected = this.selectOption || this.getDefaultOption();
    }

    onChange(changed: any) {
        this.onChangeOption.emit(changed);
    }

    private getDefaultOption() {
        return 'usingrefcode';
    }

    onClick(){
        this.onChangeOption.emit('next');
    }
}