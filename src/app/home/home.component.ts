import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuList } from '../model/MenuList';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  menuItems : Array<MenuList> = [];

  orderedMenu : Array<MenuList> = [];

  path: string = 'H:\\spring\\Restaurant\\src\\main\\resources\\static\\idly.png';

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  dataSource = ELEMENT_DATA;

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

  addItem(menu: MenuList) {
    this.orderedMenu.push(menu);
    console.log(this.orderedMenu)
  }
    
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}