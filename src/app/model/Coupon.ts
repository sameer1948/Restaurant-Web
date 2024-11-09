
export interface Coupon {
    id : number;
    couponName : string;
    description : string;
    amount : number;
    percentage : number;
    maxAmount : number;
    minOrderAmount : number;
    startDate: Date;
    endtDate: Date;
    isAmount : boolean;
    ispercentage : boolean;
    status : boolean;
    addedBy : string;
}