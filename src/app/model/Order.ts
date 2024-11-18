import { OrderDetails } from "./OrderDetails";

export class Order {
    id!: string;
    totalPrice!: number;
    orderDate?: string;  
    orderStatus!: string;
    orderBy!: string;
    orderDetails!: OrderDetails;  
}
