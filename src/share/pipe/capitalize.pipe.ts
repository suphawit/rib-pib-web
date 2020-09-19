import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {

    transform(str:string, all:boolean) {
        //Capitalize all the words
        if (all) {
            let result =  str.split(' ').map((str) => {
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            }).join(' ');
            return result;
        }
        //Capitalize the first word only
        return str.charAt(0).toUpperCase() + str.slice(1); 
    }

}