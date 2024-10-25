import { Component, Inject, Input } from '@angular/core';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrl: './update-member.component.scss'
})
export class UpdateMemberComponent {
  user!: CustomUserDetails;

  constructor(private matDialogRef :  MatDialogRef<UpdateMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data: CustomUserDetails){
    this.user = data;
  }

  getRoles(): string[] {
    return this.user.customUser.roles.split(','); 
  }

  close() {
    this.matDialogRef.close();
  }
}
