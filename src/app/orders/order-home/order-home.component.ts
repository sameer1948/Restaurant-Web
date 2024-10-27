import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuDescriptionComponent } from '../../menu/menu-description/menu-description.component';
import { CreateOrderComponent } from '../create-order/create-order.component';

interface MenuItem {
  id: number;
  item: string;
  price: number;
  itemPngPath: string;
}

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss',
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
export class OrderHomeComponent {

  itemsSelectedHeader: string = 'Item      Price    Quantity      Actions';

  menuItems: MenuItem[] = [];
  filteredItems: MenuItem[] = [];
  pageSize: number = 9;
  pageIndex: number = 0;
  order: { [key: number]: number } = {};
  itemsSelected: boolean = false;
  searchQuery: string = '';
  sortOrder: string = 'name'; // Default sort order

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    this.menuItems = this.generateSampleMenuItems(250);
    this.filteredItems = [...this.menuItems]; // Initialize filtered items
  }

  generateSampleMenuItems(count: number): MenuItem[] {
    const items: MenuItem[] = [];
    for (let i = 1; i <= count; i++) {
      items.push({
        id: i,
        item: `Item ${i}`,
        price: Math.floor(Math.random() * 100) + 10,
        itemPngPath: `https://via.placeholder.com/150?text=Item+${i}`
      });
    }
    return items;
  }

  updateFilteredItems() {
    const query = this.searchQuery.toLowerCase();
    this.filteredItems = this.menuItems.filter(item =>
      item.item.toLowerCase().includes(query)
    );
    this.sortItems(); // Sort after filtering
    this.pageIndex = 0; // Reset to first page after filtering
  }

  clearSearch() {
    this.searchQuery = ''; // Reset the search term
    this.updateFilteredItems(); // Show all users
  }

  sortItems() {
    if (this.sortOrder === 'name') {
      this.filteredItems.sort((a, b) => a.item.localeCompare(b.item));
    } else if (this.sortOrder === 'price') {
      this.filteredItems.sort((a, b) => a.price - b.price);
    }
  }

  changePage(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedItems(): MenuItem[] {
    const start = this.pageIndex * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  getSelectedItems() {
    const selectedItems = Object.keys(this.order)
      .filter(key => this.order[+key] > 0)
      .map(key => ({
        item: this.menuItems.find(item => item.id === +key),
        quantity: this.order[+key],
      }));
    console.log(selectedItems); // Add this line
    return selectedItems;
  }

  submitOrder() {
    const selectedItems = this.getSelectedItems();

    if (selectedItems.length === 0) {
      console.log('No items selected for order.');
      return;
    }

    // Create an array to store the order output with menu item details
    const orderOutput = selectedItems.map(item => ({
      menuItem: {
        id: item.item!.id,
        name: item.item!.item,
        price: item.item!.price,
        imagePath: item.item!.itemPngPath
      },
      quantity: item.quantity
    }));

    const totalAmount = orderOutput.reduce(
      (total, order) => {
        return total + (order.menuItem.price * order.quantity);
      }, 0);

    // Log the order output and total amount to the console
    console.log('Order submitted:', orderOutput);
    console.log('Total Amount:', totalAmount);
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = orderOutput;
    this.matDialog.open(CreateOrderComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        console.log(response)
      }
    });
  }


  addToOrder(itemId: number) {
    this.order[itemId] = (this.order[itemId] || 0) + 1;
    this.itemsSelected = true;
  }

  openDesc(menuList: MenuItem) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = menuList;
    this.matDialog.open(MenuDescriptionComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.addToOrder(menuList.id);
      }
    });
  }

  increaseQuantity(itemId: number) {
    this.order[itemId] = (this.order[itemId] || 0) + 1;
  }

  decreaseQuantity(itemId: number) {
    if (this.order[itemId] > 1) {
      this.order[itemId]--;
    } else {
      delete this.order[itemId];
      if (Object.keys(this.order).length < 1) {
        this.clearOrder()
      }
    }
  }

  removeItem(itemId: number) {
    delete this.order[itemId];
    if (Object.keys(this.order).length < 1) {
      this.clearOrder()
    }
  }

  get grandTotal() {
    return this.getSelectedItems().reduce((total, { item, quantity }) => total + (item!.price * quantity), 0);
  }

  clearOrder() {
    this.order = {};
    this.itemsSelected = false;
  }

}