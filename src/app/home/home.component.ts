import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuList } from '../model/MenuList';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

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

  constructor(private menuService: MenuService) { }

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

  removeItem(menu: any) {    
    this.orderedMenu = this.orderedMenu.filter(item => item !== menu);
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

  checkout(total: number) {
    console.log(total)    ;
  }

  clearAll() {
    
    this.orderedMenu = [];
  }
     
}