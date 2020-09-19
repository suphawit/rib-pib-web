import { Injectable } from '@angular/core';

@Injectable()
export class CanvasService {
  public drawStepsLine(dataPrams: any) {
    
    let draw = function(){

        //check if any div/element is empty/null ---so just return
        if(!dataPrams.canvasId || !dataPrams.startStepId  || !dataPrams.endStepId){
            return;
        }
        
        // set offset of left
        let offSet:Number = (!dataPrams.offSet) ? 0 : dataPrams.offSet;
        //get size/positions of top Step buttons
        var startStep = document.getElementById(dataPrams.startStepId);
        var startStepOffset = startStep.offsetLeft;
        var startStepSize = document.getElementById(dataPrams.startStepId).getBoundingClientRect().left;
        var endStepSize = document.getElementById(dataPrams.endStepId).getBoundingClientRect().left;
        /* Set offset fixed IE problem. */
        var canvasOffset = startStepOffset + startStep.getAttribute('width') + offSet; 
        
        var canvas = document.getElementById(dataPrams.canvasId);
        canvas.style.left = canvasOffset + 'px';
        
        //set canvas size to the size of area between three buttons
        canvas.setAttribute('width', ''+(endStepSize - startStepSize));
    }; // end draw
    
    // init
    draw();
    
    //register window listener to change resize events
    window.onresize = function(){
        if(document.getElementById(dataPrams.startStepId) !=null && document.getElementById(dataPrams.endStepId) !=null ){
            //update all required dynamic values
            draw();
        }
    };
  };// end drawStepsLine
}
