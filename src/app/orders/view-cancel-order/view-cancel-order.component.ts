import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { Order } from '../../model/Order';
import { MenuList } from '../../model/MenuList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { error } from 'console';

@Component({
  selector: 'app-view-cancel-order',
  templateUrl: './view-cancel-order.component.html',
  styleUrls: ['./view-cancel-order.component.scss']
})
export class ViewCancelOrderComponent {

  isCancel: boolean = false;
  order!: Order;
  menuGroupedByOccurrences: Map<string, { item: MenuList, count: number }> = new Map();
  orderForm : FormGroup;
  localImagePath: any = 'assets/images/no-image.jpg';
  orderedMenu : MenuList[] = [];

  constructor(
    public dialogRef: MatDialogRef<ViewCancelOrderComponent>,
    private decryptServices: EncryptDecryptService,
    private fb: FormBuilder,
    private orderService : OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.order = data.order;
    this.orderedMenu = data.order.orderDetails.menuLists;
    this.isCancel = data.type === 'cancel';

    this.orderForm = this.fb.group({
        orderId : [this.order.id],
        orderBy : [this.order.orderBy],
        orderDate : [this.order.orderDate],
        totalPrice : [this.order.totalPrice],
        orderStatus : [this.order.orderStatus],
      });
  }

  public getCount(menuList: MenuList): number {
    const count = this.order.orderDetails.menuLists.filter(menuItem => menuItem.id === menuList.id).length;
    //console.log(`Item ID: ${menuList.id}, Count: ${count}`);
    return count;
  }
  
  
  public cancelOrder() : void {
    this.orderService.cancelOrder(this.order.id, this.order).subscribe(
      (response : Order) => {
        //console.log(response);
        this.dialogRef.close({ status: 'success' });
      },(error) => {console.log(error)}
    );
  }


  // Close dialog on cancel
  public onClose() : void{
    this.dialogRef.close({ status: 'canceled' });
  }
  
}