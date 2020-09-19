export class TransferStatusBean {
    transferStatusId: number;
    code: string;
    name: string;
    desc: string;
    status: string;

    public isSuccess(): boolean {
        return this.code == "FL" ? false : true;
    }
}