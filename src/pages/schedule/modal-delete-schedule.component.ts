import { ModalDirective } from 'ng2-bootstrap';
import { Constants } from '../../share/service/constants';
import { UtilService } from '../../share/service/util.service';
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-modal-message-delete',
  template: `
    <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
      <div class="modal-dialog modal-{{optionalSize}}">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title pull-left">{{title | translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
         
          <div class="modal-footer">
            <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default" (click)="hide()">{{ 'btn.cancel' | translate }}</button>
            <button *ngIf="config.isShowOKBtn && config.isShowOKBtn === true"type="button" class="btn red " (click)="emitValue('confirm')">{{ 'lbl.confirm' | translate }}</button>
         
          </div>
        </div>
      </div>
    </div>
  `
})
export class modalDeleteSchComponent {

  public recurringType: any;

  @Input('body') body: string;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();
  @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;

  constructor(public constants: Constants,
    public utilService: UtilService) {
    this.recurringType = this.constants.RECURRING_THIS_TIME;
  }

  public show(): void {
    this.bsModalMessage.show();
    this.utilService.scrollToTop();
  }

  public hide(): void {
    this.bsModalMessage.hide();
    this.onEmit.emit(this.constants.RECURRING_THIS_TIME);
  }

  public hidden(): void {
    this.onHidden.emit();
    this.recurringType = this.constants.RECURRING_THIS_TIME;
  }

  public emitValue(param): void {
    this.onEmit.emit(param);
    this.recurringType = param;
  }
}

@Component({
  selector: 'bs-modal-message-delete-all',
  template: `
    <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
      <div class="modal-dialog modal-{{optionalSize}}">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title pull-left">{{title | translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                 <button *ngIf="config.isShowOKBtnThisTime && config.isShowOKBtnThisTime === true" type="button" class="btn btn-outline kkppurple" (click)="emitValue(constants.RECURRING_THIS_TIME)"  [ngClass]="{'active' : recurringType == constants.RECURRING_THIS_TIME}">{{ 'lbl.thisTime' | translate }}</button>
                 <button *ngIf="config.isShowOKBtnAllTime && config.isShowOKBtnAllTime === true" type="button" class="btn btn-outline kkppurple" (click)="emitValue(constants.RECURRING_ALL_SCHEDULE)" [ngClass]="{'active' : recurringType == constants.RECURRING_ALL_SCHEDULE}">{{ 'lbl.allSchedule' | translate }}</button>
          </div>
          <div class="modal-footer">
          <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default" (click)="hide()">{{ 'btn.cancel' | translate }}</button>
            <button *ngIf="config.isShowDeleteBtn && config.isShowDeleteBtn === true" type="button" class="btn red " (click)="emitValue('delete')">{{ 'btn.delete' | translate }}</button>
            <button *ngIf="config.isShowCancelBtn && config.isShowCancelBtn === true" type="button" class="btn btn-default" (click)="hide()">{{ 'btn.cancel' | translate }}</button>
            <button *ngIf="config.isShowOKBtn && config.isShowOKBtn === true"type="button" class="btn red " (click)="emitValue('confirm')">{{ 'lbl.confirm' | translate }}</button>
     
          </div>
        </div>
      </div>
    </div>
  `
})
export class modalDeleteSchAllComponent {
  public recurringType: any;

  @Input('body') body: string;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();
  @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;

  constructor(public constants: Constants, public utilService: UtilService) {
    this.recurringType = this.constants.RECURRING_THIS_TIME;
  }

  public show(): void {
    this.bsModalMessage.show();
    this.utilService.scrollToTop();
  }

  public hide(): void {
    this.bsModalMessage.hide();
    this.onEmit.emit(this.constants.RECURRING_THIS_TIME);
  }

  public hidden(): void {
    this.onHidden.emit();
    this.recurringType = this.constants.RECURRING_THIS_TIME;
  }

  public emitValue(param): void {

    this.onEmit.emit(param);
    this.recurringType = param;
  }
}


@Component({
  selector: 'bs-modal-message-result',
  template: `
    <div bsModal #bsModalMessage="bs-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" [config]="config" (onHidden)="hidden($event)">
      <div class="modal-dialog modal-{{optionalSize}}">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title pull-left">{{title | translate}}</h4>
            <button type="button" class="close pull-right" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        <div class="modal-body" innerHTML="{{body | translate}}">
        </div>
          <div class="modal-footer">
              <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default" (click)="emitValue('close')">{{ 'btn.close' | translate }}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class modalDeleteSchResultComponent {
  @Input('body') body: string;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();
  @ViewChild('bsModalMessage') public bsModalMessage: ModalDirective;
  constructor(public constants: Constants) {

  }

  public show(): void {

    this.bsModalMessage.show();
  }

  public hide(): void {
    this.bsModalMessage.hide();
  }

  public hidden(): void {
    this.onHidden.emit();
  }

  public emitValue(param): void {
    this.onEmit.emit(param);
  }
}