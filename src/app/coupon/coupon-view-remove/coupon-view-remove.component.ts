import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Coupon } from '../../model/Coupon';

@Component({
  selector: 'app-coupon-view-remove',
  templateUrl: './coupon-view-remove.component.html',
  styleUrl: './coupon-view-remove.component.scss'
})
export class CouponViewRemoveComponent {
  
  readonly minDate : Date = new Date(); 
  isRemove : boolean = false;

  coupon !: Coupon;  
  couponForm : FormGroup;
  userName : string = 'NA';

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponViewRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.coupon = data.coupon;
      this.isRemove = data.type == 'remove';
    this.couponForm = this.fb.group(
      {
        code: [this.coupon.code, Validators.required],
        description: [this.coupon.description, Validators.required],
        amount: [{ value: this.coupon.amount, disabled: this.coupon.isAmount }],
        percentage: [{ value: this.coupon.percentage, disabled: this.coupon.ispercentage }],
        maxAmount: [this.coupon.maxAmount, Validators.required],
        startDate: [this.coupon.startDate, Validators.required],
        endDate: [this.coupon.endtDate, Validators.required],
        isAmount: [this.coupon.isAmount],
        isPercentage: [this.coupon.ispercentage],
        status: [this.coupon.status? 'Enabled' : 'Disabled', Validators.required],
        addedBy: [this.coupon.addedBy, Validators.required],
      },
      { validators: this.amountOrPercentageValidator }
    );
  }

  public updateStatus(selectedStatus: string) : void {
    this.couponForm.patchValue({ status: selectedStatus });
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
