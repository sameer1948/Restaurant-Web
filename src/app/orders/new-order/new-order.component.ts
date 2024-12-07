import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuDescriptionComponent } from '../../menu/menu-description/menu-description.component';
import { CreateOrderComponent } from '../create-order/create-order.component';
import { MenuList } from '../../model/MenuList';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
  animations: [
    trigger('itemAdded', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NewOrderComponent {

  menuItems: MenuList[] = [];
  filteredItems: MenuList[] = [];
  pageSize: number = 9;
  pageIndex: number = 0;
  order: { [key: string]: number } = {}; // Key is string (id)
  itemsSelected: boolean = false;
  searchQuery: string = '';
  sortOrder: string = 'name'; // Default sort order
  
  localImagePath: any = 'assets/images/no-image.jpg';

  isLoading: boolean = true;  
  isError: boolean = false;  
  errorMessage: string = ''; 

  constructor(private matDialog : MatDialog, private menuService : MenuService) {}

  ngOnInit() {
    //this.menuItems = this.generateSampleMenuItems(250);
    //this.filteredItems = [...this.menuItems];  // Initialize filteredItems

    this.initialize();
  }

  initialize() {
    this.isLoading = true;  
    this.isError = false;
    this.errorMessage = ''; 

    this.menuService.getAllItems().subscribe(
      (menuList: MenuList[]) => {
        this.isLoading = false;  
        if (menuList.length === 0) {
          this.isError = true;
          this.errorMessage = 'No data found';
        } else {
          this.menuItems = menuList;
          this.filteredItems = [...this.menuItems];  // Initialize filteredItems
        }
      },
      (error) => {
        this.isLoading = false;  
        this.isError = true;
        if (error.status === 404) {
          this.errorMessage = 'Menu items not found (404)';
        } else if (error.status === 403) {
          this.errorMessage = 'Access denied (403)';
        } else {
          this.errorMessage = 'Failed to load menu items. Please try again later.';
        }
      }
    );
  }
  
  // Generates sample menu items
  generateSampleMenuItems(count: number): MenuList[] {
    const items: MenuList[] = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        id: `MENU${String(i).padStart(5, '0')}`, // Ensure IDs are like MENU00001, MENU00002, etc.
        item: `Item ${i}`,
        description: `ORDER ${i}`,
        price: Math.floor(Math.random() * 100) + 10,
        imagePath: `https://via.placeholder.com/150?text=Item+${i}`,
        quantity: 1
      });
    }
    return items;
  }

  // Update filtered items based on search query
  updateFilteredItems() {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.menuItems.filter(item =>
      item.item.toLowerCase().includes(query) || item.id?.toLowerCase().includes(query)  // Search by item name or ID
    );
    this.sortItems(); // Sort after filtering
    this.pageIndex = 0; // Reset to first page after filtering
  }

  clearSearch() {
    this.searchQuery = ''; // Reset the search term
    this.updateFilteredItems(); // Show all items
  }

  // Sort items based on the selected sort order (name or price)
  sortItems() {
    if (this.sortOrder === 'name') {
      this.filteredItems.sort((a, b) => a.item.localeCompare(b.item));
    } else if (this.sortOrder === 'price') {
      this.filteredItems.sort((a, b) => a.price - b.price);
    }
  }

  // Handle pagination change (page size, page index)
  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Get paginated items for display
  get paginatedItems(): MenuList[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  // Get selected items from the order
  getSelectedItems() {
    const selectedItems = Object.keys(this.order)
      .filter(key => this.order[key] > 0)
      .map(key => {
        const item = this.menuItems.find(item => item.id === key); // key is string, so comparison works
        return item ? { item, quantity: this.order[key] } : null;
      })
      .filter(item => item !== null);

    //console.log(selectedItems); // For debugging
    return selectedItems;
  }

  // Submit the order and calculate the total
  submitOrder() {
    const selectedItems = this.getSelectedItems();

    if (selectedItems.length === 0) {
      console.log('No items selected for order.');
      return;
    }

    // Create an array to store the order output with menu item details
    const orderOutput = selectedItems
    .filter(item => item !== null)  // Filter out any null items
    .map(item => ({
      menuItem: {
        id: item?.item.id,  // Optional chaining to avoid null error
        name: item?.item.item,
        price: item?.item.price,
      },
      quantity: item?.quantity,  // Optional chaining for quantity
    })); 

    const totalAmount = orderOutput.reduce((total, order) => total + (order.menuItem?.price ?? 0) * (order?.quantity ?? 0), 0);
    

    //console.log('Order submitted:', orderOutput);
    //console.log('Total Amount:', totalAmount);

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '80%';    
    matDialogConfig.data = orderOutput;

    this.matDialog.open(CreateOrderComponent, matDialogConfig)
    .afterClosed()
    .subscribe(response => {      
      if (response === 'success') {        
        this.clearOrder()
      }
    });
  }

  // Add or update item quantity in the order
  addToOrder(itemId: string) {
    this.order[itemId] = (this.order[itemId] || 0) + 1;
    this.itemsSelected = true;
  }

  // Open the description dialog for a menu item
  openDesc(menuList: MenuList) {
    const matDialogConfig = new MatDialogConfig();    
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '70%';
    matDialogConfig.data = menuList;
    this.matDialog.open(MenuDescriptionComponent, matDialogConfig)
  }

  // Increase the quantity of an item
  increaseQuantity(itemId: string) {
    this.order[itemId] = (this.order[itemId] || 0) + 1;
  }

  // Decrease the quantity of an item
  decreaseQuantity(itemId: string) {
    if (this.order[itemId] > 1) {
      this.order[itemId]--;
    } else {
      delete this.order[itemId];
      if (Object.keys(this.order).length < 1) {
        this.clearOrder();
      }
    }
  }

  // Remove an item from the order
  removeItem(itemId: string) {
    delete this.order[itemId];
    if (Object.keys(this.order).length < 1) {
      this.clearOrder();
    }
  }

  get grandTotal() {
    return this.getSelectedItems()
      .filter(order => order !== null)  // Ensure we only work with valid orders
      .reduce((total, order) => {
        if (order?.item && order.quantity) {  // Check that order and order.item are not null
          return total + (order.item.price ?? 0) * order.quantity;  // Use nullish coalescing for price
        }
        return total;  // If order or order.item is null, skip this iteration
      }, 0);
  }
  

  // Clear the order (reset the cart)
  clearOrder() {
    this.order = {};
    this.itemsSelected = false;
  }

}