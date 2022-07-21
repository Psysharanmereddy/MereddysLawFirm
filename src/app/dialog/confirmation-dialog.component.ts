import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { SnackBarService } from '../services/snack-bar.service';
import { InwardDialogComponent } from './inward-dialog.component';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor( private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<InwardDialogComponent>,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
  }

  deleteFile() {
    this.apiService.delete(this.data)
    .subscribe({
      next: () => {
        this.dialogRef.close('delete');
        this.snackBar.open("Retreived All Files Succesfully", 'X');
        
      },
      error: () => {
        this.snackBar.open("Retreived All Files Succesfully", 'X');
      }
    })
  }
}
