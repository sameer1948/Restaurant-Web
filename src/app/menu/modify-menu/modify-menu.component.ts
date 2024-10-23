import { Component, Inject, signal } from '@angular/core';
import { NotificationService } from '../../common/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-modify-menu',
  templateUrl: './modify-menu.component.html',
  styleUrl: './modify-menu.component.scss'
})
export class ModifyMenuComponent {

  protected readonly value = signal('');
  
  selected: MenuList = new MenuList();

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
  selectedQty: any;

  constructor(private _notificationService : NotificationService,
    private menuService : MenuService, 
    private _matDialogRef :  MatDialogRef<ModifyMenuComponent>,
    @Inject(MAT_DIALOG_DATA) data: MenuList) {
      this.selected = data;
      this.onSelect()
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


  updateItem() {
    console.log(this.form.value);
    const menuList = new MenuList();

    menuList.item = this.form.value.menuItem?.item;
    menuList.qty = this.form.value.menuItem?.qty;
    menuList.price = this.form.value.menuItem?.price;
    menuList.itemPngPath = this.form.value.menuItem?.itemPngPath;

    this.menuService.modifyItemInMenu(menuList).subscribe(
      (data) => {
        console.log(data);        
        this._notificationService.successMessage("Sucess");
        this._matDialogRef.close('sucess');

      }, (error) => {
        this._notificationService.errorMessage("Something went wrong while Updating Menu...!")
      }
    );
  }

  onClose() {
    this._matDialogRef.close();
  }
}
