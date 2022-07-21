import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InwardDialogComponent } from './dialog/inward-dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog.component';
import { SnackBarService } from './services/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MereddysLawFirm';

  displayedColumns: string[] = ['corporationName', 'fileNumber', 'branch', 'agentName', 'customerName', 'pickedUpBy', 'pickUpDate', 'drafterAssigned', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private apiService: ApiService,
    private snackbar: SnackBarService) {

  }

  ngOnInit(): void {
    this.getAllFilesData();
    //this.snackbar.openSnackBar("SnackBar Testing", 'X');
  }



  openDialog() {
    this.dialog.open(InwardDialogComponent, {
      width: '30%',
    }).afterClosed().subscribe({
      next: () => {
        this.getAllFilesData();
        this.snackbar.open("Retreived All Files Succesfully", 'X');
      }
    });
  }
  editFile(row: any) {
    this.dialog.open(InwardDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe({
      next: (res) => {
        {
          this.snackbar.open("File Updated Succesfully", 'X');
          this.getAllFilesData();
        }
      }
    })
  }

  deleteFile(id: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: id
    }).afterClosed().subscribe({
      next: (res) => {
        this.snackbar.open("File Deleted Succesfully", 'X');
        this.getAllFilesData();
      }
    });
  }

  getAllFilesData() {
    this.apiService.getAllFilesData()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.snackbar.open("Error While Fetching File Data", 'X');
        }
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
