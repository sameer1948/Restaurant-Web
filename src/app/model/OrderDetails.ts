import { Coupon } from "./Coupon";
import { MenuList } from "./MenuList";
import { Tax } from "./Tax";

export class OrderDetails {
    id!: string;
    menuLists!: MenuList[];
    taxList!: Tax[];
    coupons!: Coupon[];
}