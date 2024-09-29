import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuList } from '../model/MenuList';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewOrderComponent } from '../orders/new-order/new-order.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('addRemoveAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  menuItems : Array<MenuList> = [];
  orderedMenu : Array<MenuList> = [];

  displayedColumns: string[] = ['serial', 'name', 'quantity', 'price','action'];
  dataSource : any; 
  finalPrice : number = 0.0;

  path = 'https://img.freepik.com/free-photo/flat-lay-assortment-healthy-food_23-2148381271.jpg';

  constructor(private menuService: MenuService, private _matDialog : MatDialog,) { }

  ngOnInit(): void {
    this.menuService.getAllItems()
      .subscribe((data) => {
        console.log(data)
        this.menuItems = data;
      },
        (error) => {
          console.log('Something Went worng...!')
        }
      )
  }

  searchItem(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
  }
  
  addItem(menu: MenuList) {
    this.orderedMenu.push(menu);
    console.log(this.orderedMenu)
    this.finalPrice = this.calculateFinalPrice(this.orderedMenu);
    this.dataSource = new MatTableDataSource(this.orderedMenu);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeItem(index: number) {    
    this.orderedMenu.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.orderedMenu);
    this.finalPrice = this.calculateFinalPrice(this.orderedMenu);
    console.log("remove : " + this.orderedMenu)
    
  }

  calculateFinalPrice(items: Array<MenuList>) {
    let result : number = 0.0;
    for(let i=0; i<items.length; i++){      
      result += items[i].price;
    }
    return result;
  }

  checkout() {    
    const matDialogConfig = new MatDialogConfig()
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    matDialogConfig.data = this.orderedMenu;
    this._matDialog.open(NewOrderComponent, matDialogConfig).afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result.result == 'success')
        this.orderedMenu = [];
    });
  }

  clearAll() {    
    this.orderedMenu = [];
  }
     
}