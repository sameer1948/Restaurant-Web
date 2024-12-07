import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Coupon } from '../../model/Coupon';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { CouponAndDetails } from '../../model/CouponAndDetails';
import { CouponService } from '../../services/coupon.service';
import { error } from 'console';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-coupon-update',
  templateUrl: './coupon-update.component.html',
  styleUrl: './coupon-update.component.scss'
})
export class CouponUpdateComponent {

  private readonly USER_NAME: string = 'USERNAME';
  userName : any = 'NA';

  readonly minDate : Date = new Date(); 
  isRemove : boolean = false;

  coupon !: Coupon;  
  couponForm : FormGroup;
  initialCouponData: Coupon;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) data: Coupon,
    private decryptServices: EncryptDecryptService,
    private couponService : CouponService,
    private dialog: MatDialog) {
      this.userName = this.decryptServices.decrypt(sessionStorage.getItem(this.decryptServices.encrypt(this.USER_NAME)) ?? '');
      this.coupon = data;      
    
    this.initialCouponData = { ...this.coupon };

    this.couponForm = this.fb.group(
      {
        couponId: this.coupon.couponId,
        code: [this.coupon.couponName, Validators.required],
        description: [this.coupon.description, Validators.required],
        amount: [{ value: this.coupon.amount, disabled: this.coupon.isAmount }],
        percentage: [{ value: this.coupon.percentage, disabled: this.coupon.isPercentage }],
        maxDiscountAmount: [this.coupon.maxDiscountAmount, Validators.required],
        minOrderAmount: [this.coupon.minOrderAmount, Validators.required],
        startDate: [this.coupon.startDate, Validators.required],
        endDate: [this.coupon.endDate, Validators.required],
        isAmount: [this.coupon.isAmount],
        isPercentage: [this.coupon.isPercentage],
        status: [this.coupon.status ? 'Enabled' : 'Disabled', Validators.required],
        modifiedBy: [this.userName , Validators.required],
        message: [this.coupon.message],
      },
      { validators: this.amountOrPercentageValidator }
    );
  }

  public updateStatus(selectedStatus: string) : void {
    this.couponForm.patchValue({ status: selectedStatus });
  }

  onAmountChange(): void {
    const maxDiscountAmount = this.couponForm.get('maxDiscountAmount')?.value;
    if (this.couponForm.get('isAmount')?.value) {
      this.couponForm.get('amount')?.setValue(maxDiscountAmount);
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

  /**
   * Check if the form data has been modified compared to the initial values.
   */
  hasFormDataChanged(): boolean {
    return JSON.stringify(this.couponForm.value) !== JSON.stringify(this.initialCouponData);
  }

  onSubmit(): void {
    if (this.couponForm.valid) {
      if (this.hasFormDataChanged()) {
        // Data has been modified, proceed with the submission
        const couponAndDetails: CouponAndDetails = {
          coupon: {
            couponId: this.couponForm.value.couponId,
            couponName: this.couponForm.value.code,
            description: this.couponForm.value.description,
            isAmount: this.couponForm.value.isAmount ?? false,
            amount: this.couponForm.value.isAmount ? this.couponForm.value.amount ?? 0 : 0,  
            isPercentage: this.couponForm.value.isPercentage ?? false,
            percentage: this.couponForm.value.isPercentage ? this.couponForm.value.percentage ?? 0 : 0,  
            maxDiscountAmount: this.couponForm.value.maxDiscountAmount,
            minOrderAmount: this.couponForm.value.minOrderAmount,
            status: this.couponForm.value.status == 'Enabled' ? true : false,
            startDate: this.couponForm.value.startDate,
            endDate: this.couponForm.value.endDate,
          },
          couponDetails: {
            couponId: this.couponForm.value.couponId,
            memberName: this.userName,
            message: this.couponForm.value.message + ` ; This is Modified By ${this.userName}`,
            timeStamp: new Date()
          }
        };

        //console.log(this.couponForm.value);

      this.couponService.updateCoupon(couponAndDetails).subscribe(
        (response : CouponAndDetails) => {
          //console.log(response);
          this.clearForm();
          this.dialogRef.close('success');
          const data = {
            title : `Updated ${response.coupon.couponName}`,
            message : `Coupon ${response.coupon.couponName} Was Updated Successfully.`,
            action : 'update'
          }
          this.dialog.open(SuccessDialogComponent, {data: data});
        },(error) => {          
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
        
      } else {
        console.log('No changes detected. No update required.');
      }
    }
  }

  onCancel(): void {
    this.clearForm();
    this.dialogRef.close();
  }

  onClose(): void {
    this.clearForm();
    this.dialogRef.close();
  }

   
   resetForm(): void {
    this.couponForm.reset({
      code: this.coupon.couponName,
      description: this.coupon.description,
      amount: this.coupon.amount,
      percentage: this.coupon.percentage,
      maxDiscountAmount: this.coupon.maxDiscountAmount,
      minOrderAmount: this.coupon.minOrderAmount,
      startDate: this.coupon.startDate,
      endDate: this.coupon.endDate,
      isAmount: this.coupon.isAmount,
      isPercentage: this.coupon.isPercentage,
      status: this.coupon.status ? 'Enabled' : 'Disabled',
      modifiedBy: this.coupon.addedBy
    });
    
    // Re-enable any controls that were disabled based on the reset values
    this.onAmountChange();
    this.onPercentageChange();
  }

  clearForm(): void {
    this.couponForm.reset({
      code: '',
      description: '',
      amount: '',
      percentage: '',
      maxDiscountAmount: '',
      minOrderAmount: '',
      startDate: '',
      endDate: '',
      isAmount: '',
      isPercentage: '',
      status: '',
      modifiedBy: this.coupon.addedBy
    });
    
    // Re-enable any controls that were disabled based on the reset values
    this.onAmountChange();
    this.onPercentageChange();
  }

}
