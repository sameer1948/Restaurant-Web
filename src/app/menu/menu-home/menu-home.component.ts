import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuService } from '../../services/menu.service';
import { MenuList } from '../../model/MenuList';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { ModifyMenuComponent } from '../modify-menu/modify-menu.component';
import { RemoveMenuComponent } from '../remove-menu/remove-menu.component';
import { MenuDescriptionComponent } from '../menu-description/menu-description.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.scss']
})
export class MenuHomeComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'item', 'quantity', 'price', 'imagePath', 'actions'];
  dataSource = new MatTableDataSource<MenuList>();

  readonly pageSize: number = 5;
  pageSizes: number[] = [5, 10];

  searchQuery: string = ''; 
  isLoading = true;
  isError = false;
  errorMessage: string | null = null;  

  constructor(private menuService: MenuService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMenuItems(): void {   
    this.isLoading = true; // Start loading
    this.isError = false;
    this.errorMessage = null; 
    this.menuService.getAllItems().subscribe(
      (response: MenuList[]) => {
        this.isLoading = false;
        this.dataSource.data = response;    
        this.pageSizes = this.generatepageSizes(response.length, this.pageSize);    
      },
      (error) => {
        console.error('Error loading menu items', error);
        this.isLoading = false;
        this.isError = true
        this.errorMessage = `Error loading menu items`; 
      }
    );
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();  // Trigger the filter
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilter(); // Reset the filter when clearing
  }

  generatepageSizes(size: number, increment: number): number[] {
    const result: number[] = [];
    for (let i = increment; i <= size; i += increment) {
        result.push(i);
    }
    return result;
  }

  addItem(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    this.matDialog.open(AddMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after addition
      }
    });
  }

  viewItem(item: MenuList): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = item;
    this.matDialog.open(MenuDescriptionComponent, matDialogConfig);
  }

  editItem(item: MenuList): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = item;
    this.matDialog.open(ModifyMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after modification
      }
    });
  }

  deleteItem(item: MenuList): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '50%';
    matDialogConfig.data = item;
    this.matDialog.open(RemoveMenuComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
        this.loadMenuItems(); // Reload items after deletion
      }
    });
  }
}