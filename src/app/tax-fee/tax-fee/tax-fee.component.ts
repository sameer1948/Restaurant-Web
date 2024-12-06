import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddTaxFeeComponent } from '../add-tax-fee/add-tax-fee.component';
import { VeiwRemoveTaxFeeComponent } from '../veiw-remove-tax-fee/veiw-remove-tax-fee.component';
import { UpdateTaxFeeComponent } from '../update-tax-fee/update-tax-fee.component';
import { TaxService } from '../../services/tax.service';
import { Tax } from '../../model/Tax';
import { TaxAndDetails } from '../../model/TaxAndDetails';
import { EncryptDecryptService } from '../../services/encrypt-decrypt.service';

@Component({
  selector: 'app-tax-fee',
  templateUrl: './tax-fee.component.html',
  styleUrl: './tax-fee.component.scss'
})
export class TaxFeeComponent implements OnInit , AfterViewInit {

  private readonly USER_NAME: string = 'USERNAME';
  readonly userName : string = 'N/A';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  readonly pageSize : number = 5;
  readonly pageSizes : number[] = [5, 10, 20, 25];

  searchQuery: string = '';  

  displayedColumns: string[] = ['taxId', 'taxType', 'value', 'status', 'actions'];
  dataSource = new MatTableDataSource<TaxAndDetails>();

  constructor(private matDialog: MatDialog, 
    private taxService : TaxService, 
    private decryptService : EncryptDecryptService) {

    const encryptedUserName = sessionStorage.getItem(decryptService.encrypt(this.USER_NAME));
    this.userName = decryptService.decrypt(encryptedUserName ?? '') ?? 'N/A';
    //console.log(this.userName)
  }

  ngOnInit(): void {        
    this.taxService.getTaxes().subscribe(
      (response : TaxAndDetails[]) => {
        this.dataSource.data = response;
        //console.log(response);
      }, (error) => {
        console.log(error);
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

  addTaxAndFeeDialog(): void {

    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    this.matDialog.open(AddTaxFeeComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        //console.log(response)
      }
    });
  }


  viewTaxAndFeeDialog(taxAndDetails: TaxAndDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = {taxAndDetails : taxAndDetails, type : 'open'}
    this.matDialog.open(VeiwRemoveTaxFeeComponent, matDialogConfig)
  }

  updateTaxAndFeeDialog(taxAndDetails: TaxAndDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.disableClose = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = taxAndDetails;
    this.matDialog.open(UpdateTaxFeeComponent, matDialogConfig)
  }

  deleteTaxAndFeeDialog(taxAndDetails: TaxAndDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "40%";
    matDialogConfig.data = {taxAndDetails : taxAndDetails, type : 'remove'}
    this.matDialog.open(VeiwRemoveTaxFeeComponent, matDialogConfig)
  }


}