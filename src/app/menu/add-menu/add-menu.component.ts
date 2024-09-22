import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuList } from '../../model/MenuList';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../common/notification.service';
import e from 'express';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.scss'
})
export class AddMenuComponent {

  protected readonly value = signal('');

  form : FormGroup = new FormGroup({ 
    menuItem: new FormGroup({ 
      item : new FormControl('', Validators.required),       
      qty : new FormControl('', Validators.required),       
      price : new FormControl('', Validators.required),       
      path : new FormControl() 
    }) 
  }); 

  quantities : string[] = ["1","2","3","4","5","6","7","8","9","10"]; //,11,12,13,14,15,16,17,18,19,20];
  
  selectedQty: any;

  constructor(private _adminService : AdminService,
    private _matDialogRef :  MatDialogRef<AddMenuComponent>,
    private _notificationService : NotificationService) {}
  
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  addItem() : void {
    console.log(this.form.value);
    const menuList = new MenuList();

    menuList.item = this.form.value.menuItem?.item;
    menuList.qty = this.selectedQty;
    menuList.price = this.form.value.menuItem?.price;
    menuList.itemPngPath = this.form.value.menuItem?.path;

    this._adminService.addItemToMenu(menuList).subscribe(
      (data) => {
        console.log(data);
        this.onClose();
        this._notificationService.successMessage("Sucess");

      }, (error) => {
        this._notificationService.errorMessage("Something went wrong while Inserting Menu...!")
      }
    );
    
  }

  onClose() {
    this.form.reset();
    // this.form.setValue({
    //   item : '',
    //   qty : '',
    //   price :'',
    //   path : ''
    // });
    this._matDialogRef.close();
  }

}
