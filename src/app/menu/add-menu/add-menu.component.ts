import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuList } from '../../model/MenuList';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from '../../services/menu.service';
import { SuccessDialogComponent } from '../../common/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../common/error-dialog/error-dialog.component';

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
      quantity : new FormControl('', [Validators.required, Validators.min(1)]),       
      price : new FormControl('', [Validators.required, Validators.min(1)]),       
      description : new FormControl('', Validators.required),
      imagePath : new FormControl() 
    }) 
  }); 

  quantities: number[] = Array.from({ length: 100 }, (_, i) => (i + 1));
  
  selectedQty: any;

  constructor(private menuService : MenuService,
    private dialog: MatDialog,
    private matDialogRef :  MatDialogRef<AddMenuComponent>,) {}
  
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  addItem() : void {
    //console.log(this.form.value);
    const menuList = new MenuList();

    menuList.item = this.form.value.menuItem?.item;
    menuList.quantity = this.form.value.menuItem?.quantity;
    menuList.price = this.form.value.menuItem?.price;
    menuList.description = this.form.value.menuItem?.description;
    menuList.imagePath = this.form.value.menuItem?.imagePath;

    this.menuService.addItemToMenu(menuList).subscribe(
      (response) => {
        //console.log(data);        
        const data = {
          title : 'Menu Created successfully',
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
    this.form.reset({
      menuItem: {
        item : '',
        quantity : '',
        price : 0,
        imagePath : ''
      }
    });
    this.matDialogRef.close();
  }

}
