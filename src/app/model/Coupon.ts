
export interface Coupon {
    couponId ? : string;

    couponName : string;
    description : string;

    isAmount : boolean;
    amount : number;

    isPercentage : boolean;
    percentage : number;

    maxDiscountAmount : number;
    minOrderAmount : number;
    status : boolean;

    startDate: Date;
    endDate: Date;

    addedBy ? : string;
    message ? : string;
    
}