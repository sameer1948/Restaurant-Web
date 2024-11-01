import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TaxAndFee } from '../../model/TaxAndFee';
import { AddTaxFeeComponent } from '../add-tax-fee/add-tax-fee.component';
import { VeiwRemoveTaxFeeComponent } from '../veiw-remove-tax-fee/veiw-remove-tax-fee.component';
import { UpdateTaxFeeComponent } from '../update-tax-fee/update-tax-fee.component';

@Component({
  selector: 'app-tax-fee',
  templateUrl: './tax-fee.component.html',
  styleUrl: './tax-fee.component.scss'
})
export class TaxFeeComponent implements OnInit , AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  readonly pageSize : number = 5;
  readonly pageSizes : number[] = [5, 10, 20, 25];

  searchQuery: string = '';  

  displayedColumns: string[] = ['name', 'percentage', 'addedBy', 'status', 'actions'];
  dataSource = new MatTableDataSource<TaxAndFee>();
  
  TaxAndFeeList: TaxAndFee[] = generateTaxAndFees(5); // Need Update To fetch it from data Base.

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.data = this.TaxAndFeeList;
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

  addTaxAndFeeDialog(): void {

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    this.matDialog.open(AddTaxFeeComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        console.log(response)
      }
    });
  }


  viewTaxAndFeeDialog(taxAndFee: TaxAndFee) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = {taxAndFee : taxAndFee, type : 'open'}
    this.matDialog.open(VeiwRemoveTaxFeeComponent, matDialogConfig)
  }

  updateTaxAndFeeDialog(taxAndFee: TaxAndFee) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = taxAndFee;
    this.matDialog.open(UpdateTaxFeeComponent, matDialogConfig)
  }

  deleteTaxAndFeeDialog(taxAndFee: TaxAndFee) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = {taxAndFee : taxAndFee, type : 'remove'}
    this.matDialog.open(VeiwRemoveTaxFeeComponent, matDialogConfig)
  }


}


function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateTaxAndFees(count: number): TaxAndFee[] {
  const taxAndFees: TaxAndFee[] = [];

  for (let i = 1; i <= count; i++) {
    const taxAndFee: TaxAndFee = {
      id: i,
      name: `GST${getRandomInt(10, 99)}`, // e.g., SAVE10, SAVE25      
      percentage: getRandomInt(5, 50), // Random percentage between 5% and 50%
      status: true, // Set active for all generated coupons
      addedBy:'Sameer'
    };

    taxAndFees.push(taxAndFee);
  }

  return taxAndFees;
}