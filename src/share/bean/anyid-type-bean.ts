export class AnyIDTypeBean {
    anyIDType: string;
    label: string;
    desc: string;
    shortName: string;
    iconObj: any;
    valueType: string;
    valueLength: number;

    public getRegexPattern(): string {
        return this.valueType == 'S' ? '^.+$' : '^\\d+$';
    }

    public getRangeLength(): [number] {
        return this.anyIDType == "ACCTNO"? [0, 1000] : [this.valueLength, this.valueLength];
    }
}