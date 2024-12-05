import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/Order';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewCancelOrderComponent } from '../view-cancel-order/view-cancel-order.component';


@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrl: './order-home.component.scss'  
})
export class OrderHomeComponent implements OnInit , AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['id', 'orderDate', 'totalPrice', 'orderBy', 'orderStatus', 'actions'];

  readonly pageSize : number = 5;
  readonly pageSizes : number[] = [5, 10, 20, 25, 50];

  searchQuery: string = '';

  lastFiveOrders : Order[] = [];

  dataSource = new MatTableDataSource<Order>();

  constructor(private orderService : OrderService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (response : Order[]) => {
        this.dataSource.data = response;
        this.lastFiveOrders = response
        .sort((a, b) => {
          const dateA = a.orderDate ? new Date(a.orderDate).getTime() : 0; 
          const dateB = b.orderDate ? new Date(b.orderDate).getTime() : 0; 
          return dateB - dateA; // Sorting in descending order
        })
        .slice(0, 5); // Take the first 5 after sorting
        //console.table(response);
      }, (error) => {}
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.dataSource.filter = query.trim().toLowerCase();
  }

  clearSearch() {
    this.searchQuery = ''; 
    this.applyFilter(); 
  }


  viewOrderDialog(order: Order) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = {order : order, type : 'open'}
    this.matDialog.open(ViewCancelOrderComponent, matDialogConfig)
  }

  updateOrderDialog(order: Order) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = {order : order, type : 'cancel'}
    this.matDialog.open(ViewCancelOrderComponent, matDialogConfig)
  }

  
}