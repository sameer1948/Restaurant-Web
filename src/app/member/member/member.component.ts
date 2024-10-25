import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../services/admin.service';
import { CustomUserDetails } from '../../model/CustomUserDetails';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UpdateMemberComponent } from '../update-member/update-member.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sno', 'username', 'roles', 'accountNonExpired', 'accountNonLocked', 'credentialsNonExpired', 'enabled', 'actions'];
  dataSource = new MatTableDataSource<CustomUserDetails>();
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService,
    private matDialog : MatDialog
  ) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe((data: CustomUserDetails[]) => {
      this.dataSource.data = data;
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
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
    // Logic for adding a new CustomUserDetails
  }

  updateUser(user: CustomUserDetails) {
    const matDialogConfig = new MatDialogConfig();
    //matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = "60%";
    matDialogConfig.data = user;
    this.matDialog.open(UpdateMemberComponent, matDialogConfig).afterClosed().subscribe(response => {
      if (response === 'success') {
       console.log(response); // Reload items after addition
      }
    });
  }

  deleteUser(user: CustomUserDetails) {
    // Logic for deleting the user
  }
}
