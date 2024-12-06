import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuList } from '../../model/MenuList';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../common/notification.service';
import { MenuService } from '../../services/menu.service';

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
      quantity : new FormControl('', Validators.required),       
      price : new FormControl('', Validators.required),       
      description : new FormControl('', Validators.required),
      imagePath : new FormControl() 
    }) 
  }); 

  quantities: number[] = Array.from({ length: 100 }, (_, i) => (i + 1));
  
  selectedQty: any;

  constructor(private menuService : MenuService,
    private _matDialogRef :  MatDialogRef<AddMenuComponent>,
    private _notificationService : NotificationService) {}
  
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  addItem() : void {
    //console.log(this.form.value);
    const menuList = new MenuList();

    menuList.item = this.form.value.menuItem?.item;
    menuList.quantity = this.selectedQty;
    menuList.price = this.form.value.menuItem?.price;
    menuList.description = this.form.value.menuItem?.description;
    menuList.imagePath = this.form.value.menuItem?.imagePath;

    this.menuService.addItemToMenu(menuList).subscribe(
      (data) => {
        //console.log(data);        
        this._notificationService.successMessage("Sucess");
        this._matDialogRef.close('success');

      }, (error) => {        
        this._notificationService.errorMessage("Something went wrong while Inserting Menu...!")
      }
    );
        
  }

  onClose() {
    this.form.reset({
      menuItem: {
        item : '',
        quantity : '',
        price : 0,
        imagePath : ''
      }
    });
    this._matDialogRef.close();
  }

}
