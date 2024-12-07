import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateMemberComponent } from '../update-member/update-member.component';
import { AddMemberComponent } from '../add-member/add-member.component';
import { VeiwRemoveMemberComponent } from '../veiw-remove-member/veiw-remove-member.component';
import { error } from 'console';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly pageSize: number = 5;
  pageSizes: number[] = [5, 10];

  displayedColumns: string[] = ['sno', 'username', 'roles', 'accountNonExpired', 'accountNonLocked', 'credentialsNonExpired', 'enabled', 'actions'];
  dataSource = new MatTableDataSource<CustomUserDetails>();
  
  searchTerm: string = '';
  isLoading = true;
  isError = false;
  errorMessage: string | null = null;  

  constructor(private adminService: AdminService, private matDialog : MatDialog) {}

  ngOnInit() {
    this.initialize();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initialize() {
    this.adminService.getMembers().subscribe(
      (data: CustomUserDetails[]) => {
        this.isLoading = false;
        this.dataSource.data = data;
        this.pageSizes = this.generatepageSizes(data.length, this.pageSize);   
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'username': return item.customUser.username;
              case 'accountNonExpired': return item.customUser.accountNonExpired ? 'Active' : 'Expired' ;
              case 'accountNonLocked': return item.customUser.accountNonLocked ? 'Active' : 'Expired' ;
              case 'credentialsNonExpired': return item.customUser.credentialsNonExpired ? 'Active' : 'Expired' ;
              case 'enabled': return item.customUser.enabled ? 'Active' : 'Expired' ;
              case 'roles': return item.customUser.roles;          
              default: return '';
            }
          };
      }, (error) => {
        console.error('Error loading Members', error);
        this.isLoading = false;
        this.isError = true
        this.errorMessage = `Error loading Members`; 
      });
  }

  generatepageSizes(size: number, increment: number): number[] {
    const result: number[] = [];
    for (let i = increment; i <= size; i += increment) {
        result.push(i);
    }
    return result;
  }

  getRoleClass(roles: string): string {
    if (roles.includes('ADMIN')) {
      return 'admin';
    } else if (roles.includes('USER')) {
      return 'user';
    } else if (roles.includes('MODERATOR')) {
      return 'moderator';
    } else if (roles.includes('GUEST')) {
      return 'guest';
    }
    return '';
  }
  

  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filterPredicate = (data: CustomUserDetails, filter: string) => {
      return data.customUser.username.toLowerCase().includes(filter) ||
             data.customUserDetails.firstName.toLowerCase().includes(filter) ||
             data.customUserDetails.email.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue;
  }

  clearSearch() {
    this.searchTerm = ''; // Reset the search term
    this.applyFilter(); // Show all users
  }

  addNew() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";    
    matDialogConfig.height = "70%";    
    this.matDialog.open(AddMemberComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response == 'success') {
       //console.log(response); // Reload items after addition
       this.initialize();
      }
    });
  }

  openUser(user: CustomUserDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    matDialogConfig.data = user;
    matDialogConfig.data = {customUserDetails: user, type: 'open'}
    this.matDialog.open(VeiwRemoveMemberComponent, matDialogConfig)
  }

  updateUser(user: CustomUserDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "70%";
    matDialogConfig.data = user;
    this.matDialog.open(UpdateMemberComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
       //console.log(response); // Reload items after addition
       this.initialize();
      }
    });
  }

  deleteUser(user: CustomUserDetails) {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    matDialogConfig.data = {customUserDetails: user, type: 'remove'}
    this.matDialog.open(VeiwRemoveMemberComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
       //console.log(response); // Reload items after addition
       this.initialize();
      }
    });
  }
}
