import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MenuList } from '../../model/MenuList';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMenuComponent } from '../../menu/add-menu/add-menu.component';
import { ModifyMenuComponent } from '../../menu/modify-menu/modify-menu.component';
import { RemoveMenuComponent } from '../../menu/remove-menu/remove-menu.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  
  constructor(private _adminService : AdminService,
    private _matDialog : MatDialog,){}
  
  ngOnInit(): void {
    // this._adminService.getAllItems()
    // .subscribe((data)=> {
    //   console.log(data)      
    // },
    // (error) => {
    //   console.error(error)
    // }
    // )
  }

  addToMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(AddMenuComponent, matDialogConfig);
    

  }

  modifyFromMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(ModifyMenuComponent, matDialogConfig);

  }

  removeFromMenu() {
    // this._adminService.addItemsToMenu(menu).subscribe(
    //   (data) => {
    //     if (data.id != null){
    //       console.log(data);
    //     }
    //   },

    //   (error) => {
    //     console.error("eRROR : {}", error);       
    //   }
    // );
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    this._matDialog.open(RemoveMenuComponent, matDialogConfig);

  }



}
