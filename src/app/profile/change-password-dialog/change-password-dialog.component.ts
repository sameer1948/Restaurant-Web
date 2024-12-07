import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {
  
  private secretKey = `${environment.secretKey}`;  // Secret Key for password decryption
  
  passwordForm: FormGroup;
  oldPassword: string;  // Decrypted old password

  showOldPassword: boolean = false; // Flag to toggle old password visibility
  showNewPassword: boolean = false; // Flag to toggle new password visibility
  showConfirmPassword: boolean = false; // Flag to toggle confirm password visibility

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private userService: UserService) {
    
    // Decrypt old password (provided in dialog data)
    this.oldPassword = this.decryptPassword(data.password);

    // Initialize the password form group
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{ value: '', disabled: true }, [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );

    // Listen for changes in old password field to validate it
    this.passwordForm.get('oldPassword')?.valueChanges.subscribe(() => {
      this.onOldPasswordChange();
    });
  }

  // Validator for password match (new password and confirm password)
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;
    return newPassword && confirmPassword && newPassword !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  }

  // Handle changes to old password field
  onOldPasswordChange(): void {
    const oldPassword = this.passwordForm.get('oldPassword')!.value;
    
    if (oldPassword === this.oldPassword) {
      // If old password matches, enable new password fields
      this.passwordForm.get('newPassword')!.enable();
      this.passwordForm.get('confirmPassword')!.enable();
      // Clear any previous errors on old password field
      this.passwordForm.get('oldPassword')!.setErrors(null);
    } else {
      // Disable new password fields if old password doesn't match
      this.passwordForm.get('newPassword')!.disable();
      this.passwordForm.get('confirmPassword')!.disable();
      // Set error on old password field
      this.passwordForm.get('oldPassword')!.setErrors({ incorrect: true });
    }
  }

  // Submit the form
  public onSubmit(): void {
    if (this.passwordForm.valid) {      
      // Get the new password values
      const { oldPassword, newPassword } = this.passwordForm.value;

      // Call user service to update password
      this.userService.updatePassword(oldPassword, newPassword).subscribe(
        (response) => {
          console.log(response);
          const data = {
            title: 'Password Changed Successfully',
            message: `Username: ${response.customUser.username} <br>Roles: ${response.customUser.roles}`,
            action: 'success'
          };

          // Open success dialog
          this.dialog.open(SuccessDialogComponent, { data: data })
            .afterClosed()
            .subscribe(res => {
              if (res === 'close') {
                this.dialogRef.close('success');
              }
            });
        }, 
        (error) => {
          console.log(error);
          const data = {
            title: 'Error',
            message: `Something went wrong... Please try again later.`,
            action: 'close'
          };

          // Open error dialog
          this.dialog.open(ErrorDialogComponent, {
            data: data,
            width: '400px',
            maxHeight: '80vh',
          });
        }
      );
    } else {
      // Mark all fields as touched to display validation errors
      this.passwordForm.markAllAsTouched();
    }
  }

  // Close the dialog
  onClose(): void {
    this.dialogRef.close();
  }

  // Decrypt the old password using XOR (ensure it's secure)
  private decryptPassword(encodedPassword: string): string {
    let decodedPassword = '';
    let keyIndex = 0;
    for (let i = 0; i < encodedPassword.length; i++) {
      decodedPassword += String.fromCharCode(encodedPassword.charCodeAt(i) ^ this.secretKey.charCodeAt(keyIndex));
      keyIndex = (keyIndex + 1) % this.secretKey.length; 
    }
    return decodedPassword;
  }

  // Toggle password visibility
  toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
