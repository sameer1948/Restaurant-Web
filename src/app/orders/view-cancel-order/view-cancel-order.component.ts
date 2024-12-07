import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { Order } from '../../model/Order';
import { MenuList } from '../../model/MenuList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';

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
    private dialog: MatDialog,
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
    this.orderService.cancelOrder(this.order.id).subscribe(
      (response : Order) => {
          //console.log(data);        
          const data = {
            title : 'Order Updated successfully',
            message :   `Order ${response.id}  has been Cancelled`,
            action : 'success'
          }
  
          this.dialog.open(SuccessDialogComponent, {data: data})
          .afterClosed()
          .subscribe(res => {
            if (res === 'close') {          
              this.dialogRef.close('success');
            }
          });
  
        }, (error) => {
          console.log(error)
          const data = {
            title : `Error `,
            message : `Something Went Wrong...! <br>Please try Later`,
            action : 'close'
          }
          this.dialog.open(ErrorDialogComponent, 
          {
            data: data,
            width: '400px',  
            maxHeight: '80vh', 
          });
        }
    );
  }


  // Close dialog on cancel
  public onClose() : void{
    this.dialogRef.close({ status: 'canceled' });
  }
  
}