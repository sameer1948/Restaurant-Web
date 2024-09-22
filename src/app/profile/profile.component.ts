// import { Component, OnInit } from '@angular/core';
// import { MatDialog,  MatDialogConfig } from '@angular/material/dialog';
// import { TransactionsComponent } from '../orders/transactions/transactions.component';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.scss'
// })
// export class ProfileComponent implements OnInit {

//   displayedColumns: string[] = ['transactionId', 'itemList', 'date', 'amount', 'actions'];

//   dataSource = TRANSACTION_DATA;

//   useritemList : String = 'Sameer Sheik';

//   walletBalance : any = 100.00;
//   accountBalance : any = 100.00;

//   genders : any = [
//     {itemList:"Male", value:"male"},
//     {itemList:"Female", value:"female"}
//   ];

//   ngOnInit(): void {
    
//   }

//   constructor(private _dialog:MatDialog,) {

//   }


//   showTransactions(row:any) {
//     const myconfig = new MatDialogConfig();
//     myconfig.disableClose = true;
//     myconfig.autoFocus = true;
//     myconfig.width="80%";

//     this._dialog.open(TransactionsComponent, {data:row, disableClose:true,autoFocus:true,width:"80%"});
//     console.log(row);
//   } 

// }

// export interface Transaction {
//   transactionId: string;
//   itemList: string;
//   date: string;
//   amount: string;
// }

// const TRANSACTION_DATA : Transaction[] = [
//   {transactionId: 'TRANS1715526852', itemList: 'Hydrogen', date: '12-04-2024', amount: '100.00'},
//   {transactionId: 'TRANS1715526853', itemList: 'Helium', date: '12-04-2024', amount: '123.00'},
//   {transactionId: 'TRANS1715526854', itemList: 'Lithium', date: '12-04-2024', amount: '785.00'},
//   {transactionId: 'TRANS1715526855', itemList: 'Beryllium', date: '12-04-2024', amount: '635.00'},
//   {transactionId: 'TRANS1715526856', itemList: 'Boron', date: '12-04-2024', amount: '412.00'},
//   {transactionId: 'TRANS1715526857', itemList: 'Carbon', date: '12-04-2024', amount: '821.0'},
//   {transactionId: 'TRANS1715526858', itemList: 'Nitrogen', date: '12-04-2024', amount: '463.00'},
//   {transactionId: 'TRANS1715526859', itemList: 'Oxygen', date: '12-04-2024', amount: '652.00'},
//   {transactionId: 'TRANS1715526860', itemList: 'Fluorine', date: '12-04-2024', amount: '511.00'},
//   {transactionId: 'TRANS1715526861', itemList: 'Neon', date: '12-04-2024', amount: '763.00'},
// ];


