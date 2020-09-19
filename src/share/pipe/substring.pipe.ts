import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stringLimit' })
export class SubstringPipe implements PipeTransform {
  private trail: string = '...';
  public transform(char: String, limit: number, Type:string) {
    if(char === null){
      return char;
    }
    if (limit == undefined) {
      limit = 20;
    }
    if (char.length > limit) {
        if(Type==='mark'){
          this.trail='xxx';
          char = this.trail + char.substring(limit, 9);
        }else{
          char = char.substring(0, limit) + this.trail;
        }
    }
    return char;
  }
}