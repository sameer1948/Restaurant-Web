// import { DialogRef } from '@angular/cdk/dialog';
// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-transactions',
//   templateUrl: './transactions.component.html',
//   styleUrl: './transactions.component.scss'
// })
// export class TransactionsComponent {
  
//   transation: Transaction | undefined;

//   constructor(private _dialogRef : DialogRef,@Inject(MAT_DIALOG_DATA) public data: Transaction) {
//     console.log("Here " +  data.amount)
//     this.transation = data;
//   }
   
//  onclose() {
//   this._dialogRef.close();
//  }

// }
// export interface Transaction {
//   transactionId: string;
//   itemList: string;
//   date: string;
//   amount: string;
// }