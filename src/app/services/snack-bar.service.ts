import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * @title Snack-bar with a custom component
 */

 @Injectable({
   providedIn: 'root'
 })

export class SnackBarService {
  durationInSeconds = 5;
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
