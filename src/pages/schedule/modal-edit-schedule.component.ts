import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bs-modal-message-edit',
    template: `
                <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
                    <div class="modal-dialog modal-{{optionalSize}}">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title pull-left">{{title | translate}}</h4>
                                <button type="button" class="close pull-right" aria-label="Close" (click)="close()">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    {{body}}
                                    <br /><br />
                                </div>
                                <button type="button" class="btn btn-outline kkppurple" [ngClass]="{'active' : recurringType == constants.RECURRING_THIS_TIME}" (click)="selectedValue(constants.RECURRING_THIS_TIME)">
                                    {{ 'lbl.thisTime' | translate }}
                                </button>
                                <button type="button" class="btn btn-outline kkppurple" [ngClass]="{'active' : recurringType == constants.RECURRING_ALL_SCHEDULE}" (click)="selectedValue(constants.RECURRING_ALL_SCHEDULE)">
                                    {{ 'lbl.allSchedule' | translate }}
                                </button>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" (click)="close()">{{ 'btn.cancel' | translate }}</button>
                                <button type="button" class="btn kkppurple" (click)="confirm()">{{ 'btn.edit' | translate }}</button>
                            </div>
                        </div>
                    </div>
                </div>
              `
})

export class ModalEditScheduleComponent {
    public recurringType: any;

    @Input('body') body: string;
    @Input('title') title: string;
    @Input('config') config: any;
    @Input('size') optionalSize: string;

    @Output('onEmit') onEmit = new EventEmitter();
    @Output('onHidden') onHidden = new EventEmitter();

    @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;

    constructor(public constants: Constants,
        public utilService: UtilService) {
        this.recurringType = this.constants.RECURRING_THIS_TIME;
    }

    public show(): void {
        this.bsModalMessage.show();
        this.utilService.scrollToTop();
    }

    public close(): void {
        this.bsModalMessage.hide();
        this.recurringType = this.constants.RECURRING_THIS_TIME;
    }

    public hidden(): void {
        this.onHidden.emit();
        this.recurringType = this.constants.RECURRING_THIS_TIME;
    }

    public selectedValue(param): void {
        this.recurringType = param;
    }

    public confirm() {
        this.onEmit.emit({ action: 'edit', recurringType: this.recurringType });
    }
}