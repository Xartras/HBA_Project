import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HomeBillingItem } from '../../_models/home-billing-item'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-home-billing-item-dialog',
  templateUrl: './add-home-billing-item-dialog.component.html',
  styleUrls: ['./add-home-billing-item-dialog.component.css']
})
export class AddHomeBillingItemDialogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder
             ,public dialogRef: MatDialogRef<AddHomeBillingItemDialogComponent>
             ,@Inject(MAT_DIALOG_DATA) public newHomeBillingItemDialog: any
             ) { }

  addHomeBillingItemForm : FormGroup;
  newHomeBillingtem: HomeBillingItem;
  isFormSubmitted = false;

  get formInput() { return this.addHomeBillingItemForm.controls }

  ngOnInit() 
  {
    this.addHomeBillingItemForm = this.formBuilder.group(
      {
        cName:        new FormControl('', Validators.compose([Validators.required])),
        cPeriod:      new FormControl('', Validators.compose([Validators.required])),
        cActualState: new FormControl('', Validators.compose([Validators.required]))
      })
  }
  btnSaveNewItem()
  {
    this.isFormSubmitted = true;
    if(this.addHomeBillingItemForm.invalid) { return; }
    else
    {
      this.newHomeBillingItemDialog.name        = this.addHomeBillingItemForm.controls.cName.value;
      this.newHomeBillingItemDialog.period      = this.addHomeBillingItemForm.controls.cPeriod.value;
      this.newHomeBillingItemDialog.actualState = this.addHomeBillingItemForm.controls.cActualState.value;

      this.newHomeBillingtem =  new HomeBillingItem('',
        this.newHomeBillingItemDialog.name,
        this.newHomeBillingItemDialog.period, 
        this.newHomeBillingItemDialog.actualState, 
        )
        
      this.dialogRef.close(this.newHomeBillingtem);
    }
  }

  btnCancel()
  {
    this.dialogRef.close(null);
  }
}
