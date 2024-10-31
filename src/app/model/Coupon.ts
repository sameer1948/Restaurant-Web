
export interface Coupon {
    id : number;
    code : string;
    description : string;
    amount : number;
    percentage : number;
    maxAmount : number;
    startDate: Date;
    endtDate: Date;
    isAmount : boolean;
    ispercentage : boolean;
    status : boolean;
    addedBy : string;
}