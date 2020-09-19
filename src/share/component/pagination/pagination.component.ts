import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

require("!style-loader!css-loader!sass-loader!./pagination.scss");

@Component({
  selector: 'pagination',
  templateUrl: './pagination.html'
})
// Component class
export class PaginationComponent implements OnInit {
    @Input() currentPage: number;
    @Input() totalItem: number;
    @Input() ItemPerPage: number;
    @Output() onCurrentPage = new EventEmitter();
    
    private _totalPage: number;
    get totalPage(): number{
        return this._totalPage;
    }
    set totalPage(totalPage: number){
        this._totalPage = totalPage;
    }

    disablePrev: boolean;
    disableNext: boolean;
    showPagination: {
        currentPage: number;
        lastPage: number;
        records: number;
    }

    ngOnInit(): void{
      this.disableNext = false;
      this.disablePrev = true;
      this.currentPage = 1;

      this.calcTotalPage();
      this.setShowPagination();
    }

    calcTotalPage(){
        //
        this.totalPage = Math.ceil(this.totalItem / this.ItemPerPage);
    }

    setShowPagination(){
        this.showPagination = {
            currentPage: (this.currentPage - 1) * this.ItemPerPage + 1,
            lastPage: (this.currentPage === this.totalPage) ? this.totalItem : this.ItemPerPage*this.currentPage,
            records: this.totalItem
        };
        //
    }

    ngDoCheck(){
        //
        this.calcTotalPage();
        this.nextPrevAction();
        this.setShowPagination();
    }

    previous(): void{
        //
        if(this.disablePrev) return;

        this.currentPage--;
        this.disableNext = false;
        this.nextPrevAction();

        // emit Output
        this.onCurrentPage.emit(this.currentPage);
    }

    next(): void{
        //
        if(this.disableNext) return;

        this.currentPage++;
        this.disablePrev = false;
        this.nextPrevAction();

        // emit Output
        this.onCurrentPage.emit(this.currentPage);
    }

    onKeyPage(){

        this.nextPrevAction();

        // emit Output
        this.onCurrentPage.emit(this.currentPage);
    }

    private nextPrevAction(){
        if(this.currentPage >= this.totalPage){
            this.currentPage = this.totalPage;
            this.disableNext = true;
        } else {
            this.disableNext = false;
        }
        if(this.currentPage <= 1){
            this.currentPage = 1;
            this.disablePrev = true;
        } else {
            this.disablePrev = false;
        }
    }
}