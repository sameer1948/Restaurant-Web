import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../common/notification.service';
import { MenuList } from '../../model/MenuList';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrl: './remove-menu.component.scss'
})
export class RemoveMenuComponent {

  constructor(private notificationService : NotificationService,
    private menuService : MenuService,
    private matDialogRef :  MatDialogRef<RemoveMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuList) { }

  
  public onRemove() : void {
    this.menuService.removeItemInMenu(this.data.id).subscribe(
      (response) => {
        this.notificationService.successMessage(this.data.item + " Removed Successfully");
        this.matDialogRef.close('success');
      }, (error) => {
        this.notificationService.errorMessage('Something went wrong');
      }
    )  
  }

  onCancel() {
    this.matDialogRef.close();
  }
}