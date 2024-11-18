import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { TaxService } from '../../services/tax.service';
import { TaxAndDetails } from '../../model/TaxAndDetails';
import { error } from 'console';

@Component({
  selector: 'app-add-tax-fee',
  templateUrl: './add-tax-fee.component.html',
  styleUrl: './add-tax-fee.component.scss'
})
export class AddTaxFeeComponent {

  private readonly USER_NAME: string = 'USERNAME';
  readonly userName: string = 'N/A';

  taxAndDetailsForm: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaxFeeComponent>,
    private decryptService: EncryptDecryptService, 
    private taxService : TaxService) {

    const encryptedUserName = sessionStorage.getItem(decryptService.encrypt(this.USER_NAME));
    this.userName = decryptService.decrypt(encryptedUserName ?? '') ?? 'N/A';
    
    const message = `This is Added By ${this.userName}`;

    this.taxAndDetailsForm = this.fb.group(
      {
        taxType: ['', Validators.required],
        value: ['', Validators.required],
        status: ['', Validators.required],
        memberName: [this.userName, Validators.required],
        message: [message, Validators.required],
      }
    );
  }

  public updateStatus(selectedStatus: string): void {
    this.taxAndDetailsForm.patchValue({ status: selectedStatus });
  }

  onSubmit(): void {
    if (this.taxAndDetailsForm.valid) {
      // Submit the form data to the database
      console.log(this.taxAndDetailsForm.value);

      const taxAndDetails : TaxAndDetails = {
        tax: {
          taxType: this.taxAndDetailsForm.value.taxType,
          value: this.taxAndDetailsForm.value.value,
          status: this.taxAndDetailsForm.value.status === 'Enabled' ? true : false,
        },
        taxDetails: {
          memberName: this.taxAndDetailsForm.value.memberName,
          message: this.taxAndDetailsForm.value.message
        }
      };

      console.log(taxAndDetails);
      this.taxService.newTax(taxAndDetails).subscribe(
        (respsone : TaxAndDetails) => {
          console.log(respsone);
          this.dialogRef.close(this.taxAndDetailsForm.value);
        }, (error) => {
          console.log(error);
        }
      );
      
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

