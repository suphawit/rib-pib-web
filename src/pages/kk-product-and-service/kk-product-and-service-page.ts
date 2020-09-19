import { Constants } from '../../share/service/constants';

export class KKProductAndServicePage {
    webStyle: string;
    product: { data: Array<any>; title: string; subtitle: string; };
    alertConfig: { title: string, type: string, message: string, show: boolean, option: any };

    constructor(public constants: Constants) {
    }

    onActions($event) {
        this.product.subtitle = $event;
    }

    switchType($event) {
        if ($event === 'newProduct') {
            this.product.title = $event;
        }
    }
}
