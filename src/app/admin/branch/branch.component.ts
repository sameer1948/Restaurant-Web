import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss',
  //providers: [AdminService]
})
export class BranchComponent {
  
  displayedColumns: string[] = ['Branch Id', 'Branch Name', 'Location'];

   branchs: Branch[] = [];

  constructor(private adminService: Admin) { }

  ngOnInit() {
    this.adminService.getEmployees().subscribe((data) =>{
      this.branchs = data;
    });
    console.log(this.branchs)
  }

  
}

export interface Branch {
  branchId: number;
  branchName: string;
  branchLocation: string;
}
