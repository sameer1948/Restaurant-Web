import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';
import { MenuService } from '../../services/menu.service';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrl: './remove-menu.component.scss'
})
export class RemoveMenuComponent {
  
  localImagePath: any = 'assets/images/no-image.jpg';

  constructor(private dialog: MatDialog,
    private menuService : MenuService,
    private matDialogRef :  MatDialogRef<RemoveMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuList) { }


  public onRemove() : void {

    this.menuService.removeItemInMenu(this.data.id ?? '').subscribe(
      (response) => {
        console.log(response);        
        const data = {
          title : 'Menu Removed successfully',
          message :   `Menu Id : ${this.data.id}  has been Removed from Database.`,
          action : 'success'
        }

        this.dialog.open(SuccessDialogComponent, {data: data})
        .afterClosed()
        .subscribe(res => {
          if (res === 'close') {          
            this.matDialogRef.close('success');
          }
        });

      }, (error) => {        
        console.log(error)
        const data = {
          title : `Error `,
          message : `Something Went Wrong...! <br>Please try Later`,
          action : 'close'
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

  onCancel() {
    this.matDialogRef.close();
  }
}