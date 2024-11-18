
export interface Coupon {
    id : number;

    couponName : string;
    description : string;

    isAmount : boolean;
    amount : number;

    ispercentage : boolean;
    percentage : number;

    maxAmount : number;
    minOrderAmount : number;
    status : boolean;

    startDate: Date;
    endtDate: Date;

    addedBy? : string;
    
}