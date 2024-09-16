import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { error } from 'console';
import { menuList } from '../model/menuList';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  menuItems: Array<menuList> = [];

  constructor(private menuService : MenuService) {}
  
  ngOnInit(): void {
    this.menuService.getAllItems()
    .subscribe((data)=> {
      console.log(data)
      this.menuItems = data;
    },
    (error) => {
      console.log('Something Went worng...!')
    }
    )
  }
}

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}