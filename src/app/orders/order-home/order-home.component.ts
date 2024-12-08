import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/Order';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewCancelOrderComponent } from '../view-cancel-order/view-cancel-order.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss'
})
export class OrderHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['id', 'orderDate', 'totalPrice', 'orderBy', 'orderStatus', 'actions'];

  readonly pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20, 25, 50];

  searchQuery: string = '';
  isLoading = false;
  isError = false;
  errorMessage: string | null = null;

  lastFiveOrders: Order[] = [];
  selectedOrderBy: string | null = null;
  orderbyList: string[] = [];
  orderByDate: Date | null = null;
  

  dataSource = new MatTableDataSource<Order>();

  constructor(private orderService: OrderService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializer();
  }

  initializer() {
    this.isLoading = true; // Start loading
    this.isError = false;
    this.errorMessage = null;
    this.orderService.getOrders().subscribe(
      (response: Order[]) => {
        this.isLoading = false;
        this.dataSource.data = response;
        this.orderbyList = [...new Set(response.map(order => order.orderBy))].sort();
        //console.log(this.orderbyList); 
        this.pageSizes = this.generatepageSizes(response.length, this.pageSize);
        this.lastFiveOrders = response
          .sort((a, b) => {
            const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0;
            const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0;
            return dateB - dateA; // Sorting in descending order
          })
          .slice(0, 5); // Take the first 5 after sorting
      }, (error) => {
        console.error('Error loading Orders', error);
        this.isLoading = false;
        this.isError = true
        this.errorMessage = `Error loading Orders`;
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  orderByFilter(username: string) {  
    this.selectedOrderBy = username; 
    this.dataSource.filter = username.trim().toLowerCase();
  }

  clearOrderBy() {  
    this.selectedOrderBy = null;
    this.applyFilter();
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    this.orderByDate = event.value;
    const dateObject = new Date(event.value ?? '');
    const formattedDate = this.formatDate(dateObject);

    console.log('Selected date:', this.orderByDate);
    console.log('Formatted date:', formattedDate);
    this.dataSource.filter = formattedDate.split(' ')[0].trim().toLowerCase();
  }

  // onDateSelected(event: MatDatepickerInputEvent<Date>) {
  //   this.orderByDate = event.value;
  //   const dateObject = new Date(event.value ?? '');
  //   const formattedDate = this.formatDate(dateObject);
  
  //   console.log('Selected date:', this.orderByDate);
  //   console.log('Formatted date:', formattedDate);
  
  //   // Set the filter predicate
  //   this.dataSource.filterPredicate = (data: Order, filter: string) => {
  //     const dateToCompare = this.formatDate(new Date(data.orderDate ?? 0)); 
  //     console.log('Comparing:', dateToCompare, 'with filter:', filter); 
  //     //return dateToCompare === filter;
  //     console.log('Comparing:', dateToCompare.replaceAll(' ', ''), 'with filter:', filter.replaceAll(' ', '')); 
  //     return dateToCompare.replaceAll(' ', '') === filter.replaceAll(' ', '');
  //   };
  
  //   // Set the filter to the formatted date
  //   //this.dataSource.filter = formattedDate.trim().toLowerCase();
  // }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const formattedDate = date.toLocaleString('en-IN', options);
    const [datePart, timePart] = formattedDate.split(', ');
    //return `${datePart}, ${timePart}`;
    return `${datePart}`;
  }

  clearOrderByDate() {
    this.orderByDate = null; // Clear the selected date
    this.clearSearch();
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.dataSource.filter = query.trim().toLowerCase();
  }

  clearSearch() {
    this.searchQuery = '';
    this.applyFilter();
  }

  generatepageSizes(size: number, increment: number): number[] {
    const result: number[] = [];
    for (let i = increment; i <= size; i += increment) {
      result.push(i);
    }
    return result;
  }

  viewOrderDialog(order: Order) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = { order: order, type: 'open' }
    this.matDialog.open(ViewCancelOrderComponent, matDialogConfig)
  }

  updateOrderDialog(order: Order) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = { order: order, type: 'cancel' }
    this.matDialog.open(ViewCancelOrderComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.initializer();
      }
    });
  }


}