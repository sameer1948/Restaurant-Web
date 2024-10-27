import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  imagePath: string;
}

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  animations: [
    trigger('couponAnimation', [
      state('hidden', style({ height: '0', opacity: 0 })),
      state('visible', style({ height: '*', opacity: 1 })),
      transition('hidden <=> visible', animate('300ms ease-in-out')),
    ]),
  ],
})
export class CreateOrderComponent {
  orderItems: OrderItem[] = [];
  taxRate: number = 0.1; // Example tax rate
  serviceTaxRate: number = 0.05; // Example service tax rate
  couponCode: string = '';
  discount: number = 0; // Discount amount
  couponApplied: boolean = false; // Track if coupon is applied
  couponSectionVisible: boolean = false; // Track visibility of coupon section
  couponError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderItem[]
  ) {
    this.orderItems = data;
  }

  calculateTotal() {
    return this.orderItems.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  }

  calculateTax(total: number) {
    return total * this.taxRate;
  }

  calculateServiceTax(total: number) {
    return total * this.serviceTaxRate;
  }

  get grandTotal() {
    const total = this.calculateTotal();
    return total + this.calculateTax(total) + this.calculateServiceTax(total) - this.discount;
  }

  increaseQuantity(item: OrderItem) {
    item.quantity++;
  }

  decreaseQuantity(item: OrderItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: OrderItem) {
    this.orderItems = this.orderItems.filter(i => i !== item);
    if(this.orderItems.length < 1) {
      this.dialogRef.close({ status: 'canceled' });
    }
  }

  toggleCouponSection() {
    this.couponSectionVisible = !this.couponSectionVisible;
  }

  applyCoupon() {
    const isValidCoupon = this.validateCoupon(this.couponCode);
    if (this.couponCode === "SAMEER10") {
      this.discount = 10; // Example fixed discount amount
      this.couponApplied = true;
      this.couponError = false;
    } else if (this.couponCode === "SAMEER20") {
      this.discount = 20; // Example fixed discount amount
      this.couponApplied = true;
      this.couponError = false;
    } else {
      this.discount = 0;
      this.couponApplied = false;
      this.couponError = true;
    }
  }

  clearCouponFeedback() {
    this.couponApplied = false;
    this.couponError = false;
  }

  validateCoupon(code: string): boolean {
    return code === 'VALIDCOUPON'; // Example validation logic
  }

  removeCoupon() {
    this.discount = 0;
    this.couponApplied = false;
    this.couponError = false;
    this.couponCode = '';
  }

  onComplete() {
    this.dialogRef.close({ status: 'completed', data: this.orderItems });
  }

  onCancel() {
    this.dialogRef.close({ status: 'canceled' });
  }
}
