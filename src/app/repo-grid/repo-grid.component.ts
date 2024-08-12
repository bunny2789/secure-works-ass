import { Component, Input } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Repository } from '../models/repository.model';

@Component({
  selector: 'app-repo-grid',
  standalone: true,
  imports: [AgGridModule],
  template: `
    <ag-grid-angular
      style="width: 100%; height: 500px;"
      class="ag-theme-alpine"
      [rowData]="filteredData"
      [columnDefs]="columnDefs"
      [pagination]="true"
      [paginationPageSize]="10"
      [defaultColDef]="defaultColDef"
      [rowSelection]="'single'"
    ></ag-grid-angular>
  `,
})
export class RepoGridComponent {
  @Input() rowData: Repository[] = [];
  filteredData: Repository[] = [];

  columnDefs: ColDef<Repository, any>[] = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Stars', field: 'stargazerCount', sortable: true, filter: true }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
  };

  ngOnChanges() {
    this.filteredData = this.rowData; // Initially, no filter applied
  }

  applyFilter(filterValue: string) {
    if (filterValue) {
      this.filteredData = this.rowData.filter(repo =>
        repo.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(filterValue.toLowerCase()))
      );
    } else {
      this.filteredData = this.rowData;
    }
  }
}
