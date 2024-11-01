import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxAndFee } from '../../model/TaxAndFee';

@Component({
  selector: 'app-update-tax-fee',
  templateUrl: './update-tax-fee.component.html',
  styleUrl: './update-tax-fee.component.scss'
})
export class UpdateTaxFeeComponent {

  taxAndFee !: TaxAndFee;  
  taxAndFeeForm : FormGroup;
  userName : string = 'NA';

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: TaxAndFee) {
      this.taxAndFee = data;      
      this.taxAndFeeForm = this.fb.group(
        {
          name: [this.taxAndFee.name, Validators.required],       
          percentage: [this.taxAndFee.percentage, Validators.required],         
          status: [this.taxAndFee.status? 'Enabled' : 'Disabled', Validators.required],
          addedBy: [this.taxAndFee.addedBy, Validators.required],
        }
      );
  }

  public updateStatus(selectedStatus: string) : void {
    this.taxAndFeeForm.patchValue({ status: selectedStatus });
  }

  onSubmit(): void {
    if (this.taxAndFeeForm.valid) {
      // Submit the form data to the database
      console.log(this.taxAndFeeForm.value);
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
