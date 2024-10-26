import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomUserDetails } from '../../model/CustomUserDetails';

@Component({
  selector: 'app-veiw-remove-member',
  templateUrl: './veiw-remove-member.component.html',
  styleUrl: './veiw-remove-member.component.scss'
})
export class VeiwRemoveMemberComponent {
  user!: CustomUserDetails;
  isRemove : boolean = false;

  constructor(private matDialogRef :  MatDialogRef<VeiwRemoveMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data: any){
    this.user = data.customUserDetails;
    this.isRemove = data.type == 'remove';
  }

  getRoles(): string[] {
    return this.user.customUser.roles.split(','); 
  }

  close() {
    this.matDialogRef.close();
  }

  remove() {    
    console.log(this.user)
    this.matDialogRef.close('success')
  }
}
