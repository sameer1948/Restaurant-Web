import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { CouponService } from '../../services/coupon.service';
import { CouponAndDetails } from '../../model/CouponAndDetails';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { title } from 'process';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrl: './coupon-add.component.scss'
})
export class CouponAddComponent {
  
  private readonly USER_NAME: string = 'USERNAME';
  userName : any = 'NA';

  readonly minDate : Date = new Date(); 

  couponForm : FormGroup;


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<CouponAddComponent>,
    private decryptServices: EncryptDecryptService,
    private couponService : CouponService,
    private dialog: MatDialog) {
      this.userName = this.decryptServices.decrypt(sessionStorage.getItem(this.decryptServices.encrypt(this.USER_NAME)) ?? '');
    this.couponForm = this.fb.group(
      {
        code: ['', [Validators.required, Validators.minLength(6)]],
        description: ['', Validators.required],
        amount: [{ value: '', disabled: true }],
        percentage: [{ value: '', disabled: true }],
        maxDiscountAmount: ['', Validators.required],
        minOrderAmount:['', Validators.required],
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
  
  onSubmit(): void {
    if (this.couponForm.valid) {      
      //console.log(this.couponForm.value);
      const couponAndDetails: CouponAndDetails = {
        coupon: {
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
          memberName: this.userName,
          message: `This is Added By ${this.userName}`,          
          timeStamp: new Date()
        }
      };
      
      //console.log(couponAndDetails);

      this.couponService.addCoupon(couponAndDetails).subscribe(
        (response : CouponAndDetails) => {
          //console.log(response);
          if (response != null) {
            const data = {
              title : 'Added Coupon Successfully',
              message :   `Coupon Id : ${response.coupon.couponId}  and Coupon ${response.coupon.couponName} Added.`
            }

            this.dialog.open(SuccessDialogComponent, {data: data});
            this.dialogRef.close('success');
          }          
        }
      );

      
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
      addedBy: `${this.userName}`
    });
    
    // Re-enable any controls that were disabled based on the reset values
    this.onAmountChange();
    this.onPercentageChange();
  }

}