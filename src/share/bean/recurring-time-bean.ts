export class RecurringTimeBean {
    time: number;
    desc: string;

    constructor(time: number = 0, desc: string = "") {
        this.time = time;
        this.desc = desc;
    }
}