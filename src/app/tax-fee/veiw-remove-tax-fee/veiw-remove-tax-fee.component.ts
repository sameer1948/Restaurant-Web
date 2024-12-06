import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxAndDetails } from '../../model/TaxAndDetails';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';

@Component({
  selector: 'app-veiw-remove-tax-fee',
  templateUrl: './veiw-remove-tax-fee.component.html',
  styleUrl: './veiw-remove-tax-fee.component.scss'
})
export class VeiwRemoveTaxFeeComponent {
  private readonly USER_NAME: string = 'USERNAME';
  readonly userName: string = 'N/A';

  isRemove : boolean = false;
  taxAndDetails !: TaxAndDetails;  
  taxAndFeeForm : FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<VeiwRemoveTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private decryptService: EncryptDecryptService) {

      const encryptedUserName = sessionStorage.getItem(decryptService.encrypt(this.USER_NAME));
      this.userName = decryptService.decrypt(encryptedUserName ?? '') ?? 'N/A';
      
      const message = ` ; This is Removed By ${this.userName}`;
      this.taxAndDetails = data.taxAndDetails;
      this.isRemove = data.type == 'remove';

    this.taxAndFeeForm = this.fb.group(
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
    this.taxAndFeeForm.patchValue({ status: selectedStatus });
  }
  
  onSubmit(): void {
    if (this.taxAndFeeForm.valid) {
      // Submit the form data to the database
      //console.log(this.taxAndFeeForm.value);
      this.dialogRef.close(this.taxAndFeeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
