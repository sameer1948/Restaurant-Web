import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaxService } from '../../services/tax.service';
import { Tax } from '../../model/Tax';
import { CouponService } from '../../services/coupon.service';
import { Coupon } from '../../model/Coupon';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/Order';
import { NotificationService } from '../../common/notification.service';
import { TaxAndDetails } from '../../model/TaxAndDetails';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {

  private readonly USER_NAME: string = 'USERNAME';
  userName: any;

  orderItems: OrderItem[] = [];
  taxes: Tax[] = [];

  applicableCoupons: Coupon[] = [];

  couponCode: string = '';
  discount: number = 0;
  couponApplied: boolean = false;
  couponSectionVisible: boolean = false;
  couponError: boolean = false;
  couponErrorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CreateOrderComponent>,
    private dialog: MatDialog,
    private taxService: TaxService,
    private couponService: CouponService,
    private decryptServices: EncryptDecryptService,
    @Inject(MAT_DIALOG_DATA) public data: OrderItem[]) {
    this.orderItems = data;
    this.userName = this.decryptServices.decrypt(sessionStorage.getItem(this.decryptServices.encrypt(this.USER_NAME)) ?? '');
  }

  ngOnInit(): void {

    // Fetch taxes
    this.taxService.getTaxes().subscribe(
      (taxList: TaxAndDetails[]) => {        
        this.taxes = taxList.map(tax => tax.tax).filter(tax => tax.status === true);
        //console.table(this.taxes);
      },
      (error) => {
        console.log(error);
      }
    );

    // Fetch applicable coupons
    this.couponService.getAllCoupons().subscribe(
      (response: any[]) => {
        const coupons = response.map(item => item.coupon);  // Extract only the `coupon` part of each object        
        this.applicableCoupons = coupons; //this.filterCoupons(coupons);
        //console.table(this.applicableCoupons);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Filter the coupons based on status, minOrderAmount, and endDate
  filterCoupons(coupons: Coupon[]): Coupon[] {
    const currentDate = new Date();
    return coupons.filter(coupon =>
      coupon.status === true && coupon.minOrderAmount <= this.calculateTotal() &&
      new Date(coupon.endDate) >= currentDate);
  }

  // Calculate the total amount (sum of all order item prices)
  calculateTotal(): number {
    return this.orderItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  }

  // Dynamically calculate tax based on the tax rate values from API
  calculateTax(total: number): number {
    let totalTax = 0;
    this.taxes.forEach(tax => {
      totalTax += (total * (tax.value / 100)); // Calculate the tax based on the value in percentage
    });
    return totalTax;
  }

  // Method to calculate grand total (including all taxes and discount)
  get grandTotal() {
    const total = this.calculateTotal();
    const totalTax = this.calculateTax(total);
    return total + totalTax - this.discount;
  }

  // Increase item quantity in the order
  increaseQuantity(item: OrderItem) { item.quantity++; }

  // Decrease item quantity in the order
  decreaseQuantity(item: OrderItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  // Remove item from the order
  removeItem(item: OrderItem) {
    this.orderItems = this.orderItems.filter(i => i !== item);
    if (this.orderItems.length < 1) {
      this.dialogRef.close({ status: 'canceled' });
    }
  }

  // Toggle coupon section visibility
  toggleCouponSection() {
    this.couponSectionVisible = !this.couponSectionVisible;
  }

  // Apply coupon discount logic
  applyCoupon() {

    const trimmedCouponCode = this.couponCode.trim().toLowerCase();

    const coupon = this.applicableCoupons.find(
      c => c.couponName?.trim().toLowerCase() === trimmedCouponCode);

    if (coupon) {
      // Check if coupon meets the conditions
      if (coupon.minOrderAmount > this.calculateTotal()) {
        this.couponError = true;
        this.couponErrorMessage = `Coupon requires a minimum order of ${coupon.minOrderAmount} to apply.`;
        this.discount = 0;
        this.couponApplied = false;
      } else if (new Date(coupon.endDate) < new Date()) {
        this.couponError = true;
        this.couponErrorMessage = 'Coupon has expired.';
        this.discount = 0;
        this.couponApplied = false;
      } else if (coupon.status === false) {
        this.couponError = true;
        this.couponErrorMessage = 'Coupon is not active.';
        this.discount = 0;
        this.couponApplied = false;
      } else {
        // Apply coupon
        if (coupon.isAmount) {
          //console.log('coupon.isAmount : ' + coupon.isAmount );
          this.discount = coupon.amount ?? 0; // Apply the fixed amount
        } else if (coupon.isPercentage) {
          //console.log('coupon.isPercentage : ' + coupon.isPercentage );
          this.discount = (this.calculateTotal() * (coupon.percentage ?? 0)) / 100; // Apply the percentage discount
        }
        this.couponApplied = true;
        this.couponError = false;
        this.couponErrorMessage = '';  // Clear any previous error message
      }
    } else {
      this.couponError = true;
      this.couponErrorMessage = 'Invalid coupon code.';
      this.discount = 0;
      this.couponApplied = false;
    }
    //console.log('discount : ' + this.discount );
  }

  // Clear coupon error feedback
  clearCouponFeedback() {
    this.couponApplied = false;
    this.couponError = false;
  }

  // Remove coupon and reset related properties
  removeCoupon() {
    this.discount = 0;
    this.couponApplied = false;
    this.couponError = false;
    this.couponCode = '';
  }

  // Close dialog on complete
  onComplete() {
    const now = new Date();
    // Prepare the order object structure  
    const order: Order = {
      orderBy: this.userName, // This should USERNAME
      totalPrice: parseFloat(this.grandTotal.toFixed(2)),
      orderDate: now.toISOString(),
      orderStatus: "PENDING",
      orderDetails: {
        menuLists: this.getMenuList(),
        taxList: this.getTaxList(),
        coupons: this.getCoupons(),
        id: ''
      },
      id: ''
    };
    
    // console.log(order);
    // console.dir(order);
    this.orderService.newOrder(order).subscribe(
      (response) => {
        //console.log('Order placed successfully:', response);
        // Close the dialog with the generated order object        
        const data = {
          title : 'Order Created successfully',
          message :   `Order Id : ${response.id}  <br> Total Price ${response.totalPrice}.`,
          action : 'success'
        }

        this.dialog.open(SuccessDialogComponent, {data: data})
        .afterClosed()
        .subscribe(res => {
          if (res === 'close') {          
            this.dialogRef.close('success');
          }
        });
      },
      (error) => {
        // Check if the error has a response or status (depends on how your backend sends errors)
        if (error.status == 403) {        
          this.notificationService.errorMessage('You don\'t have Authorization to complete The Order');
        } else {
          // The HTTP error (status, message, etc.)
          console.error('Error placing order (HTTP error):', JSON.stringify(error, null, 2));          
          this.notificationService.errorMessage('Error placing order (HTTP error)');
        }
      }
    );

  }


  getMenuList() {
    return this.orderItems.flatMap(item => {
      return Array(item.quantity).fill({
        id: item.menuItem.id,
        item: item.menuItem.name,
        price: item.menuItem.price
      });
    });
  }

  getTaxList() {
    return this.taxes.map(tax => ({
      taxId: tax.taxId,
      taxType: tax.taxType,
      value: tax.value,
      status: tax.status
    }));
  }


  getCoupons() {
    if (this.couponApplied) {
      const appliedCoupon = this.applicableCoupons.find(
        coupon => coupon.couponName.trim().toLowerCase() === this.couponCode.trim().toLowerCase()
      );
      if (appliedCoupon) {
        // Returning the full coupon object with all fields
        return [{
          couponId: appliedCoupon.couponId,
          couponName: appliedCoupon.couponName,
          description: appliedCoupon.description,
          isAmount: appliedCoupon.isAmount,
          amount: appliedCoupon.amount,
          isPercentage: appliedCoupon.isPercentage,
          percentage: appliedCoupon.percentage,
          maxDiscountAmount: appliedCoupon.maxDiscountAmount,
          minOrderAmount: appliedCoupon.minOrderAmount,
          status: appliedCoupon.status,
          startDate: appliedCoupon.startDate,
          endDate: appliedCoupon.endDate,
          addedBy: appliedCoupon.addedBy        // Who added the coupon (optional)
        }];
      }
    }
    return []; // If no coupon is applied, return an empty array
  }


  // Close dialog on cancel
  onCancel() {
    this.dialogRef.close({ status: 'canceled' });
  }

}


interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}
