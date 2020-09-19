import { Pipe } from "@angular/core";

@Pipe({
  name: "orderby"
})
export class OrderByPipe {
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

  aliasName(array: Array<any>, args: any): Array<any> {
    array.sort((a: any, b: any) => {
      var nameA = a.myAccountAliasName && a.myAccountAliasName.toLowerCase() || "";
      var nameB = b.myAccountAliasName && b.myAccountAliasName.toLowerCase() || "";

      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}