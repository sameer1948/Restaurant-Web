import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Coupon } from '../../model/Coupon';
import { CouponAddComponent } from '../coupon-add/coupon-add.component';
import { CouponViewRemoveComponent } from '../coupon-view-remove/coupon-view-remove.component';
import { CouponUpdateComponent } from '../coupon-update/coupon-update.component';
import { CouponService } from '../../services/coupon.service';
import { CouponAndDetails } from '../../model/CouponAndDetails';

@Component({
  selector: 'app-coupon-home',
  templateUrl: './coupon-home.component.html',
  styleUrl: './coupon-home.component.scss'
})
export class CouponHomeComponent implements OnInit , AfterViewInit {
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly pageSize : number = 5;
  pageSizes : number[] = [5, 10, 20, 25];

  searchQuery: string = '';
  isLoading = true;
  isError = false;
  errorMessage: string | null = null;

  displayedColumns: string[] = ['couponName', 'description', 'amount', 'percentage', 'minOrderAmount', 'maxDiscountAmount', 'status', 'actions'];
  dataSource = new MatTableDataSource<Coupon>();

  popularCoupons: Coupon[] = [];

  constructor(private matDialog: MatDialog, private couponService : CouponService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.isLoading = true; // Start loading
    this.isError = false;
    this.errorMessage = null;
    let coupons : Coupon[] = [];
    this.couponService.getAllCoupons().subscribe(

      (response : CouponAndDetails[]) => {
        //console.log(response)
        response.forEach(couponAndDetails => {    
          coupons.push({
            couponId: couponAndDetails.coupon.couponId,
            couponName: couponAndDetails.coupon.couponName,
            description: couponAndDetails.coupon.description,
            isAmount: couponAndDetails.coupon.isAmount,
            amount: couponAndDetails.coupon.amount,
            isPercentage: couponAndDetails.coupon.isPercentage,
            percentage: couponAndDetails.coupon.percentage,
            maxDiscountAmount: couponAndDetails.coupon.maxDiscountAmount,
            minOrderAmount: couponAndDetails.coupon.minOrderAmount,
            status: couponAndDetails.coupon.status,
            startDate: couponAndDetails.coupon.startDate,
            endDate: couponAndDetails.coupon.endDate,  
            addedBy: couponAndDetails.couponDetails.memberName,         
            message: couponAndDetails.couponDetails.message  
            
          });
          
        });  
        //console.log(coupons)      
        this.dataSource.data = coupons;
        this.isLoading = false;
        this.dataSource.data = coupons;   
        this.pageSizes = this.generatepageSizes(coupons.length, this.pageSize);  
        this.popularCoupons = coupons.length > 5 ? coupons.slice(0, 5) : coupons;
                
      },
      (error) => {
        console.error('Error loading Coupons', error);
        this.isLoading = false;
        this.isError = true
        this.errorMessage = `Error loading Coupons`; 
      }
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
  
  generatepageSizes(size: number, increment: number): number[] {
    const result: number[] = [];
    for (let i = increment; i <= size; i += increment) {
        result.push(i);
    }
    return result;
  }

  onCardClick(coupon: Coupon) {
    this.viewCouponDialog(coupon);
  }

  newCouponDialog(): void {

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    this.matDialog.open(CouponAddComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.initialize();
        //console.log(response)
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
    matDialogConfig.data = coupon
    this.matDialog.open(CouponUpdateComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.initialize();
        //console.log(response)
      }
    });
  }

  deleteCouponDialog(coupon: Coupon) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = {coupon : coupon, type : 'remove'}
    this.matDialog.open(CouponViewRemoveComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.initialize();
        //console.log(response)
      }
    });
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
      couponId: i + '',
      couponName: `SAVE${getRandomInt(10, 99)}`, // e.g., SAVE10, SAVE25
      description: `Save ${getRandomInt(5, 50)}% on your next purchase!`,
      minOrderAmount: getRandomInt(50, 1000), // Random amount between 5 and 100
      amount: getRandomInt(5, 100), // Random amount between 5 and 100
      percentage: getRandomInt(5, 50), // Random percentage between 5% and 50%
      maxDiscountAmount: getRandomInt(50, 200), // Maximum amount discount
      startDate: getRandomDate(new Date(now.getFullYear(), now.getMonth(), 1), now), // Random date in the current month
      endDate: getRandomDate(now, new Date(now.getFullYear(), now.getMonth() + 1, 30)), // Random date in the next month
      isAmount: getRandomBoolean(),
      isPercentage: getRandomBoolean(),
      status: true, // Set active for all generated coupons
      addedBy:'Sameer'
    };

    coupons.push(coupon);
  }

  return coupons;
}

// Generate 50 coupons
