import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coupon } from '../../model/Coupon';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrl: './coupon-add.component.scss'
})
export class CouponAddComponent {

  readonly minDate : Date = new Date(); 

  couponForm : FormGroup;
  userName : string = 'NA';

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponAddComponent>) {
    this.couponForm = this.fb.group(
      {
        code: ['', [Validators.required, Validators.minLength(6)]],
        description: ['', Validators.required],
        amount: [{ value: '', disabled: true }],
        percentage: [{ value: '', disabled: true }],
        maxAmount: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        isAmount: [false],
        isPercentage: [false],
        status: ['', Validators.required],
        addedBy: [this.userName, Validators.required],
      },
      { validators: this.amountOrPercentageValidator }
    );
  }

  public updateStatus(selectedStatus: string) : void {
    this.couponForm.patchValue({ status: selectedStatus });
  }

  generateRandomCouponCode() {
    const randomCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    this.couponForm.get('code')?.setValue(randomCode);    
  }

  onAmountChange(): void {
    const maxAmount = this.couponForm.get('maxAmount')?.value;
    if (this.couponForm.get('isAmount')?.value) {
      this.couponForm.get('amount')?.setValue(maxAmount);
      this.couponForm.get('amount')?.enable();
      this.couponForm.get('percentage')?.disable();
      this.couponForm.get('isPercentage')?.setValue(false);
    } else {
      this.couponForm.get('amount')?.disable();
    }
  }

  onPercentageChange(): void {
    if (this.couponForm.get('isPercentage')?.value) {
      this.couponForm.get('percentage')?.enable();
      this.couponForm.get('amount')?.disable();
      this.couponForm.get('isAmount')?.setValue(false);
    } else {
      this.couponForm.get('percentage')?.disable();
    }
  }

  amountOrPercentageValidator(control: AbstractControl): ValidationErrors | null {
    const isAmount = control.get('isAmount')?.value;
    const isPercentage = control.get('isPercentage')?.value;
    return (isAmount || isPercentage) ? null : { atLeastOneRequired: true };
  }
  
  onSubmit(): void {
    if (this.couponForm.valid) {
      // Submit the form data to the database
      console.log(this.couponForm.value);
      this.dialogRef.close(this.couponForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}