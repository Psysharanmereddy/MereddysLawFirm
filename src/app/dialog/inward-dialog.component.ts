import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import { SnackBarService } from '../services/snack-bar.service';

interface PickUpBoy {
  id: number;
  name: string;
  contactNumber: number;
  numberOfFiles: number;
}

interface Drafter {
  id: number;
  name: string;
  numberOfFiles: number
}

interface Branch {
  id: number;
  name: string;
}

interface Organization {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface File {
  id: number;
  number: number;
  fileOrganization: string;
  filePickedupBy: string;
  fileHandedOverTo: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './inward-dialog.component.html',
  styleUrls: ['./inward-dialog.component.scss']
})
export class InwardDialogComponent implements OnInit {

  inwardForm !: FormGroup;
  actionBtn: string = "Save";
  organizationList: Organization[] = [
    {
      id: 1,
      name: "LIC HFL"
    },
    {
      id: 2,
      name: "Aadhar"
    },
    {
      id: 3,
      name: "Canfin"
    },
    {
      id: 4,
      name: "Bandhan"
    },
    {
      id: 5,
      name: "Cholamandalam"
    }
  ]

  branchList: Branch[] = [
    {
      id: 1,
      name: "Vanasthalipuram"
    },
    {
      id: 2,
      name: "Kukatpally"
    },
    {
      id: 3,
      name: "Dilsukhnagar"
    },
    {
      id: 4,
      name: "Himayatnagar"
    },
    {
      id: 5,
      name: "AsRaoNagar"
    },
  ]

  drafterList: Drafter[] = [
    {
      id: 1,
      name: "Satish",
      numberOfFiles: 20
    },
    {
      id: 2,
      name: "Laxmi",
      numberOfFiles: 20
    },
    {
      id: 3,
      name: "Srikanth",
      numberOfFiles: 20
    },
    {
      id: 4,
      name: "Sunil",
      numberOfFiles: 20
    },
    {
      id: 5,
      name: "Mounica",
      numberOfFiles: 20
    },
    {
      id: 6,
      name: "Meghana",
      numberOfFiles: 20
    }
  ]

  statusList: Status[] = [
    {
    id: 1,
    name: "Processing"
  },
  {
    id: 2,
    name: "Requirement"
  },
  {
    id: 3,
    name: "Completed"
  },
  ]

  pickupBoysList: PickUpBoy[] = [
    {
      id: 1,
      contactNumber: 999 - 9999 - 999,
      name: "Nethra",
      numberOfFiles: 20
    },
    {
      id: 2,
      contactNumber: 999 - 9999 - 999,
      name: "Kumar",
      numberOfFiles: 20
    },
    {
      id: 3,
      contactNumber: 999 - 9999 - 999,
      name: "Govardhan",
      numberOfFiles: 20
    },
    {
      id: 4,
      contactNumber: 999 - 9999 - 999,
      name: "Jogeshwar",
      numberOfFiles: 20
    },
    {
      id: 5,
      contactNumber: 999 - 9999 - 999,
      name: "Haneef",
      numberOfFiles: 20
    }

  ]

  //statusLists: string[] = ['Processing', 'Requirement', 'Completed'];

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<InwardDialogComponent>,
    private snackBar: SnackBarService) { dialogRef.disableClose = true }

  ngOnInit(): void {
    this.inwardForm = this.formBuilder.group({
      corporationName: ['', Validators.required],
      fileNumber: ['', Validators.required],
      branch: ['', Validators.required],
      agentName: ['', Validators.required],
      customerName: ['', Validators.required],
      pickedUpBy: ['', Validators.required],
      pickUpDate: ['', Validators.required],
      drafterAssigned: ['', Validators.required],
      status: ['', Validators.required]
    });
    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "Update";
      this.inwardForm.controls['corporationName'].setValue(this.editData.corporationName);
      this.inwardForm.controls['fileNumber'].setValue(this.editData.fileNumber);
      this.inwardForm.controls['branch'].setValue(this.editData.branch);
      this.inwardForm.controls['agentName'].setValue(this.editData.agentName);
      this.inwardForm.controls['customerName'].setValue(this.editData.customerName);
      this.inwardForm.controls['pickedUpBy'].setValue(this.editData.pickedUpBy);
      this.inwardForm.controls['pickUpDate'].setValue(this.editData.pickUpDate);
      this.inwardForm.controls['drafterAssigned'].setValue(this.editData.drafterAssigned);
      this.inwardForm.controls['status'].setValue(this.editData.status);
    }
  }

  addFile() {
    if (this.inwardForm.valid) {
      if(!this.editData) {
        this.apiService.saveFile(this.inwardForm.value)
        .subscribe({
          next: () => {
            this.snackBar.open("File Saved Succesfully", 'X');
            this.inwardForm.reset();
            this.dialogRef.close('save');
            this.dialogRef.afterClosed()
            .subscribe({
              next: () => {
                this.apiService.getAllFilesData();
              }
            })
          },
          error: () => {
            this.snackBar.open("Error While Saving A File :(", 'X');
          }
        })
      }
      else{
        this.update(this.editData.id);
      }
      
    }
  }

  update(fileNumber: any) : void {
    this.apiService.update(this.inwardForm.value, fileNumber)
    .subscribe({
      next: (res) => {
        alert("File Updated Succesfully!!");
        this.inwardForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert("Error While Updating File")
      }
    })
  }

  
}
