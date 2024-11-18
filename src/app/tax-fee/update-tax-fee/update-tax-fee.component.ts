import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { TaxAndDetails } from '../../model/TaxAndDetails';


@Component({
  selector: 'app-update-tax-fee',
  templateUrl: './update-tax-fee.component.html',
  styleUrl: './update-tax-fee.component.scss'
})
export class UpdateTaxFeeComponent {
  
  private readonly USER_NAME: string = 'USERNAME';
  readonly userName: string = 'N/A';

  taxAndDetails !: TaxAndDetails;  
  taxAndDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private decryptService: EncryptDecryptService) {

      const encryptedUserName = sessionStorage.getItem(decryptService.encrypt(this.USER_NAME));
      this.userName = decryptService.decrypt(encryptedUserName ?? '') ?? 'N/A';
      
      const message = ` ; This is Modified By ${this.userName}`;
      
      this.taxAndDetails = data;      
      this.taxAndDetailsForm = this.fb.group(
        {
          taxType: [this.taxAndDetails.tax.taxType, Validators.required],       
          value: [this.taxAndDetails.tax.value, Validators.required],         
          status: [this.taxAndDetails.tax.status? 'Enabled' : 'Disabled', Validators.required],
          memberName: [this.userName, Validators.required],
          message: [this.taxAndDetails.taxDetails.message + message, Validators.required],
        }
      );
  }

  public updateStatus(selectedStatus: string) : void {
    this.taxAndDetailsForm.patchValue({ status: selectedStatus });
  }

  onSubmit(): void {
    if (this.taxAndDetailsForm.valid) {
      // Submit the form data to the database
      console.log(this.taxAndDetailsForm.value);
      this.dialogRef.close(this.taxAndDetailsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
