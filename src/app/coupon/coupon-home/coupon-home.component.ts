import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from '../../model/Coupon';
import { CouponAddComponent } from '../coupon-add/coupon-add.component';
import { CouponViewRemoveComponent } from '../coupon-view-remove/coupon-view-remove.component';
import { CouponUpdateComponent } from '../coupon-update/coupon-update.component';

@Component({
  selector: 'app-coupon-home',
  templateUrl: './coupon-home.component.html',
  styleUrl: './coupon-home.component.scss'
})
export class CouponHomeComponent implements OnInit , AfterViewInit {

  readonly pageSize : number = 5;
  readonly pageSizes : number[] = [5, 10, 20, 25];

  searchQuery: string = '';
  

  displayedColumns: string[] = ['code', 'description', 'amount', 'percentage', 'endDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Coupon>();
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  coupons: Coupon[] = generateCoupons(50);
  popularCoupons: Coupon[] = generateCoupons(10);  

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.coupons;
   
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  sortData() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => a.amount - b.amount);
  } 


  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.dataSource.filter = query.trim().toLowerCase();
  }

  clearSearch() {
    this.searchQuery = ''; 
    this.applyFilter(); 
  }


  openDialog(action: string, coupon?: Coupon): void {

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    //matDialogConfig.data = coupon;
    this.matDialog.open(CouponAddComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        console.log(response)
      }
    });
  }


  viewCouponDialog(coupon: Coupon) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = {coupon : coupon, type : 'open'}
    this.matDialog.open(CouponViewRemoveComponent, matDialogConfig)
  }

  updateCouponDialog(coupon: Coupon) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = coupon;
    this.matDialog.open(CouponUpdateComponent, matDialogConfig)
  }

  deleteCouponDialog(coupon: Coupon) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = {coupon : coupon, type : 'remove'}
    this.matDialog.open(CouponViewRemoveComponent, matDialogConfig)
  }


}


function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean(): boolean {
  return Math.random() < 0.5; // Randomly returns true or false
}

function getRandomDate(start: Date, end: Date): Date {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date;
}

function generateCoupons(count: number): Coupon[] {
  const coupons: Coupon[] = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const coupon: Coupon = {
      id: i,
      code: `SAVE${getRandomInt(10, 99)}`, // e.g., SAVE10, SAVE25
      description: `Save ${getRandomInt(5, 50)}% on your next purchase!`,
      amount: getRandomInt(5, 100), // Random amount between 5 and 100
      percentage: getRandomInt(5, 50), // Random percentage between 5% and 50%
      maxAmount: getRandomInt(50, 200), // Maximum amount discount
      startDate: getRandomDate(new Date(now.getFullYear(), now.getMonth(), 1), now), // Random date in the current month
      endtDate: getRandomDate(now, new Date(now.getFullYear(), now.getMonth() + 1, 30)), // Random date in the next month
      isAmount: getRandomBoolean(),
      ispercentage: getRandomBoolean(),
      status: true, // Set active for all generated coupons
      addedBy:'Sameer'
    };

    coupons.push(coupon);
  }

  return coupons;
}

// Generate 50 coupons
