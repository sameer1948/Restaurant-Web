import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tax-fee',
  templateUrl: './add-tax-fee.component.html',
  styleUrl: './add-tax-fee.component.scss'
})
export class AddTaxFeeComponent {

  taxAndFeeForm : FormGroup;
  userName : string = 'NA';

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaxFeeComponent>) {
    this.taxAndFeeForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(4)]],
        percentage: ['', Validators.required],
        status: ['', Validators.required],
        addedBy: [this.userName, Validators.required],
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

