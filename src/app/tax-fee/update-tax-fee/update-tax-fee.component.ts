import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';
import { TaxAndDetails } from '../../model/TaxAndDetails';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { TaxService } from '../../services/tax.service';


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
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<UpdateTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private decryptService: EncryptDecryptService,
    private taxService: TaxService) {

    const encryptedUserName = sessionStorage.getItem(decryptService.encrypt(this.USER_NAME));
    this.userName = decryptService.decrypt(encryptedUserName ?? '') ?? 'N/A';

    const message = ` ; This is Modified By ${this.userName}`;

    this.taxAndDetails = data;
    this.taxAndDetailsForm = this.fb.group(
      {
        taxId : this.taxAndDetails.tax.taxId,
        taxType: [this.taxAndDetails.tax.taxType, Validators.required],
        value: [this.taxAndDetails.tax.value, Validators.required],
        status: [this.taxAndDetails.tax.status ? 'Enabled' : 'Disabled', Validators.required],
        memberName: [this.userName, Validators.required],
        message: [this.taxAndDetails.taxDetails.message + message, Validators.required],
      }
    );
  }

  public updateStatus(selectedStatus: string): void {
    this.taxAndDetailsForm.patchValue({ status: selectedStatus });
  }

  onSubmit(): void {
    if (this.taxAndDetailsForm.valid) {
      const taxAndDetails: TaxAndDetails = {
        tax: {
          taxId : this.taxAndDetailsForm.value.taxId,
          taxType: this.taxAndDetailsForm.value.taxType,
          value: this.taxAndDetailsForm.value.value,
          status: this.taxAndDetailsForm.value.status === 'Enabled' ? true : false,
        },
        taxDetails: {
          taxId : this.taxAndDetailsForm.value.taxId,
          memberName: this.taxAndDetailsForm.value.memberName,
          message: this.taxAndDetailsForm.value.message,
          timeStamp : new Date()

        }
      };

      //console.log(taxAndDetails);
      this.taxService.updateTax(taxAndDetails).subscribe(
        (respsone: TaxAndDetails) => {
          const item = respsone.tax;
          const data = {
            title: 'Tax Item Updated successfully',
            message: `Tax Id : ${item.taxId}  <br>Name : ${item.taxType} <br>value:  ${item.value}`,
            action: 'success'
          }

          this.dialog.open(SuccessDialogComponent, { data: data })
            .afterClosed()
            .subscribe(res => {
              if (res === 'close') {
                this.dialogRef.close('success');
              }
            });
        }, (error) => {
          console.log(error)
          const data = {
            title: `Error `,
            message: `Something Went Wrong...! <br>Please try Later`,
            action: 'close'
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
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
