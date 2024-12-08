import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { UserService } from '../../services/user.service';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';

@Component({
  selector: 'app-veiw-remove-member',
  templateUrl: './veiw-remove-member.component.html',
  styleUrl: './veiw-remove-member.component.scss'
})
export class VeiwRemoveMemberComponent {
  user!: CustomUserDetails;
  isRemove: boolean = false;

  constructor(private userService: UserService,
    private dialog: MatDialog,
    private matDialogRef: MatDialogRef<VeiwRemoveMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.user = data.customUserDetails;
    this.isRemove = data.type == 'remove';
  }

  getRoles(): string[] {
    return this.user.customUser.roles.split(',');
  }

  close() {
    this.matDialogRef.close();
  }


  public remove(): void {

    this.userService.removeUser(this.user.customUser.username).subscribe(
      (response) => {
        //console.log(response);
        const data = {
          title: 'Member Removed successfully',
          message: `${this.user.customUser.username} has been Deleted from Database..!`,
          action: 'success'
        }

        this.dialog.open(SuccessDialogComponent, { data: data })
          .afterClosed()
          .subscribe(res => {
            if (res === 'close') {
              this.matDialogRef.close('success');
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
