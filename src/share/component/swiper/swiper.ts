import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ViewChild, Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'slide-swiper',
  templateUrl: 'swiper.html'
})
export class Swiper implements OnInit {

  public config: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    centeredSlides: true,
    keyboardControl: true,
    mousewheelControl: true,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    loop: true,
    initialSlide: 0,
    onlyExternal: false
  };

  @Input() options: any;
  @Input() menuSwiper: any = [];
  @Output() swiperSelected: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(SwiperComponent) swiperView: SwiperComponent;

  constructor() {
  }

  ngOnInit(): void {
    this.config.slidesPerView = this.menuSwiper.length;
    if(this.options){
      this.config.initialSlide = this.options.index;
      this.config.onlyExternal = this.options.lock;
    }
  }

  onIndexChange(index: number): void {
    let realIndex = index % this.menuSwiper.length;
    //
    this.swiperSelected.emit(this.menuSwiper[realIndex]);
  }
}