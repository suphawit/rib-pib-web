import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'bs-modal-message-delete-biller',
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
            <table style="width: 100%" border="0">
              <tbody>
                <tr>
                  <td style="width: 30%"><span class="font-weight-bold">{{'lbl.billerAliasName' | translate}}</span></td>
                  <td style="width: 70%">: {{billerAliasName}}</td>
                </tr>
                <tr>
                  <td style="width: 30%"><span class="font-weight-bold">{{'label.billRefNo1' | translate}}</span></td>
                  <td style="width: 70%">: {{ref1}}</td>
                </tr>
                <tr>
                  <td style="width: 30%"><span class="font-weight-bold">{{'label.billRefNo2' | translate}}</span></td>
                  <td style="width: 70%">: {{ref2}}</td>
                </tr>
              </tbody>
            </table>
            <p>
              {{body | translate}}
            </p>
          </div>
          <div class="modal-footer">
            <button *ngIf="config.isShowCloseBtn" type="button" class="btn btn-default " (click)="hide()">Close</button>
            <button *ngIf="config.isShowCancelBtn && config.isShowCancelBtn === true" type="button" class="btn btn-default" (click)="hide()">{{'button.cancel' | translate}}</button>
            <button *ngIf="config.isShowDeleteBtn && config.isShowDeleteBtn === true" type="button" class="btn red " (click)="emitValue('delete')">{{'btn.delete' | translate}}</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MessageModalDeleteBillerComponent {
  @Input('body') body: string;
  @Input('title') title: string;
  @Input('size') optionalSize: string;
  @Input('config') config: any;
  @Input('billerAliasName') billerAliasName: string;
  @Input('ref1') ref1: string;
  @Input('ref2') ref2: string;
  @Output('onHidden') onHidden = new EventEmitter();
  @Output('onEmit') onEmit = new EventEmitter();

  @ViewChild('bsModalMessage') public bsModalMessage:ModalDirective;
  
  public show():void {

    this.bsModalMessage.show();
  }
 
  public hide():void {
    this.bsModalMessage.hide();
  }

  public hidden():void {
    this.onHidden.emit();
  }

  public emitValue(param):void {
    this.onEmit.emit(param);
  }
}