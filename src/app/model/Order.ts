import { MenuList } from "./MenuList";

export interface Order {
    
    id : number;
    menuItems : MenuList[]; 
    totalPrice : number;    
    orderedDate : Date;
    orderStatus : string;
    orderBy : string;
    
}