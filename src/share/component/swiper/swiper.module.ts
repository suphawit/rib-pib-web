import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { Swiper } from './swiper';

@NgModule({
  imports: [CommonModule, SwiperModule],
  declarations: [
      Swiper
  ],
  exports: [
      Swiper
  ]
})
export class PIBSwiperModule { }