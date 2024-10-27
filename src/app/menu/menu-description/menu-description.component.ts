import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';

@Component({
  selector: 'app-menu-description',
  templateUrl: './menu-description.component.html',
  styleUrl: './menu-description.component.scss'
})
export class MenuDescriptionComponent {

  id: number = 0;
  item: string = '';
  qty: string = '';
  price: number = 0;
  description: string = '';
  itemPngPath: string = 'https://via.placeholder.com/150?text=Item';
  
  constructor(public dialogRef: MatDialogRef<MenuDescriptionComponent>,
     @Inject(MAT_DIALOG_DATA) public data: MenuList) {}

 
  onAdd(): void {    
    this.dialogRef.close('success');
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
