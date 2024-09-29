import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss'
})
export class NewOrderComponent {
  
  displayedColumns: string[] = ['serial', 'name', 'quantity', 'price', 'total'];
  dataSource : any; 
  input: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<MenuList>, 
            private dialogRef: MatDialogRef<any>) {
    this.dataSource = data; 
    this.dataSource = this.groupByItems(data);
  }


  protected groupByItems(items : Array<MenuList>) {

    let orders : OrderItem[] = [];
    let itemNames = items.flatMap(item => item.item)
    //console.log(itemNames.filter(item => item))
    itemNames = itemNames.filter((value, index, array) => array.indexOf(value) === index).sort();

    for(let i = 0; i < itemNames.length; i++ ) {
      let count = 0;
      let price = 0;
        for(let c = 0; c < items.length; c++) {
          if (itemNames[i] == items[c].item) {
            count ++;
            price = items[c].price;
          }
        }
      //console.log(itemNames[i] + " : " + count);  
      orders.push({name : itemNames[i], quantity : count, price : price, totalPrice : (count * price)});
      //console.log(orders)
    }
    return orders;
  }
  
  
  createOrder() {
    this.dialogRef.close({result:'success'});
  }

}

export interface OrderItem {
  name : string | undefined;
  quantity : number | undefined;
  price : number | undefined;
  totalPrice : number | undefined;
}
