import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'biller-image',
    templateUrl: "./billerImage.html"
})

export class BillerImageComponent implements OnInit {
    @Input() srcpath: string;
    @Input() defaultpath: string;
    success:boolean = false;

    constructor(
    ) {
    }
    
    ngOnInit(): void {
    }

    loadSuccess() {
        this.success = true;
    }
   
}
