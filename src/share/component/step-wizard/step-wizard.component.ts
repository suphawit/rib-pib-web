import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { CanvasService } from '../../../share/service/canvas.service';
import { Constants } from '../../service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
  selector: 'step-wizard',
  templateUrl: './step-wizard.html',
  providers: [CanvasService]
})

// Component class
export class StepWizardComponent implements AfterViewInit, OnInit {
  @Input('data') dataStep: any = [];
  @Input('style') styleMode: String;
  @Input('step') enableStep: Number;

  private uid: Number;
  private _maxStep: Number;
  public styleClass: String;
  lang:string;
  constructor(private canvasService: CanvasService, 
              public constants: Constants,
              private translateService:TranslateService) {
  }

  public ngOnInit() {
    // initial uid
    this.setUid();

    // set max step
    this.setMaxStep();
    this.lang = this.translateService.currentLang;


  }

  public ngAfterViewInit() {
    if (this.styleMode === this.constants.STYLE_RIB_WEB) return;

    this.calculateStepWidth();

    if (this.styleMode !== this.constants.STYLE_PIB_WEB) {
      let canvasOffset = this.getCanvasOffset();
      this.canvasService.drawStepsLine({ canvasId: 'stepWizardCanvasLine_' + this.uid, startStepId: 'step_0_btn_' + this.uid, endStepId: 'step_' + this._maxStep + '_btn_' + this.uid, offSet: canvasOffset });
    }
  }

  private calculateStepWidth(): void {
    let stepCol: any = document.getElementsByClassName('uid-'+this.uid);
    let stepWidth: Number = 100 / this.dataStep.length;

    for (var item of stepCol) {
      item.style.width = stepWidth + '%';
    }
  }

  private getCanvasOffset(): Number {
    let canvasOffset = 0;
    if (this.styleMode === this.constants.STYLE_RIB_WEB) {
      canvasOffset = 22;
    } else if (this.styleMode === this.constants.STYLE_PIB_MOBILE) {
      canvasOffset = 7;
    }
    return canvasOffset;
  }

  private setMaxStep(): void {
    this._maxStep = this.dataStep.length - 1;
  }

  private setUid() {
    this.uid = Math.floor(Math.random() * 89999 + 10000);
  }

  get colSize(): number {
    return Math.floor(12 / this.dataStep.length);
  }
}

export interface StepWizard {
  input: InputComponent;
}

interface InputComponent {
  data: any;
  style: String;
  step: Number;
}