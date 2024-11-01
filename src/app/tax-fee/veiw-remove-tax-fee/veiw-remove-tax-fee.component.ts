import { Component, Inject } from '@angular/core';
import { TaxAndFee } from '../../model/TaxAndFee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-veiw-remove-tax-fee',
  templateUrl: './veiw-remove-tax-fee.component.html',
  styleUrl: './veiw-remove-tax-fee.component.scss'
})
export class VeiwRemoveTaxFeeComponent {

  isRemove : boolean = false;
  taxAndFee !: TaxAndFee;  
  taxAndFeeForm : FormGroup;
  userName : string = 'NA';

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<VeiwRemoveTaxFeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.taxAndFee = data.taxAndFee;
      this.isRemove = data.type == 'remove';
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
