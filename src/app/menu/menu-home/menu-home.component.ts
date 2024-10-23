import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuService } from '../../services/menu.service';
import { MenuList } from '../../model/MenuList';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { ModifyMenuComponent } from '../modify-menu/modify-menu.component';
import { RemoveMenuComponent } from '../remove-menu/remove-menu.component';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit {
  
  searchTerm: string = '';  
  currentPage: number = 1;  
  itemsPerPage: number = 5;  
  items: MenuList[] = [];
  filteredItems: MenuList[] = [];

  constructor(private menuService: MenuService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getAllItems().subscribe(
      (menuList: MenuList[]) => {
        this.items = menuList;
        this.filteredItems = menuList; // Initialize filtered items
        this.updatePagination();
      },
      (error) => {
        console.error('Failed to load menu items', error);
      }
    );   
  }

  setItemsPerPage(value: number): void {
    this.itemsPerPage = value;
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  searchItems(): void {
    this.filteredItems = this.items.filter(item => 
        item.item.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (item.qty !== null && item.qty.toString().includes(this.searchTerm)) ||
        (item.price !== null && item.price.toString().includes(this.searchTerm)) ||
        (item.itemPngPath && item.itemPngPath.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
    this.currentPage = 1; // Reset to first page after search
    this.updatePagination();
  }


  clearSearch(): void {
    this.searchTerm = '';
    this.filteredItems = this.items;
    this.currentPage = 1; 
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredItems.length);
    return { startIndex, endIndex }; // Calculate indices for pagination
  }

  getPaginatedItems(): MenuList[] {
    const { startIndex, endIndex } = this.updatePagination();
    return this.filteredItems.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.filteredItems.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  addItem(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this.matDialog.open(AddMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after addition
      }
    });
  }

  editItem(item: MenuList): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    matDialogConfig.data = item;    
    this.matDialog.open(ModifyMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after modification
      }
    });
  }

  deleteItem(item: MenuList): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "25%";
    matDialogConfig.data = item;    
    this.matDialog.open(RemoveMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after deletion
      }
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { MenuService } from '../../services/menu.service';
// import { MenuList } from '../../model/MenuList';
// import { AddMenuComponent } from '../add-menu/add-menu.component';
// import { ModifyMenuComponent } from '../modify-menu/modify-menu.component';
// import { RemoveMenuComponent } from '../remove-menu/remove-menu.component';

// @Component({
//   selector: 'app-menu-home',
//   templateUrl: './menu-home.component.html',
//   styleUrls: ['./menu-home.component.scss']
// })
// export class MenuHomeComponent implements OnInit {
  
//   searchTerm: string = '';  
//   currentPage: number = 1;  
//   itemsPerPage: number = 5;  
//   startIndex: number = 0;  

//   items : MenuList[] = [];

//   endIndex: number = this.itemsPerPage; 
//   filteredItems: MenuList[] = this.items;
  
//   constructor(private menuService : MenuService,
//      private matDialog : MatDialog,){}

     
//   ngOnInit(): void {
//     this.menuService.getAllItems().subscribe(
//       (menuList : MenuList[]) => {        
//         this.items = menuList;
//         console.log(menuList);
//       }, (error) => {
//         console.log(error);
//       }
//     );   
//   }

//   setItemsPerPage(value: number): void {
//     this.itemsPerPage = value;
//     this.currentPage = 1; // Reset to first page
//     this.updatePagination();
//   }

//   searchItems(): void {
//     this.filteredItems = this.items.filter(item =>
//       item.item.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//     this.currentPage = 1; // Reset to first page after search
//     this.updatePagination();
//   }

//   clearSearch(): void {
//     this.searchTerm = '';
//     this.filteredItems = this.items;
//     this.currentPage = 1; 
//     this.updatePagination();
//   }

//   updatePagination(): void {    
//     this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.filteredItems.length);
//   }

//   prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }

//   nextPage(): void {
//     if (this.currentPage < Math.ceil(this.filteredItems.length / this.itemsPerPage)) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }

//   addItem(): void {
//     const matDialogConfig = new MatDialogConfig()
//     matDialogConfig.disableClose = true;
//     matDialogConfig.autoFocus = true;
//     matDialogConfig.width = "60%";
//     let result = this.matDialog.open(AddMenuComponent, matDialogConfig);
//     result.afterClosed().subscribe(
//       (response) => {
//         if(response === 'success'){
//           console.log(response)
//         }          
//       }
//     );
   
//   }


//   editItem(item: MenuList): void {
//     const matDialogConfig = new MatDialogConfig()
//     matDialogConfig.disableClose = true;
//     matDialogConfig.autoFocus = true;
//     matDialogConfig.width = "60%";
//     matDialogConfig.data = item;    
//     let result = this.matDialog.open(ModifyMenuComponent, matDialogConfig);
//     result.afterClosed().subscribe(
//       (response) => {
//         if(response === 'success'){
//           console.log(response)
//         }          
//       }
//     );
//   }

//   deleteItem(item: MenuList): void {
//     console.log('Delete item:', item);
//     const matDialogConfig = new MatDialogConfig()
//     matDialogConfig.disableClose = true;
//     matDialogConfig.autoFocus = true;
//     matDialogConfig.width = "25%";
//     matDialogConfig.data = item;    
//     let result = this.matDialog.open(RemoveMenuComponent, matDialogConfig);
//     result.afterClosed().subscribe(
//       (response) => {
//         if(response === 'success'){
//           console.log(response)
//         }
          
//       }
//     );
//   }

// }




// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-menu-home',
//   templateUrl: './menu-home.component.html',
//   styleUrl: './menu-home.component.scss'
// })
// export class MenuHomeComponent {

//   searchTerm : string = '';  
//   currentPage : number = 1;  
//   itemsPerPage : number = 5;  
//   startIndex : number = 0;  

//   items = [  
//     { item : "idly-2", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-3", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-4", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-5", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-6", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-7", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-8", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},
//     { item : "idly-2", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-3", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-4", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-5", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-6", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-7", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-8", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},   
//     { item : "idly-3", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-4", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-5", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-6", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-7", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-8", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-3", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-4", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-5", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-6", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-7", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//     { item : "idly-8", qty : "2", price : 20, itemPngPath : "src/main/resources/static/idly.png"},  
//    ]; 

//   endIndex = this.itemsPerPage; 
//   filteredItems = this.items;

//   // Update items per page
//   public setItemsPerPage(value: number): void {
//     this.itemsPerPage = value;
//     this.currentPage = 1; // Reset to first page
//     this.updatePagination();
//   }

//   // Search items
//   public searchItems(): void {
//     this.filteredItems = this.items.filter(item =>
//       item.item.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//     console.log(this.filteredItems)
//     this.currentPage = 1; // Reset to first page after search
//     this.updatePagination();
//   }

//   public clearSearch() : void {
//     this.searchTerm = '';
//     this.startIndex = 0;
//     this.endIndex = this.itemsPerPage; 
//     this.updatePagination();
//   }

//   // Update pagination based on current page and items per page
//   public updatePagination(): void {
//     this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.filteredItems.length);
//   }

//   // Navigate to previous page
//   public prevPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }

//   // Navigate to next page
//   public nextPage(): void {
//     if (this.currentPage < Math.ceil(this.filteredItems.length / this.itemsPerPage)) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }


//   addItem(): void {  
//     console.log('Add new item');  
   
//    }  
   
//    deleteItem(item: any): void {  
//     console.log('Delete item:', item);  
   
//    }  

//    editItem(item: any): void {  
//     console.log('Edit item:', item);  
   
//   }
  

  
 
// }