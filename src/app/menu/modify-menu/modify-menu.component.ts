import { Component, Inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuList } from '../../model/MenuList';
import { MenuService } from '../../services/menu.service';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';

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
      quantity : new FormControl('', Validators.required),       
      price : new FormControl('', Validators.required),       
      description : new FormControl('', Validators.required),
      imagePath : new FormControl() 
    }) 
  }); 

  menuItems: Array<MenuList> = [];
  quantities: number[] = Array.from({ length: 100 }, (_, i) => (i + 1));
  selectedQty: number = 1;

  constructor(private menuService : MenuService, 
    private dialog: MatDialog,
    private matDialogRef :  MatDialogRef<ModifyMenuComponent>,
    @Inject(MAT_DIALOG_DATA) data: MenuList) {
      this.selected = data;
      this.onSelect()
    }
    
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected onSelect() {
    //console.log( this.selected);
    this.form.setValue({
      menuItem: {
        id : this.selected.id,
        item : this.selected.item,
        quantity : this.selected.quantity,
        price : this.selected.price,
        description : this.selected.description,
        imagePath : this.selected.imagePath,
      }
    });
    this.selectedQty = this.selected.quantity;
    console.log(this.selectedQty)
  }


  updateItem() {
    console.log(this.form.value);
    const menuList = new MenuList();

    menuList.item = this.form.value.menuItem?.item;
    menuList.quantity = this.form.value.menuItem?.quantity;
    menuList.price = this.form.value.menuItem?.price;
    menuList.description = this.form.value.menuItem?.description;
    menuList.imagePath = this.form.value.menuItem?.imagePath;

    this.menuService.modifyItemInMenu(menuList).subscribe(
      (response) => {
        //console.log(data);        
        const data = {
          title : 'Menu Updated successfully',
          message :   `Menu Id : ${response.id}  <br>Name : ${response.item} <br>Price:  ${response.price}`,
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

  onClose() {
    this.matDialogRef.close();
  }
}
