import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../common/notification.service';
import { MenuList } from '../../model/MenuList';
import { AdminService } from '../../services/admin.service';
import { ModifyMenuComponent } from '../modify-menu/modify-menu.component';

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrl: './remove-menu.component.scss'
})
export class RemoveMenuComponent implements OnInit {
  
  protected readonly value = signal('');

  form : FormGroup = new FormGroup({ 
    menuItem: new FormGroup({ 
      id : new FormControl(),
      item : new FormControl('', Validators.required),       
      qty : new FormControl('', Validators.required),       
      price : new FormControl('', Validators.required),       
      itemPngPath : new FormControl() 
    }) 
  }); 

  menuItems: Array<MenuList> = [];
  quantities : string[] = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"];
  selected: any;
  selectedQty: any;

  constructor(private _notificationService : NotificationService,
    private _adminService : AdminService, 
    private _matDialogRef :  MatDialogRef<ModifyMenuComponent>,) {}

  ngOnInit(): void {
    
    this._adminService.getAllItems().subscribe(
      (result) => {
        this.menuItems = result;
      }, (error) => {
        this._notificationService.errorMessage("Error While Fetching Records...!");
      }
    );

  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected onSelect() {
    console.log( this.selected);
    this.form.setValue({
      menuItem: {
        id : this.selected.id,
        item : this.selected.item,
        qty : this.selected.qty,
        price : this.selected.price,
        itemPngPath : this.selected.itemPngPath,

      }
    });
    this.selectedQty = this.selected.qty;
  }


  removeItem() {
    console.log(this.form.value);
    // const menuList = new MenuList();

    // menuList.item = this.form.value.menuItem?.item;
    // menuList.qty = this.form.value.menuItem?.qty;
    // menuList.price = this.form.value.menuItem?.price;
    // menuList.itemPngPath = this.form.value.menuItem?.itemPngPath;

    this._adminService.removeItemInMenu(this.form.value.menuItem?.id).subscribe(
      (data) => {
        console.log(data);
        this.onClose();
        this._notificationService.successMessage("Sucess");

      }, (error) => {
        this._notificationService.errorMessage("Something went wrong while Updating Menu...!")
      }
    );
  
  }

  onClose() {
    this._matDialogRef.close();
  }
}