import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMenuComponent } from '../../menu/add-menu/add-menu.component';
import { ModifyMenuComponent } from '../../menu/modify-menu/modify-menu.component';
import { RemoveMenuComponent } from '../../menu/remove-menu/remove-menu.component';
import { MatTableDataSource } from '@angular/material/table';
import { MenuList } from '../../model/MenuList';
import { ArrayDataSource } from '@angular/cdk/collections';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit {
onSearchClear() {

}
applyFilter() {

}
    
  displayedColumns: string[] = ['id', 'item', 'qty', 'price', 'itemPngPath'];
  searchKey: string = '';
  listData : any; 
  items = [  
    { name: 'Item 1' },  
    { name: 'Item 2' },  
    { name: 'Item 1' },  
    { name: 'Item 2' },  { name: 'Item 1' },  
    { name: 'Item 2' },  { name: 'Item 1' },  
    { name: 'Item 2' },  { name: 'Item 1' },  
    { name: 'Item 2' },  { name: 'Item 1' },  
    { name: 'Item 2' },  { name: 'Item 1' },  
    { name: 'Item 2' },  
    { name: 'Item 3' }  
   ]; 

   
   searchTerm = '';  
  currentPage = 1;  
  itemsPerPage = 10;  
  startIndex = 0;  
  endIndex = this.itemsPerPage; 
  filteredItems = this.items;

  searchItems(): void {  
    this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));  
    this.currentPage = 1;  
    this.startIndex = 0;  
    this.endIndex = this.itemsPerPage;  
   }  
 

  prevPage(): void {  
    if (this.currentPage > 1) {  
     this.currentPage--;  
     this.startIndex = (this.currentPage - 1) * this.itemsPerPage;  
     this.endIndex = this.startIndex + this.itemsPerPage;  
    } 
  
  }

  nextPage(): void {  
    if (this.currentPage < Math.ceil(this.items.length / this.itemsPerPage)) {  
     this.currentPage++;  
     this.startIndex = (this.currentPage - 1) * this.itemsPerPage;  
     this.endIndex = this.startIndex + this.itemsPerPage;  
    }  
   }  
 
   
   addItem(): void {  
    console.log('Add new item');  
   
   }  
   
   deleteItem(item: any): void {  
    console.log('Delete item:', item);  
   
   }  

   editItem(item: any): void {  
    console.log('Edit item:', item);  
   
   
  }
  
  
  constructor(private _adminService : AdminService,
    private _matDialog : MatDialog,){}

  ngOnInit(): void {
    this._adminService.getAllItems().subscribe(
      (data) => {
        this.menu(data);
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    );
  }

menu(menuItems : Array<MenuList>) {
  this.listData = new MatTableDataSource(menuItems);
}

  addToMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(AddMenuComponent, matDialogConfig);
    

  }

  modifyFromMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(ModifyMenuComponent, matDialogConfig);

  }

  removeFromMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(RemoveMenuComponent, matDialogConfig);

  }
 


}
