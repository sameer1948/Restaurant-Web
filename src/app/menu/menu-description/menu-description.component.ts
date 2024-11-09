import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';

@Component({
  selector: 'app-menu-description',
  templateUrl: './menu-description.component.html',
  styleUrl: './menu-description.component.scss'
})
export class MenuDescriptionComponent {  

  menu: MenuList = new MenuList;
  localImagePath: any = 'assets/images/no-image.jpg';

  constructor(public dialogRef: MatDialogRef<MenuDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MenuList) {
    this.menu = data;
    console.table(this.menu)
  }


  onAdd(): void {
    this.dialogRef.close('success');
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
