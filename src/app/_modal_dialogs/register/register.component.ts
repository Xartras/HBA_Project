import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RegisterComponent>) { }

  user : any = { }

  ngOnInit() { }

  btnAuthRegistration()
  {
    this.dialogRef.close(this.user);
  }

  btnCancel()
  {
    this.dialogRef.close()
  }
}
